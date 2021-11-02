import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
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
  OTHER = 'other comments',
  TRAINING = 'training/document requests',
}

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false })
  title!: string;

  @Column({ nullable: false })
  description!: string;

  @ManyToOne(() => Project, (project) => project.tickets)
  project: Project;

  @ManyToOne(() => User, { nullable: false })
  submitter!: User;

  @ManyToOne(() => User)
  assigned_user!: User;

  @Column({
    type: 'enum',
    enum: TicketStatus,
    default: TicketStatus.OPEN,
  })
  status: TicketStatus;

  @Column({
    type: 'enum',
    enum: TicketPriority,
    default: TicketPriority.MEDIUM,
  })
  priority: TicketPriority;

  @Column({
    type: 'enum',
    enum: TicketType,
    default: TicketType.BUGS,
  })
  type: TicketType;
}
