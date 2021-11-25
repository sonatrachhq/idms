package com.sonatrach.dz;



import java.io.BufferedReader;


import java.io.IOException;
import java.io.InputStreamReader;
import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import javax.naming.AuthenticationException;
import javax.naming.Context;
import javax.naming.NamingEnumeration;
import javax.naming.NamingException;
import javax.naming.directory.Attributes;
import javax.naming.directory.DirContext;
import javax.naming.directory.InitialDirContext;
import javax.naming.directory.SearchControls;
import javax.naming.directory.SearchResult;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.ldap.core.ContextSource;
import org.springframework.ldap.core.LdapTemplate;
import org.springframework.ldap.core.support.LdapContextSource;
import org.springframework.ldap.filter.AndFilter;
import org.springframework.ldap.filter.EqualsFilter;
import org.springframework.ldap.filter.Filter;
import org.springframework.ldap.support.LdapUtils;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
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
import com.sonatrach.dz.email.domain.MailRequest;
import com.sonatrach.dz.email.domain.MailResponse;
import com.sonatrach.dz.email.service.EmailService;
import com.sonatrach.dz.languages.domain.Languages;
import com.sonatrach.dz.languages.service.LanguageService;
import com.sonatrach.dz.message.request.LoginForm;
import com.sonatrach.dz.message.request.SignUpForm;
import com.sonatrach.dz.message.response.JwtResponse;
import com.sonatrach.dz.message.response.ResponseMessage;
import com.sonatrach.dz.objectType.domain.ObjectTypeApp;
import com.sonatrach.dz.objectType.service.ObjectTypeService;
import com.sonatrach.dz.objectUsers.domain.ObjectUsers;
import com.sonatrach.dz.objectUsers.service.ObjectUsersService;
import com.sonatrach.dz.profil.domain.Profil;
import com.sonatrach.dz.profil.service.ProfilService;
import com.sonatrach.dz.roleObjects.domain.RoleObjects;
import com.sonatrach.dz.roleObjects.service.RoleObjectsService;
import com.sonatrach.dz.security.jwt.JwtProvider;
import com.sonatrach.dz.storedProcResponse.ObjectType;
import com.sonatrach.dz.storedProcResponse.ObjectsResult;

import com.sonatrach.dz.storedProcResponse.ProcResult;
import com.sonatrach.dz.storedProcResponse.Role;
import com.sonatrach.dz.storedProcResponse.UserAppPrivs;
import com.sonatrach.dz.storedProcResponse.UsersObject;
import com.sonatrach.dz.userIDMS.domain.UserIDMS;
import com.sonatrach.dz.userIDMS.service.UserIdmsService;
import com.sonatrach.dz.utils.Ntlm;
import com.sonatrach.dz.utils.UserAD;

import freemarker.core.ParseException;
import freemarker.template.MalformedTemplateNameException;
import freemarker.template.TemplateException;
import freemarker.template.TemplateNotFoundException;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/*
 * Developped by : AID FERIEL for SONATRACH --2021--
 * Email:aidferiel@gmail.com
 */


@Slf4j
@RestController
@CrossOrigin(origins = "*")
@SecurityRequirement(name = "sonatrachapidoc")

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
@Autowired
private EmailService emailService;

@Autowired
Environment env;
DirContext connection;

private static final Logger log = LoggerFactory.getLogger(Controller.class);


@Autowired
PasswordEncoder encoder;




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
		log.error("Exception checkToken() in  controller ==>" + e.getMessage());
	}
	
	return null;
	
}

/*************************************LOGIN/SUBSCRIBE PAGE***************************************************************************/
/* create connection during object creation */
public boolean newConnectionAD() {
	String url=env.getProperty("ldap.url");
	String base=env.getProperty("ldap.base");
	String psw=env.getProperty("ldap.password");

	Properties env = new Properties();
	env.put(Context.INITIAL_CONTEXT_FACTORY, "com.sun.jndi.ldap.LdapCtxFactory");
	env.put(Context.PROVIDER_URL, url);
	env.put(Context.SECURITY_PRINCIPAL, base);  
	env.put(Context.SECURITY_CREDENTIALS, psw);
	
	try {
		connection = new InitialDirContext(env);		
		log.info("connection etablie!      " + connection);
		return true;
		
	} catch (AuthenticationException ex) {
		log.error(ex.getMessage());
	} catch (NamingException e) {
		log.error(e.getMessage());
	}
	return false;
}



