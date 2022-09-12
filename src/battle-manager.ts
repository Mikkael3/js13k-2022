import { GameObject, randInt } from 'kontra';
import { Skill, StatNames } from './types';
import gameState, { GameState } from './game-state';

import { Dialog } from './dialog';
import { GameUi } from './game-ui';
import { MonsterBox } from './monster-box';
import { MonsterC } from './monster';

export class BattleManager {
  canvas: HTMLCanvasElement;
  monsterOpponent?: MonsterC = undefined;
  monsterBox: MonsterBox;
  classChooseDialogOpen = false;
  battleEnded = false;

  constructor(monsterBox: MonsterBox, canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.monsterBox = monsterBox;
  }

  selectForBattle(monster: MonsterC) {
    this.battleEnded = false;
    this.monsterOpponent = monster;
    monster.x = this.canvas.width / 2 - monster.width / 2;
    monster.y = this.canvas.height / 2 - monster.height / 2;
    monster.resetAnimation();
    GameState.instance.monsterSprites.forEach((monster) => {
      if (monster === this.monsterOpponent) {
        return;
      }

      monster.display = false;
    });

    // Set ui to show monster stats
    this.monsterBox.setMonster(monster);
  }

  getMonsterOpponent() {
    return this.monsterOpponent;
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
    if (!this.monsterOpponent) return;
    gameState.player.hp = this.monsterOpponent.monsterData.race.stats.hp;
    this.killMonster();
    if (!this.classChooseDialogOpen) {
      this.showChooseClassDialog();
      this.classChooseDialogOpen = true;
    }
  }

  setPlayerMonster() {
    const data = { ...this.monsterOpponent!.monsterData };
    data.class.name = 'Reborn';
    data.class.color = 'silver';
    data.level = 1;
    gameState.player.monsterData = data;
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
    this.monsterOpponent = undefined;
    this.monsterBox.setMonster(undefined);
  }

  // Skill button clicked
  useSkill(skill: Skill, gameUi: GameUi) {
    if (!this.monsterOpponent) return;
    gameUi.unrender();

    const damage = gameState.player.attack(skill, this.monsterOpponent);
    const skillText = getSkillText(skill, damage, 'You');
    gameState.battleLog.addLine(skillText);
    if (this.monsterOpponent.stats.hp <= 0) {
      this.battleEndCb();
      return;
    }
    // Set player status immediately after using skill
    gameState.playerBox.setMonster(gameState.player);
    // Shake background when taking a hit
    this.shakeObject(this.monsterOpponent);
    this.shakeObject(gameState.background, 500);
    setTimeout(() => {
      if (!this.monsterOpponent) return;
      const randomSkill =
        this.monsterOpponent.getSkills()[randInt(0, this.monsterOpponent.getSkills().length - 1)];
      const damage = this.monsterOpponent.attack(randomSkill, gameState.player);
      const skillText = getSkillText(
        randomSkill,
        damage,
        this.monsterOpponent.monsterData.race.name,
      );
      gameState.battleLog.addLine(skillText);
      gameState.playerBox.setMonster(gameState.player);
      if (this.monsterOpponent.stats.hp <= 0) {
        this.battleEndCb();
        return;
      }
    }, 500);
    // Get control back after enemy finishes
    setTimeout(() => {
      // restore some stamina
      gameState.player.stats.stamina =
        gameState.player.stats.stamina < 10 ? gameState.player.stats.stamina + 1 : 10;
      if (this.monsterOpponent)
        this.monsterOpponent.stats.stamina =
          this.monsterOpponent.stats.stamina < 10 ? this.monsterOpponent.stats.stamina + 1 : 10;
      if (!this.battleEnded) gameUi.render();
    }, 1000);
  }

  public killMonster() {
    if (gameState.showBoss) {
      return;
    }
    const index = gameState.monsterSprites.findIndex((m) => {
      return m === this.monsterOpponent;
    });
    if (index < 0) return;
    gameState.monsterSprites.splice(index, 1);
  }

  private showChooseClassDialog() {
    const { player } = gameState;
    if (!this.monsterOpponent || !player) return;
    player.skills = [];
    const options = [
      ...player.monsterData.class.skills,
      ...this.monsterOpponent.monsterData.class.skills,
    ]
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
            // Last skill was chosen. Continue
            if (player.skills.length >= 3 && this.monsterOpponent) {
              this.skillsChosenCb();
              this.classChooseDialogOpen = false;
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
