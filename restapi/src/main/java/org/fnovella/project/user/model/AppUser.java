package org.fnovella.project.user.model;

import java.sql.Date;
import java.util.ArrayList;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.fnovella.project.utility.APIUtility;
import org.hibernate.validator.constraints.Length;

@Entity
public class AppUser {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;

	@Length(max = 20)
	private String firstName;
	@Length(max = 20)
	private String secondName;
	@Column(name = "first_lastname")
	@Length(max = 20)
	private String firstLastName;
	@Length(max = 20)
	@Column(name = "second_lastname")
	private String secondLastName;
	@Column(nullable = true)
	private int privilege;
	@Length(max = 20)
	private String documentType;
	@Length(max = 40)
	private String documentValue;
	@Length(max = 30)
	private String nationality;
	@Length(max = 20)
	private String department;
	@Length(max = 20)
	private String profession;
	@Length(max = 50)
	private String address;
	@Length(max = 50)
	private String email;
	@Length(max = 50)
	private String password;
	@Length(max = 20)
	private String municipality;
	@Length(max = 20)
	private String comunity;
	private int phone;
	private int cellphone;
	@Length(max = 40)
	private String cemproCode;
	@Length(max = 60)
	private String appCode;
	@Length(max = 10)
	private String gender;
	private Date bornDate;
	
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getSecondName() {
		return secondName;
	}

	public void setSecondName(String secondName) {
		this.secondName = secondName;
	}

	public String getFirstLastName() {
		return firstLastName;
	}

	public void setFirstLastName(String firstLastName) {
		this.firstLastName = firstLastName;
	}

	public String getSecondLastName() {
		return secondLastName;
	}

	public void setSecondLastName(String secondLastName) {
		this.secondLastName = secondLastName;
	}

	public int getPrivilege() {
		return privilege;
	}

	public void setPrivilege(int privilege) {
		this.privilege = privilege;
	}

	public String getDocumentType() {
		return documentType;
	}

	public void setDocumentType(String documentType) {
		this.documentType = documentType;
	}

	public String getDocumentValue() {
		return documentValue;
	}

	public void setDocumentValue(String documentValue) {
		this.documentValue = documentValue;
	}

	public String getNationality() {
		return nationality;
	}

	public void setNationality(String nationality) {
		this.nationality = nationality;
	}

	public String getDepartment() {
		return department;
	}

	public void setDepartment(String department) {
		this.department = department;
	}

	public String getProfession() {
		return profession;
	}