/* use this to search any existing user in AD */
public UserAD searchUserInAD(String sonuser) throws NamingException {
	//newConnectionAD();
	String searchFilter = "(samAccountName="+sonuser+")";
	String[] reqAtt = {"givenName", "sn", "memberOf", "mail","cn"};
	SearchControls controls = new SearchControls();
	controls.setSearchScope(SearchControls.SUBTREE_SCOPE);
	controls.setReturningAttributes(reqAtt);
	//System.out.println(searchFilter);
	NamingEnumeration<javax.naming.directory.SearchResult> users = connection.search("OU=Pole,DC=corp,DC=sonatrach,DC=dz", searchFilter, controls);
	//System.out.println(users.hasMore());
	SearchResult result = null;
	
	
	while (users.hasMore()) {
		//System.out.println("inside while");
		result = (SearchResult) users.nextElement();
		Attributes attr = result.getAttributes();
		String name = attr.get("cn").get(0).toString();
		String email=attr.get("mail").get(0).toString();
		
		//System.out.println(name+"  "+email);
		UserAD response=new UserAD(name, email);
		return response;
		
	}
	return null;

}

@RequestMapping(value = "/api/auth/signin", method = RequestMethod.POST)
public ResponseEntity<?> signin(@Valid @RequestBody LoginForm loginRequest) {
	try {
		
		  ResponseEntity<?> response= userIdmsService.signin(loginRequest);
		  
		  if(response.getStatusCodeValue()==200) { 
			  UserIDMS currentUser=userIdmsService.updateUsersPsw(loginRequest.getSonuser().toLowerCase(),
					  "$2a$10$zpEvPQ1RGBXyU.KvnsWHCuy1CkjgXC98k7ZuK5BZUwOXCOoa.t.vq"); 
		  if(currentUser!=null) {
		 //log.info("updateUsersPsw   "+currentUser.getPswuser()); 
		  return response;
		   }
		  
		  }
		 
		
	}catch(Exception e) {
		log.error("Exception signin() in UserIdmsService {signin controller} ==>" + e.getMessage());
	}
	return null;
}

//using AD without signin
@PostMapping("api/auth/authUser")
public ResponseEntity<?> authUser(@RequestBody Ntlm ntlm ) {
	try { 
		 log.info("ntlm  "+ntlm.toString());
		 //log.info("domain  "+ntlm.getDomain());
		 //log.info("son  "+ntlm.getUsername());
//		 String domain=System.getenv().get("USERDOMAIN");
//		 String sonUser=System.getenv().get("USERNAME").toLowerCase();
		String domain=ntlm.getDomain();
		String sonUser=ntlm.getUsername().toLowerCase();
		 if(domain.equals("SONATRACH")) {//if user is in domain sonatrach
			
			 boolean isAdActive=newConnectionAD();
			 if(isAdActive) { //if AD is active
				// System.out.println("isAdActive  "+isAdActive);
				 UserAD userExistsInAD=searchUserInAD(sonUser);
				
				 if(userExistsInAD!=null) { //if user exits in AD
					// log.info("userExistsInAD  "+userExistsInAD.getName()+"      "+ userExistsInAD.getEmail());
					 ResponseEntity<?> userExistsInDB=userIdmsService.checkUserExists(sonUser,userExistsInAD.getName());
					 if(userExistsInDB!=null) { //if user exits in DB
						 //log.info("userExistsInDB  "+userExistsInDB.toString());
						 return userExistsInDB;
					 }else { //if user doesn't exist in DB
						 ResponseEntity<?>  sonSavedInDB=userIdmsService.saveUser(sonUser, userExistsInAD.getEmail(), userExistsInAD.getName()); //save user in DB
						 if(sonSavedInDB!=null) {// if user saved in DB
							 //System.out.println("sonSavedInDB  "+sonSavedInDB.toString());
							 return sonSavedInDB;
						 }else { //problem when saving user in DB
							 //System.out.println("problem when saving user in DB  ");
							 return ResponseEntity.ok(new JwtResponse("","","","")); //to force user to reload and retry
						 }
					 }
				 }
				 
			 }
		 }
		
	}catch(Exception e) {
		log.error("Exception  {authUser controller} ==>" + e.getMessage());
	}
	return null;
}

