 /** @jsxImportSource @emotion/react */
 import {Component} from 'react';
import { css } from '@emotion/react'
import { Link } from 'react-router-dom';

// import { Link } from "react-router-dom";

class CardAnime extends Component{
    constructor(props){
        super(props);
        this.state={
            page:1
        };
    }

    changePage(n){
        this.setState({page:n});
    }

    render(){
        console.log(this.props.items.length);
        let data = [];
        let size = 10;
        let count = 0;

        let dataPage = [];

        for(let i = 0;i<this.props.items.length;i++){
            dataPage.push(this.props.items[i]);
            count++;

            if(count%size === 0){
                data.push(dataPage);
                dataPage = [];
            }

            if(i+1 === this.props.items.length){
                data.push(dataPage);
            }
        }

        return (
            <>
			    <div css={css`
                    display:flex;
                    width:100%;
                    flex-wrap:wrap;
                    justify-content:center;
                    `}>
                    {
                    data[this.state.page-1].map( (musarrof) =>(
                    <div css={css`
                    min-width:30%;
                    max-width:30%;
                    padding:1rem;
                    `}>
                        {/* click by ID */}
                        <Link key={musarrof.id} to={"/anime/" + musarrof.id} css={css`text-decoration:none;color:black;`}>
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
                                        <img css={css`height: 15rem;`} src={musarrof.coverImage.large} alt="" />
                                    </div>
                                    <div className='desc' css={css`
                                        transition:0.3s all;
                                        padding-left:1rem;
                                        `}>
                                        <p css={css`
                                        white-space: pre-line;
                                        max-height:15rem;
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
            </>
        );
    }
}

export default CardAnime;