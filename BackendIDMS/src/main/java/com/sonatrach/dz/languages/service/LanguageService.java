package com.sonatrach.dz.languages.service;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sonatrach.dz.languages.domain.Languages;
import com.sonatrach.dz.languages.repo.LanguagesRepo;

@Service
@Transactional
public class LanguageService {
@Autowired
LanguagesRepo languageRepo;


/************************************************
 * get activated languages
 *********************************************************************************************************/

public List<Languages> getAllLangs(){
	return languageRepo.findByStatus(1);
}


public Languages getLangById(Integer langId) {
	Optional<Languages> currentLang= languageRepo.findById(langId);
	if(currentLang.get()!=null) {
		return currentLang.get();
	}else {
		return null;
	}
}
}
