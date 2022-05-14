/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState, useEffect } from 'react';
import {
    useQuery,useLazyQuery
} from "@apollo/client";

// Animation
import { animationPopUp } from '../animation/animation';

// Component used
import CardAnime from '../components/Card-Anime';

// Query GraphQL 
import { GetAnimeAll } from '../query/Anime-Query';

function AnimeList (){
    document.title = "Home Anime";
    let [ keep,setKeep ] = useState();

    const [getLazyData] = useLazyQuery(GetAnimeAll, {
        onCompleted: data => setKeep(data)
      });

    const { data } = useQuery(GetAnimeAll,{
        variables:{
            page:1,
            perPage:10
        }
    });

    useEffect(() => {
        if(data !== null){
            setKeep(data);
        }
    }, [data]);

    const changePage = (page) =>{
        getLazyData({
        variables:{
            page:page,
            perPage:10
        }});
        window.scroll(0,0)
    }

    let listHtml = 
    <>
        {(keep)?
            <CardAnime items = {keep.Page.media} pagination = {keep.Page.pageInfo} changePage = {changePage}></CardAnime>
            :
            <div css={css`position:fixed;top:0;left:0;animation :${animationPopUp} 0.5s;color:white; font-size:2rem; font-weight:700;width:100%;height:100%;display:flex;justify-content:center;align-items:center; background:rgba(0,0,0,0.5)`}>Loading Data . . .</div>
        }
    </>
    return (
        <>
		   {listHtml}
        </>
    );
}

export default AnimeList;