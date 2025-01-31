const formSignUp = document.querySelector('.formularioResgistro');

formSignUp.addEventListener('submit', event => {
    event.preventDefault();

    const formData = new FormData(formSignUp);
    const data = Object.fromEntries(formData);
    const jsonData = JSON.stringify(data);

    // Enviar os dados para criar o usuário
    fetch('https://celi.cefet-rj.br/coordenacao/api/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: jsonData
    })
    .then(response => response.json())
    .then(data => {
        // Verificar se o cadastro foi bem-sucedido
        if (data.success) {  // Supondo que a resposta contenha um campo 'success'
            alert('Cadastro realizado com sucesso!');

            // Agora que o usuário foi criado, tentamos fazer o login
            // O `data` pode conter as informações necessárias para o login (como email e senha)
            const loginData = JSON.stringify({
                email: data.email,  // Substitua conforme necessário
                password: data.password  // Substitua conforme necessário
            });

            // Enviar a requisição de login
            return fetch('https://celi.cefet-rj.br/coordenacao/api/teste_login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: loginData
            });
        } else {
            throw new Error('Erro ao criar usuário');
        }
    })
    .then(response => response.json())
    .then(data => {
        // Verificar se o login foi bem-sucedido
        if (data.token) {
            localStorage.setItem('chave', data.token);
            localStorage.setItem('id_user', data.user_id);
            window.location.assign('/');
        } else {
            throw new Error('Erro ao fazer login');
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Erro ao realizar o cadastro ou login.');
    });
});