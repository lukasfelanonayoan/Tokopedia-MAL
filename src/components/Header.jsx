 /** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react'
import { Link } from 'react-router-dom';

const color = 'lightgray';

function Header(){
    return (
        <>
            <div css={css`
                padding: 1rem 2rem;
                background-color: #03ac0e;
                font-size: 16px;
                display:flex;
                justify-content:space-between;
                color:white;
            `}>
                <h1 css={css`
                    margin-bottom:0px;
                    margin-top:0px;
                    cursor:pointer;
                    &:hover {
                        color: ${color};
                    }
                `}>Anime Website</h1>
                <div css={css`
                    display:flex;
                    align-items:center;
                    justify-content:end;
                    a{
                        font-weight:600;
                        padding: 0 1rem;
                        &:hover {
                            color: ${color};
                        }
                    }
                `}>
                    <Link to={"/"} css={css`text-decoration:none;color:white;`}><div>Home</div></Link>
                    <Link to={"/"} css={css`text-decoration:none;color:white;`}><div>Collection</div></Link>
                </div>
            </div>
        </>
    );
}

export default Header;