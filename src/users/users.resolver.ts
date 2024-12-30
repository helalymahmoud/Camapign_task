import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Admin') 
  async Users(): Promise<User[]> {
  const users =await this.usersService.findAll();
  return users || []
  }
  

 
  @Query(() => User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('user') 
  async User(
    @Args('id') id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Query(() => User, { nullable: true })
  async validateUser(
    @Args('email') email: string,
    @Args('password') password: string,
  ): Promise<User> {
    return await this.usersService.validateUser(email, password);
  }


  // @Mutation(() => User)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles('Admin') 
  // async createUser(
  //   @Args('createUserDto') createUserDto: CreateUserDto): Promise<User> {
  //   return this.usersService.create(createUserDto);
  // }

 @Mutation(() => User)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles('Admin') 
  async createUser(
    @Args('name') name: string,
    @Args('email') email: string,
    @Args('password') password: string,
  ): Promise<User> {
    return await this.usersService.createUser({ name, email, password });
  }

  @Mutation(() => User)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles('Admin') 
  async updateUser(
    @Args('id') id: string,
    @Args('updateUserDto') updateUserDto:UpdateUserDto): Promise<User> {
    return this.usersService.update(id,updateUserDto);
  }

 
  @Mutation(() => Boolean)
  // @UseGuards(JwtAuthGuard, RolesGuard)
    async updatePassword(
      @Args('userId') userId: string,
      @Args('newPassword') newPassword: string,
    ): Promise<boolean> {
      await this.usersService.updatePassword(userId, newPassword);
      return true;
  }

  @Mutation(() => Boolean)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles('Admin') 
  async removeUser(
    @Args('id') id: string): Promise<boolean> {
    await this.usersService.remove(id);
    return true;
  }

}
function CurrentUser(): (target: UsersResolver, propertyKey: "Users", parameterIndex: 0) => void {
  throw new Error('Function not implemented.');
}

