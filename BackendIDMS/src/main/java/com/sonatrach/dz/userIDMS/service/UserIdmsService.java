package com.sonatrach.dz.userIDMS.service;

import java.util.Optional;

import javax.transaction.Transactional;
import javax.validation.Valid;

import org.intellij.lang.annotations.Language;
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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.sonatrach.dz.languages.domain.Languages;
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
	public ResponseEntity<?> authenticateUser(LoginForm loginRequest) {

		Optional<UserIDMS> currentUser = userRepository.findBySonuser(loginRequest.getSonuser());

		
			Authentication authentication = authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(loginRequest.getSonuser(), loginRequest.getPassword()));

			SecurityContextHolder.getContext().setAuthentication(authentication);

			String jwt = jwtProvider.generateJwtToken(authentication);

			UserDetails userDetails = (UserDetails) authentication.getPrincipal();

			return ResponseEntity.ok(new JwtResponse(jwt, userDetails.getUsername()));
	
		

	}

	// Inscription
	public ResponseEntity<?> registerUser( SignUpForm signUpRequest) {
		if (userRepository.existsBySonuser(signUpRequest.getSonuser())) {
			return new ResponseEntity<>(new ResponseMessage("Fail -> SonUser is already taken!",0),
					HttpStatus.BAD_REQUEST);
		}

	

		// Creating user's account
		UserIDMS user = new UserIDMS(signUpRequest.getIdlang(),signUpRequest.getSonuser(), encoder.encode(signUpRequest.getPswuser()), signUpRequest.getUserstatus(),
				signUpRequest.getIduser(),signUpRequest.getSysdate());

		UserIDMS registeredUser=userRepository.save(user);
		
		return new ResponseEntity<>(new ResponseMessage("User registered successfully!",registeredUser.getIduseridms()), HttpStatus.OK);
	}
	
	public UserIDMS findUserBySon(UserIDMS user) {
		Optional<UserIDMS> currentUser=userRepository.findBySonuser(user.getSonuser());
		
		if(currentUser.get() != null) {
			return currentUser.get();
		}else {
			return null;
		}
		
	}
	
}
