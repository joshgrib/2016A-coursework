let info = {
    education: {
        highschool: 'Morris Knolls High School',
        undergrad: 'Stevens Institute of Technology, M.S. C.S'
    },
    hobbies: {
        coding: 'Sometimes I like to work on personal coding projects to learn new things or make my life easier.',
        climbing: 'I used to be very into rock climbing and recently my girlfriend got involved with it so I started again.',
        lacrosse: 'I\'ve played lacrosse since 7th grade in varous school teams, clubs, camps, and other programs.',
        netflix: 'I am currently binging Mad Men.',
        music: 'I listen to music pretty much constantly, so Spotify and streaming not counting for phone data form a perfect pair for me and my activities.'
    },
    classes: {
        10100: {
            name: 'CS546 - Web Programming',
            professor: 'Philip Barresi',
            description: 'This course will provide students with a first strong approach of internet programming. It will give the basic knowledge on how the Internet works and how to create advanced web sites by the use of script languages, after learning the basics of HTML. The course will teach the students how to create a complex global site through the creation of individual working modules, giving them the skills required in any business such as proper team work and coordination between groups.'
        },
        10516: {
            name: 'CS385 - Algorithms',
            professor: 'Brian Borowski',
            description: 'This is a course on more complex data structures, and algorithm design and analysis, using the C language. Topics include: advanced and/or balanced search trees; hashing; further asymptotic complexity analysis; standard algorithm design techniques; graph algorithms; complex sort algorithms; and other "classic" algorithms that serve as examples of design techniques.'
        },
        10513: {
            name: 'CS334 - Automata and Computation',
            professor: 'Daniel Katz',
            description: 'Introduction to recursive functional programming and equational reasoning; lists as inductive types and list induction; introduction to formal languages, automata, and the theory of computation; regular expressions, finite state machines, and pumping lemma; context free grammars and push down automata; turing machines, recursive enumerability, and unsolvable problems; and complexity and intractability. A number of models of computation are considered, as well as their relation to various problem classes (e.g. solvable problems and polynomial time solvable problems). Some experiments are performed that involve writing small Scheme programs.'
        },
        12214: {
            name: 'HHS479 - Studies in the History of Technology',
            professor: 'Lee Vinsel',
            description: 'This course takes a thematic approach to the history of technology in  the modern era.  Topics may include the study of invention, innovation,  and standardization; industrial research and development; technological  systems; transnational exchanges: histories of gender, labor, and race:  and the emergence of a global Network Society.'
        },
        11013: {
            name: 'HSS175 - Fundamentals of Psychology',
            professor: 'Susan Schept',
            description: 'This course emphasizes the biological underpinnings of behavior and of mental processes. What do we know? How do we come to know? What do we want? Why do we act the way we do? In this course these fundamental questions of psychology are mainly looked at from a biological perspective that emphasizes the study of the brain and nervous systems. Historical, philosophical, and evolutionary perspectives on mental processes are considered, as well.'
        },
        11941: {
            name: 'CS347 - Software Development Process',
            professor: 'Dimitios Damopoulos',
            description: 'This course provides a general introduction to the essentials of the software development process, that series of activities that facilitate developing better software in less time. The course introduces software development and deployment life cycles, requirements acquisition and analysis, software architecture and design, and resource management and scheduling in the implementation phase. Students gain experience with tools and methodologies for configuration management and project management. Security engineering is considered as an essential part of the software development process, particularly from the standpoint of applied risk management.'
        }
    }
}

let get_vals = (obj) => {
    var vals = [];
    for(var key in obj){
        vals.push(obj[key]);
    }
    return vals;
}

let format_resp = (json_resp) => {
    return {information: json_resp};
}

//Below is just for a nicer home page to make it a little easier
let assignment_routes = {
    '/education':' Returns a list of all the schools you attended',
    '/education/highschool': 'Returns the name of the high school you went to',
    '/education/undergrad': 'Returns the name of the undegrad school you went to, and the degree you received (or will receive)',
    '/hobbies': 'Returns a list of your hobbies; only returns their names',
    '/hobbies/:hobby': 'Returns additional information about the hobby provided in the hobby param.',
    '/classes': 'Returns a list of the course codes for 5+ classes you have taken',
    '/classes/details?code={course code}': 'Using a querystring parameter for the course code, show details on that course (name, professor, description'};
let head = '<head><link rel="stylesheet" href="http://yui.yahooapis.com/pure/0.6.0/pure-min.css"></head>';//http://purecss.io/

