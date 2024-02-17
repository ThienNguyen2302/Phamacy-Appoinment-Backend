import { Users } from "../../users/users.entity";
import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, OneToOne, JoinColumn } from "typeorm";

@Entity()
export class PhysicalHealth {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true
  })
  height: number;

  @Column({
    nullable: true
  })
  weight: number;

  @Column({
    nullable: true
  })
  pulse: number;

  @Column({
    nullable: true
  })
  bloodPressure: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Users, user => user.physicalHealth)
  user: Users;
}
