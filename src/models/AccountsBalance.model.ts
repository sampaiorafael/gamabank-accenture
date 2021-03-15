import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
 
@Entity({name: 'accounts_balance'}) 
export class AccountsBalance {

    @PrimaryGeneratedColumn({ unsigned: true, type: 'int' })
    id!: number;

    @Column({ name: 'account_id', type: 'int' })
    acountId!: number

    @Column({ name: 'month_year', type: 'varchar', length: '45' })
    monthYear!: string

    @Column({ name: 'inicital_balance', type: 'decimal' })  
    initialBalance!: number

    @Column({ type: 'decimal' }) 
    actualBalance!: number

    @Column({ type: 'decimal' }) 
    finalBalance!: number

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt!: Date

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updatedAt!: Date
    
}