//send random psw to user by email
public MailResponse sendPswByEmail( MailRequest request) {
	Map<String, Object> model = new HashMap<>();
	model.put("msg", request.getMsg());

	MailResponse response = new MailResponse();

		try {
			response = emailService.sendEmail(request,  model);
		} catch (TemplateNotFoundException e) {
			log.error("Exception  sendEmail() in emailService {sendPswByEmail controller}==>" + e.getMessage());
		} catch (MalformedTemplateNameException e) {
			log.error("Exception  sendEmail() in emailService {sendPswByEmail controller}==>" + e.getMessage());
		} catch (ParseException e) {
			log.error("Exception  sendEmail() in emailService {sendPswByEmail controller}==>" + e.getMessage());
		} catch (IOException e) {
			log.error("Exception  sendEmail() in emailService {sendPswByEmail controller}==>" + e.getMessage());
		} catch (TemplateException e) {
			log.error("Exception  sendEmail() in emailService {sendPswByEmail controller}==>" + e.getMessage());
		}catch(Exception e ) {
			log.error("Exception  sendEmail() in emailService {sendPswByEmail controller}==>" + e.getMessage());
		}

	

	
	return response;
}
// Method to generate a random alphanumeric password of a specific length
public static String generateRandomPassword(int len)
{
    // ASCII range – alphanumeric (0-9, a-z, A-Z)
    final String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    SecureRandom random = new SecureRandom();
    StringBuilder sb = new StringBuilder();

    // each iteration of the loop randomly chooses a character from the given
    // ASCII range and appends it to the `StringBuilder` instance

    for (int i = 0; i < len; i++)
    {
        int randomIndex = random.nextInt(chars.length());
        sb.append(chars.charAt(randomIndex));
    }

    return sb.toString();
}

//to check if user exists in DB before redirecting to login page
@PostMapping("api/auth/findUserBySON")
public boolean findUserBySON(@RequestBody Ntlm ntlm) {
try {
	  long millis=System.currentTimeMillis();  
      java.sql.Date date=new java.sql.Date(millis);  
      //String sonUser=System.getenv().get("USERNAME").toLowerCase();
      String sonUser=ntlm.getUsername().toLowerCase();
      log.info("sonUser   "+sonUser);
		UserIDMS user=new UserIDMS(1, sonUser.toUpperCase(),"", 1, 0,date, "", "");
		user=userIdmsService.findUserBySon(user);
		if(user!=null) {
			
			String randomPassword = generateRandomPassword(8);
			userIdmsService.updateUsersPsw(sonUser, randomPassword);
			
			log.info("randomPassword    "+randomPassword);
			MailRequest request=new MailRequest("Bonjour,\n Veuillez utiliser ce mot de passe pour vous connecter : "+randomPassword+"\n Cordialement.", user.getEmail(), "Feriel.Aid@Sonatrach.dz", "Mot de passe temporaire");
			log.info("request.getMsg()  email  "+request.getMsg());
			sendPswByEmail(request);
			return true;
		}
	}catch(Exception e) {
		log.error("Exception findUserBySon() in UserIdmsService {findUserBySON controller} ==>" + e.getMessage());
	}
	return false;
}

//register
@RequestMapping(value = "/api/auth/signup", method = RequestMethod.POST)
public ResponseEntity<?> signup(@Valid @RequestBody SignUpForm signUpRequest) {
	try {
		return userIdmsService.registerUser(signUpRequest);
	}catch(Exception e ) {
		log.error("Exception registerUser() in UserIdmsService {signup controller}==>" + e.getMessage());
	}
	return null;
}
//for the select in signup
@GetMapping( "/api/auth/getAllLanguages" )
public List<Languages> getAllLanguages(){
	try {
		return langService.getAllLangs();
	}catch(Exception e) {
		log.error("Exception getAllLangs() in LanguageService {getAllLanguages controller}==>" + e.getMessage());
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
		log.error("Exception setDefaultProfil() in ProfilService {saveProfil controller}==>" + e.getMessage());
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
		log.error("Exception getIdmsRoles() in AppPrivsService {getUsersRoles controller}==>" + e.getMessage());
	}
	return null;
}
/**********************************************Home page *****************************************************************/
/********************************************Get user's apps &  roles when login*******************************************/
public int findDoublons(List<UserAppPrivs> usersPrivs,Integer idapp){
	

	
	for(int i=0;i<usersPrivs.size();i++) {
		if(usersPrivs.get(i).getIDAPPLICATION()==idapp) {
			return i;
		}
	}

	return -1;
}

