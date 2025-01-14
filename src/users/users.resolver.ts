import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { GqlAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { UpdateNotificationDto } from 'src/notification/dto/update-notification.input';
import { NotificationDto } from 'src/notification/dto/notification.dto';

  @Resolver(() => User)
  export class UsersResolver {
    constructor(private readonly usersService: UsersService        
  ) {}

  @UseGuards(RolesGuard,GqlAuthGuard)
  @Roles('user','admin') 
  @Query(() => [User])
  async Users(
    @CurrentUser() _currentUser: User,
  ): Promise<User[]> {
    const users =await this.usersService.findAll()
    console.log('Users:', users);
    return users || []
    }


  @Query(() => User)
  @UseGuards(RolesGuard,GqlAuthGuard)
  @Roles('user','admin') 
    async User(   
      @CurrentUser() _currentUser: User,
      @Args('id') id: string): Promise<User> {
      return this.usersService.findOne(id);
    }


  @Mutation(() => User)
  @UseGuards(RolesGuard,GqlAuthGuard)
  @Roles('admin') 
  async createUser(
    @CurrentUser() _currentUser: User, 
    @Args('name') name: string,
    @Args('email') email: string,
    @Args('password') password: string,
  ): Promise<User> {
      return await this.usersService.createUser({ name, email, password });
    }

  @Mutation(() => User)
  @UseGuards(RolesGuard,GqlAuthGuard)
  @Roles('admin') 
  async updateUser(
    @CurrentUser()_CurrentUser:User,
    @Args('id') id: string,
    @Args('updateUserDto') updateUserDto:UpdateUserDto): Promise<User> {
    return this.usersService.update(id,updateUserDto);
  }

 
  @Mutation(() => Boolean)
  @UseGuards(RolesGuard,GqlAuthGuard)
  @Roles('admin') 
    async updatePassword(
      @CurrentUser()_CurrentUser:User,
      @Args('userId') userId: string,
      @Args('newPassword') newPassword: string,
    ): Promise<boolean> {
      await this.usersService.updatePassword(userId, newPassword);
      return true;
  }

  @Mutation(() => Boolean)
  @UseGuards(RolesGuard,GqlAuthGuard)
  @Roles('admin') 
  async removeUser( 
    @CurrentUser()_CurrentUser:User,
    @Args('id') id: string): Promise<boolean> {
    await this.usersService.remove(id);
  
    
    return true;
  }

  @Mutation(() => String)
  @UseGuards(RolesGuard,GqlAuthGuard)
  @Roles('admin') 
  async enablePush(
    @Args('id', { type: () => String }) userId: string,
    @Args('notificationDto') notificationDto: NotificationDto,
  ): Promise<string> {
    await this.usersService.enablePush(userId, notificationDto);
    return 'Push notifications enabled successfully';
  }

  @Mutation(() => String)
  @UseGuards(RolesGuard,GqlAuthGuard)
  @Roles('admin') 
  async disablePush(
    @Args('id', { type: () => String }) userId: string,
    @Args('updateNotificationDto') updateNotificationDto: UpdateNotificationDto,
  ): Promise<string> {
    await this.usersService.disablePush(userId, updateNotificationDto);
    return 'Push notifications disabled successfully';
  }


  }
  

