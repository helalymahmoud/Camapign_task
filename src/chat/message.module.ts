import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageService } from './message.service';
import { MessageResolver } from './message.resolver';
import { Message } from './Entity/message.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Message])],
  providers: [MessageResolver, MessageService],
})
export class MessageModule {}
