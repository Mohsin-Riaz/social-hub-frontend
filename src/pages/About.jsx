import React from 'react'
import { FaAws, FaGithub, FaNodeJs, FaReact, FaSass } from 'react-icons/fa'
import { SiAwslambda, SiExpress, SiMongodb, SiSass } from 'react-icons/si'
const About = () => {
    return (
        <div className="about">
            <div className="about-head">Created by: Mohsin Riaz</div>
            <div className="about-stack">
                <span>Using:</span>
                <div className="about-stack-item">
                    <SiAwslambda className="icon" />
                    AWS Lambda
                </div>
                <div className="about-stack-item">
                    <FaAws className="icon" />
                    AWS S3
                </div>
                <div className="about-stack-item">
                    <SiExpress className="icon" />
                    ExpressJS
                </div>
                <div className="about-stack-item">
                    <SiMongodb className="icon" />
                    MongoDB
                </div>
                <div className="about-stack-item">
                    <FaNodeJs className="icon" />
                    NodeJS
                </div>
                <div className="about-stack-item">
                    <FaReact className="icon" />
                    React
                </div>
                <div className="about-stack-item">
                    <SiSass className="icon" />
                    Sass
                </div>
            </div>
            <a
                className="button-sq"
                href="https://github.com/Mohsin-Riaz/social-hub-frontend"
            >
                <FaGithub className="icon" /> Github Link
            </a>
        </div>
    )
}

export default About
