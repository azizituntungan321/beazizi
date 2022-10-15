import { Module } from '@nestjs/common';
import { WarrantyService } from './warranty.service';
import { WarrantyController } from './warranty.controller';

@Module({
  providers: [WarrantyService],
  controllers: [WarrantyController]
})
export class WarrantyModule {}
