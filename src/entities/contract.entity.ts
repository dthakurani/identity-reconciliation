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
import { LinkPrecedenceEnum } from '../enums/contract.enum';

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

  @Column({ type: 'enum', enum: LinkPrecedenceEnum })
  linkPrecedence: LinkPrecedenceEnum;

  @CreateDateColumn({ name: 'createdAt', nullable: false })
  createdAt: Timestamp;

  @UpdateDateColumn({ name: 'updatedAt', nullable: false })
  updatedAt: Timestamp;

  @DeleteDateColumn({ name: 'deletedAt' })
  deletedAt: Timestamp;
}
