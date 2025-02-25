import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class CouponEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  percent_off: number;

  @Column()
  duration: string;

  @Column({ type: 'timestamp', nullable: true })
  expires_at: Date;

  @CreateDateColumn()
  created_at: Date;
}
