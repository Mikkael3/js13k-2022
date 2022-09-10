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

  constructor(monsterBox: MonsterBox, canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.monsterBox = monsterBox;
  }

  selectForBattle(monster: MonsterC) {
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

  // Skill button clicked
  useSkill(skill: Skill, gameUi: GameUi) {
    if (!this.monsterOpponent) return;
    gameUi.unrender();

    const damage = gameState.player.attack(skill, this.monsterOpponent);
    const skillText = getSkillText(skill, damage, 'You');
    gameState.battleLog.addLine(skillText);

    this.monsterBox.setMonster(this.monsterOpponent);
    if (this.monsterOpponent.stats.hp <= 0) {
      gameState.player.hp = this.monsterOpponent.monsterData.race.stats.hp;
      this.killMonster();
      if (!this.classChooseDialogOpen) {
        this.showChooseClassDialog();
        this.classChooseDialogOpen = true;
      }
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
      gameState.monsterBox.setMonster(this.monsterOpponent);
    }, 500);
    // Get control back after enemy finishes
    setTimeout(() => {
      gameUi.render();
    }, 1000);
  }

  private killMonster() {
    const gameState = GameState.instance;
    const index = gameState.monsterSprites.findIndex((m) => {
      return m === this.monsterOpponent;
    });
    if (index < 0) return;
    gameState.monsterSprites.splice(index, 1);
  }

  private showChooseClassDialog() {
    const { player } = GameState.instance;
    if (!this.monsterOpponent || !player) return;
    player.skills = [];
    const options = [
      ...player.monsterData.class.skills,
      ...this.monsterOpponent.monsterData.class.skills,
    ]
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
          handler: (e: Dialog) => () => {
            player.skills.push(skill);
            // Remove this skill from choosable skills
            e.options = e.options.filter((option) => option.title !== skill.name);
            e.setOptions();
            if (player.skills.length >= 3 && this.monsterOpponent) {
              player.monsterData = this.monsterOpponent.monsterData;
              this.setPlayerSkills(player.skills);
              this.monsterOpponent = undefined;
              this.monsterBox.setMonster(undefined);
              this.classChooseDialogOpen = false;
              e.unrender();
              // Show other monsters again
              GameState.instance.monsterSprites.forEach((monster) => (monster.display = true));
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
    dialog.render();
    // TODO clean previous dialog elements
    gameState.uiElements.push(dialog);
  }

  public setPlayerSkills(skills: Skill[]) {
    const player = gameState.player;
    player.monsterData.class.skills = skills
    player.monsterData.class.name = 'BodySnatcher';
    gameState.playerBox.setMonster(gameState.player);
  }
}

function getSkillText(skill: Skill, damage: number, attackerName: string) {
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
      skillText = 'pieleen meni. ' + skill.type;
  }
  return attackerName + ' used ' + skill.name + '. ' + skillText;
}
