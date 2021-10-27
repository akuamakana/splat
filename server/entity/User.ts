import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Project } from './Project';
import { Role } from './Role';

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

  @ManyToMany(() => Project, (project) => project.assigned_users, { nullable: false })
  // @JoinTable()
  projects: Project[];

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
  updated_at!: Date;
}
