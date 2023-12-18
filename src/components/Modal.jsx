import React, { useEffect } from 'react'

export const Modal = ({ ModalInfo, setIsOpen }) => {
    const closeModal = () => {
        setIsOpen(false)
    }
    return (
        <div className='modal-container'>
            <div className='modal-movie'>
                <img src={ModalInfo[2]} alt={ModalInfo[0]} />
                <div className="info">
                    <h2>{ModalInfo[0]}</h2>
                    <p><b>Descripcion:</b><br/>
                    {ModalInfo[1]}</p>
                    <button className='btn btn-danger' onClick={closeModal}>Close</button>
                </div>
            </div>
        </div>
    )
}
