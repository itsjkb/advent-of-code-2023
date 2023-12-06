import re

def part_one(filename):
  total = 0
  maxes = {'red': 12, 'green': 13, 'blue': 14}

  with open(filename) as file:
    for line in file:
      possible = True
      game_number_part = re.search(r'Game (\d+):', line)
      game_number = int(game_number_part.group(1))

      rounds = line[game_number_part.end():].strip().split(';')

      for round in rounds:
        draws = re.findall(r'\d+ \w+', round)
        for draw in draws:
          parts = draw.split(' ')
          number = int(parts[0])
          color = parts[1]

          if number > maxes[color]:
            possible = False

      if possible:
        total += game_number            
        
  return total

def part_two(filename):
  total = 0

  with open(filename) as file:

    for line in file:
      mins = {'red': 0, 'green': 0, 'blue': 0}
      draws = re.findall(r'\d+ \w+', line)
      print("draws->", draws)
      for draw in draws:
        parts = draw.split(' ')
        number = int(parts[0])
        color = parts[1]

        if (mins[color] < number):
          mins[color] = number

      total += mins['red'] * mins['green'] * mins['blue']
      

  return total

# Replace 'input.txt' with the path to your file
totalPart1 = part_one('input.txt')
totalPart2 = part_two('input.txt')
print("Total Part 1:", totalPart1, "Total Part 2:", totalPart2)