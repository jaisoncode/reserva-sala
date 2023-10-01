package com.example.reserva.usuario;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "usuario")
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(columnDefinition = "username", nullable = false, length = 45)
    private String username;
    @Column(nullable = false, unique = true, length = 90)
    private String email;
    @Column(nullable = false, length = 64)
    private String password;
    @Column(columnDefinition = "nome_completo",nullable = false, length = 64)
    private String nomeCompleto;
    @Column(nullable = false, length = 64)
    private String role;

    public Usuario() {
    }

    public Usuario(Long id, String username, String email, String password, String nomeCompleto, String role) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.nomeCompleto = nomeCompleto;
        this.role = role;
    }

    public Usuario(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.nomeCompleto = "";
        this.role = "user";
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
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

    public String getNomeCompleto() {
        return nomeCompleto;
    }

    public void setNomeCompleto(String nomeCompleto) {
        this.nomeCompleto = nomeCompleto;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    @Override
    public String toString() {
        return "Usuario{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", nomeCompleto='" + nomeCompleto + '\'' +
                ", role='" + role + '\'' +
                '}';
    }
}
