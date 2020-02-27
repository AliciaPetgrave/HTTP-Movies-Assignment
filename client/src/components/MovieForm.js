import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'

const initialMovie = {
    title:'',
    director:'',
    metascore:'',
    stars:[]
}

function MovieForm(props) {

    const [update, setUpdate] = useState(initialMovie)
    const {id} = useParams()

    useEffect(() => {
        const itemToUpdate = props.movies.find(movie => `${movie.id}` === id)

        if (itemToUpdate) {
            setUpdate(itemToUpdate)
        }
    }, [props.movies, id])



    const handleChanges = e => {
        setUpdate({
            ...update,
            [e.target.name]: e.target.value
        })
    }

    const updateMovie = e => {
        e.preventDefault()
        axios.put(`http://localhost:5000/api/movies/${update.id}`, update)
        .then(response => {
            console.log(response)
            props.getMovieList(response.data)
            props.history.push(`/`)
        })
        .catch(error => {
            console.log(error)
        })
        setUpdate({
            title:'',
            director:'',
            metascore:'',
            stars:[]
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
                    value={update.title}
                    />
                <input
                    type="text"
                    placeholder="director"
                    name="director"
                    onChange={handleChanges}
                    value={update.director}
                    />
                <input
                    type="text"
                    placeholder="metascore"
                    name="metascore"
                    onChange={handleChanges}
                    value={update.metascore}
                    />
                <input
                    type="text"
                    placeholder="stars"
                    name="stars"
                    onChange={handleChanges}
                    value={update.stars}
                    />   
                <button>Update</button>         
            </form>
        </div>
    )
}

export default MovieForm
