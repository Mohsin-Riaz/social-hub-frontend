import React from 'react'

const InputText = (props) => {
    function changeHandler(e) {
        const key = e.currentTarget.id
        const value = e.currentTarget.value
        props.setInfo({ ...props.info, [key]: value })
        props?.setError && props.setError(false)
    }

    return (
        <div className={props.className}>
            <label htmlFor={props.name}>{props.name}</label>
            <input
                type={props.type || 'text'}
                name={props.name}
                id={props.id}
                value={props.value}
                onChange={(e) => changeHandler(e)}
                disabled={props.disabled}
                defaultValue={props.defaultValue}
                placeholder={props.placeholder}
            />
        </div>
    )
}

export default InputText
