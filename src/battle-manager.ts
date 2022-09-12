import { GameObject, randInt } from 'kontra';
import { Skill, StatNames } from './types';
import gameState from './game-state';

import { Dialog } from './dialog';
import { GameUi } from './game-ui';
import { MonsterBox } from './monster-box';
import { MonsterC } from './monster';

export class BattleManager {
  canvas: HTMLCanvasElement;
  monOp?: MonsterC = undefined;
  monsterBox: MonsterBox;
  choosingClass = false;
  battleEnded = false;

  constructor(monsterBox: MonsterBox, canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.monsterBox = monsterBox;
  }

  selectForBattle(monster: MonsterC) {
    this.battleEnded = false;
    this.monOp = monster;
    monster.x = this.canvas.width / 2 - monster.width / 2;
    monster.y = this.canvas.height / 2 - monster.height / 2;
    monster.resetAnimation();
    gameState.monsterSprites.forEach((monster) => {
      if (monster === this.monOp) {
        return;
      }

      monster.display = false;
    });

    // Set ui to show monster stats
    this.monsterBox.setMonster(monster);
  }

  shakeObject(object: GameObject, timeout = 0) {
    setTimeout(() => {
      setTimeout(() => {
        object.x += 20;
      }, 100);
      setTimeout(() => {
        object.x -= 40;
      }, 300);
      setTimeout(() => {
        object.x += 20;
      }, 500);
    }, timeout);
  }

  battleEndCb() {
    this.battleEnded = true;
    if (!this.monOp) return;
    gameState.player.hp = this.monOp.monsterData.race.stats.hp;
    this.killMonster();
    if (!this.choosingClass) {
      this.showDialog();
      this.choosingClass = true;
    }
  }

  setPlayerMonster() {
    const data = { ...this.monOp!.monsterData };
    data.class.name = 'Reborn';
    data.class.color = 'silver';
    data.level = 1;
    gameState.player.monsterData = {
      ...data,
      race: { ...data.race, stats: { ...data.race.stats, hp: data.race.stats.hp + 0.5 } },
    };
    gameState.playerBox.setMonster(gameState.player);
    gameState.player.statStages = {
      str: 0,
      int: 0,
      def: 0,
      wp: 0,
    };
  }

  skillsChosenCb() {
    this.setPlayerMonster();
    this.setPlayerSkills(gameState.player.skills);
    this.monOp = undefined;
    this.monsterBox.setMonster(undefined);
  }

  // Skill button clicked
  useSkill(skill: Skill, gameUi: GameUi) {
    if (!this.monOp) return;
    gameUi.unrender();

    const damage = gameState.player.attack(skill, this.monOp);
    const skillText = getSkillText(skill, damage, 'You');
    gameState.battleLog.addLine(skillText);
    if (this.monOp.stats.hp <= 0) {
      this.battleEndCb();
      return;
    }
    // Set player status immediately after using skill
    gameState.playerBox.setMonster(gameState.player);
    // Shake background when taking a hit
    this.shakeObject(this.monOp);
    this.shakeObject(gameState.background, 500);
    setTimeout(() => {
      if (!this.monOp) return;
      const randomSkill = this.monOp.getSkills()[randInt(0, this.monOp.getSkills().length - 1)];
      const damage = this.monOp.attack(randomSkill, gameState.player);
      const skillText = getSkillText(randomSkill, damage, this.monOp.monsterData.race.name);
      gameState.battleLog.addLine(skillText);
      gameState.playerBox.setMonster(gameState.player);
      if (this.monOp.stats.hp <= 0) {
        this.battleEndCb();
        return;
      }
    }, 500);
    // Get control back after enemy finishes
    setTimeout(() => {
      // restore some stamina
      gameState.player.stats.stamina =
        gameState.player.stats.stamina < 10 ? gameState.player.stats.stamina + 1 : 10;
      if (this.monOp)
        this.monOp.stats.stamina =
          this.monOp.stats.stamina < 10 ? this.monOp.stats.stamina + 1 : 10;
      if (!this.battleEnded) gameUi.render();
    }, 1000);
  }

  public killMonster() {
    if (gameState.showBoss) {
      return;
    }
    const index = gameState.monsterSprites.findIndex((m) => {
      return m === this.monOp;
    });
    if (index < 0) return;
    gameState.monsterSprites.splice(index, 1);
  }

  private showDialog() {
    const { player } = gameState;
    if (!this.monOp || !player) return;
    player.skills = [];
    const options = [...player.monsterData.class.skills, ...this.monOp.monsterData.class.skills]
      // Remove duplicate skills
      .filter((skill, index, skills) => {
        return (
          skills.findIndex((s) => {
            return s.name === skill.name;
          }) === index
        );
      })
      .map((skill) => {
        return {
          title: skill.name,
          color:
            skill.type === 'str'
              ? 'red'
              : skill.type === 'int'
              ? 'blue'
              : skill.type === 'status'
              ? 'green'
              : 'violet',
          handler: (e: Dialog) => () => {
            player.skills.push(skill);
            // Remove this skill from choosable skills
            e.options = e.options.filter((option) => option.title !== skill.name);
            e.setOptions();
            const limit = options.length > 4 ? 4 : options.length;
            // Last skill was chosen. Continue
            if (player.skills.length >= limit && this.monOp) {
              this.skillsChosenCb();
              this.choosingClass = false;
              e.unrender();
              // Show other monsters again
              gameState.monsterSprites.forEach((monster) => (monster.display = true));
              if (gameState.showBoss) {
                gameState.monsterSprites[0].display = false;
                gameState.storyBox.render();
                gameState.showBoss = false;
              }
            }
          },
        };
      });
    const dialog = new Dialog({
      options,
      text: 'Choose your skills',
      x: 0.2,
      y: 0.2,
      width: 0.6,
      height: 0.6,
      canvas: this.monsterBox.canvas,
    });
    this.setPlayerMonster();
    dialog.render();
    // TODO clean previous dialog elements
    gameState.uiElements.push(dialog);
  }

  public setPlayerSkills(skills: Skill[]) {
    const player = gameState.player;
    player.monsterData.class.skills = skills;
    gameState.playerBox.setMonster(gameState.player);
  }
}

const getSkillText = (skill: Skill, damage: number, attackerName: string) => {
  if (damage < 0) {
    return attackerName + ' used ' + skill.name + '. ' + 'But there is no stamina to do that';
  }
  if (skill.flavor) {
    return attackerName + ' used ' + skill.name + '. ' + skill.flavor;
  }
  let skillText = '';
  switch (skill.type) {
    case 'str':
    case 'int':
    case 'fixed':
      skillText = 'It dealt ' + damage + ' damage.';
      break;
    case 'boost':
      skillText = StatNames[skill.effect] + ' increased.';
      break;
    case 'status':
      skillText = "Opponent's " + StatNames[skill.effect] + ' fell.';
      break;
    default:
      skillText = 'error' + skill.type;
  }
  return attackerName + ' used ' + skill.name + '. ' + skillText;
};
