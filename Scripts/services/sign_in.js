localStorage.setItem('chave', '');
const formLogin = document.querySelector('.formularioLogin');

formLogin.addEventListener('submit', event =>{
    event.preventDefault();

    const formData = new FormData(formLogin);
    const data = Object.fromEntries(formData);
    const jsonData = JSON.stringify(data);

    localStorage.setItem('chave', 'teste01');
    alert(localStorage.getItem('chave'));
    window.location.assign('/');

});