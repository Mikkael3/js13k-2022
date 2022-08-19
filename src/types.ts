type Skill = {
  name: string;
  dmg: number;
};

export type BaseStats = {
  hp: number;
  str: number;
  int: number;
  def: number;
  stamina: number;
};

export type Race = {
  name: string;
  skills: Skill[];
  stats: BaseStats;
  height: number;
  width: number;
};

export type Class = {
  name: string;
  skills: Skill[];
  color: string;
};

export type Monster = {
  race: Race;
  class: Class;
  level: number;
};
