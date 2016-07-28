const personList = [
    {
        id: 1,
        name: "Phil"
    },
    {
        id: 2,
        name: "Bren"
    },
    {
        id: 3,
        name: "Francis Underwood"
    },
    {
        id: 4,
        name: "Claire Underwood"
    },
    {
        id: 5,
        name: "Ricky Underwood"
    },
    {
        id: 6,
        name: "Leo Boykewich"
    }
];

let exportedMethods = {
    getAll: () => {
        let clone = JSON.parse(JSON.stringify(personList));
        return Promise.resolve(clone.slice(0));
    },
    lookup: (id) => {
        if (id === undefined) return Promise.reject("No id provided");

        let clone = JSON.parse(JSON.stringify(personList));
        let person = clone.filter(x => x.id == id).shift();
        if (!person) return Promise.reject("No person found")

        return Promise.resolve(person);
    }
}

module.exports = exportedMethods;
