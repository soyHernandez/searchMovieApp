import React from 'react'

export const Pagination = ({page, movieList ,setPage, ProductsPerPage}) => {
    let pageNumber = []
    for (let i = 1; i < Math.ceil(movieList/ ProductsPerPage); i++) {
        pageNumber.push(i)
        
    }
    const currentPage = (number) =>{
        setPage(number)
    }
    const nextPage = () =>{
        const next = page + 1
        if (next <= pageNumber.length) {
            setPage(next)
        }
    }
    const pevPage = () =>{
        const prev = page - 1
        if (prev >= 1) {
            setPage(prev)
        }
    }
    return (
        <div className='nav'>
            <nav aria-label="...">
                <ul className="pagination">
                    <li className= {`page-item ${page === 1? 'disabled' : ''}` }>
                        <button className="page-link" onClick={pevPage}>Previous</button>
                    </li>
                    {
                        pageNumber.map(noPage =>{
                            return <li key={noPage} className={`page-item item-act ${noPage === page ? 'active' : ''}`}><a className="page-link" onClick={() => currentPage(noPage)}>{noPage}</a></li>
                        })
                    }
                    <li className={`page-item ${page === pageNumber.length ? 'disabled' : ''}` }>
                        <button className="page-link " onClick={nextPage}>Next</button>
                    </li>
                </ul>
            </nav>
        </div>
    )
}
