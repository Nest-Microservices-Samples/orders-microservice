import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  imports: [NatsModule],
  providers: [ProductsService],
  exports: [ProductsService]

})
export class ProductsModule {}
