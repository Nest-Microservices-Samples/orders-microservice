import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { PRODUCT_SERVICE } from 'src/config';

@Injectable()
export class ProductsService {

    constructor(

        @Inject(PRODUCT_SERVICE)
        private readonly productsClient: ClientProxy,

    ) {}

    async validateProducts( ids: number[] ) {

        try {

            const products = await firstValueFrom(
                this.productsClient.send({ cmd: 'validate_products'},  ids )
            );

            return products;

        } catch (error) {

            throw new RpcException({
                status: HttpStatus.BAD_REQUEST,
                message: error,
            });
        }
    }
}
