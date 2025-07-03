
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, RotateCcw, CheckCircle, AlertCircle } from 'lucide-react';

interface InteractiveBoardProps {
  gameId: string;
  type: 'chess-board' | 'sudoku-grid' | 'rubiks-cube' | 'crossword-grid' | 'go-board' | 'poker-table' | 'tetris-board' | 'wordle-grid' | 'mahjong-table' | 'backgammon-board' | 'scrabble-board' | 'bridge-table' | 'checkers-board' | 'kakuro-grid' | 'minesweeper-grid' | 'jigsaw-board' | 'shogi-board' | 'mastermind-board' | 'set-cards' | 'nim-board';
  title: string;
  description: string;
}

const InteractiveBoard: React.FC<InteractiveBoardProps> = ({ gameId, type, title, description }) => {
  const [isActive, setIsActive] = useState(false);
  const [moves, setMoves] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<string>('');

  const handleStart = () => {
    setIsActive(true);
    setFeedback('Practice session started! Try making moves.');
  };

  const handleReset = () => {
    setIsActive(false);
    setMoves([]);
    setFeedback('');
  };

  const getChessPiece = (row: number, col: number): string => {
    if (row === 0) {
      const pieces = ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜'];
      return pieces[col];
    }
    if (row === 1) return '♟';
    if (row === 6) return '♙';
    if (row === 7) {
      const pieces = ['♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖'];
      return pieces[col];
    }
    return '';
  };

  const handleSquareClick = (row: number, col: number) => {
    if (!isActive) return;
    const move = `${String.fromCharCode(97 + col)}${8 - row}`;
    setMoves(prev => [...prev, move]);
    setFeedback(`Clicked square ${move}`);
  };

  const handleSudokuInput = (row: number, col: number, value: string) => {
    if (!isActive) return;
    if (!/^[1-9]?$/.test(value)) return;
    setFeedback(value ? `Placed ${value} at row ${row + 1}, column ${col + 1}` : 'Cell cleared');
  };

  const renderBoard = () => {
    switch (type) {
      case 'chess-board':
        return (
          <div className="w-full max-w-md mx-auto">
            <div className="grid grid-cols-8 gap-0 border-2 border-primary/30 rounded-lg overflow-hidden">
              {Array.from({ length: 64 }).map((_, index) => {
                const row = Math.floor(index / 8);
                const col = index % 8;
                const isLight = (row + col) % 2 === 0;
                const piece = getChessPiece(row, col);
                
                return (
                  <div
                    key={index}
                    className={`w-12 h-12 flex items-center justify-center text-2xl cursor-pointer hover:bg-primary/20 transition-colors ${
                      isLight ? 'bg-amber-100' : 'bg-amber-800'
                    }`}
                    onClick={() => handleSquareClick(row, col)}
                  >
                    {piece}
                  </div>
                );
              })}
            </div>
          </div>
        );
      
      case 'sudoku-grid':
        return (
          <div className="w-full max-w-md mx-auto">
            <div className="grid grid-cols-9 gap-0 border-2 border-primary/30 rounded-lg overflow-hidden">
              {Array.from({ length: 81 }).map((_, index) => {
                const row = Math.floor(index / 9);
                const col = index % 9;
                const boxRow = Math.floor(row / 3);
                const boxCol = Math.floor(col / 3);
                const isAlternateBox = (boxRow + boxCol) % 2 === 1;
                
                return (
                  <input
                    key={index}
                    type="text"
                    maxLength={1}
                    className={`w-8 h-8 text-center border border-border text-foreground bg-transparent focus:bg-primary/10 focus:outline-none ${
                      isAlternateBox ? 'bg-muted/20' : ''
                    } ${(col % 3 === 2 && col < 8) ? 'border-r-2 border-r-primary/50' : ''} ${
                      (row % 3 === 2 && row < 8) ? 'border-b-2 border-b-primary/50' : ''
                    }`}
                    onChange={(e) => handleSudokuInput(row, col, e.target.value)}
                  />
                );
              })}
            </div>
          </div>
        );
      
      default:
        return (
          <div className="w-full h-64 bg-muted/20 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-4">🎮</div>
              <p className="text-muted-foreground">Interactive {gameId} board coming soon!</p>
            </div>
          </div>
        );
    }
  };

  return (
    <Card className="glass-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Play className="w-5 h-5 text-primary" />
          {title}
        </CardTitle>
        <p className="text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {renderBoard()}
        
        <div className="flex gap-2 justify-center">
          <Button
            onClick={handleStart}
            disabled={isActive}
            className="bg-green-600 hover:bg-green-700"
          >
            <Play className="w-4 h-4 mr-2" />
            Start Practice
          </Button>
          <Button
            onClick={handleReset}
            variant="outline"
            className="border-border"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>

        {feedback && (
          <div className="flex items-center gap-2 p-3 bg-muted/20 rounded-lg">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <span className="text-sm">{feedback}</span>
          </div>
        )}

        {moves.length > 0 && (
          <div className="p-3 bg-muted/20 rounded-lg">
            <h4 className="text-sm font-semibold mb-2">Move History:</h4>
            <div className="flex flex-wrap gap-1">
              {moves.map((move, index) => (
                <span key={index} className="text-xs bg-primary/20 px-2 py-1 rounded">
                  {move}
                </span>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default InteractiveBoard;
