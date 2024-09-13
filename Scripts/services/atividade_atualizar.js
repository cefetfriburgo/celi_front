export function atividadeAtualizar(formElement){
    const formData = new FormData(formElement);
    const data = Object.fromEntries(formData);


    fetch('', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then(data => console.log())
}