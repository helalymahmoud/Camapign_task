import { Repository } from 'typeorm';
import { Message } from './Entity/message.entity';
export declare class MessageService {
    private readonly messageRepository;
    constructor(messageRepository: Repository<Message>);
    createMessage(senderId: string, receiverId: string, content: string): Promise<Message>;
    getMessagesBetweenUsers(user1Id: string, user2Id: string): Promise<Message[]>;
}
