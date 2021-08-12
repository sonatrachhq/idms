package com.sonatrach.dz.security.services;




import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sonatrach.dz.userIDMS.domain.UserIDMS;
import com.sonatrach.dz.userIDMS.repo.UserIDMSRepository;







@Service
public class UserDetailsServiceImpl implements UserDetailsService {

	@Autowired
	UserIDMSRepository userRepository;

	@Override
	@Transactional
	public UserDetails loadUserByUsername(String sonuser) throws UsernameNotFoundException {

		UserIDMS user = userRepository.findBySonuser(sonuser)
				.orElseThrow(
				() -> new UsernameNotFoundException("User Not Found with -> sonuser  : " + sonuser));

		return UserPrinciple.build(user);
	}
}