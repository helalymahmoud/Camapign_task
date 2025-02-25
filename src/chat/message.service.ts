import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './Entity/message.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}

  async createMessage(senderId: string, receiverId: string, content: string): Promise<Message> {
    const newMessage = this.messageRepository.create({ senderId, receiverId, content });
    return await this.messageRepository.save(newMessage);
  }

  async getMessagesBetweenUsers(user1Id: string, user2Id: string): Promise<Message[]> {
    return await this.messageRepository.find({
      where: [
        { senderId: user1Id, receiverId: user2Id },
        { senderId: user2Id, receiverId: user1Id },
      ],
      order: { createdAt: 'ASC' },
    });
  }
}
