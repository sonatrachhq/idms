package com.sonatrach.dz.appprivs.service;

import java.util.ArrayList;

import java.util.Date;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sonatrach.dz.appprivs.domain.AppPrivs;
import com.sonatrach.dz.appprivs.repo.AppPrivsRepo;
import com.sonatrach.dz.approles.domain.AppRoles;
import com.sonatrach.dz.approles.repo.AppRolesRepo;
import com.sonatrach.dz.interim.domain.Interim;
import com.sonatrach.dz.interim.service.InterimService;
import com.sonatrach.dz.storedProcResponse.Role;
import com.sonatrach.dz.userIDMS.domain.UserIDMS;
@Service
@Transactional
public class AppPrivsService {
	@Autowired
	AppPrivsRepo appPrivsRepo;
	@Autowired
	AppRolesRepo appRolesRepo;
	@Autowired
	InterimService interimService;
	
	
	public List<Role> getIdmsRoles(UserIDMS user){
		
		try {
			List<AppRoles> rolesIdms=appRolesRepo.findByApp(1);
			List<AppPrivs> privs=appPrivsRepo.findByUser(user.getIduseridms());
			Interim interim=interimService.findInetrimRoles(user.getIduseridms(), 1);
			
			List<AppPrivs> privsInterim= new ArrayList();
			if(interim !=null) {
			privsInterim=appPrivsRepo.findByUser(interim.getIduseridms());
			//remove all invalid interim privs 
			
			  for(int i=0;i<privsInterim.size();i++) {
			  
			  if(privsInterim.get(i).getPrivstartdate().after(new
			  Date())||privsInterim.get(i).getPrivenddate().before(new Date())) {
			  privsInterim.remove(i); } }
			 
			}
			//add user's privs 
			List<Role> roles=new ArrayList();
			for(int i=0;i<privs.size();i++) {
				for(int j=0;j<rolesIdms.size();j++) {
					if(privs.get(i).getIdrole()==rolesIdms.get(j).getIdrole()) {
						Role role=new Role(privs.get(i).getIdrole(),privs.get(i).getIdstatus(),rolesIdms.get(j).getDescrole(),privs.get(i).getPrivstartdate(),privs.get(i).getPrivenddate());
						roles.add(role);
					}
				}
			}
			//add interim privs
			for(int i=0;i<privsInterim.size();i++) {
				for(int j=0;j<rolesIdms.size();j++) {
					if(privsInterim.get(i).getIdrole()==rolesIdms.get(j).getIdrole()) {
						Role role=new Role(privsInterim.get(i).getIdrole(),privsInterim.get(i).getIdstatus(),rolesIdms.get(j).getDescrole(),privsInterim.get(i).getPrivstartdate(),privsInterim.get(i).getPrivenddate());
						
						roles.add(role);
					}
				}
			}
			return roles;
		}catch(Exception e) {
			System.out.println("Exception  getIdmsRoles() in AppPrivsService==>" + e.getMessage());
		}
		return null;
	}
	
	public AppPrivs saveAppPrivs(AppPrivs privs) {
		try {
			return appPrivsRepo.save(privs);
		}catch(Exception e) {
			System.out.println("Exception in AppPrivsService ==>saveAppPrivs()  :" +e.getMessage());
		}
		return null;
	}
}
