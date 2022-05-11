 /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import {
    useQuery
} from "@apollo/client";

import { useParams } from 'react-router-dom';

// Query GraphQL 
import { GetDetailAnime } from '../query/Anime-Query';

function AnimeDetail(){
    const param = useParams();
    const { loading, data } = useQuery(GetDetailAnime,{
        variables:{
            id:param.id
        }
    });

    let fetchData = (!loading)?data.Media:null;

    let template = 
    <>
    {(!loading)?
        <div css={css`
            padding:1rem 2rem;
        `}>
            <h2 css={css`{
            margin-bottom:0;
        }`}>{fetchData.title.romaji} ({fetchData.title.english})</h2>
        <div css={css`
            display:flex;
        `}>
            <div>
                <img src={fetchData.coverImage.large} alt="" />
                <div css={css`
                    display:flex;
                    text-align:center;
                `}>
                    <div css={css`
                    width:50%;
                    `}>
                        <div css={css`font-weight:700;`}>Episodes</div>
                        <div css={css`font-weight:700;font-size:1.5rem;`}>{fetchData.episodes}</div>
                    </div>
                    <div css={css`
                    width:50%;`}>
                        <div css={css`font-weight:700`}>Rating</div>
                        <div css={css`font-weight:700;font-size:1.5rem;`}>{fetchData.meanScore}</div>
                    </div>
                </div>
            </div>
            <div css={css`
            padding-left:1.75rem;
            `}>
                <img css={css`
                width:100%;
                `} src={fetchData.bannerImage} alt="" />
                <h4 css={css`
                margin:0;
                padding:0.5rem 0;
                `}>Description</h4>
                <p css={css`
                margin:0;
                text-align:justify;
                `}>{fetchData.description.replaceAll("<br>", "\n")}</p>
            </div>
        </div>
        </div>
        :
        <>Loading Data . . .</>
    }
    </>;

    return(
        <>
            {template}
        </>
    )
}

export default AnimeDetail;