import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
 
@Entity({name: 'users'}) 
export class Users {

    @PrimaryGeneratedColumn({ unsigned: true, type: 'int' })
    id!: number;

    @Column({ type: 'varchar', length: '255', unique: true })
    username!: string

    @Column({ type: 'varchar', length: '255' })
    password!: string

    @Column({ type: 'varchar', length: '255', unique: true })
    email!: string

    @Column({ type: 'char', length: '11', unique: true })
    cpf!: string

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt!: Date

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updatedAt!: Date
    
}