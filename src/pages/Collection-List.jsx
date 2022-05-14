/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState } from 'react';

// Component used
import CardCollection from '../components/Card-Collection';
import FormAddCollection from '../components/forms/Form-Add-Collection';

// Query GraphQL 
import { ShowAllCollection } from '../query/Collection-Query';

function CollectionList (){
    document.title = "My Collection";

    let [data,setData] = useState(ShowAllCollection());
    let [add,setAdd] = useState(false); 

    let refreshData = ()=>{
        setData(ShowAllCollection());
    }

    let close =()=>{
        refreshData();
        setAdd(false)
    }

    let listHtml = 
    <>
    <div css={css`display:flex;justify-content:center; padding:1rem 2rem; @media (min-width: 768px) {justify-content:start;}`}>
        <div><button css={css`&:hover {color: lightgray;}background:#03ac0e;color:white;cursor:pointer;border-radius:0.5rem;width:100%;padding:0.5rem;font-size:1.25rem;font-weight:600;border:0;`} type="button" onClick={()=>{setAdd(true)}}>Add Collection</button></div>
        {(add)?<FormAddCollection close={close} type="add"></FormAddCollection>:""
        }
    </div>
        {(data)?
            <CardCollection items = {data} refresh= {refreshData}></CardCollection>
            :
            <div css={css`padding:0 2rem; font-size:1.25rem;font-weight:600`}>No Collection</div>
        }
    </>
    return (
        <>
		   {listHtml}
        </>
    );
}

export default CollectionList;