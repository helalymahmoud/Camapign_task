import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { NotificationService } from './notification.service';

@Resolver()
export class NotificationResolver {
  constructor(private readonly notificationService: NotificationService) {}

  @Mutation(() => String)
  async sendNotification(
    @Args('fcmToken') fcmToken: string,
    @Args('title') title: string,
    @Args('body') body: string,
  ): Promise<string> {
    await this.notificationService.sendPushNotification(fcmToken, title, body);
    return 'Notification sent!';
  }
}
  