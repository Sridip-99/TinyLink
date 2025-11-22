import React from 'react'

const Loading = () => {

    return (
        <div className="loading-container">
        <div className="spinner" />
        <div className='logo' />
        <style>{`
            .loading-container {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            position: relative;
            }
            .spinner {
            border: 4px solid rgba(0, 0, 0, 0.1);
            border-left-color: #186dff;
            border-radius: 50%;
            width: 120px;
            height: 120px;
            animation: spin 1s linear infinite;
            }
            .logo {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 100px;
            height: 100px;
            background-image: url('./favicon.ico');
            background-size: cover;
            background-position:center;
            }
            @keyframes spin {
            to {
                transform: rotate(360deg);
            }
            }
        `}</style>
        </div>
    )
}

export default Loading