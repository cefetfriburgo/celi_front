export function atividadeCadastrar(formElement){
    const formData = new FormData(formElement);
    const data = Object.fromEntries(formData);

    if(confirm("Tem certeza que deseja prosseguir?")){
        alert("Confirmado");
        window.location.assign('/adm.html');
    }

    // fetch('', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(data)
    // })
    //     .then(res => res.json())
    //     .then(data => console.log())
}