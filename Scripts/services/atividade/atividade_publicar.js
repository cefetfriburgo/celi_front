export async function atividadePublicar(id){
    if(confirm("Tem certeza que deseja Publicar?")){
        alert(`Atividade ${id} publicada`);

        await fetch(`http://localhost:8000/api/atividade/${id}/status/`, {
            method: 'PUT',
            headers:{
                'Authorization': `Bearer ${localStorage.getItem('chave')}`
            }
        })
        alert(`Atividade ${id} publicada`);

        window.location.assign('/adm.html');
    }
}