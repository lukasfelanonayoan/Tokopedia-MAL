/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';

// Component used
import FormConfirmation from '../components/forms/Form-Confirmation';
import FormAddCollection from '../components/forms/Form-Add-Collection';

// Query localStorage
import { ShowSelectedCollection } from '../query/Collection-Query';

function CollectionDetail() {
    let param = useParams();
    
    let [name,setName] = useState();
    let [remove, setRemove] = useState(false);
    let [anime, setAnime] = useState();
    let [edit, setEdit] = useState(false);
    let [collectionName, setCollectionName ] = useState(param.name);
    let [data,setData] = useState(ShowSelectedCollection(collectionName));

    let closeForm = () => {
        setEdit(false);
        setRemove(false);
        refresh();
    }

    let change = (newName) =>{
        setCollectionName(newName);
        setData(ShowSelectedCollection(newName));
        setEdit(false);
    }

    let refresh = ()=>{
        setData(ShowSelectedCollection(collectionName));
    }
    
    document.title = "Collection " + collectionName;

    return (
        <div css={css`width:100%;`}>
            {
                (edit)?
                <FormAddCollection close={closeForm} type="edit-detail" name={name} changeData = {change}></FormAddCollection>
                :
                ""
            }
            {
            (remove)?
                <FormConfirmation close={closeForm} name={name} anime={anime}></FormConfirmation>
                :
                ""
            }
            <div>
                <div css={css`padding:1rem 2rem;`}>
                    <div css={css`
                    @media (min-width: 768px) {
                        display:flex;justify-content:space-between;
                    }`}>
                        <h3 css={css`
                        @media (max-width: 767px) {
                            text-align:center;
                        }`}>Collection {collectionName}</h3>
                        <div css={css`display:flex;align-items:center;justify-content:center;`}>
                            <div css={css`padding:0.5rem;`}>
                                <div css={css`display:flex;align-items:center;padding-top:0.5rem;`}>
                                    <div css={css`padding-left:0.5rem;`}><button css={css`&:hover {color: lightgray;}cursor:pointer;background:#03ac0e;border-radius:0.5rem;width:100%;padding:0.5rem 1rem;color:white;font-size:1.05rem;font-weight:500;border:0;`} onClick={()=>{setEdit(true);setName(collectionName);}}>Edit</button></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div css={css`
                    display:flex;
                    flex-wrap:wrap;
                    @media (max-width: 767px) {
                        padding:1rem;
                    }
                    `}>
                    {
                        (data.anime.length!==0)?
                        data.anime.map( (musarrof) =>(
                        <div key={musarrof.id} css={css`
                        padding:0.5rem;
                        @media (min-width: 768px) {
                            min-width:30%;
                            max-width:30%;
                            padding:1rem;
                        }
                        `}>
                            <div>
                                <div css={css`
                                border:2px solid black;
                                border-radius:1rem;
                                padding:1.25rem;
                                cursor:pointer;
                                transition:0.3s all;
                                }
                                `}>
                                    <h3 css={css`text-align:center;`}>{musarrof.title.romaji}</h3>
                                    <div css={css`
                                    width:100%;
                                    display:flex;`}>
                                        <div css={css`display:flex; align-items:center;`}>
                                            <img css={css`height: 10rem; @media (min-width: 768px) {height: 15rem;}`} src={musarrof.coverImage.large} alt="" />
                                        </div>
                                        <div className='desc' css={css`
                                            transition:0.3s all;
                                            padding-left:1rem;
                                            `}>
                                            <p css={css`
                                            white-space: pre-line;
                                            max-height:10rem;
                                            @media (min-width: 768px) {max-height: 15rem;}
                                            overflow-y: auto;
                                            `}>{musarrof.description.replaceAll("<br>", "\n")}</p>
                                        </div>
                                    </div>
                                    <div css={css`padding-top:1rem;display:flex;justify-content:space-between;width:100%;`}>
                                        <div>
                                            <button  css={css`&:hover {color: lightgray;}cursor:pointer;background:teal;border-radius:0.5rem;width:100%;padding:0.5rem;color:white;font-size:1.05rem;font-weight:500;border:0;`}>
                                                <Link to={"/anime/" + musarrof.id} css={css`text-decoration:none;color:white;`}>Detail</Link>
                                            </button>
                                        </div>
                                        <div>
                                            <button  css={css`&:hover {color: lightgray;}cursor:pointer;background:red;border-radius:0.5rem;width:100%;padding:0.5rem;color:white;font-size:1.05rem;font-weight:500;border:0;`} onClick={()=>{setRemove(true);setAnime(musarrof);setName(data.name);}}>Remove</button>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        ))
                        :
                        <div css={css`width:100%;height:10rem;background:lightgray; border-raidus:1rem; display:flex; justify-content:center; align-items:center; font-size:1.5rem; font-weight:700`}><div>Empty</div></div>
                    }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CollectionDetail;