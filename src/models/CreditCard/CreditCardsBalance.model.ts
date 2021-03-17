import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, } from 'typeorm';

@Entity({ name: 'credit_cards_balance' }) 
export class CreditCardBalance {

    @PrimaryGeneratedColumn({ unsigned: true, type: 'int' })
    id!: number;

    @Column({ name: 'credit_card_number', type: 'char', length: '16' })
    creditCardNumber!: number;

    @Column({ type: 'tinyint' })
    month!: number;

    @Column({ name:'available_balance', type: 'decimal'})
    availableBalance!: number;

    @Column({ name:'due_balance', type: 'decimal' })
    dueBalance!: number;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updatedAt!: Date;

};