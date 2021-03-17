import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Timestamp } from 'typeorm';

@Entity({ name: 'credit_cards_movement'}) 
export class CreditCardMovement {

    @PrimaryGeneratedColumn({ unsigned: true, type: 'int' })
    id!: number;

    @Column({ name: 'credit_card_number', type: 'char', length: '16' })
    creditCardNumber!: number;

    @Column({ type: 'varchar', length: '255' })
    description!: string;

    @Column({ type: 'decimal' })
    value!: number;

    @Column({ type: 'tinyint' })
    instalments!: number;
    
    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updatedAt!: Date;

};