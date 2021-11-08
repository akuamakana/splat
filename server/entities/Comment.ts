import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { Ticket } from './Ticket';
import { User } from './User';

@Entity({
  orderBy: {
    id: 'ASC',
  },
})
export class Comment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false })
  text!: string;

  @ManyToOne(() => Ticket, (ticket) => ticket.comments, { nullable: false, onDelete: 'CASCADE' })
  ticket!: Ticket;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn()
  submitter!: User;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
  updated_at!: Date;
}
