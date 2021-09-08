package com.sonatrach.dz;



import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

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

import com.sonatrach.dz.appObject.domain.AppObject;
import com.sonatrach.dz.appObject.service.AppObjectService;
import com.sonatrach.dz.applanguages.domain.AppLanguage;
import com.sonatrach.dz.applanguages.service.AppLanguageService;
import com.sonatrach.dz.applications.domain.Applications;
import com.sonatrach.dz.applications.service.ApplicationsService;
import com.sonatrach.dz.appprivs.domain.AppPrivs;
import com.sonatrach.dz.appprivs.service.AppPrivsService;
import com.sonatrach.dz.approles.domain.AppRoles;
import com.sonatrach.dz.approles.service.AppRolesService;
import com.sonatrach.dz.languages.domain.Languages;
import com.sonatrach.dz.languages.service.LanguageService;
import com.sonatrach.dz.message.request.LoginForm;
import com.sonatrach.dz.message.request.SignUpForm;
import com.sonatrach.dz.objectType.domain.ObjectTypeApp;
import com.sonatrach.dz.objectType.service.ObjectTypeService;
import com.sonatrach.dz.objectUsers.domain.ObjectUsers;
import com.sonatrach.dz.objectUsers.service.ObjectUsersService;
import com.sonatrach.dz.profil.domain.Profil;
import com.sonatrach.dz.profil.service.ProfilService;
import com.sonatrach.dz.roleObjects.domain.RoleObjects;
import com.sonatrach.dz.roleObjects.service.RoleObjectsService;
import com.sonatrach.dz.security.jwt.JwtProvider;
import com.sonatrach.dz.userIDMS.domain.UserIDMS;
import com.sonatrach.dz.userIDMS.service.UserIdmsService;
import com.sonatrach.dz.utils.ObjectType;
import com.sonatrach.dz.utils.ObjectsResult;
import com.sonatrach.dz.utils.ProcResult;
import com.sonatrach.dz.utils.Role;
import com.sonatrach.dz.utils.UserAppPrivs;
import com.sonatrach.dz.utils.UsersObject;





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
@Autowired
private AppLanguageService appLangService;
@Autowired
private AppRolesService appRoleService;
@Autowired
private AppPrivsService appPrivsService;
@Autowired
private AppObjectService appObjService;
@Autowired
private RoleObjectsService roleObjService;
@Autowired
private ObjectUsersService objUserService;
@Autowired
private ObjectTypeService objTypeService;


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
		/*Properties p = System.getProperties();
		p.list(System.out);
		System.out.println(System.getProperty("user.name"));*/
	
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


//get logged user's roles
@PostMapping({"getUsersRoles"})
public List<Role>getUsersRoles(@RequestBody UserIDMS user ){
	try {
		user=userIdmsService.findUserBySon(user);
		List<Role> roles= appPrivsService.getIdmsRoles(user);
		return roles;
	}catch(Exception e) {
		System.out.println("Exception getIdmsRoles() in AppPrivsService {getUsersRoles controller}==>" + e.getMessage());
	}
	return null;
}
/********************************************Get user's apps &  roles when login*******************************************/

