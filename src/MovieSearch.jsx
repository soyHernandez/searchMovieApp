import { useState } from 'react'
import { Pagination } from './components/pagination'
import { Modal } from './components/Modal'
export const MovieSearch = () => {
// lista de peliculas
    const [Movie, setMovie] = useState('')
    const [ResultMovie, setResultMovie] = useState([])
// paginacion
    const [ProductsPerPage, setProductsPerPage] = useState(6)
    const [Page, setPage] = useState(1)
//index de paginacion
    const lastIndex = Page * ProductsPerPage;
    const firstIndex = lastIndex - ProductsPerPage
//modal info
    const [ModalInfo, setModalInfo] = useState({})
    const [IsOpen, setIsOpen] = useState(false)
    const openModal = (title,desc,img) => {
        const info =[title,desc,img]
        setModalInfo(info)
        setIsOpen(true)
    }
//muestra el modal
    const ShowHide = () =>{
        return(
            <Modal ModalInfo = {ModalInfo} IsOpen={IsOpen} setIsOpen={setIsOpen}></Modal>
        )
    }

    const Url = 'https://api.themoviedb.org/3/search/movie'
    const API_KEY = 'f595f91b259c96edf16a637e56f326f4'
    const MovieSearch = (e) => {
        setMovie(e.target.value)
    }

    const fetchMovie = async () => {
        try {
            const res = await fetch(`${Url}?query=${Movie}&api_key=${API_KEY}`)
            const data = await res.json()
            setResultMovie(data.results)
        } catch (error) {
            console.log(error)
        }
    }
    const onSubmit = (e) => {
        e.preventDefault()
        if (Movie.length > 0){ 
            fetchMovie()
            setPage(1)
        }
    }

    const navPag = () => {
        if (ResultMovie.length > 0) {
            const movieList = ResultMovie.length;
            return <Pagination page={Page} movieList={movieList} setPage={setPage} ProductsPerPage={ProductsPerPage}></Pagination>
        }
    }
    return (
        <div className="container">
            <h1 className="titel">Search</h1>
            <hr />
            <form onSubmit={onSubmit}>
                <input type="text"
                    placeholder='search a movie'
                    value={Movie}
                    onChange={MovieSearch}
                />
                <button type="submit">Search</button>
            </form>
            
            <div className="movie-list">
                {ResultMovie.length > 0 ? '': 
                <div className='noResult'>
                    <p>No results to show</p>
                </div>
                }
                {ResultMovie.map((res) => {
                    return (
                        <div key={res.id} className="movie-card">
                            <img onClick={()=> openModal(res.title, res.overview,`https://image.tmdb.org/t/p/w500/${res.poster_path}` )} src={`https://image.tmdb.org/t/p/w500/${res.poster_path}`} alt={res.title} />
                            <h2>{res.title}</h2>
                        </div>
                    )
                }).slice(firstIndex, lastIndex)}
            </div>
            {navPag()}
            <div>
                {IsOpen? ShowHide() : ''}
            </div>
        </div>
    )
}
