import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PRODUCT_SERVICE } from 'src/config';

@Injectable()
export class ProductsService {

    constructor(

        @Inject(PRODUCT_SERVICE)
        private readonly productsClient: ClientProxy,

    ) {}

    async validateProducts( ids: number[] ) {
        return this.productsClient.send({ cmd: 'validate_products'},  ids );
    }
}
