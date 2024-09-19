document.querySelector(".buttonLogout").addEventListener("click", function(){
    localStorage.setItem("chave", "");
    alert("Chave Vazia");
    window.location.assign('/');
});