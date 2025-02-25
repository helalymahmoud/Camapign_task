import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description?: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column({ default: 'usd' })
  currency: string;

  @Column({ nullable: true })
  stripeProductId?: string; 

  @Column({ nullable: true })
  stripePriceId?: string; 
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
