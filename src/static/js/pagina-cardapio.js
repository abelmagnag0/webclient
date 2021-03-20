const instance = axios.create({
  baseURL: `http://localhost:8000/`
});

function pegarItens() {
  instance.get('cardapio').then(response => {
    const { data, status } = response
    if (status == 200) {
      atualizarTabela(data)
    } else {
      console.log(data)
    }
  })
  atualizarTabela()
}

function atualizarTabela(data) {
  const tabela = document.querySelector("#tabela")
  data.forEach(item => {
    const tr = document.createElement("tr")

    for (let i = 1; i <= 7; i++) {
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
  const categoria = document.querySelector("#categoria").value
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
    console.log(response)
    atualizarTabela()
  })
  .catch(error => {
    console.log(error)
  })

  atualizarTabela()
}

const form = document.querySelector("#form")
form.addEventListener("submit", criarItem)






