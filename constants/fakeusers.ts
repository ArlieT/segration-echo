export type TUsers = {
  username: string;
  scores: {
    paper: number;
    can: number;
    plastic: number;
  };
};
export const users: TUsers[] = [
  {
    username: "test1",
    scores: {
      paper: 12,
      can: 32,
      plastic: 22,
    },
  },
  {
    username: "test2",
    scores: {
      paper: 12,
      can: 123,
      plastic: 4,
    },
  },
  {
    username: "test3",
    scores: {
      paper: 12,
      can: 1,
      plastic: 4,
    },
  },
  {
    username: "test4",
    scores: {
      paper: 32,
      can: 21,
      plastic: 4,
    },
  },
];
