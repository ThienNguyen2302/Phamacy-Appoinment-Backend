import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum AccountRole {
    ADMIN = "admin",
    DOCTOR = "doctor",
    USER = "user"
}

@Entity()
export class Accounts {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ unique: true })
    username: string;

    @Column({ unique: true })
    email: string;

    @Column({ unique: true })
    contact_number: string;

    @Column()
    password: string;

    @Column({nullable: true})
    avatar: string;

    @Column({
        type: "enum",
        enum: AccountRole,
        default: AccountRole.USER
    })
    role: AccountRole
}