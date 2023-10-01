package com.example.reserva.service;

import com.example.reserva.model.usuario.UserDetail;
import com.example.reserva.model.usuario.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.example.reserva.model.usuario.UsuarioRepository;

public class UsuarioDetailsServiceImpl implements UserDetailsService {
    @Autowired
    private UsuarioRepository usuarioRepo;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Usuario usuario = usuarioRepo.getUsuarioByUsername(username);
        if (usuario == null) {
            throw new UsernameNotFoundException("Could not find user");
        }
        return new UserDetail(usuario);
    }
}
