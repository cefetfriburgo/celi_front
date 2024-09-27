document.querySelector(".buttonLogout").addEventListener("click", logout);

async function logout() {
    await fetch('http://localhost:8000/api/logout', {
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
    window.location.assign('/');
}