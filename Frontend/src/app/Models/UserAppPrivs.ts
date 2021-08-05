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
     publicflag:String;
	 roles: Array<Role>;
     ieflag:number;
}