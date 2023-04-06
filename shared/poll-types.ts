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
  // reanking: Rankings;
  // results: Results;
  hasStarted: boolean;
};

export type Nomination = {
  userID: string;
  text: string;
};

export type Nominations = {
  [nominationId: string]: Nomination;
};