public ArrayList<UserAppPrivs> getResult(Integer userId){
	
	SimpleJdbcCall simpleJdbcCall;
	simpleJdbcCall = new SimpleJdbcCall(jdbcTemplate).withProcedureName("FIND_ALL_ROLES_PRIVS").returningResultSet("USERSRESULT", BeanPropertyRowMapper.newInstance(ProcResult.class))
			.returningResultSet("INTERIMRESULT", BeanPropertyRowMapper.newInstance(ProcResult.class));
	SqlParameterSource in = new MapSqlParameterSource().addValue("USERID", userId);
	Map out = simpleJdbcCall.execute(in);
	List<ProcResult> usersPrivs= (List)out.get("USERSRESULT");
	List<ProcResult> interimPrivs= (List)out.get("INTERIMRESULT");
	ArrayList<UserAppPrivs> listToReturn=new ArrayList();
	ArrayList<UserAppPrivs> interim=new ArrayList();
	ArrayList<UserAppPrivs> myApps=new ArrayList();
	ArrayList<UserAppPrivs> otherApps=new ArrayList();
	ArrayList<ProcResult> mesApps=new ArrayList();
	ArrayList<ProcResult> autresApps=new ArrayList();




//diviser la liste en 2 mes applications et les autres
	for(int i=0;i<usersPrivs.size();i++) {
		if(usersPrivs.get(i).getIDUSERIDMS()==userId ) {
			mesApps.add(usersPrivs.get(i));
		}else {
			autresApps.add(usersPrivs.get(i));
		}
	}



	log.info("autresApps size==>"+autresApps.size()+"           mesApps size==>"+mesApps.size());

	//traitement sur mes applications
	for(int i=0;i<mesApps.size();i++) {
		UserAppPrivs jsonResponse=new UserAppPrivs();
		List<Role> roles = new ArrayList();
		jsonResponse.setIDAPPLICATION(mesApps.get(i).getIDAPPLICATION());
		jsonResponse.setIDUSERIDMS(mesApps.get(i).getIDUSERIDMS());
		jsonResponse.setAPPLICATIONDESC(mesApps.get(i).getAPPLICATIONDESC());
		jsonResponse.setAPPLICATIONDETAIL(mesApps.get(i).getAPPLICATIONDETAIL());
		jsonResponse.setAPPLICATIONMODE(mesApps.get(i).getAPPLICATIONMODE());
		jsonResponse.setAPPLICATIONTITLE(mesApps.get(i).getAPPLICATIONTITLE());
		jsonResponse.setAPPLICATIONURL(mesApps.get(i).getAPPLICATIONURL());
		jsonResponse.setICONURL(mesApps.get(i).getICONURL());
		jsonResponse.setPUBLICFLAG(mesApps.get(i).getPUBLICFLAG());
		jsonResponse.setINTERIMSTARTDATE(mesApps.get(i).getINTERIMSTARTDATE());
		jsonResponse.setINTERIMENDDATE(mesApps.get(i).getINTERIMENDDATE());
		jsonResponse.setIEFLAG(mesApps.get(i).getIEFLAG());
		Role role=new Role();
		role.setIDROLE(mesApps.get(i).getIDROLE());
		role.setPRIVENDDATE(mesApps.get(i).getPRIVENDDATE());
		role.setPRIVSTARTDATE(mesApps.get(i).getPRIVSTARTDATE());
		role.setIDSTATUS(mesApps.get(i).getIDSTATUS());
		role.setDESCROLE(mesApps.get(i).getDESCROLE());
		roles.add(role);
		
		for(int j=i+1;j<mesApps.size();j++) { // tester si il y'a d'autres role sur cette meme application
			
			if(mesApps.get(i).getIDAPPLICATION()==mesApps.get(j).getIDAPPLICATION() ) {
				
					Role otherRole=new Role();
					otherRole.setIDROLE(mesApps.get(j).getIDROLE());
					otherRole.setPRIVENDDATE(mesApps.get(j).getPRIVENDDATE());
					otherRole.setPRIVSTARTDATE(mesApps.get(j).getPRIVSTARTDATE());
					otherRole.setIDSTATUS(mesApps.get(j).getIDSTATUS());
					otherRole.setDESCROLE(mesApps.get(j).getDESCROLE());
					
						roles.add(otherRole);
						//suppression de cette instance afin d'eviter la redandonce 
						mesApps.remove(j);
						j--;
						 
				}
				
				
				
			}
			jsonResponse.setROLES(roles);
			myApps.add(jsonResponse);
			//suppression de cette instance afin d'eviter la redandonce 
			mesApps.remove(i);
			 i--;
			 
		
		}

	//traitement sur autres applications
	for(int i=0;i<autresApps.size();i++) {
		UserAppPrivs jsonResponse=new UserAppPrivs();
		List<Role> roles = new ArrayList();
		jsonResponse.setIDAPPLICATION(autresApps.get(i).getIDAPPLICATION());
		jsonResponse.setIDUSERIDMS(null);
		jsonResponse.setAPPLICATIONDESC(autresApps.get(i).getAPPLICATIONDESC());
		jsonResponse.setAPPLICATIONDETAIL(autresApps.get(i).getAPPLICATIONDETAIL());
		jsonResponse.setAPPLICATIONMODE(autresApps.get(i).getAPPLICATIONMODE());
		jsonResponse.setAPPLICATIONTITLE(autresApps.get(i).getAPPLICATIONTITLE());
		jsonResponse.setAPPLICATIONURL(autresApps.get(i).getAPPLICATIONURL());
		jsonResponse.setICONURL(autresApps.get(i).getICONURL());
		jsonResponse.setPUBLICFLAG(autresApps.get(i).getPUBLICFLAG());
		jsonResponse.setINTERIMSTARTDATE(autresApps.get(i).getINTERIMSTARTDATE());
		jsonResponse.setINTERIMENDDATE(autresApps.get(i).getINTERIMENDDATE());
		jsonResponse.setIEFLAG(autresApps.get(i).getIEFLAG());
		
		
		for(int j=i+1;j<autresApps.size();j++) { // tester si il y'a d'autres role sur cette meme application
			
			if(autresApps.get(i).getIDAPPLICATION()==autresApps.get(j).getIDAPPLICATION() ) {
				//suppression de cette instance afin d'eviter la redandonce 
				autresApps.remove(j);
				j--;
						 
				}
				
				
				
			}
			jsonResponse.setROLES(roles);
			otherApps.add(jsonResponse);
			//suppression de cette instance afin d'eviter la redandonce 
			autresApps.remove(i);
			 i--;
			 
		
		}

	//ajuter mes app a la liste finale
	listToReturn.addAll(myApps);
	

	for(int i=0;i<otherApps.size();i++) {
		//ajouter autre app a la liste finale que si j'ai pas cette application dans myApps
		if(findDoublons(listToReturn, otherApps.get(i).getIDAPPLICATION())==-1) {
			listToReturn.add(otherApps.get(i));
		}
	}

	log.info("otherApps size==>"+otherApps.size()+"           myApps size==>"+myApps.size()+"          listToReturn size==>"+listToReturn.size());

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

				Role role=new Role();
				role.setIDROLE(interimPrivs.get(i).getIDROLE());
				role.setPRIVENDDATE(interimPrivs.get(i).getPRIVENDDATE());
				role.setPRIVSTARTDATE(interimPrivs.get(i).getPRIVSTARTDATE());
				role.setIDSTATUS(interimPrivs.get(i).getIDSTATUS());
				role.setDESCROLE(interimPrivs.get(i).getDESCROLE());
			
				roles.add(role);
				for(int j=i+1;j<interimPrivs.size();j++) {
					Role otherRole=new Role();
					if(interimPrivs.get(i).getIDAPPLICATION()==interimPrivs.get(j).getIDAPPLICATION() ) {// tester si il y'a d'autres role sur cette meme application
						
							otherRole.setIDROLE(interimPrivs.get(j).getIDROLE());
							otherRole.setPRIVENDDATE(interimPrivs.get(j).getPRIVENDDATE());
							otherRole.setPRIVSTARTDATE(interimPrivs.get(j).getPRIVSTARTDATE());
							otherRole.setIDSTATUS(interimPrivs.get(j).getIDSTATUS());
							otherRole.setDESCROLE(interimPrivs.get(j).getDESCROLE());
							roles.add(otherRole);
							interimPrivs.remove(j);// suppression de cette instance afin d'eviter la redandonce 
							j--;
						}
						
						
					
				}
				jsonResponse.setROLES(roles);
				interim.add(jsonResponse);
				// suppression de cette instance afin d'eviter la redandonce 
				interimPrivs.remove(i);
				 i--;
			
			
	}
	for(int i=0;i<interim.size();i++) {
		//ajouter interim app a la liste finale 
		int index=findDoublons(listToReturn, interim.get(i).getIDAPPLICATION());
		if(index!=-1) {
			//si l'app existe deja dans la liste finale je prends que les roles
			List<Role> roles = new ArrayList();
			roles.addAll(listToReturn.get(index).getROLES());
			roles.addAll(interim.get(i).getROLES());
			listToReturn.get(index).setROLES(roles);
		}else {
			//sinon je l'ajoute dans la liste finale
			listToReturn.add(interim.get(i));
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
		log.error("Exception getUsersAppPrivs in controller==>" + e.getMessage());
	}
	
	return null;
}

