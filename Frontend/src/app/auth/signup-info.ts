export class SignUpInfo {
    idlang: number;
    sonuser: string;
    pswuser: string;
    userstatus: number;
    iduser:number;
    sysdate:Date;
    email:string;

 


    constructor(idlang: number, sonuser: string, pswuser: string, userstatus: number,iduser: number,sysdate:Date,email:string) {
        this.idlang=idlang;
        this.sonuser=sonuser;
        this.pswuser=pswuser;
        this.userstatus=userstatus;
        this.iduser=iduser;
        this.sysdate=sysdate;
        this.email=email;
       
    }
}
