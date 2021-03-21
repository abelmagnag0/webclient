const instance = axios.create({
  baseURL: `http://localhost:8000/`
});

let itensCadastrados = []

function pegarItens() {
  instance.get('cardapio').then(async response => {
    const { data, status } = response
    itensCadastrados = data

    if (status == 200) {
      itensCadastrados = await formatCategoria(itensCadastrados) 
    } else {
      console.log(data)
    }
  })
}

function formatCategoria(itens){
  instance.get('categoria').then(response => {
    const { data, status } = response
    
    data.forEach(data => {
      itens.forEach(item => {
        if(item.categoria === data._id){
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

function removerChildren(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild)
  }
}

function atualizarTabela() {
  form.reset()
  const tabela = document.querySelector("#tabela")
  const select = document.querySelector("#categorias")
  removerChildren(tabela)
  removerChildren(select)
  
  itensCadastrados.forEach(item => {
    const tr = document.createElement("tr")

    for (let i = 1; i <= 9; i++) {
      let td = document.createElement("td")

      switch (i) {
        case 1:
          td.innerHTML = item.nome
          break;
        case 2:
          td.innerHTML = item.descricao
          break;
        case 3:
          td.innerHTML = item.categoria
          break;
        case 4:
          td.innerHTML = item.valor
          break;
        case 5:
          td.innerHTML = item.adicional
          break;
        case 6:
          td.innerHTML = item.id_interno
          break;
        case 7:
          td.innerHTML = item.id_pdv
          break;
        case 8:
          const btnEditar = document.createElement("button")
          btnEditar.dataset.id = item.id_interno
          btnEditar.innerHTML = "Editar"
          btnEditar.addEventListener("click", alterarItem)
          td.appendChild(btnEditar)
          break;
        case 9:
          const btnRemover = document.createElement("button")
          btnRemover.dataset.id = item.id_interno
          btnRemover.innerHTML = "Remover"
          btnRemover.addEventListener("click", removerItem)
          td.appendChild(btnRemover)
          break;
      }
      tr.appendChild(td)
    }

    tabela.appendChild(tr)
  })
}

function criarItem(e) {
  e.preventDefault()

  const nome = document.querySelector("#nome").value
  const descricao = document.querySelector("#descricao").value
  const categoria = document.querySelector("#categorias").value
  const valor = document.querySelector("#valor").value
  const adicional = document.querySelector("#adicional").value
  const idPdv = document.querySelector("#id-pdv").value

  axios.post('/cardapio', {
    nome,
    descricao,
    categoria,
    valor,
    adicional,
    id_pdv: idPdv
  })
    .then(response => {
      pegarItens()
    })
    .catch(error => {
      console.log(error)
    })
}

async function pegarCategorias() {
  instance.get('categoria').then(response => {
    const { data, status } = response
    let categoriasCadastradas = data

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
    if (select.children.length === 1) {
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

async function removerItem() {
  const id = this.dataset.id

  let findIndex = itensCadastrados.findIndex(item => item.id_interno == id)

  const res = await axios({
    method: 'DELETE',
    url: '/cardapio',
    data: {
      id_interno: id,
      index: findIndex
    }
  })
    .then(response => {
      pegarItens()
    })
    .catch(error => {
      console.log(error)
    })
}

async function alterarItem() {
  const id = this.dataset.id

  form.reset()

  const nome = prompt("Novo nome:")
  const descricao = prompt("Nova descricao:")
  const categoria = prompt("Nova categoria:")
  const valor = prompt("Novo valor:")
  const adicional = prompt("Novo adicional:")
  const idPdv = prompt("Novo ID PDV:")

  const data = {
    nome,
    descricao,
    categoria,
    valor,
    adicional,
    idPdv,
    id
  }

  const res = await axios({
    method: 'PUT',
    url: '/cardapio',
    data: {
      data
    }
  })
    .then(response => {
      pegarItens()
    })
    .catch(error => {
      console.log(error)
    })


}

const form = document.querySelector("#form")
form.addEventListener("submit", criarItem)






