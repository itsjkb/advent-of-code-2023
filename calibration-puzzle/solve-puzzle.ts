import * as fs from 'fs';

try {
  const data = fs.readFileSync('input.txt', 'utf8');
  const lines = data.split(/\r?\n/); // Splitting by newline

  const runningTotal = lines
    .map((line) => {
      const numbers = line.match(/\d/g) || []; // Finds single-digit numbers, defaults to empty array if none
      const firstNumber = numbers[0] || '0';
      const lastNumber = numbers[numbers.length - 1] || firstNumber;
      return parseInt(firstNumber + lastNumber, 10); // Combines into two-digit number
    })
    .reduce((sum, num) => sum + num, 0); // Accumulates the sum

  console.log(`Running total of all two-digit numbers: ${runningTotal}`);
} catch (err) {
  console.error(err);
}
