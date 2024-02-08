import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { UsersGuard } from './users.guard';
import { GetAccount } from 'src/auth/get-account.decorator';
import { Accounts } from 'src/auth/accounts.entity';
import { UsersService } from './users.service';
import { Users } from './users.entity';
import { UpdateUserDto } from './dto/update-users.dto';

@ApiTags('users')
@Controller('users')
@UseGuards(AuthGuard(), UsersGuard)
export class UsersController {

    constructor(private usersService: UsersService) {

    }

    @Get()
    getUser(@GetAccount() account: Accounts): Promise<Users> {
        return this.usersService.getUser(account);
    }

    @Post()
    updateUser(@GetAccount() account: Accounts, userDto: UpdateUserDto): Promise<Users> {
        return this.updateUser(account, userDto)
    }
}
