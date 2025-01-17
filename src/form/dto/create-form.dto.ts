import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  Matches,
} from 'class-validator';

export class CreateFormDto {

  @ApiProperty({ description: 'Last name of the lead' })
  @IsString()
  @IsNotEmpty()
  parentName: string;

  @ApiProperty({ description: 'Last name of the lead' })
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty({ description: 'Email address of the lead' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'Mobile number in E.164 format' })
  @Matches(/^\+?[1-9]\d{1,14}$/, {
    message: 'Mobile number must be in valid E.164 format.',
  })
  @IsNotEmpty()
  mobileNumber: string;

  @ApiProperty({
    description: 'Category of the inquiry',
    enum: ['Daycare', 'Playgroup','Nursery', 'LKG', 'UKG'],
  })
  @IsEnum(['Daycare', 'Playgroup','Nursery', 'LKG', 'UKG'])
  @IsNotEmpty()
  program: string;

  @ApiProperty({
    description: 'Current status or type of the lead',
    enum: [
      'raw',
      'interested',
      'converted',
      'pending',
      'notInterested',
      'visitScheduled',
    ],
    default: 'raw',
  })
  @IsEnum([
    'raw',
    'interested',
    'converted',
    'pending',
    'notInterested',
    'visitScheduled',
    'formFilled',
    'admitted',
  ])
  type: string = 'raw';

  @ApiProperty({ description: 'Child name of the lead' })
  @IsString()
  @IsNotEmpty()
  childName: string;

  @ApiProperty({ description: 'Agreement to receive messages on WhatsApp' })
  @IsNotEmpty()
  isChecked: boolean;
}
