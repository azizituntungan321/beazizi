import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
// import { JwtAuthGuard } from './auth/jwt-auth.guard';
// import { APP_GUARD } from '@nestjs/core';
import { WarrantyModule } from './warranty/warranty.module';

@Module({
  imports: [
    ProductModule,
    ConfigModule.forRoot({ envFilePath: `${process.env.NODE_ENV}.env` }), 
    MongooseModule.forRoot('mongodb+srv://mukmin:namasa@beazizi.syf7tfd.mongodb.net/?retryWrites=true&w=majority'), AuthModule, UsersModule, WarrantyModule
  ],
  // imports: [MongooseModule.forRoot('mongodb+srv://mukmin:namasa@cluster0.v3z8xwv.mongodb.net/test'),ProductModule],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtAuthGuard,
    // },
  ],
})
export class AppModule {}