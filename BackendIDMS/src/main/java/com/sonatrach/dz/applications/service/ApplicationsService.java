package com.sonatrach.dz.applications.service;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sonatrach.dz.applications.domain.Applications;
import com.sonatrach.dz.applications.repo.ApplicationsRepo;



@Service
@Transactional
public class ApplicationsService {
@Autowired
ApplicationsRepo appRepo;

public List<Applications> getVisibleApp(){
	List<Applications> apps=new ArrayList();
	try {
		apps= appRepo.findVisible();
	}catch(Exception e) {
		System.out.println("Exception  getVisibleApp() in ApplicationsService==>" + e.getMessage());
	}
	return apps;
}

public Applications addApplication(Applications app) {
	try {
		app=appRepo.save(app);
		//System.out.println(app.getIdapplication());
		return app;
	}catch(Exception e) {
		System.out.println("Exception  addApplication() in ApplicationsService==>" + e.getMessage());
	}
	return null;
}
}
