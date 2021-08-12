package com.sonatrach.dz.applanguages.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sonatrach.dz.applanguages.domain.AppLanguage;
import com.sonatrach.dz.applanguages.repo.AppLanguageRepo;

@Service
@Transactional
public class AppLanguageService {
	@Autowired
	AppLanguageRepo appLangRepo;
	
	public AppLanguage saveAppLang(AppLanguage appLang) {
		try {
			appLang=appLangRepo.save(appLang);
			
			return appLang;
		}catch(Exception e) {
			System.out.println("Exception  saveAppLang() in AppLanguageService==>" + e.getMessage());
		}
		return null;
	}
}
