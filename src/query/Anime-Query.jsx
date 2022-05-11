import {gql} from '@apollo/client';

// Get All Anime
export const GetAnimeAll = gql`
    query ( $page: Int, $perPage: Int) {
        Page (page: $page, perPage: $perPage){
            pageInfo {
                total
                currentPage
                lastPage
                hasNextPage
                perPage
            },
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

// Get Detail Anime By ID
export  const GetDetailAnime = gql`
query ($id:Int){
    Media(id:$id){
      id,
      title {
        romaji
        english
        native
        userPreferred
      },
      coverImage {
        extraLarge
        large
        medium
        color
      },
      bannerImage,
      description,
      episodes,
      meanScore,
      genres
    }
  }
`;