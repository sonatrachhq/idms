package com.sonatrach.dz.languages.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

@Entity
@Table(name = "LANGUAGES")
@NamedQueries({@NamedQuery(name = "Languages.findByStatus", query = "SELECT p FROM Languages p WHERE idstatus=?1"),
})
public class Languages {
	@Id
	@Column(name="IDLANGUAGE")
    private Integer idlang;
	@Column(name="IDSTATUS")
    private Integer idstatus;
	@Column(name="DESCLANGUAGE")
    private String desclang;
	@Column(name="FLAGICON")
    private String flagicon;
	@Column(name="SYMBOLLANGUAGE")
    private String symbollang;
	
	public  Languages() {
		
	}

	public Integer getIdlang() {
		return idlang;
	}

	public void setIdlang(Integer idlang) {
		this.idlang = idlang;
	}

	public Integer getIdstatus() {
		return idstatus;
	}

	public void setIdstatus(Integer idstatus) {
		this.idstatus = idstatus;
	}

	public String getDesclang() {
		return desclang;
	}

	public void setDesclang(String desclang) {
		this.desclang = desclang;
	}

	public String getFlagicon() {
		return flagicon;
	}

	public void setFlagicon(String flagicon) {
		this.flagicon = flagicon;
	}

	public String getSymbollang() {
		return symbollang;
	}

	public void setSymbollang(String symbollang) {
		this.symbollang = symbollang;
	}
	
	
}
