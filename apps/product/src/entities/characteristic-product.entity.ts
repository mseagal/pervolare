import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity()
export class CharacteristicProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unsigned: true})
  productId: number;

  @Column({unsigned: true})
  characteristicId: number;
}