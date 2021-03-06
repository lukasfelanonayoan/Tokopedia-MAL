// Storing Collection use Local Storage

export const ShowAllCollection = () => {
    var collection = JSON.parse(localStorage.getItem("collection"));
    return collection;
}

export const ShowSelectedCollection = (name) => {
    var collection = JSON.parse(localStorage.getItem("collection"));

    let checkCollection = collection.find(data => data.name === name);
    return checkCollection;
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
    // name = unique

    var collection = JSON.parse(localStorage.getItem("collection") || "[]");

    //eslint-disable-next-line
    var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

    let save = false;

    if(data.name.match(format) ){
        save = true;
    }

    if(!save){
        let checkCollection = collection.find(item => (item.name).toLowerCase() === (data.name).toLowerCase());
        if(!checkCollection){
            // Save New Collection
            collection.push(data);
            localStorage.setItem("collection", JSON.stringify(collection));
        }else{
            alert("Collection Already Exist (Name Must Unique)");
        }
    }else{
        alert("Collection Name doesn???t have special Char");
    }
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

export const EditCollection = (old,name) => {
   
    var collection = JSON.parse(localStorage.getItem("collection") || "[]");

    //eslint-disable-next-line
    var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

    let save = false;

    if(name.match(format) ){
        save = true;
    }

    if(!save){
        let checkCollection = collection.find(item => (item.name).toLowerCase() === (name).toLowerCase());
        if(!checkCollection){
            // Save New Collection
            let tempCollection = [];
            collection.forEach(element => {
                if(element.name === old){
                    element.name = name;
                }
                tempCollection.push(element);
            });
            localStorage.setItem("collection", JSON.stringify(tempCollection));
        }else{
            alert("Collection Already Exist (Name Must Unique)");
        }
    }else{
        alert("Collection Name doesn???t have special Char");
    }
}

export const EditCollectionStatus = (old,name) => {
   
    var collection = JSON.parse(localStorage.getItem("collection") || "[]");
    let status = false;

    //eslint-disable-next-line
    var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

    let save = false;

    if(name.match(format) ){
        save = true;
    }

    if(!save){
        let checkCollection = collection.find(item => (item.name).toLowerCase() === (name).toLowerCase());
        if(!checkCollection){
            // Save New Collection
            let tempCollection = [];
            collection.forEach(element => {
                if(element.name === old){
                    element.name = name;
                }
                tempCollection.push(element);
            });
            localStorage.setItem("collection", JSON.stringify(tempCollection));
            status = true;
        }else{
            alert("Collection Already Exist (Name Must Unique)");
        }
    }else{
        alert("Collection Name doesn???t have special Char");
    }

    return status;
}

export const RemoveCollectionById = (id) => {
    var collection = JSON.parse(localStorage.getItem("collection"));
    var temp = [];

    collection.forEach(element => {
        if(element.name !== id){
            temp.push(element);
        }
    });

    // Saving
    localStorage.setItem("collection", JSON.stringify(temp));
}