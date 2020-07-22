import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import { DataBaseConfiguration } from 'config/database.configuration';
import { Admin } from 'entities/Admin';
import { AdminService } from './services/admin/admin.service';
import { AdminController } from './controllers/api/admin.controller';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: DataBaseConfiguration.hostname,
      port: 3306,
      username: DataBaseConfiguration.username,
      password: DataBaseConfiguration.password,
      database: DataBaseConfiguration.database,
      entities: [Admin]
    }),
    TypeOrmModule.forFeature([Admin])
    
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AppModule {}
