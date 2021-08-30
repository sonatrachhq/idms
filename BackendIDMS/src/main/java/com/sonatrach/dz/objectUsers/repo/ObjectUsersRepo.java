package com.sonatrach.dz.objectUsers.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sonatrach.dz.objectUsers.domain.ObjectUsers;
import com.sonatrach.dz.objectUsers.domain.ObjectUsersId;

@Repository
public interface ObjectUsersRepo extends JpaRepository<ObjectUsers, ObjectUsersId>{

}
