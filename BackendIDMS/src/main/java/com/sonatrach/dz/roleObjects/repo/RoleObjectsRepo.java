package com.sonatrach.dz.roleObjects.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sonatrach.dz.roleObjects.domain.RoleObjects;
import com.sonatrach.dz.roleObjects.domain.RoleObjectsId;


@Repository
public interface RoleObjectsRepo extends JpaRepository<RoleObjects, RoleObjectsId>{

}
