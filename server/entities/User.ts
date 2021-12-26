import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { Notification } from './Notification';
import { Project } from './Project';
import { Ticket } from './Ticket';

export enum Role {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  DEV = 'DEV',
  SUBMITTER = 'SUBMITTER',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false })
  username!: string;

  @Column({ select: false, nullable: false })
  password!: string;

  @Column({ nullable: false })
  email!: string;

  @Column({ nullable: false })
  firstName!: string;

  @Column({ nullable: false })
  lastName!: string;

  @Column({ nullable: false, type: 'enum', enum: Role, default: Role.MANAGER })
  role: Role;

  @ManyToMany(() => Ticket, (ticket) => ticket.assigned_user, { cascade: true })
  tickets: Ticket[];

  @ManyToMany(() => Project, (project) => project.assigned_users, { nullable: false, onDelete: 'CASCADE' })
  projects: Project[];

  @ManyToMany(() => Notification, (notification) => notification.user, { cascade: true })
  notifications: Notification[];

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
  updated_at!: Date;
}
