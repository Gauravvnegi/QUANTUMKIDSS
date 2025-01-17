import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class EnqueryFormDto {
  @ApiProperty({ description: 'Child name of the lead' })
  @IsString()
  @IsNotEmpty()
  childName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  addmissionYear: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  primaryContactName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  mobileNumber: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  customId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  program: string;

}
