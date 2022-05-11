import React from 'react';
import {
    useQuery
} from "@apollo/client";

// Component used
import CardAnime from '../components/Card-Anime';

// Query GraphQL 
import { GetAnimeAll } from '../query/Anime-Query';

function AnimeList (){
    const { loading, data } = useQuery(GetAnimeAll,{
        variables:{
            page:1,
            perPage:10
        }
    });

    let listHtml = 
    <>
        {(!loading)?
            <CardAnime items = {data.Page.media}></CardAnime>
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