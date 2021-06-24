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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sonatrach.dz.applications.domain.Applications;
import com.sonatrach.dz.applications.service.ApplicationsService;
import com.sonatrach.dz.languages.domain.Languages;
import com.sonatrach.dz.languages.service.LanguageService;
import com.sonatrach.dz.message.request.LoginForm;
import com.sonatrach.dz.message.request.SignUpForm;
import com.sonatrach.dz.profil.domain.Profil;
import com.sonatrach.dz.profil.service.ProfilService;
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
@Autowired
ProfilService profilService;


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
//for the select in signup
@GetMapping( {"getAllLanguages"} )
public List<Languages> getAllLanguages(){
	try {
		return langService.getAllLangs();
	}catch(Exception e) {
		System.out.println("Exception getAllLangs() in LanguageService {getAllLanguages controller}==>" + e.getMessage());
	}
	return null;
}
//saving default profil when creating account
@PostMapping("/api/auth/saveProfil")
public Profil saveProfil(@RequestBody Profil profil) {
	try {
		Profil savedProfil=profilService.setDefaultProfil(profil);
		return savedProfil;
	}catch(Exception e) {
		System.out.println("Exception setDefaultProfil() in ProfilService {saveProfil controller}==>" + e.getMessage());
	}
	return null;
}



/******************************************get current user**************************************************************/
@PostMapping({"getCurrentUser"})
public UserIDMS getCurrentUser(@RequestBody UserIDMS user) {
	try {
		UserIDMS currentUser=userIdmsService.findUserBySon(user);
		if(currentUser!=null) {
			return currentUser;
		}
	}catch(Exception e) {
		System.out.println("Exception  findUserBySon() in UserIdmsService {getCurrentUser controller}==>" + e.getMessage());
	}
	return null;
}

/******************************************update Language and Theme ****************************************************/
@PostMapping({"updateLangUser"})
public Profil updateLangUser(@RequestBody Profil profil) {
	try {
		
		Profil updatedProfil=profilService.updateLang(profil);
		return updatedProfil;
	}catch(Exception e) {
		System.out.println("Exception  updateLang() in ProfilService {updateLangUser controller}==>" + e.getMessage());
	}
	return null;
}

@PostMapping({"updateThemeUser"})
public Profil updateThemeUser(@RequestBody Profil profil) {
	try {
		Profil updatedProfil=profilService.updateTheme(profil);
		return updatedProfil;
	}catch(Exception e) {
		System.out.println("Exception  updateTheme() in ProfilService {updateThemeUser controller}==>" + e.getMessage());
	}
	return null;
}

@PostMapping({"getUsersProfil"})
public Profil getUsersProfil(@RequestBody Profil profil) {
	try {
		Profil currentProfil=profilService.getUsersProfil(profil);
		return currentProfil;
	}catch(Exception e) {
		System.out.println("Exception  getUsersProfil() in ProfilService {getUsersProfil controller}==>" + e.getMessage());
	}
	return null;
}

}
