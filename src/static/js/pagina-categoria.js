const instance = axios.create({
  baseURL: `http://localhost:8000/`
});

let categoriasCadastradas = []

function pegarCategorias() {
  instance.get('categoria').then(response => {
    const { data, status } = response
    categoriasCadastradas = data

    if (status == 200) {
      atualizarTabela()
    } else {
      console.log(data)
    }
  })
}

function removerTabela(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild)
  }
}

function atualizarTabela() {
  const tabela = document.querySelector("#tabela")
  removerTabela(tabela)

  categoriasCadastradas.forEach(categoria => {
    const tr = document.createElement("tr")

    for (let i = 1; i <= 2; i++) {
      let td = document.createElement("td")

      switch (i) {
        case 1:
          td.innerHTML = categoria.nome
          break;
        case 2:
          const btnEditar = document.createElement("button")
          btnEditar.dataset.id = categoria._id
          btnEditar.innerHTML = "Editar"
          btnEditar.addEventListener("click", alterarCategoria)
          td.appendChild(btnEditar)
  
          const btnRemover = document.createElement("button")
          btnRemover.dataset.id = categoria._id
          btnRemover.innerHTML = "Remover"
          btnRemover.addEventListener("click", removerCategoria)
          td.appendChild(btnRemover)
          break;
      }
      tr.appendChild(td)
    }

    tabela.appendChild(tr)
  })
}

async function alterarCategoria() {
  const id = this.dataset.id
  const novoNome = prompt("Novo nome da categoria:")

  if(novoNome == ""){
    alert("Espaço vazio! Favor preencher com a nova categoria")
    return
  }
    const res = await axios({
      method: 'PUT',
      url: '/categoria',
      data: {
        id,
        novoNome
      }
    })
      .then(response => {
        pegarCategorias()
      })
      .catch(error => {
        console.log(error)
      })
}

async function removerCategoria() {
    const id = this.dataset.id
  
    const res = await axios({
      method: 'DELETE',
      url: '/categoria',
      data: {
        id
      }
    })
      .then(response => {
        pegarCategorias()
      })
      .catch(error => {
        console.log(error)
      })
}

function criarCategoria(e) {
  e.preventDefault()

  let nome = document.querySelector("#nome")
  if (nome.value == "") {
    alert("Preencha o campo Nome!")
  } else {
    nome = nome.value
  }

  axios.post('/categoria', {
    nome
  })
    .then(response => {
      pegarCategorias()
    })
    .catch(error => {
      console.log(error)
    })
  document.querySelector("#form").reset()
}

document.querySelector("#btnCriar")
  .addEventListener("click", criarCategoria)