// #!/usr/bin/env node

import chalk from 'chalk';
import inquirer from 'inquirer';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';

const pink = chalk.hex('#F31E6A')

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
    console.clear();
    figlet(`DownReps`, (err, data) => {
        console.log((data) + '\n');
        console.log(
            chalk.green(
                `Your go-to CLI tool for calculating down workout total reps`
            )
        );
    });

    await sleep();

    console.log(`
        It's simple... you give us number of down reps and we calculate your total,
        e.g. 50 down = 1275
    `);
}

async function input() {
    const answers = await inquirer.prompt({
        name: 'input',
        type: 'input',
        message: 'Number of down reps:',
    });
  
    const input = answers.input;

    const total = ((parseInt(input) + 1)/2) * parseInt(input)

    const spinner = createSpinner('Calculating...').start();
    await sleep();

    if (total) {
        spinner.success({ text: `It's ${pink(chalk.bold(total))} total reps \n\n ${chalk.italic("created by Tymon 'tajmon' Jędryczka")}` });
    } else {
        spinner.error({ text: `Something went wrong` });
    }    
}

console.clear();
await welcome();
await input();