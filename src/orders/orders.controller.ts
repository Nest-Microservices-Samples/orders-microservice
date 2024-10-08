import { Controller, ParseUUIDPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { OrdersService } from './orders.service';
import { ChangeOrderStatusDto, CreateOrderDto, OrderPaginationDto } from './dto';
import { ProductsService } from 'src/products/products.service';

@Controller()
export class OrdersController {

  constructor(

    private readonly ordersService: OrdersService,
    private readonly productsService: ProductsService,

  ) {}

  @MessagePattern('createOrder')
  async create(@Payload() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @MessagePattern('findAllOrders')
  findAll( @Payload() orderPaginationDto: OrderPaginationDto ) {
    return this.ordersService.findAll( orderPaginationDto );
  }

  @MessagePattern('findOneOrder')
  findOne( @Payload( 'id', ParseUUIDPipe ) id: string ) {
    return this.ordersService.findOne( id );
  }

  @MessagePattern('changeOrderStatus')
  changeOrderStatus( @Payload() changeOrderStatusDto: ChangeOrderStatusDto ) {
    return this.ordersService.changeStatus( changeOrderStatusDto );
  }
}