//@GetMapping("api/auth/test")
public ArrayList<UserAppPrivs> getAdminApps(Integer userId){
	
	SimpleJdbcCall simpleJdbcCall;
	simpleJdbcCall = new SimpleJdbcCall(jdbcTemplate).withProcedureName("FIND_ROLES_PRIVS_ADMIN")
			.returningResultSet("USERSRESULT", BeanPropertyRowMapper.newInstance(ProcResult.class));
			
	SqlParameterSource in = new MapSqlParameterSource().addValue("USERID", userId);
	Map out = simpleJdbcCall.execute(in);
	List<ProcResult> usersPrivs= (List)out.get("USERSRESULT");
	ArrayList<UserAppPrivs> listToReturn=new ArrayList();
	

	//traitement sur les applications
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
		jsonResponse.setINTERIMSTARTDATE(usersPrivs.get(i).getINTERIMSTARTDATE());
		jsonResponse.setINTERIMENDDATE(usersPrivs.get(i).getINTERIMENDDATE());
		jsonResponse.setIEFLAG(usersPrivs.get(i).getIEFLAG());
		Role role=new Role();
		role.setIDROLE(usersPrivs.get(i).getIDROLE());
		role.setPRIVENDDATE(usersPrivs.get(i).getPRIVENDDATE());
		role.setPRIVSTARTDATE(usersPrivs.get(i).getPRIVSTARTDATE());
		role.setIDSTATUS(usersPrivs.get(i).getIDSTATUS());
		role.setDESCROLE(usersPrivs.get(i).getDESCROLE());
		roles.add(role);
		
		for(int j=i+1;j<usersPrivs.size();j++) { // tester si il y'a d'autres role sur cette meme application
			
			if(usersPrivs.get(i).getIDAPPLICATION().compareTo(usersPrivs.get(j).getIDAPPLICATION())==0 ) {
					//System.out.println(usersPrivs.get(i).getIDAPPLICATION()+"==>   "+usersPrivs.get(j).getIDAPPLICATION());
					Role otherRole=new Role();
					otherRole.setIDROLE(usersPrivs.get(j).getIDROLE());
					otherRole.setPRIVENDDATE(usersPrivs.get(j).getPRIVENDDATE());
					otherRole.setPRIVSTARTDATE(usersPrivs.get(j).getPRIVSTARTDATE());
					otherRole.setIDSTATUS(usersPrivs.get(j).getIDSTATUS());
					otherRole.setDESCROLE(usersPrivs.get(j).getDESCROLE());
					
						roles.add(otherRole);
						//suppression de cette instance afin d'eviter la redandonce 
						usersPrivs.remove(j);
						j--;
						 
				}
				
				
				
			}
			jsonResponse.setROLES(roles);
			listToReturn.add(jsonResponse);
			//suppression de cette instance afin d'eviter la redandonce 
			usersPrivs.remove(i);
			 i--;
			 
		
		}


	
	return listToReturn;
}



