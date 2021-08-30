package com.sonatrach.dz.approles.service;

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
	
	public void deleteRole(AppRoles approle) {
		try {
			appRoleRepo.save(approle);

		}catch(Exception e) {
			System.out.println("Exception  deleteRole() in AppRolesService==>" + e.getMessage());
		}
			}
}
