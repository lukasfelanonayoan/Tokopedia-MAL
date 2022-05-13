/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useState } from 'react';
import { Link } from 'react-router-dom';

import FormConfirmation from './forms/Form-Confirmation';

function CardCollection(props){
    let [setAdd] = useState(false);
    let [remove, setRemove] = useState(false);
    let data = props.items;
    let refresh = props.refresh;

    let closeForm = () => {
        setRemove(false);
        setAdd(false);
        refresh();
    }

    return (
        <div css={css`width:100%;`}>
            {
                data.map( collection =>(
                    <div key={collection.name}>
                        <div css={css`padding:1rem 2rem;`}>
                            <div css={css`display:flex;justify-content:space-between;`}>
                                <h3>Collection {collection.name}</h3>
                                <div css={css`display:flex;align-items:center;`}>
                                    <div css={css`padding:0.5rem;`}>
                                        <Link  to={"/collection/" + collection.name} css={css`text-decoration:none;color:black;`}>Detail</Link>
                                    </div>
                                </div>
                            </div>
                            <div css={css`
                            display:flex;
                            flex-wrap:wrap;
                            @media (max-width: 767px) {
                                padding:1rem;
                            }
                            `}>
                            {
                                (collection.anime.length!==0)?
                                collection.anime.map( (musarrof) =>(
                                <div key={musarrof.id} css={css`
                                padding:0.5rem;
                                @media (min-width: 768px) {
                                    min-width:30%;
                                    max-width:30%;
                                    padding:1rem;
                                }
                                `}>
                                    <div>
                                        <div css={css`
                                        border:2px solid black;
                                        border-radius:1rem;
                                        padding:1.25rem;
                                        cursor:pointer;
                                        transition:0.3s all;
                                        }
                                        `}>
                                            <h3 css={css`text-align:center;`}>{musarrof.title.romaji}</h3>
                                            <div css={css`
                                            width:100%;
                                            display:flex;`}>
                                                <div css={css`display:flex; align-items:center;`}>
                                                    <img css={css`height: 10rem; @media (min-width: 768px) {height: 15rem;}`} src={musarrof.coverImage.large} alt="" />
                                                </div>
                                                <div className='desc' css={css`
                                                    transition:0.3s all;
                                                    padding-left:1rem;
                                                    `}>
                                                    <p css={css`
                                                    white-space: pre-line;
                                                    max-height:10rem;
                                                    @media (min-width: 768px) {max-height: 15rem;}
                                                    overflow-y: auto;
                                                    `}>{musarrof.description.replaceAll("<br>", "\n")}</p>
                                                </div>
                                            </div>
                                            <div css={css`padding-top:1rem;display:flex;justify-content:space-between;width:100%;`}>
                                                <div>
                                                    <button  css={css`&:hover {color: lightgray;}cursor:pointer;background:teal;border-radius:0.5rem;width:100%;padding:0.5rem;color:white;font-size:1.05rem;font-weight:500;border:0;`}>
                                                        <Link to={"/anime/" + musarrof.id} css={css`text-decoration:none;color:white;`}>Detail</Link>
                                                    </button>
                                                </div>
                                                <div>
                                                    <button  css={css`&:hover {color: lightgray;}cursor:pointer;background:red;border-radius:0.5rem;width:100%;padding:0.5rem;color:white;font-size:1.05rem;font-weight:500;border:0;`} onClick={()=>{setRemove(true)}}>Remove</button>
                                                    {
                                                    (remove)?
                                                        <FormConfirmation close={closeForm} name={collection.name} anime={musarrof}></FormConfirmation>
                                                        :
                                                        ""
                                                    }

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                ))
                                :
                                <div css={css`width:100%;height:10rem;background:lightgray; border-raidus:1rem; display:flex; justify-content:center; align-items:center; font-size:1.5rem; font-weight:700`}><div>Empty</div></div>
                            }

                        </div>
                        </div>
                    </div>
                ))
            }
            
        </div>
    );
}

export default CardCollection;