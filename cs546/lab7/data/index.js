module.exports = {
    events: require("./events"),
    people: require("./people"),
    locations: require("./locations"),
    idsToInfo: (pid_list, data_group) => {
        let resp = [];
        pid_list.forEach( (pid) => {
            resp.push(data_group.lookup(pid));
        });
        return Promise.all(resp);
    }
};
