type Skill = {
  name: string;
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
