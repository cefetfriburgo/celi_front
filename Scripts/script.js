// const 

async function listarDados(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok: " + response.statusText);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Houve algum erro com a operação de fetch', error);
    throw error;
  }
}

async function mostrarDados() {
  try {
    const user = await listarDados('./json/01-user.json');
    let userList = user.users;
    return userList;
  } catch (error) {
    console.error('Erro ao processar dados', error);
  }
}

mostrarDados();