let links = "<a href='http://localhost:3000/'>http://localhost:3000/</a><br /><br /><a href='http://localhost:3000/education'>http://localhost:3000/education</a><br /><a href='http://localhost:3000/education/highschool'>http://localhost:3000/education/highschool</a><br /><a href='http://localhost:3000/education/undergrad'>http://localhost:3000/education/undergrad</a><br /><br /><a href='http://localhost:3000/hobbies'>http://localhost:3000/hobbies</a><br /><a href='http://localhost:3000/hobbies/coding'>http://localhost:3000/hobbies/coding</a><br /><a href='http://localhost:3000/hobbies/climbing'>http://localhost:3000/hobbies/climbing</a><br /><a href='http://localhost:3000/hobbies/lacrosse'>http://localhost:3000/hobbies/lacrosse</a><br /><a href='http://localhost:3000/hobbies/netflix'>http://localhost:3000/hobbies/netflix</a><br /><a href='http://localhost:3000/hobbies/music'>http://localhost:3000/hobbies/music</a><br /><br /><a href='http://localhost:3000/classes'>http://localhost:3000/classes</a><br /><a href='http://localhost:3000/classes/details?code=10100'>http://localhost:3000/classes/details?code=10100</a><br /><a href='http://localhost:3000/classes/details?code=10516'>http://localhost:3000/classes/details?code=10516</a><br /><a href='http://localhost:3000/classes/details?code=10513'>http://localhost:3000/classes/details?code=10513</a><br /><a href='http://localhost:3000/classes/details?code=12214'>http://localhost:3000/classes/details?code=12214</a><br /><a href='http://localhost:3000/classes/details?code=11013'>http://localhost:3000/classes/details?code=11013</a><br /><a href='http://localhost:3000/classes/details?code=11941'>http://localhost:3000/classes/details?code=11941</a><br />";
const routes = (app) => {
    var resp = 'resp not set yet';

    app.get('/', function(req, res) {
        var inner = '<thead><td>Path</td><td>Description</td></thead>';
        for(key in assignment_routes){
            inner = inner + `<tr><td>${key}</td><td>${assignment_routes[key]}</td></tr>`
        }
        res.send(`${head}<body><table class="pure-table pure-table-bordered">${inner}</table><br />${links}<br /><p>This is all here just to make testing easier</p></body>`);
    });

    app.get('/education', function (req, res) {
        //Returns a list of all the schools you attended
        resp = get_vals(info.education);
        resp = format_resp(resp);
        res.json(resp);
    });

    app.get('/education/:level(highschool|undergrad)', function (req, res) {
        //Returns the school info and degree depending on level of education requested
        let level = req.params.level;
        //res.send(level);
        resp = info.education[level];
        resp = format_resp(resp);
        res.json(resp);
    });

    app.get('/hobbies', function (req, res) {
        //Returns a list of your hobbies; only returns their names
        resp = Object.keys(info.hobbies);
        resp = format_resp(resp);
        res.json(resp);
    });

    app.get('/hobbies/:hobby', function (req, res) {
        //Returns additional information about the hobby provided in the hobby param.
        let hobby = req.params.hobby;
        if(!(hobby in info.hobbies)){
            res.status(404);
            resp = `Sorry '${hobby}' is not one of my listed hobbies`;
            res.send(resp);
        }else{
            resp = info.hobbies[hobby];
            resp = format_resp(resp);
            res.json(resp);
        }
    });

    app.get('/classes', function (req, res) {
        //Returns a list of the course codes for 5+ classes you have taken
        resp = Object.keys(info.classes);
        resp = format_resp(resp);
        res.json(resp);
    });

    app.get('/classes/details', function (req, res) {
        //Using a querystring parameter for the course code, show details on that course (name, professor, description
        if(!('code' in req.query)){
            res.status(500);
            resp = `Error parsing query string. Expected something in the form '{"code":"55555"}'.<br /> Recieved: ${JSON.stringify(req.query)}`
            res.send(resp);
        }else{
            let code = req.query.code;
            if(!(code in info.classes)){
                res.status(404);
                res.send(`Sorry '${code}' is not one of my listed course codes`);
            }else{
                resp = info.classes[code];
                resp = format_resp(resp);
                res.json(resp);
            }
        }
    });

    app.get('*', function(req, res){
        res.status(404);
        res.send('Oh no 404! You must have gone to the wrong place because I think my routing is pretty on point.');
    });
};

module.exports = routes;


/*
code snippet to get list of keys for object

var keys = Object.keys(myObject);
*/
