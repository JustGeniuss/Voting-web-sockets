export type Participants = {
  [participantId: string]: string;
};

export type Poll = {
  id: string;
  topic: string;
  votesPerVoter: number;
  participants: Participants;
  adminID: string;
  nominations: Nominations;
  rankings: Rankings;
  // results: Results;
  hasStarted: boolean;
};

export type Nomination = {
  userID: string;
  text: string;
};

type nominationID = string;

export type Rankings = {
  [userID: string]: nominationID[];
};




export type Nominations = {
  [nominationId: nominationID]: Nomination;
};
