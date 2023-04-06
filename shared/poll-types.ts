export interface Participants {
  [participantId: string]: string;
}

export interface Poll {
  id: string;
  topic: string;
  votesPerVoter: number;
  participants: Participants;
  adminID: string;
  // nominations: Nominations;
  // reanking: Rankings;
  // results: Results;
  hasStarted: boolean;
}
