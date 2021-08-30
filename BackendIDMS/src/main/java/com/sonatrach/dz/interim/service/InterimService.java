package com.sonatrach.dz.interim.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sonatrach.dz.interim.domain.Interim;
import com.sonatrach.dz.interim.repo.InterimRepo;

@Service
@Transactional
public class InterimService {
	@Autowired
	InterimRepo inetrimRepo;
	
	public Interim findInetrimRoles(Integer idinterim,Integer idApp) {
		try {
			Interim in=inetrimRepo.findIdmsRoles(idinterim, idApp);
			if(in!=null) {
				return in;
			}
			
		}catch(Exception e) {
			System.out.println("Exception  findInetrimRoles() in InterimService==>" + e.getMessage());
		}
		return null;
	}
}
