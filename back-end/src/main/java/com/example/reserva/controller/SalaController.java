package com.example.reserva.controller;

import com.example.reserva.sala.Sala;
import com.example.reserva.sala.SalaRepository;
import com.example.reserva.sala.SalaRequestDTO;
import com.example.reserva.sala.SalaResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/sala")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class SalaController {
    @Autowired
    private SalaRepository repository;

    @PostMapping
    public Sala saveSala(@RequestBody SalaRequestDTO novaSala) {
        Sala newSala = new Sala(novaSala);
        return repository.save(newSala);

    }
    @GetMapping
    public List<SalaResponseDTO> getAll(){

        List<SalaResponseDTO> salaList = repository.findAll().
                stream().
                map(SalaResponseDTO::new)
                .collect(Collectors.toList());

        return salaList;

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteSala(@PathVariable int id) {
        try {
            repository.deleteById(id);
            return new ResponseEntity<>("Sala excluída com sucesso", HttpStatus.OK);
        } catch (EmptyResultDataAccessException e) {
            return new ResponseEntity<>("Sala não encontrada", HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>("Ocorreu um erro ao excluir a sala", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
