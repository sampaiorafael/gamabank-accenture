import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
 
@Entity() 
export class BalanceAccount {

    @PrimaryGeneratedColumn({ unsigned: true, type: 'int' })
    id!: number;

    @Column({ name: 'number', type: 'int', unique: true })
    acountId!: number

    @Column({ type: 'varchar', length: '45' })
    monthYear!: string

    @Column({ type: 'decimal' })  
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