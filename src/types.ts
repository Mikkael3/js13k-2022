export const size = (size: number) => size * 4;

export type Skill = {
  name: string;
  value: number;
  type: 'int' | 'str' | 'fixed' | 'status' | 'boost';
  effect: keyof BaseStats;
};

export type BaseStats = {
  hp: number;
  str: number;
  int: number;
  def: number;
  stamina: number;
};

export const StatNames = {
  hp: 'Health',
  str: 'Strength',
  int: 'Intelligence',
  def: 'Defence',
  stamina: 'Stamina',
};

export type Race = {
  name: string;
  skills: Skill[];
  stats: BaseStats;
  height: number;
  width: number;
  sprite: number[][];
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

export type ClassProps = Partial<Omit<Class, 'skills'> & { skills: Partial<Skill>[] }>;
export type RaceProps = Partial<
  Omit<Race, 'skills' | 'stats'> & { skills: Partial<Skill>[]; stats: Partial<BaseStats> }
>;

export const buildSkill = (data: Partial<Skill>): Skill => {
  return {
    name: 'Skill',
    value: 0.0,
    type: 'int',
    effect: 'stamina',
    ...data,
  };
};

export const buildClass = (data: ClassProps): Class => {
  return {
    name: 'Class',
    color: 'yellow',
    ...data,
    skills: data.skills ? data.skills.map((skill) => buildSkill(skill)) : [],
  };
};

export const buildStats = (data: Partial<BaseStats>): BaseStats => {
  return {
    hp: 1,
    str: 1,
    int: 1,
    def: 1,
    stamina: 1,
    ...data,
  };
};

export const buildRace = (data: RaceProps): Race => {
  return {
    name: 'Race',
    height: size(data.sprite?.length ?? 1),
    width: size(data.sprite ? data.sprite[0].length : 1),
    sprite: [],
    ...data,
    stats: buildStats({ ...data.stats }),
    skills: data.skills?.map((skill) => buildSkill(skill)) ?? [],
  };
};
