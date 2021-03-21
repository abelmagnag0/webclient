const instance = axios.create({
  baseURL: `http://localhost:8000/`
});

let adicionaisCadastrados = []

function pegarAdicionais() {
  instance.get('adicionais').then(async response => {
    const { data, status } = response
    adicionaisCadastrados = data

    if (status == 200) {
      adicionaisCadastrados = await formatCategoria(adicionaisCadastrados)
    } else {
      console.log(data)
    }
  })
}

function formatCategoria(itens) {
  instance.get('categoria').then(response => {
    const { data, status } = response

    data.forEach(data => {
      itens.forEach(item => {
        if (item.categoria === data._id) {
          item.categoria = data.nome
        }
      })
    })
    if (status == 200) {
      atualizarTabela()
      pegarCategorias()
    } else {
      console.log(data)
    }
  })
  return itens
}

function criarAdicional(e) {
  e.preventDefault()
  
  const nome = document.querySelector("#nome").value
  const categoria = document.querySelector("#categorias").value
  const valor = document.querySelector("#valor").value

  axios.post('/adicionais', {
    nome,
    categoria,
    valor
  })
    .then(response => {
      pegarAdicionais()
    })
    .catch(error => {
      console.log(error)
    })
}

function atualizarTabela() {
  form.reset()

  const tabela = document.querySelector("#tabela")
  const select = document.querySelector("#categorias")
  removerChildren(tabela)
  removerChildren(select)

  adicionaisCadastrados.forEach(adicional => {
    const tr = document.createElement("tr")

    for (let i = 1; i <= 4; i++) {
      const td = document.createElement("td")

      switch (i) {
        case 1:
          td.innerHTML = adicional.nome
          break;
        case 2:
          td.innerHTML = adicional.valor
          break;
        case 3:
          td.innerHTML = adicional.categoria
          break;
        case 4:
          const btnEditar = document.createElement("button")
          btnEditar.dataset.id = adicional._id
          btnEditar.innerHTML = "Editar"
          btnEditar.addEventListener("click", alterarAdicional)
          td.appendChild(btnEditar)

          const btnRemover = document.createElement("button")
          btnRemover.dataset.id = adicional._id
          btnRemover.innerHTML = "Remover"
          btnRemover.addEventListener("click", removerAdicional)
          td.appendChild(btnRemover)
          break;
      }
      tr.appendChild(td)
    }
    tabela.appendChild(tr)
  })
}

async function alterarAdicional() {
  const id = this.dataset.id

  const novoNome = prompt("Novo nome do adicional:")
  const novoValor = prompt("Novo valor do adicional:")

  if(novoNome == "" || novoValor == ""){
    alert("Espaço vazio!")
    return
  }
    const res = await axios({
      method: 'PUT',
      url: '/adicionais',
      data: {
        id,
        novoNome,
        novoValor
      }
    })
      .then(response => {
        pegarAdicionais()
      })
      .catch(error => {
        console.log(error)
      })
}

async function removerAdicional() {
  const id = this.dataset.id

  const res = await axios({
    method: 'DELETE',
    url: '/adicionais',
    data: {
      id
    }
  })
    .then(response => {
      pegarAdicionais()
    })
    .catch(error => {
      console.log(error)
    })
}

async function pegarCategorias() {
  instance.get('categoria').then(response => {
    const { data, status } = response
    let categoriasCadastradas = data

    if(categoriasCadastradas.length === 0){
      alert("Você deve registrar categorias primeiro!")
      return
    }

    if (status == 200) {
      atualizarCategorias(categoriasCadastradas)
    } else {
      console.log(data)
    }
  })
}

function atualizarCategorias(categoriasCadastradas) {
  const select = document.querySelector("#categorias")

  select.addEventListener("click", () => {
    if (select.children.length === 0) {
      alert("Você deve criar categorias primeiro!")
    }
  })

  categoriasCadastradas.forEach(categoria => {
    const option = document.createElement("option")
    option.setAttribute("value", categoria.nome)
    option.innerHTML = categoria.nome

    select.appendChild(option)
  })
}

function removerChildren(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild)
  }
}


const form = document.querySelector("#form")
form.addEventListener("submit", criarAdicional)