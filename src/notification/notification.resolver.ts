import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from 'src/users/users.service';
import { NotificationService } from './notification.service';

@Resolver()
export class NotificationsResolver {
  constructor(private readonly usersService: UsersService,
              private readonly notification:NotificationService
  ) {}

  @Mutation(() => String)
  async sendNotification(
    @Args('token') token: string,
    @Args('title') title: string,
    @Args('body') body: string,
  ): Promise<string> {
    const message = {
      notification: {
        title,
        body,
      },
      token,
    };

    await this.usersService.sendNotification(token, message);
    return 'Notification sent successfully';
  }

  @Mutation(() => String)
  async subscribeToTopic(
    @Args('tokens', { type: () => [String] }) tokens: string[],
    @Args('topic') topic: string,
  ): Promise<string> {
    await this.usersService.subscribeToTopic(tokens, topic);
    return `Subscribed to topic: ${topic}`;
  }

  @Mutation(() => String)
  async unsubscribeFromTopic(
    @Args('tokens', { type: () => [String] }) tokens: string[],
    @Args('topic') topic: string,
  ): Promise<string> {
    await this.usersService.unsubscribeFromTopic(tokens, topic);
    return `Unsubscribed from topic: ${topic}`;
  }
}
