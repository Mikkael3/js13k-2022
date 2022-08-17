type Skill = {
  name: string;
  dmg: number;
};

export type Race = {
  name: string;
  skills: Skill[];
};

export type Class = {
  name: string;
  skills: Skill[];
};

export type Monster = {
  race: Race;
  class: Class;
};
