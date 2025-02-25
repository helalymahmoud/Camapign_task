import { Resolver, Mutation, Args, Subscription } from '@nestjs/graphql';
import { MessageService } from './message.service';
import { PubSub } from 'graphql-subscriptions';
import { Message } from './Entity/message.entity';

const pubSub = new PubSub();

@Resolver(() => Message)
export class MessageResolver {
  constructor(private readonly messageService: MessageService) {}

  @Mutation(() => Message)
  async sendMessage(
    @Args('senderId') senderId: string,
    @Args('receiverId') receiverId: string,
    @Args('content') content: string,
  ): Promise<Message> {
    const message = await this.messageService.createMessage(senderId, receiverId, content);
    pubSub.publish('MESSAGE_SENT', { messageSent: message });
    return message;
  }

  @Subscription(() => Message, {
    filter: (payload, variables) => {
      return (
        payload.messageSent.receiverId === variables.receiverId ||
        payload.messageSent.senderId === variables.receiverId
      );
    },
  })
  messageSent(@Args('receiverId') receiverId: string) {
    return pubSub.asyncIterableIterator('MESSAGE_SENT');
  }
}
