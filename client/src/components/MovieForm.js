import React, {useState} from 'react'
import axios from 'axios'

function MovieForm() {

    const [update, setUpdate] = useState({
        title:'',
        director:'',
        metascore:'',
        stars:['']
    })

    const handleChanges = e => {
        setUpdate({
            ...update,
            [e.target.name]: e.target.value
        })
    }

    const updateMovie = e => {
        e.preventDefault()
        axios.put('http://localhost:5000/api/movies')
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.log(error)
        })
    }


    return (
        <div>
            <form onSubmit={updateMovie}>
                <input
                    type="text"
                    placeholder="title"
                    name="title"
                    onChange={handleChanges}
                    />
                <input
                    type="text"
                    placeholder="director"
                    name="director"
                    onChange={handleChanges}
                    />
                <input
                    type="text"
                    placeholder="name"
                    name="name"
                    onChange={handleChanges}
                    />
                <input
                    type="text"
                    placeholder="stars"
                    name="stars"
                    onChange={handleChanges}
                    />        
            </form>
        </div>
    )
}

export default MovieForm
