# MineSweeper Generator

Demo: https://educastrillonr.github.io/minesweeper/

I have chosen to build this program in JavaScript + HTML as it is what I feel the most confident in currently.

## Task

The goal of this program is to create a MineSweeper game field with any given (positive) size and solve it.

## Approach

In order to do this, I genereate a two dimensional array with the given sizes and populate a HTML table for user visualisation aswell as a `candidates` array which will help me track which cells have already been visited. Each cell is now populated by an instance of the `class Cell`. This class has the properties of:

- `isAMine`: boolean which returns `true` if said cell is a mine.
- `coord` : X and Y coordinates of the cell in the field.
- `cellDom`: object used for DOM manipulation.
- `mines`: number of mines the cell is in "contact" with.
- `neighbours`: references to the adjacents cells.

After generating the field, I assign random cells to be mines.<br>
Following this I populate the `neighbours` property and check which ones are mines. By doing this every cell in the grid now can be "asked" for its mine count.

In order to solve the field, I first created a function that would deal with a user's click and reveal wether it's a mine or its mine count. I did this because my first interpretation of the problem was to build the game in itself. <br>
After realising the test asked for the code to solve it, I created a function that would simulate a user's click based on a random cell and repeating said process recursively until there are no candidates left.

## Conclusion

In hindsight, I think I could reduce the number of steps I take to solve the problem by solving it as the field is being generated. I am quite happy I could work my way around the fact I misinterpreted the problem at first. Repurposing the codebase and automating it was a fun challenge. 
