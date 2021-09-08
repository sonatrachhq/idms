package com.sonatrach.dz.approles.service;

import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sonatrach.dz.approles.domain.AppRoles;
import com.sonatrach.dz.approles.repo.AppRolesRepo;

@Service
@Transactional
public class AppRolesService {
	@Autowired
	AppRolesRepo appRoleRepo;
	
	public AppRoles saveAppRole(AppRoles approle) {
		try {
			approle=appRoleRepo.save(approle);
			return approle;
		}catch(Exception e) {
			System.out.println("Exception  saveAppRole() in AppRolesService==>" + e.getMessage());
		}
		return null;
	}
	
	public AppRoles deleteRole(AppRoles approle) {
		try {
			Optional<AppRoles> role=appRoleRepo.findById(approle.getIdrole());
			if(role.get()!=null) {
				role.get().setIdstatus(3);
				appRoleRepo.save(role.get());
				return role.get();
			}
			

		}catch(Exception e) {
			System.out.println("Exception  deleteRole() in AppRolesService==>" + e.getMessage());
		}
		return null;
	}
}
