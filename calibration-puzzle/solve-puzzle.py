import re
def part_one(filename):
    total = 0

    with open(filename, 'r') as file:
        for line in file:
            digits = [char for char in line if char.isdigit()]

            if digits:
                first_digit = digits[0]
                last_digit = digits[-1]
                concatenated = int(first_digit + last_digit)
                total += concatenated

    return total

def part_two(filename):
    total = 0
    number_words = {
        'one': '1', 'two': '2', 'three': '3', 'four': '4', 'five': '5',
        'six': '6', 'seven': '7', 'eight': '8', 'nine': '9', 'zero': '0'
    }
    # Create a reversed mapping for number words
    reversed_number_words = {word[::-1]: digit for word, digit in number_words.items()}

    # Regular expression for forward and backward search
    number_word_pattern = '|'.join(number_words.keys())
    number_pattern = f'{number_word_pattern}|\\d'
    reversed_number_word_pattern = '|'.join(reversed_number_words.keys())
    reversed_number_pattern = f'{reversed_number_word_pattern}|\\d'
    print(reversed_number_pattern)

    def find_first_number(line):
        matches = re.findall(number_pattern, line)
        for match in matches:
            if match.isdigit():
                return match
            else:
                return number_words[match]
        return None

    def find_last_number(line):
        reversed_line = line[::-1]
        matches = re.findall(reversed_number_pattern, reversed_line)
        print("matches->", matches)
        for match in matches:
            if match.isdigit():
                return match
            else:
                # Reverse the match again to get the correct number
                return reversed_number_words[match]
        return None

    with open(filename, 'r') as file:
        for line in file:
            first_number = find_first_number(line.strip())
            last_number = find_last_number(line.strip())

            if first_number is not None and last_number is not None:
                concatenated = int(first_number + last_number)
                total += concatenated

    return total


# Replace 'input.txt' with the path to your file
totalPart1 = part_one('input.txt')
totalPart2 = part_two('input.txt')
print("Total Part 1:", totalPart1, "Total Part 2:", totalPart2)