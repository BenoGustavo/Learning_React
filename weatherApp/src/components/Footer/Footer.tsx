import React from "react";
import githubIcon from "../../assets/img/icons/github.png"
import linkedinIcon from "../../assets/img/icons/linkedin.png"
import repositoryIcon from "../../assets/img/icons/repo.png"

import "./style.css"

export class Footer extends React.Component {
    render() {
        return (
            <footer>
                <div className="footerContainer">
                    <ul>
                        <li>
                            <a href="https://github.com/BenoGustavo/Learning_React/tree/main/weatherApp" target="_blank" rel="noopener noreferrer">
                                <img src={repositoryIcon} alt="Repositorio icone" />
                                <span>Repository</span>
                            </a>
                        </li>
                        <li>
                            <a href="https://www.linkedin.com/in/gustavo-gorges-016b21269/" target="_blank" rel="noopener noreferrer">
                                <img src={linkedinIcon} alt="Linkedin Icon" />
                                <span>Linkedin</span>
                            </a>
                        </li>
                        <li>
                            <a href="https://github.com/BenoGustavo" target="_blank" rel="noopener noreferrer">
                                <img src={githubIcon} alt="Github Profile" />
                                <span>Github</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </footer>
        );
    }
}