const formSignUp = document.querySelector('.formularioResgistro');

formSignUp.addEventListener('submit', event => {
    event.preventDefault();

    const formData = new FormData(formSignUp);
    const data = Object.fromEntries(formData);
    const jsonData = JSON.stringify(data);

    fetch('https://celi.cefet-rj.br/coordenacao/api/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: jsonData
    })
    .then(response => response.json())
    .then(data => {
        // lidar com a resposta aqui
    })
    .catch(error => {
        console.error('Erro:', error);
    });

    // Remover a propriedade "nome" do objeto "data" antes de enviar novamente
    delete data.nome;
    const updatedJsonData = JSON.stringify(data); // Criar uma nova string JSON

    fetch('https://celi.cefet-rj.br/coordenacao/api/teste_login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: updatedJsonData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // Salvar o token recebido no localStorage
        localStorage.setItem('chave', data.token);
        localStorage.setItem('id_user', data.user_id);
        // Redirecionar ou realizar outra ação
        window.location.assign('/');
    })
    .catch(error => {
        console.error('Erro:', error);
        console.log(updatedJsonData);
        // alert('Erro ao fazer login. Verifique suas credenciais.');
    });
});