import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class FeeReceiptGenerate {
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    customId: string;

    @Column({ type: 'varchar', length: 255, nullable: true, default: '0' })
    firstInstallment?: string;

    @Column({ type: 'date', nullable: true })
    firstInstallmentDate?: Date;

    @Column({ type: 'varchar', length: 255, nullable: true, default: '0' })
    secondInstallment?: string;

    @Column({ type: 'date', nullable: true })
    secondInstallmentDate?: Date;

    @Column({ type: 'varchar', length: 255, nullable: true, default: '0' })
    thirdInstallment?: string;

    @Column({ type: 'date', nullable: true })
    thirdInstallmentDate?: Date;
}
