import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Timestamp } from 'typeorm';

@Entity() 
export class Invoice {

    @PrimaryGeneratedColumn({ unsigned: true, type: 'int' })
    id!: number;

    @Column({ type: 'datetime' })
    date!: Timestamp;

    @Column({ type: 'varchar', length: '255' })
    description!: string;

    @Column({ type: 'decimal'  })
    value!: number;

    @Column({ name: 'duo_date', type: 'datetime' })
    duoDate!: Date;
    
    @Column({ name: 'pay_date', type: 'datetime' })
    payDate!: Date;

    @CreateDateColumn({ name: 'created_at', type: 'datetime' })
    createdAt!: Date

    @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
    updatedAt!: Date

    @Column({ name: 'id_credit_card', type: 'int' })
    idCreditCard!: number
 
}