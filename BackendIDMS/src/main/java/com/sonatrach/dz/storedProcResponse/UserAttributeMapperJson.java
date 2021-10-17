package com.sonatrach.dz.storedProcResponse;

import javax.naming.NamingEnumeration;
import javax.naming.NamingException;
import javax.naming.directory.Attributes;

import org.springframework.ldap.core.AttributesMapper;

import net.minidev.json.JSONObject;

public class UserAttributeMapperJson implements AttributesMapper{

	@Override
	public Object mapFromAttributes(Attributes attributes) throws NamingException {
		NamingEnumeration<String> ids=attributes.getIDs();
		JSONObject jo=new JSONObject();
		while(ids.hasMore()) {
			String id=ids.next();
			try {
				jo.put(id, attributes.get(id).get());
			}catch (Exception e) {
				System.out.println(e+" mapFromAttributes Exception");
			}
		}
		return jo.toString(); 
	}

}
