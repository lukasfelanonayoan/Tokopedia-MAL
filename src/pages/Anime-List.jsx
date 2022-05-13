import React, { useState, useEffect } from 'react';
import {
    useQuery,useLazyQuery
} from "@apollo/client";

// Component used
import CardAnime from '../components/Card-Anime';

// Query GraphQL 
import { GetAnimeAll } from '../query/Anime-Query';

function AnimeList (){
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
    }

    let listHtml = 
    <>
        {(keep)?
            <CardAnime items = {keep.Page.media} pagination = {keep.Page.pageInfo} changePage = {changePage}></CardAnime>
            :
            <>Loading Data . . .</>
        }
    </>
    return (
        <>
		   {listHtml}
        </>
    );
}

export default AnimeList;