// Storing Collection use Local Storage

export const ShowAllCollection = () => {
    var collection = JSON.parse(localStorage.getItem("collection"));
    return collection;
}

export const CheckAnimeCollectedById = (id) => {
    var collection = JSON.parse(localStorage.getItem("collection"));

    let tempAdd = []; // if anime not in collection
    let tempRemove = []; // if anime already in collection

    if(collection !== null){
        collection.forEach(element => {
            let statusCollection = false; // status Founded in collection
            element.anime.forEach(anime=>{
                if(anime.id === id){
                    statusCollection = true;
                }
            })
            if(statusCollection){
                tempRemove.push(element.name);
            }else{
                tempAdd.push(element.name);
            }
        });
    }
    
    let result = {
        empty: tempAdd,
        founded: tempRemove
    }

    return result;
}

export const AddCollection = (data) =>{
    // Format Data
    // Object(name, anime)
    // name = String, anime = Array Object

    var collection = JSON.parse(localStorage.getItem("collection") || "[]");

    // Save New Collection
    collection.push(data);
    localStorage.setItem("collection", JSON.stringify(collection));
}

export const AddAnimeToCollection = (name,anime) =>{
    var collection = JSON.parse(localStorage.getItem("collection") || "[]");

    // Saving to Collection
    let checkCollection = collection.find(data => data.name === name);

    // Collection Exist
    if(checkCollection){
        collection.forEach(element => {
            if(element.name === name){
                element.anime.push(anime)
            }
        });
        localStorage.setItem("collection", JSON.stringify(collection));
    }

    // Collection Not Exist / Other Collection
    else{
        let listAnime = [];
        listAnime.push(anime);
        
        let newCollection = {
            name:name,
            anime:listAnime
        }
        AddCollection(newCollection)
    }
}

export const RemoveAnimeFromCollection = (name,anime) =>{
    var collection = JSON.parse(localStorage.getItem("collection") || "[]");

    // Saving to Collection
    let checkCollection = collection.find(data => data.name === name);

    // Collection Exist
    if(checkCollection){
        let tempCollection = [];

        collection.forEach(element => {
            var temp = [];
            if(element.name === name){
                element.anime.forEach(item =>{
                    if(item.id !== anime.id){
                        temp.push(item);
                    }
                })
                element.anime = temp;
            }
            tempCollection.push(element);
        });

        localStorage.setItem("collection", JSON.stringify(tempCollection));
    }
}

export const EditCollection = (data) => {
    // var collection = JSON.parse(localStorage.getItem("collection"));
}

export const RemoveCollectionById = (id) => {
    var collection = JSON.parse(localStorage.getItem("collection"));
    var temp = [];

    collection.forEach(element => {
        if(element.id !== id){
            temp.push(element);
        }
    });

    // Saving
    localStorage.setItem("collection", JSON.stringify(temp));
}