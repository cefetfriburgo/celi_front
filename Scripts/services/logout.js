document.querySelector(".buttonLogout").addEventListener("click", logout);

async function logout() {
    await fetch('https://celi.cefet-rj.br/api/logout', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('chave')}`
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        // alert('Erro');
    });
    localStorage.setItem('chave', '');
    localStorage.setItem('id_user', '');
    // alert('Chave Vazia');
    window.location.assign('https://celi.cefet-rj.br/coordenacao/atividades/index.html');
}