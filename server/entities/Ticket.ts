import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { Comment } from './Comment';
import { Project } from './Project';
import { User } from './User';

export enum TicketStatus {
  OPEN = 'open',
  IN_PROGRESS = 'in progress',
  CLOSED = 'closed',
}

export enum TicketPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

export enum TicketType {
  BUGS = 'bugs/errors',
  FEATURES = 'feature requests',
  OTHER = 'other',
  TRAINING = 'training',
}

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false })
  title!: string;

  @Column({ nullable: false, default: '' })
  description!: string;

  @ManyToOne(() => Project, (project) => project.tickets, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn()
  project!: Project;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn()
  submitter!: User;

  @ManyToOne(() => User)
  @JoinColumn()
  assigned_user!: User;

  @OneToMany(() => Comment, (comment) => comment.ticket)
  @JoinColumn()
  comments: Comment[];

  @Column({
    type: 'enum',
    enum: TicketStatus,
    default: TicketStatus.OPEN,
    nullable: false,
  })
  status: TicketStatus;

  @Column({
    type: 'enum',
    enum: TicketPriority,
    default: TicketPriority.MEDIUM,
    nullable: false,
  })
  priority: TicketPriority;

  @Column({
    type: 'enum',
    enum: TicketType,
    default: TicketType.BUGS,
    nullable: false,
  })
  type: TicketType;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
  updated_at!: Date;
}
