import React, {Component} from 'react';
import { css, cx } from '@emotion/css';

const color = 'white'

class Header extends Component{
    render(){
        return (
            <>
                <div className={css`
                    padding: 1rem 2rem;
                    background-color: limegreen;
                    font-size: 24px;
                    display:flex;
                `}>
                    <h1 className={css`
                        margin-bottom:0px;
                        &:hover {
                            color: ${color};
                        }
                    `}>Anime Website</h1>
                </div>
            </>
        );
    }
}

export default Header;