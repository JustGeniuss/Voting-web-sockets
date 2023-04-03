import { ConfigModule } from "@nestjs/config";
import { Module } from "@nestjs/common";
import { PollsController } from "./polls.controller";




@Module({
    imports: [ConfigModule],
    providers: [],
    controllers: [PollsController]
})

export class PollsModule {}