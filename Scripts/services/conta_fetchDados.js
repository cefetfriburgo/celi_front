function renderizarDados() {
  fetch("Scripts/json/01-user.json", {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then((response) => {
        createHTML(response.users[0])
    })
}

//feito assumindo que há somente informacoes de um usuario a ser expressado na tela "account_info"

renderizarDados();

  function createHTML(user) {
  const info = document.getElementById('accountInfoContainer');

  let listItem = document.createElement('ul');
  listItem.innerHTML = `
  <li class="accItemData">ID: ${user.id}</li><li class="accItemData">Nome: ${user.name}</li><li class="accItemData">Email: ${user.email}</li>`;

  
  info.appendChild(listItem);


}