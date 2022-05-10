import React, {Component} from 'react';
import {gql} from '@apollo/client';
import { graphql } from '@apollo/client/react/hoc';

const getListAnime = gql`
    query {
        Page(page:1,perPage:10){
            media{
                id,
                title {
                    romaji
                    english
                    native
                    userPreferred
                }
            }
        }
    }
`;


class AnimeList extends Component{
    render(){
        console.log(this.props);
        return (
            <>
			   renderDataAnimeList
            </>
        );
    }
}

export default graphql(getListAnime)(AnimeList);