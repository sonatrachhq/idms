package com.sonatrach.dz.appObject.service;

import java.util.List;

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
}
