import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'credit_cards' }) 
export class CreditCards {

    @PrimaryGeneratedColumn({ unsigned: true, type: 'int' })
    id!: number;

    @Column({ name:'account_number', type: 'int', unique: true })
    accountNumber!: number;

    @Column({ type: 'char', length: '16', unique: true})
    number!: number;

    @Column({ name:'expire_year', type: 'year' })
    expireYear!: number;

    @Column({ name: 'security_code', type: 'char', length: '3' })
    securityCode!: number;
    
    @Column({ name: 'limit_value', type: 'int' })
    limitValue!: number;

    @Column({ name:'due_close_day', type: 'tinyint' })
    dueCloseDay!: number;

    @Column({ name:'due_payday', type: 'tinyint' })
    duePayday!: number;

    @Column({ name:'emitter_id', type: 'tinyint' })
    emitterId!: number;
    
    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updatedAt!: Date;
    
};