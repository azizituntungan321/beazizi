import { Module } from '@nestjs/common';
import { WarrantyService } from './warranty.service';
import { WarrantyController } from './warranty.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { WarrantySchema } from './schemas/warranty.schemas';

@Module({
  providers: [WarrantyService],
  exports: [WarrantyService],
  imports: [MongooseModule.forFeature([{ name: 'Warranty', schema: WarrantySchema }])],
  controllers: [WarrantyController]
})
export class WarrantyModule {}
