package com.sonatrach.dz.objectType.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sonatrach.dz.objectType.domain.ObjectTypeApp;
import com.sonatrach.dz.objectType.repo.ObjectTypeRepo;

@Service
@Transactional
public class ObjectTypeService {
	@Autowired
	ObjectTypeRepo objTypeRepo;
	
	public List<ObjectTypeApp> getAllObjType(){
		try {
			return objTypeRepo.findAll();
		}catch(Exception e) {
			System.out.println("Exception  getAllObjType() in ObjectTypeService==>" + e.getMessage());
		}
		return null;
	}
}
