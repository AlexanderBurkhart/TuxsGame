const file_system = new Map();
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
    },
    start: function() {
        start(this);
    }
}, {
    greetings: 'Welcome to Tux\'s Game! Type in "start" to start the game!'
});

function start(term) {
    file_system.set('home', new Map());
    file_system.get('home').set('music', new Map());

    file_system.get('home').get('music').set('rap', new Map());
    file_system.get('home').get('music').get('rap').set('Kayne West', null);
    file_system.get('home').get('music').get('rap').set('Eminem', null);
    file_system.get('home').get('music').get('rap').set('Drake', null);

    file_system.get('home').get('music').set('classical', new Map());
    file_system.get('home').get('music').get('classical').set('Mozart', null);
    file_system.get('home').get('music').get('classical').set('Beethoven', null);
    file_system.get('home').get('music').get('classical').set('Bach', null);

    file_system.get('home').get('music').set('rock', new Map());
    file_system.get('home').get('music').get('rock').set('Nirvana', null);
    file_system.get('home').get('music').get('rock').set('ACDC', null);
    file_system.get('home').get('music').get('rock').set('Queen', null);

    term.echo("Your mission:");
    term.echo('Find the band Queen by naviagting through the folders using the following commands:');
    term.echo('     cd folder_name : opens the folder specified as folder_name');
    term.echo('     cd .. : goes up to the previous folder');
    term.echo('     ls : lists the content of the current folder opened');
    term.echo();
    term.echo('If stuck say, "Alexa, give me a hint!"');
}

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
    check_success(term);
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

function check_success(term) {
    var current_system = get_current_system();
    found = false;
    for (let obj of current_system.keys()) {
        if (obj == 'Queen') {
            found = true;
        }
    } 
    if (found) {
        term.echo(' _____                             _         _       _   _                 _ _ _'); 
        term.echo('/  __ \\                           | |       | |     | | (_)               | | | |');
        term.echo('| /  \\/ ___  _ __   __ _ _ __ __ _| |_ _   _| | __ _| |_ _  ___  _ __  ___| | | |');
        term.echo("| |    / _ \\| '_ \\ / _` | '__/ _` | __| | | | |/ _` | __| |/ _ \\| '_ \\/ __| | | |");
        term.echo("| \\__/\\ (_) | | | | (_| | | | (_| | |_| |_| | | (_| | |_| | (_) | | | \\__ \\_|_|_|");
        term.echo(" \\____/\\___/|_| |_|\\__, |_|  \\__,_|\\__|\\__,_|_|\\__,_|\\__|_|\\___/|_| |_|___(_|_|_)");
        term.echo("                    __/ |");                                                        
        term.echo("                   |___/'");
        term.echo('You have found the band Queen! Type in "start" to proceed to the next level...');
    }
}