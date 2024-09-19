localStorage.setItem('chave', '');
const formSignUp = document.querySelector('.formularioResgistro');

formSignUp.addEventListener('submit', event =>{
    event.preventDefault();

    const formData = new FormData(formSignUp);
    const data = Object.fromEntries(formData);
    const jsonData = JSON.stringify(data);

    localStorage.setItem('chave', 'teste02');
    alert(localStorage.getItem('chave'));
    window.location.assign('/');
});