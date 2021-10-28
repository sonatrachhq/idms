package com.sonatrach.dz.userIDMS.service;

import java.util.Date;


import java.util.List;

import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.sonatrach.dz.message.request.LoginForm;
import com.sonatrach.dz.message.request.SignUpForm;
import com.sonatrach.dz.message.response.JwtResponse;
import com.sonatrach.dz.message.response.ResponseMessage;
import com.sonatrach.dz.security.jwt.JwtProvider;
import com.sonatrach.dz.userIDMS.domain.UserIDMS;
import com.sonatrach.dz.userIDMS.repo.UserIDMSRepository;




@Service
@Transactional
public class UserIdmsService {
	@Autowired
	UserIDMSRepository userRepository;
	@Autowired
	AuthenticationManager authenticationManager;
	@Autowired
	PasswordEncoder encoder;
	@Autowired
	JwtProvider jwtProvider;
	
	/************************************************
	 * Login/subscribe
	 *********************************************************************************************************/

	// Connexion
	public ResponseEntity<?> signin(LoginForm loginRequest) {
		try {
		Optional<UserIDMS> currentUser = userRepository.findBySonuser(loginRequest.getSonuser().toLowerCase());
			
					Authentication authentication = authenticationManager.authenticate(
							new UsernamePasswordAuthenticationToken(loginRequest.getSonuser().toLowerCase(), loginRequest.getPassword()));
					
					SecurityContextHolder.getContext().setAuthentication(authentication);

					String jwt = jwtProvider.generateJwtToken(authentication);
					
					UserDetails userDetails = (UserDetails) authentication.getPrincipal();

					return ResponseEntity.ok(new JwtResponse(jwt, userDetails.getUsername().toLowerCase(),currentUser.get().getEmail(),currentUser.get().getUsername()));
				
			
			

		}catch(Exception e) {
			System.out.println("Exception in UserIdmsService ==>signin()   :" +e.getMessage());
		}
		return null;
		

	}
	//check if user exists
	public ResponseEntity<?> checkUserExists(String sonuser,String name) {
		try {
			Optional<UserIDMS> currentUser = userRepository.findBySonuser(sonuser.toLowerCase());
			if(currentUser.get()!=null) {
				Authentication authentication = authenticationManager.authenticate(
						new UsernamePasswordAuthenticationToken(sonuser.toLowerCase(), "1234#!Idm$DefaultPsw@S0natrach"));
				
				SecurityContextHolder.getContext().setAuthentication(authentication);

				String jwt = jwtProvider.generateJwtToken(authentication);
				
				UserDetails userDetails = (UserDetails) authentication.getPrincipal();
				//System.out.println(currentUser.get().getUsername());
				return ResponseEntity.ok(new JwtResponse(jwt, userDetails.getUsername().toLowerCase(),currentUser.get().getEmail(),name));
				
			}
		}catch(Exception e) {
			System.out.println("Exception in UserIdmsService ==>checkUserExists()   :" +e.getMessage());
		}
		return null;
	}

	// Inscription
	public ResponseEntity<?> registerUser( SignUpForm signUpRequest) {
		if (userRepository.existsBySonuser(signUpRequest.getSonuser())) {
			return new ResponseEntity<>(new ResponseMessage("Fail -> SonUser is already taken!",0),
					HttpStatus.BAD_REQUEST);
		}

	

		// Creating user's account
		UserIDMS user = new UserIDMS(signUpRequest.getIdlang(),signUpRequest.getSonuser().toLowerCase(), encoder.encode(signUpRequest.getPswuser()), signUpRequest.getUserstatus(),
				signUpRequest.getIduser(),signUpRequest.getSysdate(),signUpRequest.getEmail(),"");

		UserIDMS registeredUser=userRepository.save(user);
		
		return new ResponseEntity<>(new ResponseMessage("User registered successfully!",registeredUser.getIduseridms()), HttpStatus.OK);
	}
	
	//save user
	public ResponseEntity<?>  saveUser(String sonuser,String email,String username) {
		try {
			
			UserIDMS user = new UserIDMS(1,sonuser.toLowerCase(), "$2a$10$zpEvPQ1RGBXyU.KvnsWHCuy1CkjgXC98k7ZuK5BZUwOXCOoa.t.vq", 1,
					Integer.valueOf(0), new Date(),email,username);	
			
			userRepository.save(user);
			//return checkUserExists(sonuser,username);
			Authentication authentication = authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(sonuser.toLowerCase(), "1234#!Idm$DefaultPsw@S0natrach"));
			
			SecurityContextHolder.getContext().setAuthentication(authentication);

			String jwt = jwtProvider.generateJwtToken(authentication);
			UserDetails userDetails = (UserDetails) authentication.getPrincipal();
			//System.out.println(currentUser.get().getUsername());
			return ResponseEntity.ok(new JwtResponse(jwt, userDetails.getUsername().toLowerCase(),email,username));
		}catch(Exception e) {
			System.out.println("Exception in UserIdmsService ==>saveUser()   :" +e.getMessage());
		}
		return null;
	}
	
	//find user by son
	public UserIDMS findUserBySon(UserIDMS user) {
		Optional<UserIDMS> currentUser=userRepository.findBySonuser(user.getSonuser().toLowerCase());
		
		if(currentUser.get() != null) {
			return currentUser.get();
		}else {
			return null;
		}
		
	}
	
	
	//get all users 
	public List<UserIDMS> getAllUsers(){
		try {
			return userRepository.findAll();
		}catch(Exception e) {
			System.out.println("Exception in UserIdmsService ==>getAllUsers()   :" +e.getMessage());
		}
		return null;
	}
	
	//update users's psw
	public UserIDMS updateUsersPsw(String  son,String psw) {
		try {
			Optional<UserIDMS> currentUser=userRepository.findBySonuser(son.toLowerCase());
			
			if(currentUser.get() != null) {
				//System.out.println(currentUser.get().getEmail());
				currentUser.get().setPswuser(psw);
				userRepository.save(currentUser.get());
				return currentUser.get();
			}
		}catch(Exception e) {
			System.out.println("Exception in UserIdmsService ==>updateUsersPsw()   :" +e.getMessage());
		}
		return null;
	}
}
