package com.example.reserva.sala;

public record SalaResponseDTO(Integer id, String identificacao, String descricao,
                              String categoria, String predio, String piso) {
    public SalaResponseDTO(Sala sala){
        this(sala.getId(), sala.getIdentificacao(), sala.getDescricao(),
            sala.getCategoria(), sala.getPredio(), sala.getPiso());
    }


}
