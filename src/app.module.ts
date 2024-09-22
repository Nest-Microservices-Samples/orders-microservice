import { Module } from '@nestjs/common';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';


@Module({
  imports: [OrdersModule, ProductsModule],
})
export class AppModule {}
