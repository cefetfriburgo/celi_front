function updateLinks(){
    const linkLogin = document.querySelector(".buttonLogin");
    const linkLogout = document.querySelector(".buttonLogout");

    const isLoggedIn = localStorage.getItem('chave')

    if(isLoggedIn){
        linkLogin.style.display = 'none';
        linkLogout.style.display = 'block';
    }else{
        linkLogin.style.display = 'block';
        linkLogout.style.display = 'none';
    }
}

updateLinks();