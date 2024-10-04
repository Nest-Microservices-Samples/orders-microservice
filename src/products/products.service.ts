import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { NATS_SERVICE } from 'src/config';

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
}
