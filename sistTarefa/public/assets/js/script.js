let inpuTarefa = document.querySelector('#inpuTarefa');
let btnAdd = document.querySelector('#btnAdd');
let lista = document.querySelector('#lista');
let janelaEdit = document.querySelector('#janelaEdit');
let janelaEditFund = document.querySelector('#janelaEditFund');
let btnFechar = document.querySelector('#btnFechar');
let btnSalvar = document.querySelector('#btnSalvar');
let idTarefaEdic = document.querySelector('#idTarefaEdic');
let inputEditName = document.querySelector('#inputEditName');

inpuTarefa.addEventListener('keypress',(e) => { 

    if (e.keyCode == 13) {
       let tarefa = {
        nome: inpuTarefa.value, id: gerarId(),
       }
       adicTarefa(tarefa); 
    }
});

btnFechar.addEventListener('click',(e) => { 
    alternarJanelaEdit();
});

btnAdd.addEventListener('keypress',(e) => { 

       let tarefa = {
        nome: inpuTarefa.value,
         id: gerarId(),
       } 
       adicTarefa(tarefa);
});

btnSalvar.addEventListener('click',(e) => {
    e.preventDefault();

    let idTarefa = idTarefaEdic.innerHTML.replace('#', '');

    let tarefa =  {
        nome: inputEditName.value,
        id: idTarefa
    }

    let tarefaAtual = document.getElementById(''+idTarefa+'');

    if (tarefaAtual) {
        let li = criarTagLI(tarefa);
        lista.replaceChild(li, tarefaAtual);
        alternarJanelaEdit();   

    } else {
        alert('Elemento não encontrado');   
    }
});

function gerarId() {
    return Math.floor(Math.random() * 100);
}

function adicTarefa(tarefa) {

    let li = criarTagLI(tarefa);
    lista.appendChild(li);
    inpuTarefa.value = '';
}

function criarTagLI(tarefa) {
    
    let li = document.createElement('li');
    li.id = tarefa.id;

    let span = document.createElement('span');
    span.classList.add('textTarefa');
    span.innerHTML = tarefa.nome;

    let div = document.createElement('div');

    let btnEdit = document.createElement('button');
    btnEdit.classList.add('btns');
    btnEdit.innerHTML = '<i class="fa-solid fa-pencil"></i>';
    btnEdit.setAttribute('onclick', 'editar('+tarefa.id+')');

    let btnDelete = document.createElement('button');
    btnDelete.classList.add('btns');
    btnDelete.innerHTML = '<i class="fa-solid fa-trash"></i>';
    btnDelete.setAttribute('onclick', 'deletar('+tarefa.id+')');

    div.appendChild(btnEdit);
    div.appendChild(btnDelete);

    li.appendChild(span);
    li.appendChild(div);

    return li;
}

function editar(idTarefa){
    let li = document.getElementById(''+ idTarefa + '');
    if(li) {
        idTarefaEdic.innerHTML = '#' + idTarefa;
        inputEditName.value = li.innerText;
        alternarJanelaEdit();

    } else {
        alert('Elemento não encontrado');   
    }
}

function deletar(idTarefa){
    let confirmacao = window.confirm('Deseja excluir este item?');
    if (confirmacao) {
        let li = document.getElementById('' + idTarefa + '');
        if (li) {
            lista.removeChild(li);

        } else {
            alert('Elemento não encontrado');   
        }
    } 
}

function alternarJanelaEdit() {
    janelaEdit.classList.toggle('abrir');
    janelaEditFund.classList.toggle('abrir');
}