import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { User } from './User';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ default: false })
  seen!: boolean;

  @Column()
  message: string;

  @Column()
  ticket: number;

  @ManyToOne(() => User, (user) => user.notifications, { nullable: false })
  user!: User;
}
