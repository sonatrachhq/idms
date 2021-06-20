export class SignUpInfo {
    idlang: number;
    sonuser: string;
    pswuser: string;
    userstatus: number;
    iduser:number;
    sysdate:Date;

 


    constructor(idlang: number, sonuser: string, pswuser: string, userstatus: number,iduser: number,sysdate:Date) {
        this.idlang=idlang;
        this.sonuser=sonuser;
        this.pswuser=pswuser;
        this.userstatus=userstatus;
        this.iduser=iduser;
        this.sysdate=sysdate;

       
    }
}
