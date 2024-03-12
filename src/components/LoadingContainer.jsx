import React from 'react';
import { CgSpinner } from 'react-icons/cg';
const LoadingContainer = () => {
    return (
        <>
            <div style={{ textAlign: 'center', fontSize: '1.5em' }}>
                Loading...
            </div>
            <div className="loading-wrapper">
                <CgSpinner className="loading-spin"></CgSpinner>
            </div>
        </>
    );
};

export default LoadingContainer;
