# gui.py
import tkinter as tk
from game_logic import initialize_board, move, is_game_over

class GameGUI:
    def __init__(self, master):
        self.master = master
        self.master.title("2048 Game")

        self.board = initialize_board()

        self.canvas = tk.Canvas(master, width=400, height=400)
        self.canvas.pack()

        self.draw_board()

        self.master.bind("<Left>", lambda event: self.handle_move("left"))
        self.master.bind("<Right>", lambda event: self.handle_move("right"))
        self.master.bind("<Up>", lambda event: self.handle_move("up"))
        self.master.bind("<Down>", lambda event: self.handle_move("down"))

    def draw_board(self):
        self.canvas.delete("all")
        for i in range(4):
            for j in range(4):
                value = self.board[i][j]
                if value:
                    self.canvas.create_rectangle(j * 100, i * 100, (j + 1) * 100, (i + 1) * 100, fill="lightgray")
                    self.canvas.create_text((j + 0.5) * 100, (i + 0.5) * 100, text=str(value), font=("Helvetica", 20, "bold"))

    def handle_move(self, direction):
        move(self.board, direction)
        self.draw_board()
        if is_game_over(self.board):
            self.canvas.create_text(200, 200, text="Game Over!", font=("Helvetica", 24, "bold"))

if __name__ == "__main__":
    root = tk.Tk()
    game_gui = GameGUI(root)
    root.mainloop()
