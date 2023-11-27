# game_logic.py
import random

def initialize_board():
    board = [[0] * 4 for _ in range(4)]
    add_new_tile(board)
    add_new_tile(board)
    return board

def add_new_tile(board):
    empty_cells = [(i, j) for i in range(4) for j in range(4) if board[i][j] == 0]
    if empty_cells:
        i, j = random.choice(empty_cells)
        board[i][j] = 2 if random.random() < 0.9 else 4

def slide(row):
    new_row = [tile for tile in row if tile != 0]
    while len(new_row) < 4:
        new_row.append(0)
    return new_row

def merge(row):
    for i in range(3, 0, -1):
        if row[i] == row[i-1]:
            row[i] *= 2
            row[i-1] = 0
    return row

def move(board, direction):
    for i in range(4):
        if direction == 'left':
            board[i] = merge(slide(board[i]))
        elif direction == 'right':
            board[i] = list(reversed(merge(slide(list(reversed(board[i]))))))
        elif direction == 'up':
            col = merge(slide([board[j][i] for j in range(4)]))
            for j in range(4):
                board[j][i] = col[j]
        elif direction == 'down':
            col = list(reversed(merge(slide(list(reversed([board[j][i] for j in range(4)]))))))
            for j in range(4):
                board[j][i] = col[j]
    add_new_tile(board)

def is_game_over(board):
    for row in board:
        if 0 in row:
            return False
        for i in range(3):
            if row[i] == row[i+1]:
                return False

    for i in range(4):
        for j in range(3):
            if board[j][i] == board[j+1][i]:
                return False

    return True
