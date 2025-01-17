import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { FormModule } from './form/form.module';
import { AdminModule } from './admin/admin.module';
import { TeamAddModule } from './AddTeam/team.add.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './admin/schema/admin.schema';
import { NewsEventModule } from './news_events/news_events.module';
import { PictureGalleryModule } from './picture_gallery/picture_gallery.module';
import { NewsEvent } from './news_events/schema/news_events.entity';
import { Picture } from './picture_gallery/schema/picture_gallery.entity';
import { Form } from './form/schema/form.schema';
import { AddTeam } from './AddTeam/schema/teamAdd.schema';
import StudentForm from './form/schema/inqueryschema';
import FeeManagement from './form/schema/feeManagement';
import { FeeReceiptSchema } from './form/schema/Fee.receipt.schema';
import { FeeReceiptGenerateModule } from './fee-receipt-generate/fee-receipt-generate.module';
import { FeeReceiptGenerate } from './fee-receipt-generate/entities/fee-receipt-generate.entity';



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '208.109.214.146',
      port: 3306, 
      username: 'developersqk_2025',
      password: 'QuantumKids@2025!',
      database: 'quantumkids',
      entities: [Form,FeeReceiptSchema,,FeeReceiptGenerate,FeeManagement,StudentForm,AddTeam,Admin,NewsEvent,Picture, __dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    FormModule,
    AdminModule,
    NewsEventModule,
    PictureGalleryModule,
    TeamAddModule,
    FeeReceiptGenerateModule,
    FeeReceiptGenerateModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {} 