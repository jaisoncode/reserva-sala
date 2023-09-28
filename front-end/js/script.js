const modal = document.querySelector('#cad-sala-modal');
const openModal = document.querySelector('#openModalBtn');
const closeModalBtn = document.querySelector('.close-modal-btn');

openModal.onclick = function () {
    modal.style.display = "block";
}

closeModalBtn.onclick = function () {
    modal.style.display = "none";
}
//openConfirmCad.onclick = function () {
//  modal.style.display = "block";
//}


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
                'Accept': 'applicarion/json',
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
        .then(function (res) { console.log(res) })
        .catch(function (res) { console.log(res) })
    window.location.reload()
};

function limpar() {
    inputIdentificacao.value = "";
    inputDescricaco.value = "";
    inputCategoria.value = "";
    inputPredio.value = "";
    inputPiso.value = "";
}

formCadastro.addEventListener('submit', function (event) {
    event.preventDefault();
    cadastrar();
    limpar();
});

function buscarDadosDasSalas() {
    fetch('http://localhost:8080/sala')
        .then(response => response.json())
        .then(dadosDasSalas => {
            criarListaDeSalas(dadosDasSalas);
        })
        .catch(error => {
            console.error('Erro ao buscar os dados das salas:', error);
        });
}
// Chama a função para buscar os dados das salas quando a página carregar
document.addEventListener('DOMContentLoaded', function () {
    buscarDadosDasSalas();
});

function criarListaDeSalas(dadosDasSalas) {
    let listaCompleta = '';
    dadosDasSalas.forEach(sala => {

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
                                        <button class="button-del" type="button" data-sala-id="${sala.id}">DELETAR</button>
                                    </div>
                                </ul>`;
        console.log("----------------------");
    });

    const listaContent = document.querySelector('#lista-salas');
    listaContent.innerHTML = listaCompleta;

// Obtém todos os botões "DELETAR"
const buttonsDelete = document.querySelectorAll('.button-del');

// Manipulador de evento para abrir o modal de confirmação
function openConfirmDelete(event) {
    const modalConfirmDeletar = document.getElementById('modal-confirm-deletar');
    const btnCancelar = document.getElementById('btn-cancelar');
    const btnConfirmar = document.getElementById('btn-confirmar');

    modalConfirmDeletar.style.display = 'block';

    // Configurar o evento "Sim" para a exclusão
    btnConfirmar.onclick = function () {
        // Execute a lógica de exclusão aqui
        // Feche o modal após a exclusão ou se o usuário cancelar
        modalConfirmDeletar.style.display = 'none';
    };

    // Configurar o evento "Cancelar"
    btnCancelar.onclick = function () {
        modalConfirmDeletar.style.display = 'none';
    };
}

// Adicione um manipulador de eventos para cada botão "DELETAR"
buttonsDelete.forEach(button => {
    button.addEventListener('click', openConfirmDelete);
});
}


