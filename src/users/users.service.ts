import {
  Inject,
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout, catchError } from 'rxjs';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ErrorMessages } from '../common/constants/error.constants';

@Injectable()
export class UsersService {
  constructor(@Inject('USER_SERVICE') private userClient: ClientProxy) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const response = await firstValueFrom(
        this.userClient.send('user_created', createUserDto),
      );

      if (!response.success) {
        throw new BadRequestException({
          message:
            response.error.message || ErrorMessages.USER.VALIDATION_FAILED,
          details: response.error.details,
        });
      }

      return response.data;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException(
        error.message || ErrorMessages.USER.CREATE_FAILED,
      );
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: string) {
    try {
      const response = await firstValueFrom(
        this.userClient.send({ cmd: 'get_user' }, id).pipe(
          timeout(5000),
          catchError((error) => {
            if (error.message.includes('Connection closed')) {
              throw new BadRequestException(
                ErrorMessages.MICROSERVICE.CONNECTION_FAILED,
              );
            }
            throw error;
          }),
        ),
      );

      if (!response.success) {
        throw new NotFoundException(
          response.error.message || ErrorMessages.USER.NOT_FOUND(id),
        );
      }

      return response.data;
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      throw new BadRequestException(ErrorMessages.USER.FETCH_FAILED);
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    console.log(updateUserDto);
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
