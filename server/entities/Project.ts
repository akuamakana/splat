import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { Ticket } from './Ticket';
import { User } from './User';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false })
  title!: string;

  @Column({ nullable: false })
  description!: string;

  @ManyToOne(() => User, { nullable: false })
  user!: User;

  @ManyToMany(() => User, (user) => user.projects, { nullable: false })
  @JoinTable()
  assigned_users: User[];

  @OneToMany(() => Ticket, (ticket) => ticket.project, { onDelete: 'CASCADE' })
  tickets: Ticket[];

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
  updated_at!: Date;
}
