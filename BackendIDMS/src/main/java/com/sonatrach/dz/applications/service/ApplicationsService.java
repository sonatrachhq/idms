package com.sonatrach.dz.applications.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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

public Applications updateApp(Applications app) {
	try {
		Optional<Applications> application=appRepo.findById(app.getIdapplication());
		if(application.get()!=null) {
			application.get().setApplicationdesc(app.getApplicationdesc());
			application.get().setApplicationdetail(app.getApplicationdetail());
			application.get().setApplicationmode(app.getApplicationmode());
			application.get().setApplicationstatus(app.getApplicationstatus());
			application.get().setApplicationtitle(app.getApplicationtitle());
			application.get().setApplicationurl(app.getApplicationurl());
			application.get().setIconurl(app.getIconurl());
			application.get().setIduser(app.getIduser());
			application.get().setIeflag(app.getIeflag());
			application.get().setPublicflag(app.getPublicflag());
			application.get().setSystemdate(app.getSystemdate());
			appRepo.save(application.get());
			return application.get();
		}
		
	
	
	}catch(Exception e) {
		System.out.println("Exception  updateApp() in ApplicationsService==>" + e.getMessage());
	}
	return null;
}


public Applications deleteApp(Applications app) {
	try {
		Optional<Applications> application=appRepo.findById(app.getIdapplication());
		if(application.get()!=null) {
			application.get().setApplicationstatus(3);
			appRepo.save(application.get());
			return application.get();
		}
		
	
	
	}catch(Exception e) {
		System.out.println("Exception  deleteApp() in ApplicationsService==>" + e.getMessage());
	}
	return null;
}

}
