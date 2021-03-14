import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity() 
export class CreditCards {

    @PrimaryGeneratedColumn({ unsigned: true, type: 'int' })
    id!: number;

    @Column({ type: 'int'})
    number!: number

    @Column({ type: 'varchar', length: '5' })
    validTrhu!: string

    @Column({ type: 'decimal', length: '2' })
    SecurityCode!: number
    
    @Column({ type: 'decimal', length: '2' })
    limitValue!: number

    @Column({ type: 'decimal', length: '2' })
    balanceValue!: number

    @Column({ type: 'varchar', length: '2' })
    closingDay!: string
    
    @Column({ type: 'varchar', length: '2' })
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