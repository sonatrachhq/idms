package com.sonatrach.dz.objectUsers.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sonatrach.dz.objectUsers.domain.ObjectUsers;
import com.sonatrach.dz.objectUsers.repo.ObjectUsersRepo;

@Service
@Transactional
public class ObjectUsersService {
	@Autowired
	ObjectUsersRepo objUserRepo;
	
	public List<ObjectUsers> saveObjUser(List<ObjectUsers> objUsersToAdd){
		try {
			for(int i=0;i<objUsersToAdd.size();i++) {
				objUserRepo.save(objUsersToAdd.get(i));
				
			}
			
			return objUsersToAdd;
		}catch(Exception e) {
			System.out.println("Exception  saveObjUser() in ObjectUsersService==>" + e.getMessage());
		}
		return null;
	}
	public List<ObjectUsers> deleteObjUser(List<ObjectUsers> objUsersToDelete){
		try {
		
			for(int i=0;i<objUsersToDelete.size();i++) {
				objUserRepo.delete(objUsersToDelete.get(i));
				
			}
			return objUsersToDelete;
		}catch(Exception e) {
			System.out.println("Exception  deleteObjUser() in ObjectUsersService==>" + e.getMessage());
		}
		return null;
	}
	
	
}
