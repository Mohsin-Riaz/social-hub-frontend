import React, { useRef, useState } from 'react'
import { AiOutlineUpload } from 'react-icons/all'
import Button from './Button'

const FileUpload = (props) => {
    const [dragActive, setDragActive] = useState(false)
    const [currentFile, setCurrentFile] = useState('')
    const dropRef = useRef()

    const toBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => resolve(reader.result)
            reader.onerror = reject
        })

    // const fileHandler = async (e) => {
    //     e.preventDefault()
    //     e.stopPropagation()
    //     console.log(e.target)
    //     const file = e.target.files[0]
    //     setCurrentFile(file.name)
    //     const image = await toBase64(file)
    //     props.fileUploadFunc(image)
    // }

    function handleDragEnter(e) {
        setDragActive(true)
    }

    function handleDragLeave(e) {
        setDragActive(false)
    }

    function handleDrop(e) {
        e.preventDefault()
        e.stopPropagation()
        const file = e.dataTransfer.files[0]
        fileValidator(file)
    }

    function handleDragOver(event) {
        event.preventDefault()
    }

    async function fileValidator(file) {
        if (!file?.name?.endsWith('jpg' || 'jpeg')) {
            return alert('Error, upload file must be jpg')
        }
        setCurrentFile(file)
        const image = await toBase64(file)
        props.fileUploadFunc(image)
    }

    return (
        <section className="file-upload">
            <div
                className={
                    dragActive || currentFile
                        ? 'drop-area_uploaded'
                        : 'drop-area'
                }
                onDrop={(e) => handleDrop(e)}
                onDragOver={(e) => handleDragOver(e)}
                onClick={() => dropRef.current.click()}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
            >
                {!!currentFile ? (
                    <div>
                        <p>Uploaded: </p>
                        <p>{currentFile.name.split('.jp')[0]}</p>
                    </div>
                ) : (
                    <div>
                        <p>Drag and Drop</p>
                        <p>Or Click Here</p>
                    </div>
                )}

                <input
                    type="file"
                    onChange={(e) => {
                        fileValidator(e.target.files[0])
                    }}
                    hidden
                    ref={dropRef}
                    accept="image/jpeg, image/jpg"
                />
            </div>
        </section>

        // <section className="file-upload">
        //     {/* <div
        //         id="drop-area"
        //         ref={dropRef}
        //         className={
        //             dragActive ? 'drop-area drop-area-enter' : 'drop-area'
        //         }

        //         // onDrop={(e) => fileDropHandler(e)}
        //     > */}
        //     <input
        //         type="file"
        //         id="myFile"
        //         name="filename"
        //         className={
        //             dragActive
        //                 ? 'file-upload-input drop-area-enter'
        //                 : 'file-upload-input'
        //         }
        //         onDragEnter={(e) => dragEnter(e)}
        //         onDragLeave={(e) => dragLeave(e)}
        //         onChange={(e) => fileHandler(e)}
        //         // multiple={false}
        //         onInput={(e) => dragCapture(e)}
        //     />
        //     {
        //         <label className="drop-area-label">
        //             <span>
        //                 <div>Drag and Drop</div>
        //                 <div>or Click to </div>
        //                 <div>
        //                     <AiOutlineUpload className="icon" />
        //                     Upload
        //                 </div>
        //             </span>
        //         </label>
        //         // ) : (
        //         //     <label className="drop-area-label">
        //         //         <span>
        //         //             <div>File uploaded:</div>
        //         //             <div>{currentFile}</div>
        //         //         </span>
        //         //     </label>
        //     }
        // </section>
    )
}

export default FileUpload
