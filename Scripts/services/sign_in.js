const formLogin = document.querySelector('.formularioLogin');

formLogin.addEventListener('submit', event => {
    event.preventDefault();

    const formData = new FormData(formLogin);
    const data = Object.fromEntries(formData);
    const jsonData = JSON.stringify(data);

    fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: jsonData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        localStorage.setItem('chave', data.token);
        localStorage.setItem('id_user', data.user_id);
        // alert('Login bem-sucedido!');
        // Redirecionar ou realizar outra ação
        window.location.assign('/');
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Erro ao fazer login. Verifique suas credenciais.');
    });
});