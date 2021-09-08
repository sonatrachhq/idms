package com.sonatrach.dz.appObject.service;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sonatrach.dz.appObject.domain.AppObject;
import com.sonatrach.dz.appObject.repo.AppObjectRepo;
import com.sonatrach.dz.applications.domain.Applications;

@Service
@Transactional
public class AppObjectService {
	@Autowired
	AppObjectRepo appObjRepo;
	
	public List<AppObject>findObjectsByApp(Applications app){
		try {
			return appObjRepo.findObjectsByApp(app.getIdapplication());
		}catch(Exception e) {
			System.out.println("Exception  findObjectsByApp() in AppObjectService==>" + e.getMessage());
			
		}
		return null;
	}
	
	
	public AppObject addAppObject(AppObject object){
		try {
			
			return appObjRepo.save(object);
		}catch(Exception e) {
			System.out.println("Exception  addAppObject() in AppObjectService==>" + e.getMessage());
			
		}
		return null;
	}
	
	public AppObject deleteAppObject(AppObject object) {
		try {
			Optional<AppObject> appObj=appObjRepo.findById(object.getIDOBJECT());
			if(appObj.get()!=null) {
				appObj.get().setIDSTATUS(3);
				return appObjRepo.save(appObj.get());
			}
			
		}catch(Exception e) {
			System.out.println("Exception  deleteAppObject() in AppObjectService==>" + e.getMessage());
			
		}
		return null;
	}
	
	public AppObject updateAppObject(AppObject object) {
		try {
			Optional<AppObject> appObj=appObjRepo.findById(object.getIDOBJECT());
			if(appObj.get()!=null) {
				appObj.get().setDESCOBJECT(object.getDESCOBJECT());;
				return appObjRepo.save(appObj.get());
			}
			
		}catch(Exception e) {
			System.out.println("Exception  updateAppObject() in AppObjectService==>" + e.getMessage());
			
		}
		return null;
	}
}
