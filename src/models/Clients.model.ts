import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
 
@Entity() 
export class Clients {

    @PrimaryGeneratedColumn({ unsigned: true, type: 'int' })
    id!: number;

    @Column({ name: 'id_user', type: 'int', unique: true })
    idUser!: number

    @Column({ type: 'varchar', length: '255', unique: true })
    name!: string

    @Column({ type: 'varchar', length: '255' })
    adress!: string

    @Column({ type: 'varchar', length: '255', unique: true })
    phone!: string

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt!: Date

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updatedAt!: Date
    
}