@PostMapping({"getAdminAllApps"})
public ArrayList<UserAppPrivs>  getAdminAllApps(@RequestBody UserIDMS user) {
	try {
		
		ArrayList<UserAppPrivs> listToReturn=new ArrayList();
		user=userIdmsService.findUserBySon(user);
		
		listToReturn = getAdminApps(user.getIduseridms());
		
		
		return listToReturn;
	}catch(Exception e) {
		log.error("Exception getAdminAllApps in controller==>" + e.getMessage());
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
					listToReturn.get(i).getObjects().addAll(listToReturn.get(j).getObjects());
					
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
		log.error("Exception getUsersObjects in controller==>" + e.getMessage());
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
		log.error("Exception getAppsByMode in controller==>" + e.getMessage());
	}
return null;
}
/************************************send email*************************************************************************/

@PostMapping({ "sendEmail" })
public MailResponse sendEmail(@RequestBody MailRequest request) {
	Map<String, Object> model = new HashMap<>();
	model.put("msg", request.getMsg());

	MailResponse response = new MailResponse();

		try {
			response = emailService.sendEmail(request,  model);
		} catch (TemplateNotFoundException e) {
			log.error("Exception  sendEmail() in emailService {sendEmail controller}==>" + e.getMessage());
		} catch (MalformedTemplateNameException e) {
			log.error("Exception  sendEmail() in emailService {sendEmail controller}==>" + e.getMessage());
		} catch (ParseException e) {
			log.error("Exception  sendEmail() in emailService {sendEmail controller}==>" + e.getMessage());
		} catch (IOException e) {
			log.error("Exception  sendEmail() in emailService {sendEmail controller}==>" + e.getMessage());
		} catch (TemplateException e) {
			log.error("Exception  sendEmail() in emailService {sendEmail controller}==>" + e.getMessage());
		}catch(Exception e ) {
			log.error("Exception  sendEmail() in emailService {sendEmail controller}==>" + e.getMessage());
		}

	

	
	return response;
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
		log.error("Exception  findUserBySon() in UserIdmsService {getCurrentUser controller}==>" + e.getMessage());
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
		log.error("Exception  updateLang() in ProfilService {updateLangUser controller}==>" + e.getMessage());
	}
	return null;
}

