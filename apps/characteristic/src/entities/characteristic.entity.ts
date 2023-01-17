import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { CharacteristicType } from '../enums/characteristic-type.enum';

@Entity()
export class Characteristic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({length: 10})
  name: string;

  @Column({
    type: "enum",
    enum: CharacteristicType,
    nullable: false
  })
  type: CharacteristicType;

  @CreateDateColumn()
  createdDate: Date

  @UpdateDateColumn()
  updatedDate: Date

  @DeleteDateColumn()
  deletedDate: Date
}