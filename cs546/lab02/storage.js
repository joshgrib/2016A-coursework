var storage = {};
module.exports = {

    set: (id, data) => {
        if( id == undefined || id == null){
            throw `Input Error: A non-null id is required\n    Received:${id}`;
        }
        if( data == undefined){
            throw `Input Error: Some non-null data is required\n    Received:${data}`;
        }
        storage[id] = data;//store data
        resp = {}
        resp[id] = data;//make object to return
        return resp;
    },

    unset: (id) => {
        if(id == undefined || id == null){
            throw `Input Error: An id is required\n    Received:${id}`;
        }
        if(storage[id] == undefined){
            throw `Value Error: id:'${id}' not present in storage`;
        }
        delete storage[id];
    },

    get: (id) => {
        if( id == undefined || id == null){
            throw `Input Error: An id is required\n    Received:${id}`;
        }
        if(storage[id] == undefined){
            throw `Value Error: id:'${id}' not present in storage`;
        }
        return storage[id];
    }

}
