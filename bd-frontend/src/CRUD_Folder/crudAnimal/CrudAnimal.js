import React, {useState, useEffect}  from "react";
import CreateAnimal from "./CreateAnimal";
function AnimalList(){
    const [animales, setAnimales] = useState([]);

    function handleDelete(id) {
        // Simulate a fetch request to delete a persona
        // Replace 'your-api-endpoint' with your actual API endpoint
        fetch(`http://localhost:3001/animal/${id}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (response.ok) {
                    // Remove the deleted persona from the state
                    setAnimales(animales.filter(persona => persona.IdAnimal !== id));
                    window.location.reload();
                } else {
                    alert('Error deleting Animal');
                }
            })
            .catch(error => console.error('Error deleting animal:', error));
    }

    function handleMod(id){
        console.log("implementar logica");
    }

    useEffect(() => {
        // Simulate a fetch request to get personas from the server
        // Replace 'your-api-endpoint' with your actual API endpoint
        fetch('http://localhost:3001/animal')
            .then(response => response.json())
            .then(data => setAnimales(data))
            .catch(error => console.error('Error fetching animal:', error));
    }, []);

    return (
        <div>
            <CreateAnimal/>
            <h2>Listado de Animales</h2>
            <table>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Nombre</th>
                    <th>Raza</th>
                </tr>
                </thead>
                <tbody>
                {animales.map(animal => (
                    <tr key={animal.IdPersona}>
                        <td>{animal.IdAnimal}</td>
                        <td>{animal.NombreAnimal}</td>
                        <td>{animal.RazaAnimal}</td>
                        <td>
                            <button onClick={() => handleDelete(animal.IdAnimal)}>Eliminar</button>
                            <button onClick={() => handleMod(animal.IdAnimal)}>Modificar</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default AnimalList;
