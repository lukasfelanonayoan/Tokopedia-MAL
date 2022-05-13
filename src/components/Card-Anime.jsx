 /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Link } from 'react-router-dom';

function CardAnime(props){
    let data = props.items;

    return (
        <div css={css`width:100%;`}>
		    <div css={css`
                display:flex;
                flex-wrap:wrap;
                justify-content:center;
                @media (max-width: 767px) {
                    padding:1rem;
                }
                `}>
                {
                data.map( (musarrof) =>(
                <div key={musarrof.id} css={css`
                padding:0.5rem;
                @media (min-width: 768px) {
                    min-width:30%;
                    max-width:30%;
                    padding:1rem;
                }
                `}>
                    {/* click by ID */}
                    <Link to={"/anime/" + musarrof.id} css={css`text-decoration:none;color:black;`}>
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
                        </div>
                    </Link>
                </div>
                ))
                }
                
            </div>
        </div>
    );
}

export default CardAnime;