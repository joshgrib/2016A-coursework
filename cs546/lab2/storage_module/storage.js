var storage = {};
module.exports = {

    set: (id, data) => {
        if( id == undefined || id == null){
            throw "A non-null id is required";
        }
        if( data == undefined){
            throw "Some non-null data is required";
        }
        storage[id] = data;//store data
        resp = {}
        resp[id] = data;//make object to return
        return resp;
    },

    unset: (id) => {
        if(id == undefined || id == null){
            throw "An id is required";
        }
        if(storage[id] == undefined){
            throw `id:'${id}' not present in storage`;
        }
        delete storage[id];
    },

    get: (id) => {
        if( id == undefined || id == null){
            throw "An id is required";
        }
        if(storage[id] == undefined){
            throw `id:'${id}' not present in storage`;
        }
        return storage[id];
    }

}
