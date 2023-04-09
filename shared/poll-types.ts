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
  results: Results;
  hasStarted: boolean;
};

export type Nomination = {
  userID: string;
  text: string;
};

type NominationID = string;

export type Rankings = {
  [userID: string]: NominationID[];
};

export type Results = Array<{
  nominationID: NominationID;
  nominationText: string;
  score: number;
}>;

export type Nominations = {
  [nominationId: NominationID]: Nomination;
};
