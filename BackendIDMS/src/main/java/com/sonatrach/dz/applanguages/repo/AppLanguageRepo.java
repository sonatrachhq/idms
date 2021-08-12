package com.sonatrach.dz.applanguages.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sonatrach.dz.applanguages.domain.AppLanguage;


@Repository
public interface AppLanguageRepo  extends JpaRepository<AppLanguage, Integer >{

}
