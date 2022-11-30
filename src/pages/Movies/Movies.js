import React from 'react'
import axios from 'axios'
import CustomPagination from '../../components/Pagination/CustomPagination'
import SingleContent from '../../components/SingleContent/SingleContent'
import './Movies.css'
import Genres from '../../components/Genres'
import useGenre from '../../hooks/useGenre'

const Movies = () => {
    const [page, setPage] = React.useState(1)
    const [content, setContent] = React.useState([])
    const [numOfPages, setNumOfPages] = React.useState()
    const [selectedGenres, setSelectedGenres] = React.useState([])
    const [genres, setGenres] = React.useState([])
    const genreForURL = useGenre(selectedGenres)

    const fetchMovies = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreForURL}`)
        console.log(data)
        setContent(data.results)
        if (data.total_pages>500){
            setNumOfPages(500)
        }
        else {
            setNumOfPages(data.total_pages)
        }
    }

    React.useEffect(()=>{
        fetchMovies()
    }, [page, genreForURL])

    return (
        <div>
            <span className='pageTitle'>Movies</span>
            <Genres 
                type='movie' 
                selectedGenres={selectedGenres} 
                setSelectedGenres={setSelectedGenres}
                genres={genres} 
                setGenres={setGenres}
                setPage={setPage}
            />         
            <div className='movies'>
                {		
                content && content.map((c)=><SingleContent key={c.id} 
                id={c.id} 
                poster={c.poster_path} 
                title={c.title||c.name} 
                date={c.first_air_date||c.release_date} 
                media_type={c.media_type} 
                vote_average={c.vote_average}
                />)
                }
            </div>
            {numOfPages>1 && (
                <CustomPagination setPage={setPage} numOfPages={numOfPages}/>
            )}
        </div>
    )
}

export default Movies
