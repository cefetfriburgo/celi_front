export function atividadeDeletar(id){
    if(confirm("Tem certeza que deseja Exluir?")){
        alert(`Atividade ${id} eliminada`);
        window.location.assign('/adm.html');
    }
    // const formData = new FormData(formElement);
    // const data = Object.fromEntries(formData);


    // fetch('', {
    //     method: 'DELETE',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(data)
    // })
    //     .then(res => res.json())
    //     .then(data => console.log())
}