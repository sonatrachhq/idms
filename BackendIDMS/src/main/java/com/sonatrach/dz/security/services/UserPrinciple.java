package com.sonatrach.dz.security.services;



import java.util.Collection;
import java.util.Objects;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sonatrach.dz.userIDMS.domain.UserIDMS;


public class UserPrinciple implements UserDetails {
	private static final long serialVersionUID = 1L;

	private Integer id;



    private String sonuser;



    @JsonIgnore
    private String password;





    public UserPrinciple(Integer id, String sonuser, String password) {
		super();
		this.id = id;
		this.sonuser = sonuser;
		this.password = password;
	}

	public static UserPrinciple build(UserIDMS user) {
     

        return new UserPrinciple(
                user.getIduser(),
                user.getSonuser(),
                user.getPswuser()
              
        );
    }

    public Integer getId() {
        return id;
    }



    @Override
    public String getUsername() {
        return sonuser;
    }

    @Override
    public String getPassword() {
        return password;
    }

 

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        
        UserPrinciple user = (UserPrinciple) o;
        return Objects.equals(id, user.id);
    }

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		// TODO Auto-generated method stub
		return null;
	}
}