//@GetMapping( "/api/auth/test" )
public ArrayList<UserAppPrivs> getResult(Integer userId){
	
	SimpleJdbcCall simpleJdbcCall;
	simpleJdbcCall = new SimpleJdbcCall(jdbcTemplate).withProcedureName("FIND_ALL_ROLES_PRIVS").returningResultSet("USERSRESULT", BeanPropertyRowMapper.newInstance(ProcResult.class))
			.returningResultSet("INTERIMRESULT", BeanPropertyRowMapper.newInstance(ProcResult.class));
	SqlParameterSource in = new MapSqlParameterSource().addValue("USERID", userId);
	Map out = simpleJdbcCall.execute(in);
	
	List<ProcResult> usersPrivs= (List)out.get("USERSRESULT");
	List<ProcResult> interimPrivs= (List)out.get("INTERIMRESULT");
	ArrayList<UserAppPrivs> listToReturn=new ArrayList();
	
	if(interimPrivs==null) {
		interimPrivs=new ArrayList();
	}
	
	if(usersPrivs==null) {
		usersPrivs=new ArrayList();
	}
	for(int i=0;i<usersPrivs.size();i++) {

	 
		UserAppPrivs jsonResponse=new UserAppPrivs();
		List<Role> roles = new ArrayList();
		
		jsonResponse.setIDAPPLICATION(usersPrivs.get(i).getIDAPPLICATION());
		jsonResponse.setIDUSERIDMS(usersPrivs.get(i).getIDUSERIDMS());
		jsonResponse.setAPPLICATIONDESC(usersPrivs.get(i).getAPPLICATIONDESC());
		jsonResponse.setAPPLICATIONDETAIL(usersPrivs.get(i).getAPPLICATIONDETAIL());
		jsonResponse.setAPPLICATIONMODE(usersPrivs.get(i).getAPPLICATIONMODE());
		jsonResponse.setAPPLICATIONTITLE(usersPrivs.get(i).getAPPLICATIONTITLE());
		jsonResponse.setAPPLICATIONURL(usersPrivs.get(i).getAPPLICATIONURL());
		jsonResponse.setICONURL(usersPrivs.get(i).getICONURL());
		jsonResponse.setPUBLICFLAG(usersPrivs.get(i).getPUBLICFLAG());
		jsonResponse.setIEFLAG(usersPrivs.get(i).getIEFLAG());
		jsonResponse.setINTERIMSTARTDATE(usersPrivs.get(i).getINTERIMSTARTDATE());
		jsonResponse.setINTERIMENDDATE(usersPrivs.get(i).getINTERIMENDDATE());
		if(usersPrivs.get(i).getIDROLE()==null ) {//autre application (n'appartient pas à l'utilisateur)
			
			jsonResponse.setROLES(roles);
			listToReturn.add(jsonResponse);
		}else { // l'application appartient à l'utilisateur ou bien non (d'autres utilisateurs ont des droits sur cette app)
			if(usersPrivs.get(i).getPRIVENDDATE()!=null &&
					(usersPrivs.get(i).getPRIVSTARTDATE().before(new Date())|| usersPrivs.get(i).getPRIVSTARTDATE().compareTo(new Date())==0) &&
					usersPrivs.get(i).getPRIVENDDATE().after(new Date())) { //tester si le privilège est toujours valide (date fin > date sys)
				Role role=new Role();
				role.setIDROLE(usersPrivs.get(i).getIDROLE());
				role.setPRIVENDDATE(usersPrivs.get(i).getPRIVENDDATE());
				role.setPRIVSTARTDATE(usersPrivs.get(i).getPRIVSTARTDATE());
				role.setIDSTATUS(usersPrivs.get(i).getIDSTATUS());
				role.setDESCROLE(usersPrivs.get(i).getDESCROLE());
				if(userId==usersPrivs.get(i).getIDUSERIDMS()) { //ajouter le role que si cette appli appartient à l'utilisateur
					
					roles.add(role);
				}
			
				for(int j=i+1;j<usersPrivs.size();j++) { // tester si il y'a d'autres role sur cette meme application
					Role otherRole=new Role();
					if(usersPrivs.get(i).getIDAPPLICATION()==usersPrivs.get(j).getIDAPPLICATION() ) {
						if(usersPrivs.get(j).getPRIVENDDATE()!=null && 
								(usersPrivs.get(j).getPRIVSTARTDATE().before(new Date())|| usersPrivs.get(j).getPRIVSTARTDATE().compareTo(new Date())==0) &&
								usersPrivs.get(j).getPRIVENDDATE().after(new Date())) {
							otherRole.setIDROLE(usersPrivs.get(j).getIDROLE());
							otherRole.setPRIVENDDATE(usersPrivs.get(j).getPRIVENDDATE());
							otherRole.setPRIVSTARTDATE(usersPrivs.get(j).getPRIVSTARTDATE());
							otherRole.setIDSTATUS(usersPrivs.get(j).getIDSTATUS());
							otherRole.setDESCROLE(usersPrivs.get(j).getDESCROLE());
							if(userId==usersPrivs.get(j).getIDUSERIDMS()) {//ajouter le role que si cette appli appartient à l'utilisateur
								
								roles.add(otherRole);
							}
							
							
						}
						usersPrivs.remove(j); // suppression de cette instance afin d'eviter la redandonce 
						
					}
				}
				if(userId!=usersPrivs.get(i).getIDUSERIDMS()) {
					jsonResponse.setROLES(new ArrayList());
				}else {
					jsonResponse.setROLES(roles);
				}
				
				
			}else {
				jsonResponse.setROLES(new ArrayList());
			}
			
			listToReturn.add(jsonResponse);
			
		}
	
	
}
	// avoir les privs des utilisateurs pour lequels current user est interim
	for(int i=0;i<interimPrivs.size();i++) {
		UserAppPrivs jsonResponse=new UserAppPrivs();
		List<Role> roles = new ArrayList();
		
		jsonResponse.setIDAPPLICATION(interimPrivs.get(i).getIDAPPLICATION());
		jsonResponse.setIDUSERIDMS(interimPrivs.get(i).getIDUSERIDMS());
		jsonResponse.setAPPLICATIONDESC(interimPrivs.get(i).getAPPLICATIONDESC());
		jsonResponse.setAPPLICATIONDETAIL(interimPrivs.get(i).getAPPLICATIONDETAIL());
		jsonResponse.setAPPLICATIONMODE(interimPrivs.get(i).getAPPLICATIONMODE());
		jsonResponse.setAPPLICATIONTITLE(interimPrivs.get(i).getAPPLICATIONTITLE());
		jsonResponse.setAPPLICATIONURL(interimPrivs.get(i).getAPPLICATIONURL());
		jsonResponse.setICONURL(interimPrivs.get(i).getICONURL());
		jsonResponse.setPUBLICFLAG(interimPrivs.get(i).getPUBLICFLAG());
		jsonResponse.setINTERIMSTARTDATE(interimPrivs.get(i).getINTERIMSTARTDATE());
		jsonResponse.setINTERIMENDDATE(interimPrivs.get(i).getINTERIMENDDATE());
		jsonResponse.setIEFLAG(interimPrivs.get(i).getIEFLAG());
		
			if(interimPrivs.get(i).getPRIVENDDATE()!=null && 
					(interimPrivs.get(i).getPRIVSTARTDATE().before(new Date())|| interimPrivs.get(i).getPRIVSTARTDATE().compareTo(new Date())==0) &&
					interimPrivs.get(i).getPRIVENDDATE().after(new Date())) {//tester si le privilège est toujours valide (date fin > date sys)
				Role role=new Role();
				role.setIDROLE(interimPrivs.get(i).getIDROLE());
				role.setPRIVENDDATE(interimPrivs.get(i).getPRIVENDDATE());
				role.setPRIVSTARTDATE(interimPrivs.get(i).getPRIVSTARTDATE());
				role.setIDSTATUS(interimPrivs.get(i).getIDSTATUS());
				role.setDESCROLE(interimPrivs.get(i).getDESCROLE());
				//System.out.println(interimPrivs.get(i).getAPPLICATIONDESC());
				roles.add(role);
				for(int j=i+1;j<interimPrivs.size();j++) {
					Role otherRole=new Role();
					if(interimPrivs.get(i).getIDAPPLICATION()==interimPrivs.get(j).getIDAPPLICATION() ) {// tester si il y'a d'autres role sur cette meme application
						if(interimPrivs.get(j).getPRIVENDDATE()!=null
								&&
								(interimPrivs.get(j).getPRIVSTARTDATE().before(new Date())|| interimPrivs.get(j).getPRIVSTARTDATE().compareTo(new Date())==0) &&
								interimPrivs.get(j).getPRIVENDDATE().after(new Date())) {//tester si le privilège est toujours valide (date fin > date sys)
							otherRole.setIDROLE(interimPrivs.get(j).getIDROLE());
							otherRole.setPRIVENDDATE(interimPrivs.get(j).getPRIVENDDATE());
							otherRole.setPRIVSTARTDATE(interimPrivs.get(j).getPRIVSTARTDATE());
							otherRole.setIDSTATUS(interimPrivs.get(j).getIDSTATUS());
							otherRole.setDESCROLE(interimPrivs.get(j).getDESCROLE());
							roles.add(otherRole);
							
						}
						interimPrivs.remove(j);// suppression de cette instance afin d'eviter la redandonce 
						
					}
				}
				jsonResponse.setROLES(roles);
				listToReturn.add(jsonResponse);
			}
			
	}
	
		//avoir tt les roles d'une meme appli dans une seule instance (user's priv ou bien interim)
		for(int i=0;i<listToReturn.size();i++) {
			for(int j=i+1;j<listToReturn.size();j++) {
				if(listToReturn.get(i).getIDAPPLICATION()==listToReturn.get(j).getIDAPPLICATION()) {
					
					for(int k=0;k<listToReturn.get(j).getROLES().size();k++) {
						listToReturn.get(i).getROLES().add(listToReturn.get(j).getROLES().get(k));
					}
					listToReturn.remove(j);
				}
			}
		
	}
	
	return listToReturn;

}

