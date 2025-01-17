import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Form {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  parentName: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  location: string;

  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 15, nullable: false, unique: true })
  mobileNumber: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  childName: string;

  @Column({ type: 'boolean', nullable: false })
  isChecked: boolean;

  @Column({ type: 'enum', enum: ['Daycare', 'Playgroup','Nursery', 'LKG', 'UKG'], nullable: false })
  program: string;

  @CreateDateColumn()
  submittedAt: Date;

  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  customId: string;

  @Column({
    type: 'enum',
    enum: ['raw', 'interested', 'FollowUp', 'visitScheduled', 'converted', 'notInterested',"formFilled","admitted"],
    default: 'raw',
  })
  status: string;
}