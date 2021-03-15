import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
 
@Entity({name: 'accounts_movement'}) 
export class AccountsMovement {

    @PrimaryGeneratedColumn({ unsigned: true, type: 'int' })
    id!: number;

    @Column({ name: 'account_number', type: 'int' })
    accountNumber!: number;

    @Column({ type: 'varchar', length: '50' })
    type!: string;

    @Column({ type: 'int' })
    value!: number;

    @Column({ type: 'date' })
    date!: Date;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt!: Date

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updatedAt!: Date
    
}