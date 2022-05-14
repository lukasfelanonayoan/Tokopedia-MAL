/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

// Animation
import { animationPopUp } from '../../animation/animation';

// Query
import { AddCollection,EditCollection, EditCollectionStatus } from '../../query/Collection-Query';

// This Form can be used to add new collection and edit collection depend on props.type
function FormAddCollection(props){
    let close = props.close;
    let type = props.type;
    let name = props.name;
    let change = props.changeData;

    const submit = ()=>{
        let input = {
            name: document.forms["form-new-collection"]["name"].value,
            anime:[]
        }

        document.forms["form-new-collection"]["name"].value ="";

        switch(type){
            case 'add': AddCollection(input);
            close();break;
            case 'edit': EditCollection(name,input.name);
            close();break;
            case 'edit-detail': let status = EditCollectionStatus(name,input.name);if(status){change(input.name)};break;
            default: break;
        }
    }

    return (
        <div css={css`position:fixed;top:0;left:0;animation :${animationPopUp} 0.5s;width:100%;height:100%;display:flex;justify-content:center;align-items:center; background:rgba(0,0,0,0.5)`}>
		    <div css={css`max-width:75%;background:white;border-radius:1rem; padding:1rem`}>
                <div css={css`font-size:1.5rem;text-align:center;`}>
                    {
                        (name)?
                        <>Edit Collection</>
                        :
                        <>Add New Collection</>
                    }
                </div>
                <div css={css`padding-top:0.5rem;`}>
                    <form id="form-new-collection" onSubmit={()=>{submit()}}>
                        <div css={css`width:100%;display:flex;justify-content:center;`}>
                        
                        {
                            (name)?
                            <input css={css`width:90%;padding:0.5rem;`} name='name' type="text" defaultValue={name}/>
                            :
                            <input css={css`width:90%;padding:0.5rem;`} name='name' type="text" />
                        }
                        </div>
                        <div css={css`display:flex;justify-content:space-between;padding-top:0.5rem;`}>
                            <div><button type='button' css={css`&:hover {color: lightgray;}cursor:pointer;background:red;border-radius:0.5rem;width:100%;padding:0.5rem 1rem;color:white;font-size:1.05rem;font-weight:500;border:0;`} onClick={()=>{close()}}>Cancel</button></div>
                            <div><button type='button' css={css`&:hover {color: lightgray;}cursor:pointer;background:teal;border-radius:0.5rem;width:100%;padding:0.5rem 1rem;color:white;font-size:1.05rem;font-weight:500;border:0;`} onClick={()=>{submit()}}>Submit</button></div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}


export default FormAddCollection;