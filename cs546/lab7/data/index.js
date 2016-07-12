module.exports = {
    events: require("./events"),
    people: require("./people"),
    locations: require("./locations"),
    idsToInfo: (pid_list, data_group) => {
        //Take a list of ids, and return a list of info for those ids in
        //the given data group
        let resp = [];
        pid_list.forEach( (pid) => {
            resp.push(data_group.lookup(pid));
        });
        return Promise.all(resp);
    }
};
