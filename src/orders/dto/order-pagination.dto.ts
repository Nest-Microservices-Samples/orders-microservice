import { IsEnum, IsOptional } from "class-validator";
import { PaginationDto } from "src/common";
import { OrderStatusList } from "../enum/order.enum";
import { OrderStatus } from "@prisma/client";

export class OrderPaginationDto extends PaginationDto {

    @IsOptional()
    @IsEnum( OrderStatus, {
        message: `Valid status are ${OrderStatusList.join(', ')}`
    })
    status: OrderStatus;
}