@PostMapping({"getUsersAppPrivs"})
public ArrayList<UserAppPrivs>  getUsersAppPrivs(@RequestBody UserIDMS user) {
	try {
		
		ArrayList<UserAppPrivs> listToReturn=new ArrayList();
		user=userIdmsService.findUserBySon(user);
		
		listToReturn = getResult(user.getIduseridms());
		
		
		return listToReturn;
	}catch(Exception e) {
		System.out.println("Exception getUsersAppPrivs in controller==>" + e.getMessage());
	}
	
	return null;
}
/********************************************Get user's objects when login*******************************************/

//@GetMapping( "/api/auth/test" )
public Map test() {
	SimpleJdbcCall simpleJdbcCall;
	simpleJdbcCall = new SimpleJdbcCall(jdbcTemplate).withProcedureName("FIND_ALL_OBJECTS").returningResultSet("USERSOBJECTS",BeanPropertyRowMapper.newInstance(ObjectsResult.class))
			.returningResultSet("INTERIMOBJECTS", BeanPropertyRowMapper.newInstance(ObjectsResult.class));
	SqlParameterSource in = new MapSqlParameterSource().addValue("USERID", 2);
	Map out = simpleJdbcCall.execute(in);
	return out;
}


//@GetMapping( "/api/auth/test" )
public ArrayList<UsersObject> getObjects(Integer userId){
	
	SimpleJdbcCall simpleJdbcCall;
	simpleJdbcCall = new SimpleJdbcCall(jdbcTemplate).withProcedureName("FIND_ALL_OBJECTS").returningResultSet("USERSOBJECTS",BeanPropertyRowMapper.newInstance(ObjectsResult.class))
			.returningResultSet("INTERIMOBJECTS", BeanPropertyRowMapper.newInstance(ObjectsResult.class));
		
	SqlParameterSource in = new MapSqlParameterSource().addValue("USERID",userId);
	Map out = simpleJdbcCall.execute(in);
	ArrayList<ObjectsResult> usersObjects=new ArrayList();
	ArrayList<ObjectsResult> interimObjects=new ArrayList();
	ArrayList<UsersObject> listToReturn = new ArrayList();
	usersObjects=(ArrayList<ObjectsResult>) out.get("USERSOBJECTS");
	interimObjects=(ArrayList<ObjectsResult>) out.get("INTERIMOBJECTS");
	
	
	//remove all invalid users objects 
	for(int i=0;i<usersObjects.size();i++) {
		if(usersObjects.get(i).getPRIVSTARTDATE().after(new Date())||usersObjects.get(i).getPRIVENDDATE().before(new Date())) {
			usersObjects.remove(i);
		}
	}
	
	
	//remove all invalid interim objects 
		for(int i=0;i<interimObjects.size();i++) {
			if(interimObjects.get(i).getPRIVSTARTDATE().after(new Date())||interimObjects.get(i).getPRIVENDDATE().before(new Date())) {
				interimObjects.remove(i);
			}
		}
	
	//change data structure for users objects
	for(int i=0;i<usersObjects.size();i++) {
		UsersObject jsonResponse=new UsersObject();
		List<ObjectType> objects = new ArrayList();
		
		jsonResponse.setIDAPPLICATION(usersObjects.get(i).getIDAPPLICATION());
		ObjectType ob=new ObjectType(usersObjects.get(i).getIDOBJECT(),
				usersObjects.get(i).getIDOBJECTTYPE(),
				usersObjects.get(i).getIDPARENTOBJECT(),
				usersObjects.get(i).getIDSTATUS(),
				usersObjects.get(i).getDESCOBJECT(),
				usersObjects.get(i).getPRIVSTARTDATE(),
				usersObjects.get(i).getPRIVENDDATE(),
				usersObjects.get(i).getIDROLE(),
				usersObjects.get(i).getINTERIMSTARTDATE(),
				usersObjects.get(i).getINTERIMENDDATE());
		
		
		objects.add(ob);
		
		for(int j=i+1;j<usersObjects.size();j++) {
			
			if(usersObjects.get(i).getIDAPPLICATION()==usersObjects.get(j).getIDAPPLICATION()) {
				
				ObjectType otherOb=new ObjectType(usersObjects.get(j).getIDOBJECT(),
						usersObjects.get(j).getIDOBJECTTYPE(),
						usersObjects.get(j).getIDPARENTOBJECT(),
						usersObjects.get(j).getIDSTATUS(),
						usersObjects.get(j).getDESCOBJECT(),
						usersObjects.get(j).getPRIVSTARTDATE(),
						usersObjects.get(j).getPRIVENDDATE(),
						usersObjects.get(j).getIDROLE(),
						usersObjects.get(j).getINTERIMSTARTDATE(),
						usersObjects.get(j).getINTERIMENDDATE());
				objects.add(otherOb);
				usersObjects.remove(j);
				j--;
			}
		}
		jsonResponse.setObjects(objects);
		listToReturn.add(jsonResponse);
	}
	
	//change data structure for interim objects
	for(int i=0;i<interimObjects.size();i++) {
		UsersObject jsonResponse=new UsersObject();
		List<ObjectType> objects = new ArrayList();
		
		jsonResponse.setIDAPPLICATION(interimObjects.get(i).getIDAPPLICATION());
		ObjectType ob=new ObjectType(interimObjects.get(i).getIDOBJECT(),
				interimObjects.get(i).getIDOBJECTTYPE(),
				interimObjects.get(i).getIDPARENTOBJECT(),
				interimObjects.get(i).getIDSTATUS(),
				interimObjects.get(i).getDESCOBJECT(),
				interimObjects.get(i).getPRIVSTARTDATE(),
				interimObjects.get(i).getPRIVENDDATE(),
				interimObjects.get(i).getIDROLE(),
				interimObjects.get(i).getINTERIMSTARTDATE(),
				interimObjects.get(i).getINTERIMENDDATE());
		
		objects.add(ob);
		
		for(int j=i+1;j<interimObjects.size();j++) {
			
			if(interimObjects.get(i).getIDAPPLICATION()==interimObjects.get(j).getIDAPPLICATION()) {
				
				ObjectType otherOb=new ObjectType(interimObjects.get(j).getIDOBJECT(),
						interimObjects.get(j).getIDOBJECTTYPE(),
						interimObjects.get(j).getIDPARENTOBJECT(),
						interimObjects.get(j).getIDSTATUS(),
						interimObjects.get(j).getDESCOBJECT(),
						interimObjects.get(j).getPRIVSTARTDATE(),
						interimObjects.get(j).getPRIVENDDATE(),
						interimObjects.get(j).getIDROLE(),
						interimObjects.get(j).getINTERIMSTARTDATE(),
						interimObjects.get(j).getINTERIMENDDATE());
				objects.add(otherOb);
				interimObjects.remove(j);
				j--;
			}
		}
		jsonResponse.setObjects(objects);
		listToReturn.add(jsonResponse);
	}
	if(interimObjects.size()!=0) {
		//avoir tt les roles d'une meme appli dans une seule instance (user's objects ou bien interim)
		for(int i=0;i<listToReturn.size();i++) {
			for(int j=i+1;j<listToReturn.size();j++) {
				if(listToReturn.get(i).getIDAPPLICATION()==listToReturn.get(j).getIDAPPLICATION()) {
					
					for(int k=0;k<listToReturn.get(j).getObjects().size();k++) {
						listToReturn.get(i).getObjects().add(listToReturn.get(j).getObjects().get(k));
					}
					listToReturn.remove(j);
				}
			}
		}
	}

		return listToReturn;
	
	
	
}

