package com.sonatrach.dz.roleObjects.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sonatrach.dz.roleObjects.domain.RoleObjects;
import com.sonatrach.dz.roleObjects.repo.RoleObjectsRepo;
@Service
@Transactional
public class RoleObjectsService {
@Autowired
RoleObjectsRepo roleObjRepo;


public List<RoleObjects> saveRoleObjects(List<RoleObjects> roleObj){
	try {
		for(int i=0;i<roleObj.size();i++) {
			roleObjRepo.save(roleObj.get(i));
		}
		return roleObj;
	}catch(Exception e) {
		System.out.println("Exception  saveRoleObjects() in RoleObjectsService==>" + e.getMessage());
	}
	return null;
}
public List<RoleObjects> deleteRoleObjects(List<RoleObjects> roleObj){
	try {
		for(int i=0;i<roleObj.size();i++) {
			roleObjRepo.delete(roleObj.get(i));
		}
		return roleObj;
	}catch(Exception e) {
		System.out.println("Exception  deleteRoleObjects() in RoleObjectsService==>" + e.getMessage());
	}
	return null;
}
}
