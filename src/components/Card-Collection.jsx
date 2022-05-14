/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useState } from 'react';
import { Link } from 'react-router-dom';

// Component used
import FormConfirmation from './forms/Form-Confirmation';
import FormDeleteCollection from './forms/Form-Delete-Collection';
import FormAddCollection from '../components/forms/Form-Add-Collection';

function CardCollection(props){
    let [remove, setRemove] = useState(false);
    let [removeCollection, setremoveCollection] = useState(false);
    let [name,setName] = useState();
    let [edit, setEdit] = useState(false);
    let data = props.items;
    let refresh = props.refresh;

    let closeForm = () => {
        setEdit(false);
        setRemove(false);
        setremoveCollection(false);
        refresh();
    }

    return (
        <div css={css`width:100%;`}>
            {
                (edit)?
                <FormAddCollection close={closeForm} type="edit" name={name}></FormAddCollection>
                :
                ""
            }
            {
                (removeCollection)?
                <FormDeleteCollection close={closeForm} name={name}></FormDeleteCollection>
                :
                ""
            }
            {
                data.map( collection =>(
                    <div key={collection.name}>
                        <div css={css`padding:1rem 2rem;`}>
                            <div css={css`
                            @media (min-width: 768px) {
                                display:flex;justify-content:space-between;
                            }`}>
                                <h3 css={css`
                                @media (max-width: 767px) {
                                    text-align:center;
                                }`}>Collection {collection.name}</h3>
                                <div css={css`display:flex;align-items:center;justify-content:center;`}>
                                    <div css={css`padding:0.5rem;`}>
                                        <div css={css`display:flex;align-items:center;padding-top:0.5rem;`}>
                                            <div css={css`padding-left:0.5rem;`}><button css={css`&:hover {color: lightgray;}cursor:pointer;background:#03ac0e;border-radius:0.5rem;width:100%;padding:0.5rem 1rem;color:white;font-size:1.05rem;font-weight:500;border:0;`} onClick={()=>{setEdit(true);setName(collection.name);}}>Edit</button></div>
                                            <div css={css`padding-left:0.5rem;`}><button css={css`&:hover {color: lightgray;}cursor:pointer;background:red;border-radius:0.5rem;width:100%;padding:0.5rem 1rem;color:white;font-size:1.05rem;font-weight:500;border:0;`} onClick={()=>{setremoveCollection(true);setName(collection.name);}}>Delete</button></div>
                                            
                                            <div css={css`padding-left:0.5rem;`}><Link to={"/collection/" + collection.name} css={css`text-decoration:none;&:hover {color: lightgray;}cursor:pointer;background:teal;border-radius:0.5rem;width:100%;padding:0.5rem 1rem;color:white;font-size:1.05rem;font-weight:500;border:0;`}>Detail</Link></div>
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
                                (collection.anime.length!==0)?
                                collection.anime.map( (musarrof) =>(
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
                                                    <button  css={css`&:hover {color: lightgray;}cursor:pointer;background:red;border-radius:0.5rem;width:100%;padding:0.5rem;color:white;font-size:1.05rem;font-weight:500;border:0;`} onClick={()=>{setRemove(true)}}>Remove</button>
                                                    {
                                                    (remove)?
                                                        <FormConfirmation close={closeForm} name={collection.name} anime={musarrof}></FormConfirmation>
                                                        :
                                                        ""
                                                    }
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
                ))
            }
            
        </div>
    );
}

export default CardCollection;