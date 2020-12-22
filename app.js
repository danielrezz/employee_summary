const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

const teamMembers = [];

let managerQs = [
    {
        type: 'input',
        name: 'name',
        message: "What is your manager's name?"
    },
    {
        type: 'input',
        name: 'id',
        message: "What is your manager's ID number?"
    },
    {
        type: 'input',
        name: 'email',
        message: "What is your manager's email address?"
    },
    {
        type: 'input',
        name: 'officeNumber',
        message: "What is your manager's office number?"
    }
];

let engineerQs = [
    {
        type: 'input',
        name: 'name',
        message: "What is your engineer's name?"
    },
    {
        type: 'input',
        name: 'id',
        message: "What is your engineer's ID number?"
    },
    {
        type: 'input',
        name: 'email',
        message: "What is your engineer's email address?"
    },
    {
        type: 'input',
        name: 'github',
        message: "What is your engineer's GitHub username?"
    }
];

let internQs = [
    {
        type: 'input',
        name: 'name',
        message: "What is your intern's name?"
    },
    {
        type: 'input',
        name: 'id',
        message: "What is your intern's ID number?"
    },
    {
        type: 'input',
        name: 'email',
        message: "What is your intern's email address?"
    },
    {
        type: 'input',
        name: 'school',
        message: "What university does your intern attend?"
    }
];

function createManager() {
    inquirer.prompt(managerQs).then((answers) => {
        const manager = new Manager (answers.name, answers.id, answers.email, answers.officeNumber);
        teamMembers.push(manager);
        createTeam();
    });
};

function createEngineer() {
    inquirer.prompt(engineerQs).then((answers) => {
        const engineer = new Engineer (answers.name, answers.id, answers.email, answers.github)
        teamMembers.push(engineer);
        createTeam();
    });
};

function createIntern() {
    inquirer.prompt(internQs).then((answers) => {
        const intern = new Intern (answers.name, answers.id, answers.email, answers.school)
        teamMembers.push(intern);
        createTeam();
    });
};

function createTeam() {
    inquirer.prompt({
        type: 'list', 
        name: 'teamMember',
        message: "Which type of team member would you like to add?",
        choices: [
            'Engineer', 
            'Intern', 
            "I don't have any other team members to add.",
    ]}).then((userAnswer) => {
        switch (userAnswer.teamMember) {
            case "Engineer" :
                createEngineer();
                break;
            case "Intern" :
                createIntern();
                break;
                default:
                    buildTeam()
        }
    })
}

function buildTeam() {
    fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
    console.log("Your team page has been successfully generated!");
}


createManager();


// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
