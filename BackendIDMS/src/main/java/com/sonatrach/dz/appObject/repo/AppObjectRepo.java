package com.sonatrach.dz.appObject.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sonatrach.dz.appObject.domain.AppObject;


@Repository
public interface AppObjectRepo  extends JpaRepository<AppObject, Integer >{
List<AppObject> findObjectsByApp(Integer idapp);
}
