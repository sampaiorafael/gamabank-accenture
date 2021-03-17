import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
 
@Entity({ name: 'accounts_balance' }) 
export class AccountsBalance {

    @PrimaryGeneratedColumn({ unsigned: true, type: 'int' })
    id!: number;

    @Column({ name: 'account_number', type: 'int' })
    accountNumber!: number | string;

    @Column({ type: 'int', unsigned: true })
    month!: number;

    @Column({ name: 'initial_balance', type: 'decimal' })  
    initialBalance!: number;

    @Column({ name: 'actual_balance', type: 'decimal' }) 
    actualBalance!: number;

    @Column({ name: 'final_balance', type: 'decimal' }) 
    finalBalance!: number;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updatedAt!: Date;
    
};