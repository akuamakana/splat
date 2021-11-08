import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Ticket } from './Ticket';

@Entity()
export class TicketHistory {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  type!: string;

  @Column()
  field!: string;

  @Column()
  old!: string;

  @Column()
  new!: string;

  @ManyToOne(() => Ticket, (ticket) => ticket.logs, { nullable: false, onDelete: 'CASCADE' })
  ticket!: Ticket;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  created_at!: string;
}
