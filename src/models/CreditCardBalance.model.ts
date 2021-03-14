import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, } from 'typeorm';

@Entity() 
export class CreditCardBalance {

    @PrimaryGeneratedColumn({ unsigned: true, type: 'int' })
    id!: number;

    @Column({ type: 'char', length: '7' })
    mouthYear!: string

    @Column({ type: 'decimal' })
    valueUsed!: number;

    @Column({ type: 'varchar', length: '45' })
    balanceLeft!: string;

    @Column({ type: 'int'  })
    credirCardId!: number;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt!: Date

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updatedAt!: Date

}