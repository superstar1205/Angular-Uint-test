import _ from 'lodash';

const EncodeData = (name,data) =>{
    LS(name,data);
}

const DecodeData = (name) =>{
    const STORAGE =  btoa(name);
    let DataStorage = localStorage.getItem(STORAGE);
    if(DataStorage !== null){
        const decoded = atob(DataStorage)
        const data = JSON.parse(decoded)
        return data
    }else{
        return null;
    }
}

const LS = (name,data) =>{
    const STORAGE =  btoa(name);
    const element = EncodeBufer(JSON.stringify(data));
    localStorage.setItem(STORAGE,element);
}

const EncodeBufer = (data) =>{
    return btoa(data);
}

const DeleteStorage = (name) =>{
    const STORAGE =  btoa(name);
    localStorage.removeItem(STORAGE);
    return true;
}

const DeleteAllStorage = () =>{
    localStorage.clear();
}


export {
    EncodeData,
    DecodeData,
    DeleteStorage,
    DeleteAllStorage
}