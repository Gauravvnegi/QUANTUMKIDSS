import { IsString, IsEmail, IsMobilePhone, IsNotEmpty, IsNumberString } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FeeReceiptSchema {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  childName: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  email: string;
  
  @Column({ type: 'varchar', length: 15, nullable: false })
  parentName: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  program: string;
  
  @Column({ type: 'varchar', length: 15, nullable: false })
  mobileNumber: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  totalYearlyPayment: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  firstInstallment: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  secondInstallment: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  thirdInstallment: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  customId: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  applicantId: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  pendingFee: string;
}
