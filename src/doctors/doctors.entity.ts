import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn, BeforeInsert  } from "typeorm";
import { Accounts } from "../auth/accounts.entity";

@Entity()
export class Doctors {
    @PrimaryColumn()
    id: string;

    @OneToOne(() => Accounts, { "cascade": false })
    @JoinColumn({ name: "id" } )  // This matches @PrimaryColumn name
    account: Accounts;

    @BeforeInsert()
    getID() { this.id = this.account.id; }
}