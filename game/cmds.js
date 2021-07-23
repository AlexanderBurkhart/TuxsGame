const file_system = new Map();
file_system.set('home', new Map());
const current_dir = ['home'];

$('body').terminal({
    touch: function (file) {
        touch(this, file);
    },
    mkdir: function (dir) {
        mkdir(this, dir);
    },
    rm: function (path) {
        rm(this, path);
    },
    ls: function () {
        ls(this);
    },
    cd: function (path) {
        cd(this, path);
    }
}, {
    greetings: 'Welcome to Tux\'s Game!'
});

function touch(term, file) {
    var current_system = get_current_system();
    term.echo('creating file');
    current_system.set(file, null);
}

function mkdir(term, dir) {
    var current_system = get_current_system();   
    term.echo('creating dir');
    current_system.set(dir, new Map());
}

function rm(term, path) {
    var current_system = get_current_system();    
    term.echo('removing');
    current_system.delete(path);
}

function ls(term) {
    var current_system = get_current_system();    

    // output files in directory
    for (let file of current_system.keys()) {
        term.echo(file);
    }
}

function cd(term, path) {
    var current_system = get_current_system();
    if (path != '..') {
        found = false;
        for (let obj of current_system.keys()) {
            if (obj == path) {
                found = true;
            }
        }
        if (!found) {
            term.echo('ERROR: ' + path + ' does not exist');
            return;
        } else if (current_system.get(path) == null) {
            term.echo('ERROR: ' + path + ' is a file');
        }

        current_dir.push(path);
    } else {
        current_dir.pop()
    }
}

function get_current_system() {
    // clone file_system
    var current_system = new Map(file_system);

    // enter directory
    for (const dir of current_dir) {
        current_system = current_system.get(dir);
    }
    return current_system;
}