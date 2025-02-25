import { User } from 'src/users/entities/user.entity';
export declare class Message {
    id: string;
    senderId: string;
    receiverId: string;
    content: string;
    createdAt: Date;
    sender: User;
    receiver: User;
}
