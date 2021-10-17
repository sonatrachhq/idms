package com.sonatrach.dz.userIDMS.repo;

import java.util.Optional;





import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sonatrach.dz.userIDMS.domain.UserIDMS;






@Repository
public interface UserIDMSRepository extends JpaRepository<UserIDMS, Integer> {
    Optional<UserIDMS> findBySonuser(String sonuser);
    Boolean existsBySonuser(String sonuser);
    Optional<UserIDMS> findBySonPsw(String son,String psw);

}