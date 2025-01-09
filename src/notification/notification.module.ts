  import { Module } from '@nestjs/common';
  import { NotificationService } from './notification.service';
  import { TypeOrmModule } from '@nestjs/typeorm';
  import { Notifications } from './entities/notification.entity';
  import { NotificationToken } from './entities/notification-token.entity';
  import { NotificationsResolver } from './notification.resolver';
  import { UsersService } from 'src/users/users.service';
  import { User } from 'src/users/entities/user.entity';

  @Module({
    imports: [
      TypeOrmModule.forFeature([Notifications, NotificationToken,User])],
    providers: [NotificationService,NotificationsResolver,UsersService,],
    exports: [NotificationService,TypeOrmModule]
  })

  export class NotificationModule {} 