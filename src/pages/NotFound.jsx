import React from 'react';

const NotFound = () => {
    setTimeout(() => {
        // navigate('/', { replace: true });
        window.location.pathname = 'social-hub-frontend';
    }, 2000);

    return (
        <>
            <div style={{ textAlign: 'center', fontSize: '5vw' }}>
                NOT FOUND
            </div>
            <div style={{ textAlign: 'center', fontSize: '2vw' }}>
                Taking you back home...
            </div>
        </>
    );
};

export default NotFound;
