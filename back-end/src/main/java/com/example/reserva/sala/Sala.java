package com.example.reserva.sala;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;


@Table(name = "salas")
@Entity(name = "salas")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")

public class Sala {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "identificacao")
    private String identificacao;
    @Column(name = "descricao")
    private String descricao;

    @Column(name ="categoria")
    private String categoria;
    @Column(name = "predio")
    private String predio;
    @Column(name = "piso")
    private String piso;

    public Sala(SalaRequestDTO data){
        this.identificacao = data.identificacao();
        this.descricao = data.descricao();
        this.categoria = data.categoria();
        this.predio = data.predio();
        this.piso = data.piso();
    }

    public int getId() {
        return id;
    }

    public String getIdentificacao() {
        return identificacao;
    }

    public String getDescricao() {
        return descricao;
    }

    public String getCategoria() {
        return categoria;
    }

    public String getPredio() {
        return predio;
    }

    public String getPiso() {
        return piso;
    }
}
