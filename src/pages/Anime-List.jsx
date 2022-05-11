import React, {Component} from 'react';
import {gql} from '@apollo/client';
import { graphql } from '@apollo/client/react/hoc';

// Component used
import CardAnime from '../components/Card-Anime';

const getListAnime = gql`
    query {
        Page{
            media{
                id,
                title {
                    romaji
                    english
                    native
                    userPreferred
                },
                description,
                coverImage {
                  extraLarge
                  large
                  medium
                  color
                }
            }
        }
    }
`;


class AnimeList extends Component{
    render(){
        // console.log(this.props);
        let data = this.props.data;
        let listHtml = 
        <>
            {(!data.loading)?
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
}

export default graphql(getListAnime)(AnimeList);