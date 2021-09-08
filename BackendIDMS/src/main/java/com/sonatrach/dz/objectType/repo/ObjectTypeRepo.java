package com.sonatrach.dz.objectType.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sonatrach.dz.objectType.domain.ObjectTypeApp;

@Repository
public interface ObjectTypeRepo  extends JpaRepository<ObjectTypeApp, Integer >{

}
