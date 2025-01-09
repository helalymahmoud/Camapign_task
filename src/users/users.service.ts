import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { NotificationService } from 'src/notification/notification.service';
import { UpdateNotificationDto } from 'src/notification/dto/update-notification.input';
import { NotificationDto } from 'src/notification/dto/notification.dto';
import { CreateUserDto } from './dto/create-user.dto';
import * as firebase from 'firebase-admin';






@Injectable()
export class UsersService {
  unsubscribeFromTopic(tokens: string[], topic: string) {
    throw new Error('Method not implemented.');
  }
  subscribeToTopic(tokens: string[], topic: string) {
    throw new Error('Method not implemented.');
  }

  getUser(username: any): User | PromiseLike<User> {
    throw new Error('Method not implemented.');
  }
  findById(id: any) {
    throw new Error('Method not implemented.');
  }
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


  create(user: CreateUserDto): Promise<User> {
    return this.userRepository.save(user);
  }

  updateProfile = async (user_id: string, update_dto: any): Promise<any> => {
    try {
      const user = await this.userRepository.findOne({
        where: { id: user_id },
      });
      const updated_user = {
        ...user,
        username: update_dto.username,
        email: update_dto.email,
      }
      const saved_user = await this.userRepository.save(updated_user);
      if (saved_user) {
        // send push notification
        await this.notificationService.sendPush(
          updated_user,
          'Profiie update',
          'Your Profile have been updated successfully',
        )
        .catch((e) => {
          console.log('Error sending push notification', e);
        }); 
      }
      return saved_user;
    } catch (error) {
      return error;
    }
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
      // إرسال الإشعار باستخدام firebase-admin
      await firebase.messaging().send({
        notification: message.notification,
        token: token,
        android: {
          priority: 'high',
        },
      });
    } catch (error) {
      console.error('Error sending notification:', error);
      throw new Error('Unable to send notification');
    }
  }
}
