export class User {
    id: number;
    wins: number;
    losses: number;
    balance: number;
    firstName: string;
    lastName: string;
    email: string;
    pswd: string;
    referralCode: string;


	constructor(
        id: number,
        wins: number,
        losses:number,
        balance: number,
        firstName: string,
        lastName: string,
        email: string,
        pswd: string,
        referralCode: string
    ) {
        this.id=id
        this.wins=wins
        this.losses=losses
        this.balance=balance
        this.firstName=firstName
        this.lastName=lastName
        this.email=email
        this.pswd=pswd
        this.referralCode=referralCode
	}
}