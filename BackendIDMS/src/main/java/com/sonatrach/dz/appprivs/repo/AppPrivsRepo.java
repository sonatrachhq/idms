package com.sonatrach.dz.appprivs.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sonatrach.dz.appprivs.domain.AppPrivs;
import com.sonatrach.dz.appprivs.domain.AppPrivsId;



@Repository
public interface AppPrivsRepo  extends JpaRepository<AppPrivs, AppPrivsId >{
List<AppPrivs> findByUser(Integer idUserIdms);
}
