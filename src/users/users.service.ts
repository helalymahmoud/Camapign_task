import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { NotificationService } from 'src/notification/notification.service';
import { UpdateNotificationDto } from 'src/notification/dto/update-notification.input';
import { NotificationDto } from 'src/notification/dto/notification.dto';
import * as firebase from 'firebase-admin';
import { Token } from 'graphql';

@Injectable()
export class UsersService {
 
  constructor(@InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly notificationService: NotificationService,
  ){}

  async createUser(data: { name: string; email: string; password: string }): Promise<User> {
      const hashedPassword = await bcrypt.hash(data.password, 10); 
      const user = this.userRepository.create({
        ...data,
        password: hashedPassword,  
      });   
      return await this.userRepository.save(user);
    }

  async findByEmail(email: string): Promise<User> {
      return await this.userRepository.findOne({ where: { email } });
    }

  async updatePassword(userId: string, newPassword: string): Promise<User> {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await this.userRepository.update(userId, { password: hashedPassword });
      return await this.userRepository.findOne({where:{userId}});
    }

  async findAll(): Promise<User[]> {
    return this.userRepository.find({ relations: ['joinedCampaigns'] });
  }
  
  async findOne(id: string): Promise<User> {
    return this.userRepository.findOne({ where: { id }, relations: ['joinedCampaigns'] });
 
  } 

  async update(id: string, UpdateUserDto): Promise<User> {
    await this.userRepository.update(id,UpdateUserDto);
    return this.findOne(id);
  }
  

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  
  enablePush = async (
    user_id: string,
     update_dto: NotificationDto,
   ): Promise<any> => {
     const user = await this.userRepository.findOne({
       where: { id: user_id },
     });
     return await this.notificationService.acceptPushNotification(
       user,
       update_dto,
     );
   };


   disablePush = async (
    user_id: string,
    update_dto: UpdateNotificationDto,
  ): Promise<any> => {
    const user = await this.userRepository.findOne({
      where: { id: user_id },
    });
    return await this.notificationService.disablePushNotification(
      user,
      update_dto,
    );
  };


  getPushNotifications = async (): Promise<any> => {
    
    return await this.notificationService.getNotifications();
  };


  async sendNotification(token: string, message: any): Promise<void> {
    try {
      if (!token || !message.notification || !message.notification.title || !message.notification.body) {
        throw new Error('Invalid token or message structure');
      }

      await firebase.messaging().send({
        notification: message.notification,
        token: token,
        android: {
          priority: 'high',
        },
      });

      console.log('Notification sent successfully');
    } catch (error) {
      console.error('Error sending notification:', error.message);
      throw new Error(`Unable to send notification: ${error.message}`);
    }
  }


  async subscribeToTopic(tokens: string[], topic: string): Promise<void> {
    try {
      if (!tokens.length || !topic) {
        throw new Error('Tokens or topic not provided');
      }

      const response = await firebase.messaging().subscribeToTopic(tokens, topic);

      console.log(`Successfully subscribed to topic: ${topic}`);
      console.log('Firebase response:', response);
    } catch (error) {
      console.error('Error subscribing to topic:', error.message);
      throw new Error(`Unable to subscribe to topic: ${error.message}`);
    }
  }

  
  async unsubscribeFromTopic(tokens: string[], topic: string): Promise<void> {
    try {
      if (!tokens.length || !topic) {
        throw new Error('Tokens or topic not provided');
      }

      const response = await firebase.messaging().unsubscribeFromTopic(tokens, topic);

      console.log(`Successfully unsubscribed from topic: ${topic}`);
      console.log('Firebase response:', response);
    } catch (error) {
      console.error('Error unsubscribing from topic:', error.message);
      throw new Error(`Unable to unsubscribe from topic: ${error.message}`);
    }
  }
}


