import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { GqlAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { Role } from 'src/auth/role.enum';
import { RolesGuard } from 'src/auth/guards/role.guard';

  @Resolver(() => User)
  export class UsersResolver {
    constructor(private readonly usersService: UsersService
              
  ) {}

  @Roles(Role.User)
  @Query(() => [User])
  // @UseGuards(RolesGuard)  
  @UseGuards(GqlAuthGuard)  
  async Users(
    @CurrentUser() _currentUser: User,
  ): Promise<User[]> {
    const users =await this.usersService.findAll()
    // console.log('Users:', users);
 
    return users || []
    }
  

  @Query(() => User)
  @UseGuards(RolesGuard)
  @Roles(Role.Admin) 
  async User(   
    @CurrentUser() _currentUser: User,
    @Args('id') id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

@Mutation(() => User)
@UseGuards(GqlAuthGuard)
@Roles(Role.Admin)  
async createUser(
  @CurrentUser() _currentUser: User, 
  @Args('name') name: string,
  @Args('email') email: string,
  @Args('password') password: string,
): Promise<User> {
  if (_currentUser.roles.includes('admin')) {
    return await this.usersService.createUser({ name, email, password });
  }

  throw new Error('You do not have permission to create a user');
}
  @Mutation(() => User)
  @UseGuards(JwtStrategy)
  @Roles(Role.Admin) 
  async updateUser(
    @CurrentUser()_CurrentUser:User,
    @Args('id') id: string,
    @Args('updateUserDto') updateUserDto:UpdateUserDto): Promise<User> {
    return this.usersService.update(id,updateUserDto);
  }

 
  @Mutation(() => Boolean)
  @UseGuards(JwtStrategy)
  @Roles(Role.Admin)  
    async updatePassword(
      @CurrentUser()_CurrentUser:User,
      @Args('userId') userId: string,
      @Args('newPassword') newPassword: string,
    ): Promise<boolean> {
      await this.usersService.updatePassword(userId, newPassword);
      return true;
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtStrategy)
  @Roles(Role.Admin) 
  async removeUser(
    @CurrentUser()_CurrentUser:User,
    @Args('id') id: string): Promise<boolean> {
    await this.usersService.remove(id);
    return true;
  }

  }
  

