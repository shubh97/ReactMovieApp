import axios from 'axios'
import React from 'react'
import Genres from '../../components/Genres'
import CustomPagination from '../../components/Pagination/CustomPagination'
import SingleContent from '../../components/SingleContent/SingleContent'
import useGenre from '../../hooks/useGenre'
import './Series.css'

const Series = () => {
    const [page, setPage] = React.useState(1)
    const [content, setContent] = React.useState([])
    const [numOfPages, setNumOfPages] = React.useState()
    const [selectedGenres, setSelectedGenres] = React.useState([])
    const [genres, setGenres] = React.useState([])
    const genreForURL = useGenre(selectedGenres)

    const fetchSeries = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreForURL}`)
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
        fetchSeries()
    }, [page, genreForURL])


  return (
    <div>
       <span className='pageTitle'>Series</span> 
            <Genres 
                type='tv' 
                selectedGenres={selectedGenres} 
                setSelectedGenres={setSelectedGenres}
                genres={genres} 
                setGenres={setGenres}
                setPage={setPage}
            />    
            <div className='series'>
                {		
                content && content.map((c)=><SingleContent key={c.id} 
                id={c.id} 
                poster={c.poster_path} 
                title={c.title||c.name} 
                date={c.first_air_date||c.release_date} 
                media_type='tv' 
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

export default Series
