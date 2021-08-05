package com.sonatrach.dz;



import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
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
import com.sonatrach.dz.security.jwt.JwtProvider;
import com.sonatrach.dz.userIDMS.domain.UserIDMS;
import com.sonatrach.dz.userIDMS.service.UserIdmsService;
import com.sonatrach.dz.utils.ProcResult;
import com.sonatrach.dz.utils.Role;
import com.sonatrach.dz.utils.UserAppPrivs;

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
@Autowired
private JdbcTemplate jdbcTemplate;
@Autowired
private JwtProvider tokenProvider;
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

@PostMapping("/api/auth/checkToken")

public LoginForm checkToken(@RequestBody LoginForm loginRequest) {
	try {
		if(tokenProvider.validateJwtToken(loginRequest.getSonuser())) {
			loginRequest.setPassword("true");
		}else {
			loginRequest.setPassword("false");
		}
		loginRequest.setSonuser("");
		return loginRequest;
	}catch(Exception e ) {
		System.out.println("Exception checkToken() in  controller ==>" + e.getMessage());
	}
	
	return null;
	
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
@GetMapping( "/api/auth/getAllLanguages" )
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

/********************************************Get user's apps &  roles when login*******************************************/
public List<ProcResult> getResult(Integer userId){
	SimpleJdbcCall simpleJdbcCall;
	simpleJdbcCall = new SimpleJdbcCall(jdbcTemplate).withProcedureName("FIND_APP_ROLES_PRIVS").returningResultSet("XRESULT", BeanPropertyRowMapper.newInstance(ProcResult.class));
	SqlParameterSource in = new MapSqlParameterSource().addValue("userId", userId);
	Map out = simpleJdbcCall.execute(in);
	
	return (List)out.get("XRESULT");
}


@PostMapping({"getUsersAppPrivs"})
public ArrayList<UserAppPrivs>  getUsersAppPrivs(@RequestBody UserIDMS user) {
	try {
		List<ProcResult> procResults = new ArrayList();
		ArrayList<UserAppPrivs> listToReturn=new ArrayList();
		user=userIdmsService.findUserBySon(user);
		
		procResults = getResult(user.getIduseridms());
		

		
		for(int i=0;i<procResults.size();i++) {

		 
			UserAppPrivs jsonResponse=new UserAppPrivs();
			List<Role> roles = new ArrayList();
			
			jsonResponse.setIDAPPLICATION(procResults.get(i).getIDAPPLICATION());
			jsonResponse.setIDUSERIDMS(procResults.get(i).getIDUSERIDMS());
			jsonResponse.setAPPLICATIONDESC(procResults.get(i).getAPPLICATIONDESC());
			jsonResponse.setAPPLICATIONDETAIL(procResults.get(i).getAPPLICATIONDETAIL());
			jsonResponse.setAPPLICATIONMODE(procResults.get(i).getAPPLICATIONMODE());
			jsonResponse.setAPPLICATIONTITLE(procResults.get(i).getAPPLICATIONTITLE());
			jsonResponse.setAPPLICATIONURL(procResults.get(i).getAPPLICATIONURL());
			jsonResponse.setICONURL(procResults.get(i).getICONURL());
			jsonResponse.setPUBLICFLAG(procResults.get(i).getPUBLICFLAG());
			jsonResponse.setIEFLAG(procResults.get(i).getIEFLAG());
			if(procResults.get(i).getIDROLE()==null  ) {
				jsonResponse.setROLES(roles);
				listToReturn.add(jsonResponse);
			}else {
				Role role=new Role();
				role.setIDROLE(procResults.get(i).getIDROLE());
				role.setPRIVENDDATE(procResults.get(i).getPRIVENDDATE());
				role.setPRIVSTARTDATE(procResults.get(i).getPRIVSTARTDATE());
				role.setIDSTATUS(procResults.get(i).getIDSTATUS());
				role.setDESCROLE(procResults.get(i).getDESCROLE());
				roles.add(role);
				for(int j=i+1;j<procResults.size();j++) {
					Role otherRole=new Role();
					if(procResults.get(i).getIDAPPLICATION()==procResults.get(j).getIDAPPLICATION()) {
						
						otherRole.setIDROLE(procResults.get(j).getIDROLE());
						otherRole.setPRIVENDDATE(procResults.get(j).getPRIVENDDATE());
						otherRole.setPRIVSTARTDATE(procResults.get(j).getPRIVSTARTDATE());
						otherRole.setIDSTATUS(procResults.get(j).getIDSTATUS());
						otherRole.setDESCROLE(procResults.get(j).getDESCROLE());
						roles.add(otherRole);
						procResults.remove(j);
					}
				}
				
				jsonResponse.setROLES(roles);
				listToReturn.add(jsonResponse);
			}
			
		}	
			


		return listToReturn;
	}catch(Exception e) {
		System.out.println("Exception getUsersAppPrivs in controller==>" + e.getMessage());
	}
	
	return null;
}


@PostMapping({ "getAppsByMode" })
public List<UserAppPrivs> getAppsByMode(@RequestBody List<UserAppPrivs> apps, @RequestParam String mode) {
	try {
		ArrayList<UserAppPrivs> filteredApps=new ArrayList();
		Integer appMode=Integer.valueOf(mode);
		for(int i=0;i<apps.size();i++) {
			if(apps.get(i).getAPPLICATIONMODE()==appMode) {
				filteredApps.add(apps.get(i));
			}
		}
		return filteredApps;
	}catch(Exception e) {
		System.out.println("Exception getAppsByMode in controller==>" + e.getMessage());
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
