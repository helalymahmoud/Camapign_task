import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { GqlAuthGuard } from 'src/auth/guards/jwt-auth.guard';

  @Resolver(() => User)
  export class UsersResolver {
    constructor(private readonly usersService: UsersService
              
  ) {}
  // @UseGuards(GqlAuthGuard)  
  // @Roles('admin')
  @Query(() => [User])
  async Users(): Promise<User[]> {
  const users =await this.usersService.findAll();
  return users || []
  }
  

  @Query(() => User)
  @UseGuards(JwtStrategy)
  @Roles('user','admin') 
  async User(
    @Args('id') id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

 @Mutation(() => User)
  @UseGuards(GqlAuthGuard)
  @Roles('Admin') 
  async createUser(
    @Args('name') name: string,
    @Args('email') email: string,
    @Args('password') password: string,
  ): Promise<User> {
    return await this.usersService.createUser({ name, email, password });
  }

  @Mutation(() => User)
  @UseGuards(JwtStrategy)
  @Roles('Admin') 
  async updateUser(
    @Args('id') id: string,
    @Args('updateUserDto') updateUserDto:UpdateUserDto): Promise<User> {
    return this.usersService.update(id,updateUserDto);
  }

 
  @Mutation(() => Boolean)
  @UseGuards(JwtStrategy)
  @Roles("admin","user")  
    async updatePassword(
      @Args('userId') userId: string,
      @Args('newPassword') newPassword: string,
    ): Promise<boolean> {
      await this.usersService.updatePassword(userId, newPassword);
      return true;
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtStrategy)
  @Roles('Admin') 
  async removeUser(
    @Args('id') id: string): Promise<boolean> {
    await this.usersService.remove(id);
    return true;
  }

  }
  

