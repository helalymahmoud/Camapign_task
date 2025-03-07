import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notifications } from './entities/notification.entity';
import { Repository } from 'typeorm';
import * as firebase from 'firebase-admin';
import * as path from 'path';
import { NotificationToken } from './entities/notification-token.entity';
import { NotificationDto } from './dto/notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.input';
import { ObjectType } from '@nestjs/graphql';


firebase.initializeApp({
  credential: firebase.credential.cert(
    path.join(process.cwd(),'src/config/firebase-admin-sdk.json')
  ),
  });
@ObjectType() 
export class NotificationService {
  constructor(
    @InjectRepository(Notifications) private readonly notificationsRepo: Repository<Notifications>,
    @InjectRepository(NotificationToken) private readonly notificationTokenRepo: Repository<NotificationToken>,
  ) {}


  acceptPushNotification = async (
    user: any,
    notification_dto: NotificationDto , 
  ): Promise<NotificationToken> => {
    await this.notificationTokenRepo.update(
      { user: { id: user.id } },
      {
        status: 'INACTIVE',
      },
    ); 
    const notification_token = await this.notificationTokenRepo.save({
      user: user,
      device_type: notification_dto.device_type, 
      notification_token: notification_dto.notification_token,
      status: 'ACTIVE',
    });
    return notification_token;
  };
  



  disablePushNotification = async (
    user: any,
    update_dto: UpdateNotificationDto,
  ): Promise<void> => {
    try {
      await this.notificationTokenRepo.update(
        { user: { id: user.id }, device_type: update_dto.device_type },
        {
          status: 'INACTIVE',
        },
      );
    } catch (error) {
      return error;
    }
  };


  getNotifications = async (): Promise<any> => {
    return await this.notificationsRepo.find();
  };


  
  sendPush = async (user: any, title: string, body: string): Promise<void> => {
    try {
      const notification = await this.notificationTokenRepo.findOne({
        where: { user: { id: user.id }, status: 'ACTIVE' },
      });
      if (notification) {
        await this.notificationsRepo.save({
          notification_token: notification,
          title,
          body,
          status: 'ACTIVE',
          created_by: user.username,
        });
        await firebase
          .messaging()
          .send({
            notification: { title, body },
            token: notification.notification_token,
            android: { priority: 'high' },
          })
          .catch((error: any) => {
            console.error(error);
          });
      }
    } catch (error) {
      return error;
    }
  }


 
}