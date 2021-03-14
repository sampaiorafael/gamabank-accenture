import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
 
@Entity() 
export class Balance {

    @PrimaryGeneratedColumn({ unsigned: true, type: 'int' })
    id!: number;

    @Column({ name: 'number', type: 'int', unique: true })
    acountId!: number

    @Column({ type: 'varchar', length: '45' })
    monthYear!: string

    @Column({ type: 'decimal',    })  //DECIMAL INCOMPLETO!!
    initialBalance!: number

    @Column({ type: 'decimal',    })  //DECIMAL INCOMPLETO!!
    actualBalance!: number

    @Column({ type: 'decimal',    })  //DECIMAL INCOMPLETO!!
    finalBalance!: number

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt!: Date

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updatedAt!: Date
    
}