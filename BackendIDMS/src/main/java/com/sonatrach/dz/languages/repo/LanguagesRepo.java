package com.sonatrach.dz.languages.repo;

import java.util.List;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sonatrach.dz.languages.domain.Languages;




@Repository
public interface LanguagesRepo extends JpaRepository<Languages, Integer> {
List<Languages>findByStatus(Integer idstatus);
}
