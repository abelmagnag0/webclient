const instance = axios.create({
  baseURL: `http://localhost:8000/`
});

function acessarCardapio(e) {
  e.preventDefault()

  const user = document.querySelector("#user").value
  const pass = Number(document.querySelector("#pass").value)

  instance.get('login').then(async response => {
    const { data, status } = response
    const usuariosCadastrados = data

    let acesso = false
    if (status == 200) {
      usuariosCadastrados.forEach(usuario => {
        if(usuario.user === user && usuario.pass === pass){
          acesso = true
        } 
      })

      if(acesso){
        window.location.href = "/cardapio.html"
      }else{
        alert("Usuário ou senha incorreto")
      }

    } else {
      console.log(data)
    }
  })

}

const btn = document.querySelector("#btn")
btn.addEventListener("click", acessarCardapio)
