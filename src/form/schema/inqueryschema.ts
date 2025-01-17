import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Form } from './form.schema';

@Entity()
class StudentForm {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  childName: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  addmissionYear: string;
  
  @Column({ type: 'varchar', length: 15, nullable: false })
  primaryContactName: string;

  @Column({ type: 'varchar', length: 15, nullable: false })
  mobileNumber: string;

  @Column({ type: 'varchar', length: 15, nullable: false })
  parentName: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  program: string;

  @CreateDateColumn()
  submittedAt: Date;

  @Column({ type: 'varchar', length: 255, nullable: false })
  customId: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  applicantId: string;

  @Column({ type: 'boolean', nullable: false })
  isChecked: boolean;
}

export default StudentForm;
