package com.example.reserva.controller;

import com.example.reserva.sala.Sala;
import com.example.reserva.sala.SalaRepository;
import com.example.reserva.sala.SalaRequestDTO;
import com.example.reserva.sala.SalaResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("sala")
public class SalaController {
    @Autowired
    private SalaRepository repository;
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping
    public void saveSala(@RequestBody SalaRequestDTO novaSala) {
        Sala newSala = new Sala(novaSala);
        repository.save(newSala);
        return;
    }
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping
    public List<SalaResponseDTO> getAll(){

        List<SalaResponseDTO> salaList = repository.findAll().
                stream().
                map(SalaResponseDTO::new)
                .collect(Collectors.toList());

        return salaList;

    }
}
