import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity() 
export class CreditCards {

    @PrimaryGeneratedColumn({ unsigned: true, type: 'int' })
    id!: number;

    @Column({ type: 'int'})
    number!: number

    @Column({ type: 'varchar', length: '5' })
    validTrhu!: string

    @Column({ type: 'decimal' })
    securityCode!: number
    
    @Column({ type: 'decimal' })
    limitValue!: number

    @Column({ type: 'decimal' })
    balanceValue!: number

    @Column({ type: 'varchar' })
    closingDay!: string
    
    @Column({ type: 'varchar' })
    dueDay!: string

    @Column({ type: 'int' })
    emitter!: number

    @Column({ type: 'int' })
    client!: number
   
    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt!: Date

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updatedAt!: Date
    
}