@PostMapping({"updateThemeUser"})
public Profil updateThemeUser(@RequestBody Profil profil) {
	try {
		Profil updatedProfil=profilService.updateTheme(profil);
		return updatedProfil;
	}catch(Exception e) {
		log.error("Exception  updateTheme() in ProfilService {updateThemeUser controller}==>" + e.getMessage());
	}
	return null;
}

@PostMapping({"getUsersProfil"})
public Profil getUsersProfil(@RequestBody Profil profil) {
	try {
		Profil currentProfil=profilService.getUsersProfil(profil);
		return currentProfil;
	}catch(Exception e) {
		log.error("Exception  getUsersProfil() in ProfilService {getUsersProfil controller}==>" + e.getMessage());
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
		log.error("Exception  {addApplication controller}==>" + e.getMessage());
	}
	return null;
}
//**********update app*********************//
@PostMapping({"updateApplication"})
public Applications updateApplication(@RequestBody Applications app) {
	try {
		return appService.updateApp(app);
	}catch(Exception e) {
		log.error("Exception updateApp in ApplicationsService {updateApplication controller}==>" + e.getMessage());
	}
	return null;
}

//***********delete app******************//
@PostMapping({"deleteApplication"})
public Applications deleteApplication(@RequestBody Applications app) {
	try {
		return appService.deleteApp(app);
	}catch(Exception e) {
		log.error("Exception deleteApp in ApplicationsService {deleteApplication controller}==>" + e.getMessage());
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
		log.error("Exception in UserIdmsService ==>getAllUsers()   :{getAllIdmsUsers==>controller}  :" +e.getMessage());
	}
	return null;
}


