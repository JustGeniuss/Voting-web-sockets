import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { PollsController } from './polls.controller';
import { PollsService } from './polls.service';
import { redisModule } from 'src/modules.config';

@Module({
  imports: [ConfigModule, redisModule],
  providers: [PollsService],
  controllers: [PollsController]
})
export class PollsModule {}
