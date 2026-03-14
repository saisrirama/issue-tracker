package com.springchatgpt.issuetracker.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name="users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message="Name cannot be empty")
    private String name;

    @Email(message="Give the correct email ID")
    @NotBlank(message="Email cannot be blank")
    private String email;

    @ManyToOne
    @JoinColumn(name = "owner_id")
    private AuthUser owner;

    public User(){}

    public User(String name, String email){
        this.name = name;
        this.email = email;
    }

    
    public Long getId(){
        return id;
    }
    public String getName() {
        return name;
    }
    public String getEmail(){
        return email;
    }

    public void setName(String name){
        this.name=name;
    }
    public void setEmail(String email){
        this.email=email;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public AuthUser getOwner() {
        return owner;
    }

    public void setOwner(AuthUser owner) {
        this.owner = owner;
    }
}
