import { Module } from '@nestjs/common';

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [UsersModule, ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
