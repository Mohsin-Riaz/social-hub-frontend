import React, { useEffect, useRef } from 'react'
import Button from './Button'

const Modal = (props) => {
    const modalRef = useRef()
    useEffect(() => {
        props.openModal
            ? modalRef.current.showModal()
            : modalRef.current.close()
    }, [props.openModal])
    return (
        <dialog ref={modalRef} className="modal">
            <div className="modal-box">
                <div className="modal-text">{props.text}</div>
                <div className="modal-buttons">
                    <Button
                        buttonIcon={props.confirmButtonIcon}
                        buttonText={props.confirmButtonText}
                        clickHandler={props.confirmHandler}
                    />
                    <Button
                        buttonIcon={props.cancelButtonIcon}
                        buttonText={props.cancelButtonText}
                        clickHandler={props.cancelHandler}
                    />
                </div>
            </div>
        </dialog>
    )
}

export default Modal
