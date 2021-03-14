import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity() 
export class CreditCardEmitter {

    @PrimaryGeneratedColumn({ unsigned: true, type: 'int' })
    id!: number;

    @Column({name: 'name', type: 'varchar', length: '75'})
    name!: string
    
}