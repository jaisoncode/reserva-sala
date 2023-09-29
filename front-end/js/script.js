const modal = document.querySelector('#cad-sala-modal');
const openModal = document.querySelector('#openModalBtn');
const closeModalBtn = document.querySelector('.close-modal-btn');

openModal.onclick = function () {
    modal.style.display = "block";
}

closeModalBtn.onclick = function () {
    modal.style.display = "none";
}

const formCadastro = document.querySelector('#cadastro-form');
const inputIdentificacao = document.querySelector('#indentificacao');
const inputDescricaco = document.querySelector('#descricao');
const inputCategoria = document.querySelector('#categoria');
const inputPredio = document.querySelector('#predio');
const inputPiso = document.querySelector('#piso');
const finalizarBtn = document.querySelector('.finalzar-btn');

function cadastrar() {
    fetch("http://localhost:8080/sala",
        {
            headers: {
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
                identificacao: inputIdentificacao.value,
                descricao: inputDescricaco.value,
                categoria: inputCategoria.value,
                predio: inputPredio.value,
                piso: inputPiso.value
            })
        })
        .then( response => {
            return response.json();
        })
        .then( response =>  {
            buscarDadosDasSalas(response);
        })
        .catch(function (response) { console.log(response) })

};

function limpar() {
    inputIdentificacao.value = "";
    inputDescricaco.value = "";
    inputCategoria.value = "";
    inputPredio.value = "";
    inputPiso.value = "";
}

const confirmeCadastro = document.querySelector('#modal-confirm-cadastro');
let confirma = false;
const simBtn = document.querySelector('#button-confirm-cad');
const cancelaBtn = document.querySelector('#button-cancela-cad');


finalizarBtn.onclick = function() {
    confirmeCadastro.style.display = "block"  
}

simBtn.onclick = function() {
    confirma = true;
    confirmeCadastro.style.display = "none";

    if (confirma) {
        cadastrar();
        limpar();
    }  
};

cancelaBtn.onclick = function() {
    confirma = false;
    confirmeCadastro.style.display = "none";
};

formCadastro.addEventListener('submit', function (event) {
    event.preventDefault();
});

function buscarDadosDasSalas() {
    fetch('http://localhost:8080/sala')
        .then(response => response.json()
        )
        .then(data => {
          //  arraySalas.push(data);
            criarListaDeSalas(data);
        })
        .catch(error => {
            console.error('Erro ao buscar os dados das salas:', error);
        });
}
// Chama a função para buscar os dados das salas quando a página carregar
document.addEventListener('DOMContentLoaded', function () {
    buscarDadosDasSalas();
});

function criarListaDeSalas(data) {
    let listaCompleta = '';
    data.forEach(sala => {

        listaCompleta += `<ul class="lista-sala-cadastrada orientacao-colunas"> 
                                    <div class="conteudo-identificacao">
                                        <li class="text-container">${sala.identificacao}</li>
                                    </div>

                                    <div class="conteudo-descricao">
                                        <li class="text-container">${sala.descricao}</li>
                                    </div>

                                    <div class="conteudo-categoria">
                                        <li class="conteudo-list text-container">${sala.categoria}</li>
                                    </div>

                                    <div class="conteudo-predio">
                                        <li class="conteudo-list text-container">${sala.predio}</li>
                                    </div>

                                    <div class="conteudo-piso">
                                        <li class="conteudo-list text-container">${sala.piso}</li>
                                    </div>
                                    
                                    <div class="conteudo-crud">
                                        <button class="button-edt" type="button">EDITAR</button>
                                        <button class="button-del" type="button"  id="${sala.id}">DELETAR</button>
                                    </div>
                                </ul>`;

    });

    const listaContent = document.querySelector('#lista-salas');
    listaContent.innerHTML = listaCompleta;
}