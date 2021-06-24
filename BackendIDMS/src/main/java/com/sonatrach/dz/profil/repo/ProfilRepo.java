package com.sonatrach.dz.profil.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sonatrach.dz.profil.domain.Profil;
import com.sonatrach.dz.profil.domain.ProfilId;


@Repository
public interface ProfilRepo  extends JpaRepository<Profil, ProfilId> {
Profil findByIdPrf(Integer idUser,Integer IdApp,Integer idTheme,Integer idLang);
}
