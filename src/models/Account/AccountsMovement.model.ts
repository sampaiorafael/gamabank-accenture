import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
 
@Entity({name: 'accounts_movement'}) 
export class AccountsMovement {

    @PrimaryGeneratedColumn({ unsigned: true, type: 'int' })
    id!: number;

    @Column({ name: 'account_number', type: 'int' })
    accountNumber!: number;

    @Column({ type: 'decimal' })
    value!: number;

    @Column({ type: 'varchar', length: '20' })
    type!: string;

    @Column({ type: 'varchar', length: '255' })
    description!: string;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updatedAt!: Date;
    
};