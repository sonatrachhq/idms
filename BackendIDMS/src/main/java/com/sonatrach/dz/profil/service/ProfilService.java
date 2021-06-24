package com.sonatrach.dz.profil.service;

import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;

import com.sonatrach.dz.profil.domain.Profil;
import com.sonatrach.dz.profil.domain.ProfilId;
import com.sonatrach.dz.profil.repo.ProfilRepo;

@Service
@Transactional
public class ProfilService {
@Autowired
ProfilRepo profilRepo;
	
	
/**********************************setting default profil when creating account*****************************/
public Profil setDefaultProfil(Profil profil) {
	
	Profil savedProfil=profilRepo.save(profil);
	
	return savedProfil;
}

/*******************************update user's language********************************************************/
public Profil updateLang(Profil profil) {
	
	
	//Profil currentProfil=profilRepo.findByIdPrf(profil.getIduseridms(),profil.getIdapplication(),profil.getIdtheme(),lastIdLang);
	ProfilId id=new ProfilId();
	id.setIdapplication(profil.getIdapplication());
	id.setIduseridms(profil.getIduseridms());
	Optional<Profil> currentProfil=profilRepo.findById(id);
	if(currentProfil.get()!=null) {
		currentProfil.get().setIdlanguage(profil.getIdlanguage());
		currentProfil.get().setSystemdate(profil.getSystemdate());
		Profil updatedProfil=profilRepo.save(currentProfil.get());
		return updatedProfil;
	}else {

		return null;
	}

}

/*******************************update user's Theme********************************************************/
public Profil updateTheme(Profil profil) {

	//Profil currentProfil=profilRepo.findByIdPrf(profil.getIduseridms(),profil.getIdapplication(),profil.getIdtheme(),profil.getIdlanguage());
	ProfilId id=new ProfilId();
	id.setIdapplication(profil.getIdapplication());
	id.setIduseridms(profil.getIduseridms());
	Optional<Profil> currentProfil=profilRepo.findById(id);
	if(currentProfil.get()!=null) {
		currentProfil.get().setIdtheme(profil.getIdtheme());
		currentProfil.get().setSystemdate(profil.getSystemdate());
		Profil updatedProfil=profilRepo.save(currentProfil.get());
		return updatedProfil;
	}else {

		return null;
	}

}

/***************************************get User's profil*****************************************************/
public Profil getUsersProfil(Profil profil) {
	ProfilId id=new ProfilId();
	id.setIdapplication(profil.getIdapplication());
	id.setIduseridms(profil.getIduseridms());
	Optional<Profil> currentProfil=profilRepo.findById(id);
	return currentProfil.get();
		
	}

}
