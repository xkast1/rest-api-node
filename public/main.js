const url = "https://us-central1-rest-api-861c0.cloudfunctions.net/api/pets"
darDeBaja = async id => {
    event.target.parentElement.parentElement.remove()
    const response = await fetch(url+"/"+id+"/daralta")
    console.log(response)
}

const fetchPets = async() => {
    
    const response = await fetch(url)
    const json = await response.json()

    return json
}

const tableTemplate =({_id,nombre,tipo,descripcion})=>`
    <tr>
        <td>${nombre}</td>
        <td>${tipo}</td>
        <td>${descripcion}</td>
        <td><button onclick="darDeBaja('${_id}')">Dar de baja</button></td>
    </tr>
`
const handleSubmit = async e =>{
    e.preventDefault()
    const {nombre,tipo,descripcion} = e.target
    const data = {
        nombre: nombre.value,
        tipo: tipo.value,
        descripcion: descripcion.value,
    }
    nombre.value = ''
    tipo.value = ''
    descripcion.value = ''
    console.log(data)
    const response = await fetch(url, {
        method:'POST',
        body: JSON.stringify(data),
    })

    const json = await response.json()

    const template = tableTemplate({
        ...data,
        _id: json,
    })

    const tabla = document.getElementById("tabla")
    tabla.insertAdjacentHTML("beforeend",template)
}

window.onload=async()=>{
    const petForm = document.getElementById("pet-form")
    petForm.onsubmit = handleSubmit

    const pets = await fetchPets()
    const template = pets.reduce((acc, el) => 
    acc + tableTemplate(el),'')

    const tabla = document.getElementById("tabla")
    tabla.innerHTML=template

}