	public void setProfession(String profession) {
		this.profession = profession;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getMunicipality() {
		return municipality;
	}

	public void setMunicipality(String municipality) {
		this.municipality = municipality;
	}

	public String getComunity() {
		return comunity;
	}

	public void setComunity(String comunity) {
		this.comunity = comunity;
	}

	public int getPhon() {
		return phone;
	}

	public void setPhon(int phon) {
		this.phone = phon;
	}

	public int getCellphone() {
		return cellphone;
	}

	public void setCellphone(int cellphone) {
		this.cellphone = cellphone;
	}

	public String getCemproCode() {
		return cemproCode;
	}

	public void setCemproCode(String cemproCode) {
		this.cemproCode = cemproCode;
	}

	public String getAppCode() {
		return appCode;
	}

	public void setAppCode(String appCode) {
		this.appCode = appCode;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public Date getBornDate() {
		return bornDate;
	}

	public void setBornDate(Date bornDate) {
		this.bornDate = bornDate;
	}

	public AppUser(String firstName, String secondName, String firstLastName, String secondLastName, int privilege,
			String documentType, String documentValue, String nationality, String department, String profession,
			String address, String email, String password, String municipality, String comunity, int phon,
			int cellphone, String cemproCode, String appCode, String gender, Date bornDate) {
		super();
		this.firstName = firstName;
		this.secondName = secondName;
		this.firstLastName = firstLastName;
		this.secondLastName = secondLastName;
		this.privilege = privilege;
		this.documentType = documentType;
		this.documentValue = documentValue;
		this.nationality = nationality;
		this.department = department;
		this.profession = profession;
		this.address = address;
		this.email = email;
		this.password = password;
		this.municipality = municipality;
		this.comunity = comunity;
		this.phone = phon;
		this.cellphone = cellphone;
		this.cemproCode = cemproCode;
		this.appCode = appCode;
		this.gender = gender;
		this.bornDate = bornDate;
	}

	public AppUser() {
		super();
	}

	public ArrayList<String> validate() {
		ArrayList<String> errors = new ArrayList<String>();
		if (!APIUtility.isNotNullOrEmpty(this.firstName))
			errors.add("First name is required");
		if (!APIUtility.isNotNullOrEmpty(this.secondName))
			errors.add("Second name is required");
		if (!APIUtility.isNotNullOrEmpty(this.firstLastName))
			errors.add("Last name is required");
		if (!APIUtility.isNotNullOrEmpty(this.secondLastName))
			errors.add("Second last name is required");
		if (this.privilege <= 0)
			errors.add("Privilege is required");
		if (!APIUtility.isNotNullOrEmpty(this.documentType))
			errors.add("Document type is required");
		if (!APIUtility.isNotNullOrEmpty(this.documentValue))
			errors.add("Document value is required");
		if (!APIUtility.isNotNullOrEmpty(this.nationality))
			errors.add("Nationality is required");
		if (!APIUtility.isNotNullOrEmpty(this.department))
			errors.add("Department is required");
		if (!APIUtility.isNotNullOrEmpty(this.profession))
			errors.add("Profession is required");
		if (!APIUtility.isNotNullOrEmpty(this.address))
			errors.add("Address is required");
		if (!APIUtility.isNotNullOrEmpty(this.email))
			errors.add("Email is required");
		if (!APIUtility.isNotNullOrEmpty(this.password))
			errors.add("Password is required");
		if (!APIUtility.isNotNullOrEmpty(this.municipality))
			errors.add("Municipality is required");
		if (!APIUtility.isNotNullOrEmpty(this.comunity))
			errors.add("Comunity is required");
		if (this.phone <= 0)
			errors.add("Phon is required");
		if (!APIUtility.isNotNullOrEmpty(this.appCode))
			errors.add("App Code is required");
		if (!APIUtility.isNotNullOrEmpty(this.gender))
			errors.add("Gender is required");
		return errors;
	}
	
	public void setUpdateFields(AppUser appUser) {
		if (APIUtility.isNotNullOrEmpty(appUser.firstName))
			this.firstName = appUser.firstName;
		if (APIUtility.isNotNullOrEmpty(appUser.secondName))
			this.secondName = appUser.secondName;
		if (APIUtility.isNotNullOrEmpty(appUser.firstLastName))
			this.firstLastName = appUser.firstLastName; 
		if (APIUtility.isNotNullOrEmpty(appUser.secondLastName))
			this.secondLastName = appUser.secondLastName;
		if (this.privilege <= 0)
			this.privilege = appUser.privilege;
		if (APIUtility.isNotNullOrEmpty(appUser.documentType))
			this.documentType = appUser.documentType;
		if (APIUtility.isNotNullOrEmpty(appUser.documentValue))
			this.documentValue = appUser.documentValue;
		if (APIUtility.isNotNullOrEmpty(appUser.nationality))
			this.nationality = appUser.nationality;
		if (APIUtility.isNotNullOrEmpty(appUser.department))
			this.department = appUser.department;
		if (APIUtility.isNotNullOrEmpty(appUser.profession))
			this.profession = appUser.profession;
		if (APIUtility.isNotNullOrEmpty(appUser.address))
			this.address = appUser.address;
		if (APIUtility.isNotNullOrEmpty(appUser.email))
			this.email = appUser.email;
		if (APIUtility.isNotNullOrEmpty(appUser.password))
			this.password = appUser.password;
		if (APIUtility.isNotNullOrEmpty(appUser.municipality))
			this.municipality = appUser.municipality;
		if (APIUtility.isNotNullOrEmpty(appUser.comunity))
			this.comunity = appUser.comunity;
		if (this.phone <= 0)
			this.phone= appUser.phone;
		if (APIUtility.isNotNullOrEmpty(appUser.appCode))
			this.appCode= appUser.appCode;
		if (APIUtility.isNotNullOrEmpty(appUser.gender))
			this.gender = appUser.gender;
	}
}