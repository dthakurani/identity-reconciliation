import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';

@Entity('contract')
export class Contract extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  phoneNumber: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  linkedId: string;

  @Column({ type: 'varchar' })
  linkPrecedence: string;

  @CreateDateColumn({ name: 'created_at', nullable: false })
  created_at: Timestamp;

  @UpdateDateColumn({ name: 'updated_at', nullable: false })
  updated_at: Timestamp;

  @DeleteDateColumn({ name: 'deleted_at' })
  deleted_at: Timestamp;
}
