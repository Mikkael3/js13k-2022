import { Skill, buildSkill } from './types';

import { MonsterC } from './monster';
import { randInt } from 'kontra';
import { skills } from './data';

export const stageValues = {
  '6': 4,
  '5': 3.5,
  '4': 3,
  '3': 2.5,
  '2': 2,
  '1': 1.5,
  '0': 1,
  '-1': 0.66,
  '-2': 0.5,
  '-3': 0.4,
  '-4': 0.33,
  '-5': 0.28,
  '-6': 0.25,
};

export const performSkill = (skillV: Skill, user: MonsterC, target: MonsterC): number => {
  let skill = skillV;
  if (skill.cost > user.stats.stamina) {
    return -1;
  }
  user.stats.stamina -= skill.cost;
  if (skill.type === 'random') {
    skill = buildSkill(Object.entries(skills)[randInt(0, Object.keys(skills).length - 1)][1]);
  }
  const type = skill.type;
  let damage = skill.value;
  if (type === 'int' || type === 'str') {
    const attackStage = String(user.statStages[type]) as keyof typeof stageValues;
    const defType = type === 'str' ? 'def' : 'wp';
    const defenseStage = String(target.statStages[defType]) as keyof typeof stageValues;
    damage = damageCalculation({
      power: skill.value,
      attack: user.stats[type] * stageValues[attackStage],
      attackerLevel: user.monsterData.level,
      defense: target.stats[defType] * stageValues[defenseStage],
    });
  }

  // naa pitaa kayda lapi
  if (type === 'boost') {
    return handleStatStages(skill, user);
  }
  if (type === 'status') {
    return handleStatStages(skill, target);
  }

  target.stats.hp = target.stats.hp - damage > 0 ? target.stats.hp - damage : 0;

  return damage;
};

const damageCalculation = ({
  power,
  attack,
  defense,
  attackerLevel,
}: {
  power: number;
  attack: number;
  defense: number;
  attackerLevel: number;
}) => {
  return Math.ceil((((2 * attackerLevel) / 5 + 2) / 50) * power * (attack / defense) + 2);
};

const handleStatStages = (skill: Skill, target: MonsterC): number => {
  if (skill.effect !== 'hp' && skill.effect !== 'stamina') {
    target.statStages[skill.effect] += skill.value;
    if (target.statStages[skill.effect] < -6) target.statStages[skill.effect] = -6;
    if (target.statStages[skill.effect] > 6) target.statStages[skill.effect] = 6;
  }
  if (skill.effect === 'hp') {
    target.stats.hp += target.monsterData.race.stats.hp * skill.value;
    target.stats.hp = Math.ceil(target.stats.hp);
  }
  if (skill.effect === 'stamina') target.stats.stamina += 1;
  return 0;
};
