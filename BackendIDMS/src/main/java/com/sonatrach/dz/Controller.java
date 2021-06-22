package com.sonatrach.dz;



import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.sonatrach.dz.applications.domain.Applications;
import com.sonatrach.dz.applications.service.ApplicationsService;
import com.sonatrach.dz.languages.domain.Languages;
import com.sonatrach.dz.languages.service.LanguageService;
import com.sonatrach.dz.message.request.LoginForm;
import com.sonatrach.dz.message.request.SignUpForm;
import com.sonatrach.dz.userIDMS.domain.UserIDMS;
import com.sonatrach.dz.userIDMS.service.UserIdmsService;

@RestController
@CrossOrigin(origins = "*")
public class Controller {
@Autowired
ApplicationsService appService;
@Autowired
UserIdmsService userIdmsService;
@Autowired
LanguageService langService;


/********************************************************GUEST PAGE *******************************************************************/
@GetMapping( "/api/auth/getVisibleApps" )
public List<Applications> getVisibleApps(){
	List<Applications> visibleApps=appService.getVisibleApp();
	if(visibleApps.isEmpty()) {
		return null;
	}else {
		return visibleApps;
	}
}

/*************************************LOGIN/SUBSCRIBE PAGE***************************************************************************/
@RequestMapping(value = "/api/auth/signin", method = RequestMethod.POST)
public ResponseEntity<?> signin(@Valid @RequestBody LoginForm loginRequest) {
	try {
		return userIdmsService.authenticateUser(loginRequest);
	}catch(Exception e) {
		System.out.println("Exception authenticateUser() in UserIdmsService {signin controller} ==>" + e.getMessage());
	}
	return null;
}

@RequestMapping(value = "/api/auth/signup", method = RequestMethod.POST)
public ResponseEntity<?> signup(@Valid @RequestBody SignUpForm signUpRequest) {
	try {
		return userIdmsService.registerUser(signUpRequest);
	}catch(Exception e ) {
		System.out.println("Exception registerUser() in UserIdmsService {signup controller}==>" + e.getMessage());
	}
	return null;
}

@GetMapping( "/api/auth/getAllLanguages" )
public List<Languages> getAllLanguages(){
	try {
		return langService.getAllLangs();
	}catch(Exception e) {
		System.out.println("Exception getAllLangs() in LanguageService {getAllLanguages controller}==>" + e.getMessage());
	}
	return null;
}

/***************************************i18n*******************************************************************************/
@PostMapping( "/api/auth/getCurrentUserLang" )
public Languages getCurrentUserLang(@RequestBody UserIDMS user){
	try {
		UserIDMS currentUser=userIdmsService.findUserById(user);
		Languages lang=new Languages();
		Integer langId;
		if(currentUser!=null) {
			langId=currentUser.getIdlang();
			lang=langService.getLangById(langId);
			if(lang!=null) {
				return lang;
			}
		}
		
	}catch(Exception e) {
		System.out.println("Exception getLangById() in LanguageService/findUserById in UserIdmsService {getCurrentUserLang controller}==>" + e.getMessage());
	}
	return null;
}
}
