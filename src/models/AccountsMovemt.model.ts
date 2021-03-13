import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Timestamp } from 'typeorm';

@Entity() 
export class AccountMovement {

    @PrimaryGeneratedColumn({ unsigned: true, type: 'int' })
    id!: number;

    @Column({ type: 'timestamp' })
    date!: Timestamp;

    @Column({ type: 'varchar', length: '255' })
    description!: string;

    @Column({ type: 'decimal'  })
    value!: number;

    @Column({ type: 'char', length:'1' })
    type!: Timestamp;
    
    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt!: Date

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updatedAt!: Date

    @CreateDateColumn({ name: 'id_accounts', type: 'int' })
    idAccount!: number

    @UpdateDateColumn({ name: 'id_invoices', type: 'int' })
    idInvoice!: number
    
}