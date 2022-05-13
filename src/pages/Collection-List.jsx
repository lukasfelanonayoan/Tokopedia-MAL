import React, { useState } from 'react';
// Component used
import CardCollection from '../components/Card-Collection';

// Query GraphQL 
import { ShowAllCollection } from '../query/Collection-Query';

function CollectionList (){
    let [data] = useState(ShowAllCollection());
    // console.log(data);

    let listHtml = 
    <>
        {(data)?
            <CardCollection items = {data}></CardCollection>
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

export default CollectionList;