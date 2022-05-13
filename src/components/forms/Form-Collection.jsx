/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import { AddAnimeToCollection,RemoveAnimeFromCollection } from '../../query/Collection-Query';

function FormCollection(props){
    let type = props.type;
    let anime = props.anime;
    let data = props.data;
    
    const refreshData = props.refresh;
    
    const submit = ()=>{
        let name = document.forms["collection-form"]["name-collection"].value;
        switch(type){
            case 'add': AddAnimeToCollection(name,anime);break;
            case 'remove': RemoveAnimeFromCollection(name,anime);break;
            default: break;
        }
        
        document.forms["collection-form"]["name-collection"].value = "";
        refreshData();
    }

    return (
        <>
		    <div>
                <form id='collection-form'>
                    <input type="text" autoComplete="off" list="collection" name="name-collection" css={css`width:90%; padding:0.5rem`}></input>
                    <datalist id='collection'>
                        {
                        data.map(item => (
                            <option value={item}></option>
                        ))
                        }
                    </datalist>
                    <div css={css`padding-top:1rem`}>
                        <button css={css`&:hover {color: lightgray;}background:#03ac0e;cursor:pointer;border-radius:0.5rem;width:100%;padding:0.5rem;font-size:1.05rem;font-weight:500`} type="button" onClick={()=>submit()}>Choose</button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default FormCollection;