//save appRole (new role)
@PostMapping({"saveNewRole"})
public AppRoles saveNewRole(@RequestBody AppRoles approle) {
	try {
		return appRoleService.saveAppRole(approle);
	}catch(Exception e) {
		log.error("Exception in appRoleService ==>saveAppRole()   :{saveNewRole==>controller}  :" +e.getMessage());
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
		log.error("Exception in AppPrivsService ==>saveAppPrivs()   :{saveNewPrivs==>controller}  :" +e.getMessage());
	}
	return null;
}

//***********delete role*************************//
@PostMapping({"deleteRole"})
public AppRoles deleteRole(@RequestBody AppRoles approle) {
	try {
		return appRoleService.deleteRole(approle);
	}catch(Exception e) {
		log.error("Exception in appRoleService ==>deleteRole()   :{deleteRole==>controller}  :" +e.getMessage());
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
		log.error("Exception  findObjectsByApp() ==>AppObjectService   :{findObjectsByApp==>controller}  :" +e.getMessage());
	}
	return null;
}

//save associated objects to role
@PostMapping({"saveRoleObjects"})
public List<RoleObjects> saveRoleObjects(@RequestBody List<RoleObjects> roleObjcts){
	try {
		return roleObjService.saveRoleObjects(roleObjcts);
	}catch(Exception e) {
		log.error("Exception  saveRoleObjects() ==>RoleObjectsService   :{saveRoleObjects==>controller}  :" +e.getMessage());
	}
	return null;
}
//save deleted objects to role
@PostMapping({"deleteRoleObjects"})
public List<RoleObjects> deleteRoleObjects(@RequestBody List<RoleObjects> roleObjcts){
	try {
		return roleObjService.deleteRoleObjects(roleObjcts);
	}catch(Exception e) {
		log.error("Exception  deleteRoleObjects() ==>RoleObjectsService   :{deleteRoleObjects==>controller}  :" +e.getMessage());
	}
	return null;
}
//get all object users
@GetMapping({"getAllObjectUser"})
public List<ObjectUsers> getAllObjectUser(){
	try {
		return objUserService.getAllObjectUsers();
	}catch(Exception e) {
		log.error("Exception  getAllObjectUser() ==>ObjectUsersService   :{getAllObjectUser==>controller}  :" +e.getMessage());
	}
	return null;
}
//save associated objects to user
@PostMapping({"saveObjectUser"})
public List<ObjectUsers> saveObjectUser(@RequestBody List<ObjectUsers> roleObjcts){
	try {
		return objUserService.saveObjUser(roleObjcts);
	}catch(Exception e) {
		log.error("Exception  saveObjUser() ==>ObjectUsersService   :{saveObjectUser==>controller}  :" +e.getMessage());
	}
	return null;
}
//save deleted objects to user
@PostMapping({"deleteObjectUser"})
public List<ObjectUsers> deleteObjectUser(@RequestBody List<ObjectUsers> roleObjcts){
	try {
		return objUserService.deleteObjUser(roleObjcts);
	}catch(Exception e) {
		log.error("Exception  deleteObjUser() ==>ObjectUsersService   :{deleteObjectUser==>controller}  :" +e.getMessage());
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
		log.error("Exception  getAllObjType() in ObjectTypeService   :{getAllObjTypes==>controller}==>" + e.getMessage());
	}
	return null;
}

//add object (save in DB)
@PostMapping({"addAppObject"})
public AppObject addAppObject(@RequestBody AppObject appObject){
	try {
		return appObjService.addAppObject(appObject);
	}catch(Exception e) {
		log.error("Exception  addAppObject() in AppObjectService  :{addAppObject==>controller}  :" +e.getMessage());
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
		log.error("Exception  deleteAppObject() in AppObjectService  :{deleteAppObject==>controller}  :" +e.getMessage());
	}
	return null;
}

//update object
@PostMapping({"updateAppObject"})
public AppObject updateAppObject(@RequestBody AppObject appObject){
	try {
		
		return appObjService.updateAppObject(appObject);
	}catch(Exception e) {
		log.error("Exception  updateAppObject() in AppObjectService  :{updateAppObject==>controller}  :" +e.getMessage());
	}
	return null;
}
}
