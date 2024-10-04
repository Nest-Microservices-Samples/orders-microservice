import { HttpStatus, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { PrismaClient } from '@prisma/client';
import { RpcException } from '@nestjs/microservices';
import { ChangeOrderStatusDto, OrderPaginationDto } from './dto';
import { ProductsService } from 'src/products/products.service';


@Injectable()
export class OrdersService extends PrismaClient implements OnModuleInit {

  private readonly logger = new Logger('OrdersService');

  constructor(

    private readonly productsService: ProductsService,

  ) {
    super();
  }


  async onModuleInit() {
    await this.$connect();
    this.logger.log('Database connected');
  }


  async create(createOrderDto: CreateOrderDto) {

    try {

      const productsIds = createOrderDto.items.map( item => item.productId );

      // Confirm that all products are valid.
      const products: any[] = await this.productsService.validateProducts( productsIds );

      // Calculation of values.
      const totalAmount = createOrderDto.items.reduce( ( acc, orderItem ) => {

        const price = products.find(
          product => product.id === orderItem.productId,
        ).price;

        return ( price * orderItem.quantity ) + acc;

      }, 0 );

      const totalItems = createOrderDto.items.reduce( ( acc, orderItem ) => {
        return orderItem.quantity + acc;
      }, 0 );

      // Create a database transaction.
      const order = await this.order.create({
        data: {
          totalAmount,
          totalItems,
          OrderItem: {
            createMany: {
              data: createOrderDto.items.map( ( orderItem ) => ({
                price: products.find(
                  ( product ) => product.id === orderItem.productId
                ).price,
                productId: orderItem.productId,
                quantity: orderItem.quantity,
              }))
            }
          }
        },
        include: {
          OrderItem: {
            select: {
              price: true,
              quantity: true,
              productId: true,

            }
          }
        },
      })

      return {
        ...order,
        OrderItem: order.OrderItem.map( ( orderItem ) => ({
          ...orderItem,
          name: products.find(
            ( product ) => product.id === orderItem.productId ).name,
        })),
      };

    } catch (error) {

      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: 'Check logs',
      })
    }
  }


  async findAll( orderPaginationDto: OrderPaginationDto ) {

    const totalPages = await this.order.count({
      where: { status: orderPaginationDto.status}
    })

    const currentPage = orderPaginationDto.page;;
    const perPage = orderPaginationDto.limit;

    return {
      data: await this.order.findMany({
        skip: ( currentPage - 1 ) * perPage,
        take: perPage,
        where: {
          status: orderPaginationDto.status
        }
      }),
      meta: {
        total: totalPages,
        page: currentPage,
        lastPage: Math.ceil( totalPages / perPage ),
      }
    }
  }


  async findOne( id: string ) {

    const order = await this.order.findFirst({
      where: { id },
      include: {
        OrderItem: {
          select: {
            price: true,
            quantity: true,
            productId: true,
          }
        }
      }
    });

    if ( !order ) {

      throw new RpcException({
        status: HttpStatus.NOT_FOUND,
        message: `Order with id ${ id } not found`,
      })
    }

    const productsIds = order.OrderItem.map( ( orderItem ) => orderItem.productId );
    const products: any[] = await this.productsService.validateProducts( productsIds );

    return {
      ...order,
      OrderItem: order.OrderItem.map( ( orderItem ) => ({
        ...orderItem,
        name: products.find(
          ( product ) => product.id === orderItem.productId ).name,
      }))
    }

  }


  async changeStatus( changeOrderStatusDto: ChangeOrderStatusDto) {

    const { id, status } = changeOrderStatusDto;

    const order = await this.findOne( id );

    if ( order.status === status ) {
      return order;
    }

    return this.order.update({
      where: { id },
      data: { status },
    })
  }

}
