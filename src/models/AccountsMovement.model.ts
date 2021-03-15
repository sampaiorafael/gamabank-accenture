import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn} from 'typeorm';

@Entity() 
export class AccountsMovement {

    @PrimaryGeneratedColumn({ unsigned: true, type: 'int' })
    id!: number;

    @Column({ name: 'to_account_id', type: 'int' })
    fromAccountId!: string;

    @Column({ name: 'to_account_id', type: 'int' })
    toAccountId!: string;

    @Column({ type: 'varchar', length: '20' })
    type!: string;

    @Column({ type: 'decimal' })
    value!: number;

    @Column({ type: 'timestamp' })
    date!: Date;

    @Column({ type: 'varchar', length: '255' })
    description!: string;
    
    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updatedAt!: Date;
    
};