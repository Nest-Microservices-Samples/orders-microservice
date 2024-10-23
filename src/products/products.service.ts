import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { NATS_SERVICE } from 'src/config';
import { OrderWithProducts } from 'src/orders/interfaces/order-with-products.interface';

@Injectable()
export class ProductsService {

    constructor(

        @Inject(NATS_SERVICE)
        private readonly client: ClientProxy,

    ) { }

    async validateProducts(ids: number[]) {

        try {

            const products = await firstValueFrom(
                this.client.send({ cmd: 'validate_products' }, ids)
            );

            return products;

        } catch (error) {

            throw new RpcException({
                status: HttpStatus.BAD_REQUEST,
                message: error,
            });
        }
    };


    async createPaymentSession(order: OrderWithProducts) {

        const paymentSession = await firstValueFrom(
            this.client.send('create.payment.session', {
                orderId: order.id,
                currency: 'usd',
                items: order.OrderItem.map( item => ({
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                }))
            })
        )


        return paymentSession;
    }

}
