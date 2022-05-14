/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

// Animation
import { animationPopUp } from '../../animation/animation';

// Query
import { RemoveCollectionById } from '../../query/Collection-Query';

function FormDeleteCollection(props){
    let close = props.close;
    let name = props.name;

    const submit = ()=>{
        RemoveCollectionById(name)
        close();
    }

    return (
        <div css={css`position:fixed;top:0;left:0;animation :${animationPopUp} 0.5s;width:100%;height:100%;display:flex;justify-content:center;align-items:center; background:rgba(0,0,0,0.5)`}>
		    <div css={css`max-width:75%;background:white;border-radius:1rem; padding:1rem`}>
            <div css={css`font-size:1.5rem;text-align:center;`}>
                    Are you sure want to remove {name} ?
                </div>
                <div css={css`display:flex;justify-content:space-between;padding-top:0.5rem;`}>
                    <div><button css={css`&:hover {color: lightgray;}cursor:pointer;background:red;border-radius:0.5rem;width:100%;padding:0.5rem 1rem;color:white;font-size:1.05rem;font-weight:500;border:0;`} onClick={()=>{close()}}>No</button></div>
                    <div><button css={css`&:hover {color: lightgray;}cursor:pointer;background:teal;border-radius:0.5rem;width:100%;padding:0.5rem 1rem;color:white;font-size:1.05rem;font-weight:500;border:0;`} onClick={()=>{submit()}}>Yes</button></div>
                </div>
            </div>
        </div>
    );
}


export default FormDeleteCollection;