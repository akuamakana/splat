import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { Notification } from './Notification';
import { Project } from './Project';
import { Role } from './Role';
import { Ticket } from './Ticket';

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

  @ManyToOne(() => Role, (role) => role.user, { nullable: false })
  role!: Role;

  @ManyToMany(() => Ticket, (ticket) => ticket.assigned_user)
  tickets: Ticket[];

  @ManyToMany(() => Project, (project) => project.assigned_users, { nullable: false })
  projects: Project[];

  @ManyToMany(() => Notification, (notification) => notification.user)
  notifications: Notification[];

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
  updated_at!: Date;
}
