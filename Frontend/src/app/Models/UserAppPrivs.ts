import { Role } from './Role';
export interface UserAppPrivs{
     iduseridms:number;
	 idapplication:number;
	applicationtitle:String;
	 applicationdesc:String;
	 applicationdetail:String;
	 iconurl:String;
	 applicationmode:number;
   applicationurl:String;
     publicflag:number;
	 roles: Array<Role>;
     ieflag:number;
	 interimstartdate:Date;
    interimenddate:Date;
}