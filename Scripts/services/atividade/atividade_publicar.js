export function atividadePublicar(id){
    if(confirm("Tem certeza que deseja Publicar?")){
        alert(`Atividade ${id} publicada`);
        window.location.assign('/adm.html');
    }
    // const formData = new FormData(formElement);
    // const data = Object.fromEntries(formData);


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