package com.example.reserva.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.reserva.model.usuario.NovoUsuarioDados;
import com.example.reserva.model.usuario.Usuario;
import com.example.reserva.model.usuario.UsuarioRepository;

import jakarta.transaction.Transactional;

@Controller
@RequestMapping("/usuarios")
public class UsuarioController {
    @Autowired
    private UsuarioRepository usuarioRepo;

    @GetMapping("cadastro")
    public String loadNovoUsuarioForm(){
        return "usuarios/cadastro";
    }


    @Transactional
    @PostMapping("salvar")
    public String guardarUsuario(NovoUsuarioDados dados){
        System.out.println("Salvando os " + dados);
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String password = encoder.encode(dados.password());
        Usuario u = new Usuario(dados.username(), dados.email(), password);
        usuarioRepo.save(u);
        return "redirect:/login";
    }

}
