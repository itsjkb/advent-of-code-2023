import * as fs from 'fs';

interface NumberWordMap {
  [key: string]: number;
}

const numberWordsToDigits: NumberWordMap = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

const regex = /zero|one|two|three|four|five|six|seven|eight|nine|\d/g;

function findFirstNumber(s: string) {
  const matches = s.match(regex);
  if (matches) {
    // console.log('firstNumber Matched -> ', matches);
    if (matches[0].length > 1) {
      return numberWordsToDigits[matches[0]].toString();
    } else {
      return matches[0].toString();
    }
  } else {
    return 'number not found';
  }
}

function findLastNumber(s: string) {
  let number = '';
  let length = s.length;

  while (number == '') {
    const matches = s.slice(length--, s.length).match(regex);
    if (matches) {
      // console.log('lastNumber Matched -> ', matches);
      if (matches[0].length > 1) {
        return numberWordsToDigits[matches[0]].toString();
      } else {
        return matches[0].toString();
      }
    }
  }
}

try {
  const data = fs.readFileSync('input.txt', 'utf8');
  const lines = data.split(/\r?\n/); // Splitting by newline

  const runningTotal = lines
    .map((line) => {
      const firstNumber = findFirstNumber(line);
      const lastNumber = findLastNumber(line);

      // console.log('firstNumber->', firstNumber, ',lastNumber->', lastNumber);
      return parseInt(firstNumber + lastNumber, 10); // Combines into two-digit number
    })
    .reduce((sum, num) => sum + num, 0); // Accumulates the sum

  console.log(`Total of all two-digit numbers: ${runningTotal}`);
} catch (err) {
  console.error(err);
}
