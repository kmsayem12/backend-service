import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { ErrorMessages } from 'src/common/constants/error.constants';

@Injectable()
export class ProductService {
  constructor(@Inject('PRODUCT_SERVICE') private productClient: ClientProxy) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const response = await firstValueFrom(
        this.productClient.send('product_created', createProductDto),
      );
      if (!response._id) {
        throw new BadRequestException({
          message:
            response.error?.message || ErrorMessages.COMMON.VALIDATION_FAILED,
          details: response.error?.details || {},
        });
      }

      return response;
    } catch (error) {
      console.log(error);
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException(
        error.message || ErrorMessages.PRODUCT.CREATE_FAILED,
      );
    }
  }

  findAll() {
    return `This action returns all product`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    console.log(updateProductDto);
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
