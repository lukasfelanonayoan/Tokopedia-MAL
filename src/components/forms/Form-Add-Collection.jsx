/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

// Animation
import { animationPopUp } from '../../animation/animation';

// Query
import { AddCollection } from '../../query/Collection-Query';

function FormAddCollection(props){
    let close = props.close;

    const submit = ()=>{
        // if(result){
            let input = {
                name: document.forms["form-new-collection"]["name"].value,
                anime:[]
            }
            AddCollection(input)
        // }
        close();
    }

    return (
        <div css={css`position:fixed;top:0;left:0;animation :${animationPopUp} 0.5s;width:100%;height:100%;display:flex;justify-content:center;align-items:center; background:rgba(0,0,0,0.5)`}>
		    <div css={css`max-width:75%;background:white;border-radius:1rem; padding:1rem`}>
                <div css={css`font-size:1.5rem;text-align:center;`}>
                    Add New Collection
                </div>
                <div css={css`padding-top:0.5rem;`}>
                    <form id="form-new-collection">
                        <div>
                        <input name='name' type="text" />
                        </div>
                        <button type='button' onClick={()=> submit()}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}


export default FormAddCollection;