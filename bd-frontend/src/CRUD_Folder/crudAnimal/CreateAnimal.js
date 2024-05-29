import React, {useState} from "react";

function CreateAnimal() {
    const [nombre, setNombre] = useState('');
    const [raza, setRaza] = useState('');

    function handleSubmit(e){
        e.preventDefault();


        const order = ["NombreAnimal", "RazaAnimal"];

        const formData = order.reduce((acc, key) => {
            switch (key) {
                case "NombreAnimal":
                    acc[key] = nombre;
                    break;
                case "RazaAnimal":
                    acc[key] = raza;
                    break;
            }
            return acc;
        }, {});

        console.log(formData);

        fetch('http://localhost:3001/animal', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(response => {
                if (response.ok) {
                    alert('animal creada exitosamente');
                    window.location.reload(); // Recargar la página
                } else {
                    alert('Error al crear animal');
                }
            })
            .catch(error => {
                console.error('Error en la solicitud:', error);
            });
    }

    return (
        <div>
            <h2>Crear Animal</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Nombre Animal: <input name="nombre" type="text" value={nombre}
                                          onChange={e => setNombre(e.target.value)}/>
                </label><br/>
                <label>
                    Nombre Raza: <input name="raza" type="text" value={raza} onChange={e => setRaza(e.target.value)}/>
                </label><br/>

                <button type="reset">Reset data</button>
                <button type="submit">Guardar</button>
            </form>
        </div>

    );
}

export default CreateAnimal;
