package com.sonatrach.dz.interim.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sonatrach.dz.interim.domain.Interim;
import com.sonatrach.dz.interim.domain.InterimId;


@Repository
public interface InterimRepo extends JpaRepository<Interim, InterimId >{
Interim findIdmsRoles(Integer idinterim,Integer idapplication);
}