@PostMapping({"getUsersObjects"})
public ArrayList<UsersObject>  getUsersObjects(@RequestBody UserIDMS user) {
	try {
		
		ArrayList<UsersObject> listToReturn=new ArrayList();
		user=userIdmsService.findUserBySon(user);
		
		listToReturn = getObjects(user.getIduseridms());
		
		
		return listToReturn;
	}catch(Exception e) {
		System.out.println("Exception getUsersObjects in controller==>" + e.getMessage());
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


/**************************************************Settings app management************************************************/
//******Add app**********************//
@PostMapping({"addApplication"})
public Applications addApplication(@RequestBody Applications app) {
	try {
		app=appService.addApplication(app);
		AppLanguage appLang= new AppLanguage();
		appLang.setIdapplication(app.getIdapplication());
		appLang.setIdlanguage(1);
		appLangService.saveAppLang(appLang);
		AppRoles appRole1=new AppRoles(app.getIdapplication(), 1, "Admin");
		AppRoles appRole2=new AppRoles(app.getIdapplication(), 1, "Admin Fonctionnel");
		appRole1=appRoleService.saveAppRole(appRole1);
		//System.out.println(appRole1.getIdrole());
		appRole2=appRoleService.saveAppRole(appRole2);
		//System.out.println(appRole2.getIdrole());
		return app;
	}catch(Exception e) {
		System.out.println("Exception  {addApplication controller}==>" + e.getMessage());
	}
	return null;
}
//**********update app*********************//
@PostMapping({"updateApplication"})
public Applications updateApplication(@RequestBody Applications app) {
	try {
		return appService.updateApp(app);
	}catch(Exception e) {
		System.out.println("Exception updateApp in ApplicationsService {updateApplication controller}==>" + e.getMessage());
	}
	return null;
}

//***********delete app******************//
@PostMapping({"deleteApplication"})
public Applications deleteApplication(@RequestBody Applications app) {
	try {
		return appService.deleteApp(app);
	}catch(Exception e) {
		System.out.println("Exception deleteApp in ApplicationsService {deleteApplication controller}==>" + e.getMessage());
	}
	return null;
}

/**************************************************Settings role management************************************************/
//**************add role**********************//
//get all users idms for select
@GetMapping({"getAllIdmsUsers"})
public List<UserIDMS> getAllIdmsUsers(){
	try {
		return userIdmsService.getAllUsers();
	}catch(Exception e) {
		System.out.println("Exception in UserIdmsService ==>getAllUsers()   :{getAllIdmsUsers==>controller}  :" +e.getMessage());
	}
	return null;
}


//save appRole (new role)
@PostMapping({"saveNewRole"})
public AppRoles saveNewRole(@RequestBody AppRoles approle) {
	try {
		return appRoleService.saveAppRole(approle);
	}catch(Exception e) {
		System.out.println("Exception in appRoleService ==>saveAppRole()   :{saveNewRole==>controller}  :" +e.getMessage());
	}
	return null;
}

//*************affect role**********************//
//save privs (new privs for app)
@PostMapping({"saveNewPrivs"})
public AppPrivs saveNewPrivs(@RequestBody  AppPrivs privs) {
	try {
		return appPrivsService.saveAppPrivs(privs);
	}catch(Exception e) {
		System.out.println("Exception in AppPrivsService ==>saveAppPrivs()   :{saveNewPrivs==>controller}  :" +e.getMessage());
	}
	return null;
}

//***********delete role*************************//
@PostMapping({"deleteRole"})
public AppRoles deleteRole(@RequestBody AppRoles approle) {
	try {
		return appRoleService.deleteRole(approle);
	}catch(Exception e) {
		System.out.println("Exception in appRoleService ==>deleteRole()   :{deleteRole==>controller}  :" +e.getMessage());
	}
	return null;
}
/**************************************************Settings object management************************************************/
//**************associate objects**********************//

//get all objects for selected app
@PostMapping({"findObjectsByApp"})
public List<AppObject> findObjectsByApp(@RequestBody Applications app){
	try {
		return appObjService.findObjectsByApp(app);
	}catch(Exception e) {
		System.out.println("Exception  findObjectsByApp() ==>AppObjectService   :{findObjectsByApp==>controller}  :" +e.getMessage());
	}
	return null;
}

//save associated objects to role
@PostMapping({"saveRoleObjects"})
public List<RoleObjects> saveRoleObjects(@RequestBody List<RoleObjects> roleObjcts){
	try {
		return roleObjService.saveRoleObjects(roleObjcts);
	}catch(Exception e) {
		System.out.println("Exception  saveRoleObjects() ==>RoleObjectsService   :{saveRoleObjects==>controller}  :" +e.getMessage());
	}
	return null;
}
//save deleted objects to role
@PostMapping({"deleteRoleObjects"})
public List<RoleObjects> deleteRoleObjects(@RequestBody List<RoleObjects> roleObjcts){
	try {
		return roleObjService.deleteRoleObjects(roleObjcts);
	}catch(Exception e) {
		System.out.println("Exception  deleteRoleObjects() ==>RoleObjectsService   :{deleteRoleObjects==>controller}  :" +e.getMessage());
	}
	return null;
}
//save associated objects to user
@PostMapping({"saveObjectUser"})
public List<ObjectUsers> saveObjectUser(@RequestBody List<ObjectUsers> roleObjcts){
	try {
		return objUserService.saveObjUser(roleObjcts);
	}catch(Exception e) {
		System.out.println("Exception  saveObjUser() ==>ObjectUsersService   :{saveObjectUser==>controller}  :" +e.getMessage());
	}
	return null;
}
//save deleted objects to user
@PostMapping({"deleteObjectUser"})
public List<ObjectUsers> deleteObjectUser(@RequestBody List<ObjectUsers> roleObjcts){
	try {
		return objUserService.deleteObjUser(roleObjcts);
	}catch(Exception e) {
		System.out.println("Exception  deleteObjUser() ==>ObjectUsersService   :{deleteObjectUser==>controller}  :" +e.getMessage());
	}
	return null;
}
//**************add objects**********************//
//get all object type
@GetMapping({"getAllObjTypes"})
public List<ObjectTypeApp> getAllObjTypes(){
	try {
		return objTypeService.getAllObjType();
	}catch(Exception e) {
		System.out.println("Exception  getAllObjType() in ObjectTypeService   :{getAllObjTypes==>controller}==>" + e.getMessage());
	}
	return null;
}

//add object (save in DB)
@PostMapping({"addAppObject"})
public AppObject addAppObject(@RequestBody AppObject appObject){
	try {
		return appObjService.addAppObject(appObject);
	}catch(Exception e) {
		System.out.println("Exception  addAppObject() in AppObjectService  :{addAppObject==>controller}  :" +e.getMessage());
	}
	return null;
}

//delete object
@PostMapping({"deleteAppObject"})
public List<AppObject> deleteAppObject(@RequestBody  List<AppObject> appObjects){
	try {
		for(int i=0;i<appObjects.size();i++) {
			appObjService.deleteAppObject(appObjects.get(i));
		}
		return appObjects;
	}catch(Exception e) {
		System.out.println("Exception  deleteAppObject() in AppObjectService  :{deleteAppObject==>controller}  :" +e.getMessage());
	}
	return null;
}

//update object
@PostMapping({"updateAppObject"})
public AppObject updateAppObject(@RequestBody AppObject appObject){
	try {
		System.out.println(appObject.getIDOBJECT());
		return appObjService.updateAppObject(appObject);
	}catch(Exception e) {
		System.out.println("Exception  updateAppObject() in AppObjectService  :{updateAppObject==>controller}  :" +e.getMessage());
	}
	return null;
}
}
