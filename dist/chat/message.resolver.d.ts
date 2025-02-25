import { MessageService } from './message.service';
import { Message } from './Entity/message.entity';
export declare class MessageResolver {
    private readonly messageService;
    constructor(messageService: MessageService);
    sendMessage(senderId: string, receiverId: string, content: string): Promise<Message>;
    messageSent(receiverId: string): import("graphql-subscriptions/dist/pubsub-async-iterable-iterator").PubSubAsyncIterableIterator<unknown>;
}
