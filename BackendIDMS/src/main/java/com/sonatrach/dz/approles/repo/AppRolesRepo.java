package com.sonatrach.dz.approles.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sonatrach.dz.approles.domain.AppRoles;


@Repository
public interface AppRolesRepo  extends JpaRepository<AppRoles, Integer >{
List<AppRoles> findByApp(Integer idApp);
}
