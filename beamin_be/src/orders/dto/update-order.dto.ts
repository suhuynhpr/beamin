import { IsOptional, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { statusOrder } from '@prisma/client';

export class UpdateOrderDto {
    @ApiProperty({ description: 'Trạng thái đơn hàng', enum: statusOrder })
    @IsEnum(statusOrder)
    @IsOptional()
    status?: statusOrder;
}
