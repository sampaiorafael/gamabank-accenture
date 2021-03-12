import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
 
@Entity() 
export class Banks {

    @PrimaryGeneratedColumn({ unsigned: true, type: 'int' })
    id!: number;

    @Column({ name: 'number', type: 'int', unique: true })
    bknumber!: number

    @Column({ type: 'varchar', length: '255' })
    name!: string

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt!: Date

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updatedAt!: Date
    
}