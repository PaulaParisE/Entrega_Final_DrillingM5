
function getDataStarWars(pageCharacter){
    let promise = fetch("https://swapi.dev/api/people/"+pageCharacter)
    promise
        .then(response => {
            //Validaciones ejemplo de estatus como viene la promesa siempre se hacen 2 
            console.log(response)
            if(!response.ok){
                //si response.ok es falso entro a este punto
                if(response.status ===404){
                    alert("Personaje no encontrado");
                    console.error("Personaje no encontrado", response.status);
                    throw new Error("Recurso no encontrado");
                }
                else{
                    console.error("Error HTTP", response.status);
                    throw new Error("Erro al obtener personaje");
                }
            }
            return response.json()
        })
        //Data que viene entrando
        .then(data => {
            console.log(data)
            injectInfo (data)
        })
        .catch (error=>{
            console.log(error)
        })
}

function injectInfo(character) {
    const {name, height, mass} = character;
    let infoHtml = ` <div class="timeline-text">
                         <h6>Nombre:${name}</h6>
                        <p>Estatura:${height}. Peso:${mass}</p>
                    </div>               
`
console.log(infoHtml);
document.getElementById("starwars-text").innerHTML = infoHtml;

}
getDataStarWars(5);





/* Generador para obtener personajes
function* characterGenerator(start, end) {
    for (let i = start; i <= end; i++) {
        yield fetch(`https://swapi.dev/api/people/${i}/`)
            .then(response => response.json())
            .then(data => ({
                name: data.name,
                height: data.height,
                mass: data.mass
            }))
            .catch(error => console.error('Error:', error));
    }
}

// Función para mostrar personajes
async function displayCharacters(start, end) {
    const container = document.getElementById('characters-container');
    container.innerHTML = ''; // Limpiar contenedor

    const generator = characterGenerator(start, end);

    for (let i = 0; i < 5; i++) {
        const characterPromise = generator.next().value;
        if (characterPromise) {
            const character = await characterPromise;
            const card = document.createElement('div');
            card.className = 'character-card';
            card.innerHTML = `
                <h3>${character.name}</h3>
                <p>Altura: ${character.height} cm</p>
                <p>Peso: ${character.mass} kg</p>
            `;
            container.appendChild(card);
        }
    }
}

// Agregar event listeners a las secciones
document.querySelectorAll('.section').forEach(section => {
    section.addEventListener('mouseenter', () => {
        const start = parseInt(section.dataset.start);
        const end = parseInt(section.dataset.end);
        displayCharacters(start, end);
    });
} */