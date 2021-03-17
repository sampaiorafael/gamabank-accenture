import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'accounts' })
export class Accounts {

    @PrimaryGeneratedColumn({ unsigned: true, type: 'int' })
    id!: number;

    @Column({ name: 'id_user', type: 'int', unique: true })
    idUser!: number;

    @Column({ name: 'bank_code', type: 'int' })
    bankCode!: number;

    @Column({ type: 'int', zerofill: true })
    agency!: number;

    @Column({ name: 'account_number', type: 'varchar', length: '255', unique: true, zerofill: true })
    accountNumber!: number;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updatedAt!: Date;
    
};