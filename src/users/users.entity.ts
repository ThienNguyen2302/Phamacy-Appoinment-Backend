import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn, BeforeInsert  } from "typeorm";
import { Accounts } from "../auth/accounts.entity";

@Entity()
export class Users {
    @PrimaryColumn()
    id: string;

    @OneToOne(() => Accounts, { "cascade": false })
    @JoinColumn({ name: "id" } )  // This matches @PrimaryColumn name
    account: Accounts;

    @BeforeInsert()
    getID() { this.id = this.account.id; }

    @Column()
    full_name: string;

    @Column()
    date_of_birth: string;

    @Column()
    address: string;

    @Column()
    gender: string;
}