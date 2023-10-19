import React from 'react';

const Button = (props) => {
    return (
        <button
            type={props.type || 'button'}
            className={props.className || 'button-sq'}
            onClick={(e) => {
                props.clickHandler(e);
            }}
            name={props.name}
            disabled={props.disabled}
            title={props.title}
        >
            {props.buttonIcon || ''} {props.buttonText ?? 'Click'}
        </button>
    );
};

export default Button;
