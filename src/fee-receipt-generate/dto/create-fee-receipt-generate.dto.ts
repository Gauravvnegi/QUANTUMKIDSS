import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsDateString } from 'class-validator';

export class CreateFeeReceiptGenerateDto {
  @ApiProperty({
    description: 'Unique custom ID for the fee receipt',
  })
  @IsString()
  @IsNotEmpty()
  customId: string;

  @ApiProperty({
    description: 'Amount of the first installment',
    required: false,
  })
  @IsString()
  @IsOptional()
  firstInstallment?: string;

  @ApiProperty({
    description: 'Date when the first installment was made',
    required: false,
    type: String,
    format: 'date',
  })
  @IsDateString()
  @IsOptional()
  firstInstallmentDate?: string;

  @ApiProperty({
    description: 'Amount of the second installment',
    required: false,
  })
  @IsString()
  @IsOptional()
  secondInstallment?: string;

  @ApiProperty({
    description: 'Date when the second installment was made',
    required: false,
    type: String,
    format: 'date',
  })
  @IsDateString()
  @IsOptional()
  secondInstallmentDate?: string;

  @ApiProperty({
    description: 'Amount of the third installment',
    required: false,
  })
  @IsString()
  @IsOptional()
  thirdInstallment?: string;

  @ApiProperty({
    description: 'Date when the third installment was made',
    required: false,
    type: String,
    format: 'date',
  })
  @IsDateString()
  @IsOptional()
  thirdInstallmentDate?: string;
}
