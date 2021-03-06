 /** @jsxImportSource @emotion/react */
import { useState, useEffect } from "react";
import { css } from '@emotion/react';
import {
    useQuery
} from "@apollo/client";
import { Link,useParams } from 'react-router-dom';

// Animation
import { animationPopUp } from '../animation/animation';

// Query GraphQL 
import { GetDetailAnime } from '../query/Anime-Query';

// Storing Collection
import { CheckAnimeCollectedById } from '../query/Collection-Query';

// Components
import FormCollection from "../components/forms/Form-Collection";

function AnimeDetail(){
    const param = useParams();
    const [clickAdd, setClickAdd] = useState(false);
    const [clickRemove, setClickRemove] = useState(false);
    
    const [collectionFounded, setcollectionFounded] = useState([]);
    const [collectionEmpty, setcollectionEmpty] = useState([]);

    const { loading, data } = useQuery(GetDetailAnime,{
        variables:{
            id:param.id
        }
    });

    let fetchData = (!loading)?data.Media:null;

    document.title = (!loading)?data.Media.title.romaji:"Detail Anime";

    useEffect(() => {
        if(fetchData !== null){
            // setListCollection(CheckAnimeCollectedById(fetchData.id));
            setcollectionFounded(CheckAnimeCollectedById(fetchData.id).founded);
            setcollectionEmpty(CheckAnimeCollectedById(fetchData.id).empty);
        }
    }, [fetchData]);

    const refresh = ()=>{
        setcollectionFounded(CheckAnimeCollectedById(fetchData.id).founded);
        setcollectionEmpty(CheckAnimeCollectedById(fetchData.id).empty);
        
        setClickAdd(false);
        setClickRemove(false);
    }

    const saveCollection = ()=>{
        setClickAdd(true);
        setClickRemove(false);
    };

    const deleteCollection = () =>{
        setClickAdd(false);
        setClickRemove(true);
    }

    let template = 
    <>
    {(!loading)?
        <div css={css`
            padding:0 2rem 1rem 2rem;
        `}>
            <h2 css={css`{
            margin-bottom:0;
        }`}>{fetchData.title.romaji}</h2>
        {
            (fetchData.title.english)?
            <h4 css={css`{
            margin-bottom:0;
            }`}>({fetchData.title.english})</h4>
            :""
        }
        <div css={css`
            @media (min-width: 768px) {
                display:flex;
            }
        `}>
            <div css={css`@media (max-width: 767px) {padding-bottom:1rem}`}>
                <div css={css`@media (max-width: 767px) {display:flex; justify-content:center;}`}>
                    <img src={fetchData.coverImage.large} alt="" />
                </div>
                <div css={css`
                    display:flex;
                    text-align:center;
                    padding-top:0.75rem;
                    padding-bottom:0.5rem;
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
                {
                    (collectionFounded.length !== 0)?
                    <div>
                        {
                        (clickRemove)?
                        <FormCollection type="remove" refresh={refresh} anime={fetchData} data={collectionFounded}></FormCollection>
                        :
                        <button css={css`&:hover {color: lightgray;}cursor:pointer;background:red;border-radius:0.5rem;width:100%;padding:0.5rem;color:white;font-size:1.05rem;font-weight:500;border:0;`} onClick={()=>deleteCollection()}>Remove Collection</button>
                        }
                    </div>
                    :
                    ""
                }
                
                <div css={css`padding-top:1rem;`}>
                    {
                    (clickAdd)?
                    <FormCollection type="add" refresh={refresh} anime={fetchData} data={collectionEmpty}></FormCollection>
                    :
                    <button css={css`&:hover {color: lightgray;}cursor:pointer;background:#03ac0e;border-radius:0.5rem;width:100%;padding:0.5rem;color:white;font-size:1.05rem;font-weight:500;border:0;`} onClick={()=>saveCollection()}>Add Collection</button>
                    }
                </div>
            </div>
            <div css={css`
            @media (min-width: 768px) {padding-left:1.75rem;}
            `}>
                {
                    (fetchData.bannerImage)?
                    <img css={css`
                    width:100%;
                    `} src={fetchData.bannerImage} alt="" />
                    :""
                }
                
                <h4 css={css`
                margin:0;
                padding:0.5rem 0;
                `}>Description</h4>
                <p css={css`
                margin:0;
                text-align:justify;
                `}>{fetchData.description.replaceAll("<br>", "\n")}</p>
                <h4 css={css`
                margin:0;
                padding:0.5rem 0;
                `}>Genre</h4>
                <div css={css`display:flex;flex-wrap:wrap;width:100%;`}>
                    {fetchData.genres.map(item => <div key={item} css={css`padding:0.25rem 0.25rem;`}><div  css={css`padding:0.5rem 0.75rem;border-radius:2rem;border:1px solid #03ac0e;background:lightgray;font-weight:600;`}>{ item }</div></div>)}
                </div>
                {
                    (collectionFounded.length!==0)?
                    <>
                        <h4 css={css`
                        margin:0;
                        padding:0.5rem 0;
                        `}>Added On Collection</h4>
                        <div css={css`display:flex;flex-wrap:wrap;width:100%;`}>
                            {collectionFounded.map(item => <div key={item} css={css`padding:0.5rem 0.25rem;`}><Link to={"/collection/" + item} css={css`&:hover{color:white;}padding:0.5rem 0.75rem;border-radius:2rem;border:1px solid #03ac0e;background:lightgray;font-weight:600;text-decoration:none;color:black`}>{ item }</Link></div>)}
                        </div>
                    </>
                    :""
                }
            </div>
        </div>
        </div>
        :
        <div css={css`position:fixed;top:0;left:0;animation :${animationPopUp} 0.5s;color:white; font-size:2rem; font-weight:700;width:100%;height:100%;display:flex;justify-content:center;align-items:center; background:rgba(0,0,0,0.5)`}>Loading Data . . .</div>
    }
    </>;

    return(
        <>
            {template}
        </>
    )
}

export default AnimeDetail;