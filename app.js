const Manager = require("./lib/Manager");
const Developer = require("./lib/Developer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

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
    },
    {
        type: 'list', 
        name: 'teamMember',
        message: "Which type of team member would you like to add?",
        choices: [
            'Developer', 
            'Intern', 
            "I don't have any other team members to add.",
    ]}
];

let developerQs = [
    {
        type: 'input',
        name: 'name',
        message: "What is your developer's name?"
    },
    {
        type: 'input',
        name: 'id',
        message: "What is your developer's ID number?"
    },
    {
        type: 'input',
        name: 'email',
        message: "What is your developer's email address?"
    },
    {
        type: 'input',
        name: 'github',
        message: "What is your developer's GitHub username?"
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
        name: 'twitter',
        message: "What is your intern's twitter handle?"
    }
];

managerPrompt() {
    
};

inquirer
.prompt(managerQs)
  .then(answers => {
    if (answers.teamMember === "Developer") {
        inquirer
        .prompt(developerQs)
            .then(answers => {
                return inquirer.prompt(managerQs[4]);
            });
    }; 
    if (answers.teamMember === "Intern") {
        inquirer
        .prompt(internQs)
            .then(answers => {
                return inquirer.prompt(managerQs[4]);
            })
    } // else {

    //}
})

  .catch(error => {
    console.log(error);
  });


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
