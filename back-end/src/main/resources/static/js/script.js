const modal = document.querySelector('#cad-sala-modal');
const openModal = document.querySelector('#openModalBtn');
const closeModalBtn = document.querySelector('.close-modal-btn');

buscarDadosDasSalas();

openModal.onclick = function () {
    modal.style.display = "block";
}

closeModalBtn.onclick = function () {
    modal.style.display = "none";
}

const formCadastro = document.querySelector('#cadastro-form');
const inputIdentificacao = document.querySelector('#indentificacao');
const inputDescricao = document.querySelector('#descricao');
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
                descricao: inputDescricao.value,
                categoria: inputCategoria.value,
                predio: inputPredio.value,
                piso: inputPiso.value
            })
        })
        .then(response => {
            return response.json();
        })
        .then(response => {
            buscarDadosDasSalas(response);
        })
        .catch(function (response) { console.log(response) })

};

function limpar() {
    inputIdentificacao.value = "";
    inputDescricao.value = "";
    inputCategoria.value = "";
    inputPredio.value = "";
    inputPiso.value = "";
}


const confirmeCadastro = document.querySelector('#modal-confirm-cadastro');
let confirma = false;
const simBtn = document.querySelector('#button-confirm-cad');
const cancelaBtn = document.querySelector('#button-cancela-cad');

formCadastro.addEventListener('submit', function (event) {
    event.preventDefault();
});

finalizarBtn.onclick = function () {
    confirmeCadastro.style.display = "block";
    }

simBtn.onclick = function () {
    confirma = true;
    confirmeCadastro.style.display = "none";

    if (confirma) {
        cadastrar();
        limpar();
    }
};

cancelaBtn.onclick = function () {
    confirma = false;
    confirmeCadastro.style.display = "none";
};


let modalDeletar = `<!-- Modal de confimação de DELETAR SALA INICIO-->
        <div id="modal-deletar" class="content-modal-confirm" style="display: none;">
  
          <div class="modal-confirm">
            <div class="content-dialog">
              <i class='bx bx-message-rounded-x delete'></i>
              <p>Essa ação irá apagar uma sala na lista! Tem certeza?</p>
              <div class="content-dialog-btn">
                <button id="button-deletar-sala-cancelar" class="dialog-btn-cancelar" type="submit">Cancelar</button>
                <button id="button-deletar-sala-sim" class="dialog-btn-sim">Sim</button>
              </div>
            </div>
  
          </div>
  
        </div>
        <!-- Modal de confimação de DELETAR SALA FINAL-->`;

const contentModalDelete = document.querySelector('#modal-deletar-content');
contentModalDelete.innerHTML = modalDeletar;

function criarListaDeSalas(data) {
    let listaCompleta = '';
    let idConfirme = null;
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
                                        <button class="button-del" type="button"  id="button-del${sala.id}">DELETAR</button>
                                    </div>
                                </ul>`;

    });

    const listaContent = document.querySelector('#lista-salas');
    listaContent.innerHTML = listaCompleta;

    data.forEach(sala => { 
        const deletarBtn = document.querySelector(`#button-del${sala.id}`);
        const openModalDelete = document.querySelector('#modal-deletar');
        const cancelaDeleteBtn = openModalDelete.querySelector('#button-deletar-sala-cancelar');
        const simDeleteBtn = openModalDelete.querySelector('#button-deletar-sala-sim');
        deletarBtn.onclick = function () {
            openModalDelete.style.display = "block";
            salaIdParaExcluir = sala.id;
        };
        simDeleteBtn.addEventListener("click", function () {
            openModalDelete.style.display = "none";
            if (salaIdParaExcluir !== null) {
                
                deletarSala(salaIdParaExcluir); 
                salaIdParaExcluir = null; 
            }
        }); 
        cancelaDeleteBtn.onclick = function () {
            openModalDelete.style.display = "none"
            salaIdParaExcluir = null; 
        }
    });
}

function buscarDadosDasSalas() {
    fetch('http://localhost:8080/sala')
        .then(response => response.json()
        )
        .then(data => {
            criarListaDeSalas(data);
        })
        .catch(error => {
            console.log('Erro ao buscar os dados das salas:', error);
        });
}

function deletarSala(salaId) {
    fetch(`http://localhost:8080/sala/${salaId}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (response.ok) {
                console.log("Sala excluída com sucesso");
                buscarDadosDasSalas();
            } else {
                console.error("Falha ao excluir a sala");
            }
        })
        .catch(error => {
            console.error("Erro ao fazer a solicitação DELETE:", error);
        });

}