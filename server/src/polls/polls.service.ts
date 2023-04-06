import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Poll } from 'shared';
import { createPollID, createUserID, createNominationID } from 'src/ids';
import { PollsRepository } from './polls.repository';
import {
  AddNominationsFields,
  AddParticipantFields,
  CreatePollFields,
  JoinPollFields,
  RejoinPollFields,
} from './types';

@Injectable()
export class PollsService {
  private readonly logger = new Logger(PollsService.name);
  constructor(
    private readonly pollsRepository: PollsRepository,
    private readonly jwtService: JwtService,
  ) {}

  async createPoll(fields: CreatePollFields) {
    const pollID = createPollID();
    const userID = createUserID();

    const createdPoll = await this.pollsRepository.createPoll({
      ...fields,
      userID,
      pollID,
    });

    this.logger.debug(
      `Creating token string for pollID: ${createdPoll.id} and userID ${userID} `,
    );

    const signedString = this.jwtService.sign(
      {
        pollID: createdPoll.id,
        name: fields.name,
      },
      {
        subject: userID,
      },
    );

    return {
      poll: createdPoll,
      AccessToken: signedString,
    };
  }

  async joinPoll(fields: JoinPollFields) {
    const userID = createUserID();

    this.logger.debug(
      `Fetching poll with ID: ${fields.pollID} for user with ID: ${userID}`,
    );

    const joinedPoll = await this.pollsRepository.getPoll(fields.pollID);

    this.logger.log(fields);

    this.logger.debug(
      `Creating token string for pollID: ${joinedPoll.id} and userID: ${userID}`,
    );

    const signedString = this.jwtService.sign(
      {
        pollID: joinedPoll.id,
        name: fields.name,
      },
      {
        subject: userID,
      },
    );

    return {
      poll: joinedPoll,
      accessToken: signedString,
    };
  }

  async rejoinPoll(fields: RejoinPollFields) {
    this.logger.debug(`
    Rejoining poll with ID: ${fields.pollID} for user with ID: ${fields.userID} with name: ${fields.name}`);

    const joinedPoll = await this.pollsRepository.addParicipant(fields);

    return joinedPoll;
  }

  async addParticipant(addParicipant: AddParticipantFields): Promise<Poll> {
    return this.pollsRepository.addParicipant(addParicipant);
  }

  async removeParticipant(
    pollID: string,
    userID: string,
  ): Promise<Poll | void> {
    const poll = await this.pollsRepository.getPoll(pollID);

    if (!poll.hasStarted) {
      const updatedPoll = await this.pollsRepository.removeParticipant(
        pollID,
        userID,
      );
      return updatedPoll;
    }
  }

  async getPoll(pollID: string): Promise<Poll> {
    return this.pollsRepository.getPoll(pollID);
  }

  async addNomination({
    pollID,
    userID,
    text,
  }: AddNominationsFields): Promise<Poll> {
    return this.pollsRepository.addNomination({
      pollID,
      nominationID: createNominationID(),
      nomination: {
        text,
        userID,
      },
    });
  }

  async removeNomination(pollID: string, nominationID: string): Promise<Poll> {
    return this.pollsRepository.removeNomination(pollID, nominationID);
  }
}
