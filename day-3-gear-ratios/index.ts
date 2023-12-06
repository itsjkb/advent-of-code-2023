import * as fs from 'fs';

const regexSymbols = /[^0-9.]/g;
const regexNumbers = /\b\d+\b/g;
try {
  const data = fs.readFileSync('input.txt', 'utf8');
  const lines = data.split(/\r?\n/); // Splitting by newline

  let currentLineIndex = 0;
  let prevLine = '';
  let nextLine = '';

  let runningTotal = 0;
  let maxTotal = 0;

  let numberArray: number[] = [];

  for (let i = 0; i <= 999; i++) {
    numberArray[i] = 0;
  }

  lines.forEach((line) => {
    const numbers = line.match(regexNumbers);

    // handle special cases
    if (currentLineIndex == 0) {
      prevLine = '';
      nextLine = lines[currentLineIndex + 1];
    } else if (currentLineIndex == 139) {
      prevLine = lines[currentLineIndex - 1];
      nextLine = '';
    } else {
      prevLine = lines[currentLineIndex - 1];
      nextLine = lines[currentLineIndex + 1];
    }

    let currNumber = 0;

    numbers?.forEach((number) => {
      maxTotal = maxTotal + parseInt(number);
      currNumber++;

      let adjacentChars = '';

      if (number.length == 1) {
        let stringToSearch = '.' + number + '.';
        let start = line.indexOf(stringToSearch);
        let end = start + 2;
        adjacentChars = prevLine
          .substring(start, end + 1)
          .concat(line.substring(start, end + 1))
          .concat(nextLine.substring(start, end + 1));
      } else if (number.length == 2) {
        let firstIndexOf = line.indexOf(number);
        let lastIndexOf = line.lastIndexOf(number);

        let stringToSearch = '.' + number + '.';
        let exactIndex = line.indexOf(stringToSearch);

        let start = line.indexOf(stringToSearch);
        let end = start + 3;

        adjacentChars = prevLine
          .substring(start, end + 1)
          .concat(line.substring(start, end + 1))
          .concat(nextLine.substring(start, end + 1));

        if (exactIndex < 0) {
          stringToSearch = number + '.';
          start = line.indexOf(stringToSearch);
          end = start + 3;

          adjacentChars = prevLine
            .substring(start, end + 1)
            .concat(line.substring(start, end + 1))
            .concat(nextLine.substring(start, end + 1));

          if (exactIndex < 0) {
            stringToSearch = '.' + number;

            start = line.indexOf(stringToSearch);
            end = start + 3;

            adjacentChars = prevLine
              .substring(start, end + 1)
              .concat(line.substring(start, end + 1))
              .concat(nextLine.substring(start, end + 1));

            if (exactIndex < 0) {
              console.log('Exact Match could not be found.');
            }
          }
        }
        console.log(
          'line->',
          currentLineIndex,
          ',number->',
          number,
          ',exactIndex',
          exactIndex,
          ',exactString',
          line.substring(exactIndex, exactIndex + 4),
          ',adjacent->',
          adjacentChars
        );
      } else {
        let start = line.indexOf(number);
        let end = start + number.length;
        adjacentChars = prevLine
          .substring(start - 1, end + 1)
          .concat(line.substring(start - 1, end + 1))
          .concat(nextLine.substring(start - 1, end + 1));
      }

      let matches = adjacentChars.match(regexSymbols);

      if (matches) {
        runningTotal = runningTotal + parseInt(number);
        numberArray[parseInt(number)]++;
      }
    });

    currentLineIndex++;
  });

  console.log('Total->', runningTotal);
  console.log('Max Total->', maxTotal);
} catch (err) {
  console.error(err);
}
