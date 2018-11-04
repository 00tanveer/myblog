import React from 'react';
import styled from 'styled-components';


const Footer = (props) => {
    const Tab = styled.div`
        .footer {
            position: fixed;
            bottom: 20px;
            width: 100vw;
            height: 50px;
            display: flex;
            justify-content: center;
            .fa-instagram {
                color: white;
                font-size: 4rem;
                margin: 2vw;
                text-shadow: 0 0 10px white;
                transition: transform .3s linear;
                &:hover {
                    transform: scale(1.1);
                }
            }
            .fa-facebook {
                color: white;
                font-size: 4rem;
                margin: 2vw;
                text-shadow: 0 0 3px white;
                transition: transform .3s linear;
                &:hover {
                    transform: scale(1.1);
                }
            }
        }
    `
    return(
        <Tab>
            <div className="footer">
                <a 
                    href="https://www.instagram.com/troy.chy/?hl=en"
                    target="_blank|_tab"><i className="fab fa-instagram"></i></a>
                <a 
                    href="https://web.facebook.com/troyee.chowdhury.1"
                    target="_blank|_tab"><i className="fab fa-facebook"></i></a>
            </div>
        </Tab>
    );
}

export default Footer;
