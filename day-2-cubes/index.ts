import * as fs from 'fs';

interface numsPerColor {
  [key: string]: number;
}

const maxes: numsPerColor = {
  red: 12,
  green: 13,
  blue: 14,
};

try {
  const data = fs.readFileSync('input.txt', 'utf8');
  const lines = data.split(/\r?\n/); // Splitting by newline

  let runningTotal = 0;
  let runningTotalPower = 0;

  lines.forEach((line) => {
    const substrings = line.split(':');
    const gameNumber = parseInt(
      substrings[0].substring(line.indexOf(' ') + 1, substrings[0].length)
    );

    let isPossible = true;
    let mins: numsPerColor = {
      red: 0,
      green: 0,
      blue: 0,
    };

    const rounds = substrings[1].split(';');

    rounds.forEach((round) => {
      const draws = round.split(',');
      draws.forEach((draw) => {
        const currentNumber = parseInt(draw.split(' ')[1]);
        const currentColor = draw.split(' ')[2];
        if (currentNumber > maxes[currentColor]) {
          isPossible = false;
        }
        if (mins[currentColor] < currentNumber) {
          mins[currentColor] = currentNumber;
        }
      });
    });

    if (isPossible) {
      runningTotal = runningTotal + gameNumber;
    }

    const gamePower = (runningTotalPower =
      runningTotalPower + mins['red'] * mins['green'] * mins['blue']);
  });

  console.log('runningTotal->', runningTotal);
  console.log('runningTotalPower->', runningTotalPower);
} catch (err) {
  console.error(err);
}
