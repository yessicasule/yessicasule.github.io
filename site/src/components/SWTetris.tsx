import { useEffect, useRef, useState } from "react";

const COLS = 10;
const ROWS = 20;
const CELL = 24;

const PIECES: { cells: number[][]; color: string }[] = [
  { cells: [[1, 1, 1, 1]], color: "#4bd5ee" },
  { cells: [[1, 1], [1, 1]], color: "#ffe81f" },
  { cells: [[0, 1, 0], [1, 1, 1]], color: "#b06fe8" },
  { cells: [[0, 1, 1], [1, 1, 0]], color: "#6fe86f" },
  { cells: [[1, 1, 0], [0, 1, 1]], color: "#ff5252" },
  { cells: [[1, 0, 0], [1, 1, 1]], color: "#7ec8ff" },
  { cells: [[0, 0, 1], [1, 1, 1]], color: "#ffa94d" },
];

type Grid = (string | 0)[][];

interface Active {
  cells: number[][];
  color: string;
  x: number;
  y: number;
}

const emptyBoard = (): Grid => Array.from({ length: ROWS }, () => Array<string | 0>(COLS).fill(0));

const randomPiece = (): Active => {
  const p = PIECES[Math.floor(Math.random() * PIECES.length)];
  return { cells: p.cells.map((r) => [...r]), color: p.color, x: 3, y: -1 };
};

const rotateCW = (m: number[][]) => m[0].map((_, i) => m.map((row) => row[i]).reverse());

function collides(board: Grid, p: Active): boolean {
  for (let r = 0; r < p.cells.length; r++) {
    for (let c = 0; c < p.cells[r].length; c++) {
      if (!p.cells[r][c]) continue;
      const x = p.x + c;
      const y = p.y + r;
      if (x < 0 || x >= COLS || y >= ROWS) return true;
      if (y >= 0 && board[y][x]) return true;
    }
  }
  return false;
}

type Phase = "idle" | "play" | "pause" | "over";

export function SWTetris() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const boardRef = useRef<Grid>(emptyBoard());
  const pieceRef = useRef<Active>(randomPiece());
  const nextRef = useRef<Active>(randomPiece());
  const phaseRef = useRef<Phase>("idle");
  const [phase, setPhaseState] = useState<Phase>("idle");
  const [score, setScore] = useState(0);
  const [lines, setLines] = useState(0);
  const [level, setLevel] = useState(1);
  const levelRef = useRef(1);

  const setPhase = (p: Phase) => {
    phaseRef.current = p;
    setPhaseState(p);
  };

  const draw = () => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#0c0a14";
    ctx.fillRect(0, 0, COLS * CELL, ROWS * CELL);
    ctx.strokeStyle = "rgba(126, 200, 255, 0.08)";
    ctx.lineWidth = 1;
    for (let x = 1; x < COLS; x++) {
      ctx.beginPath();
      ctx.moveTo(x * CELL, 0);
      ctx.lineTo(x * CELL, ROWS * CELL);
      ctx.stroke();
    }
    for (let y = 1; y < ROWS; y++) {
      ctx.beginPath();
      ctx.moveTo(0, y * CELL);
      ctx.lineTo(COLS * CELL, y * CELL);
      ctx.stroke();
    }

    const cell = (x: number, y: number, color: string) => {
      ctx.shadowColor = color;
      ctx.shadowBlur = 8;
      ctx.fillStyle = color;
      ctx.fillRect(x * CELL + 1.5, y * CELL + 1.5, CELL - 3, CELL - 3);
      ctx.shadowBlur = 0;
      ctx.fillStyle = "rgba(255,255,255,0.28)";
      ctx.fillRect(x * CELL + 3, y * CELL + 3, CELL - 6, 4);
    };

    boardRef.current.forEach((row, y) =>
      row.forEach((v, x) => {
        if (v) cell(x, y, v);
      }),
    );

    if (phaseRef.current === "play" || phaseRef.current === "pause") {
      const p = pieceRef.current;
      p.cells.forEach((row, r) =>
        row.forEach((v, c) => {
          if (v && p.y + r >= 0) cell(p.x + c, p.y + r, p.color);
        }),
      );
    }

    if (phaseRef.current === "over") {
      ctx.fillStyle = "rgba(12, 10, 20, 0.8)";
      ctx.fillRect(0, 0, COLS * CELL, ROWS * CELL);
      ctx.fillStyle = "#ff5252";
      ctx.font = "700 17px Consolas, monospace";
      ctx.textAlign = "center";
      ctx.fillText("THE FORCE IS NOT", (COLS * CELL) / 2, (ROWS * CELL) / 2 - 12);
      ctx.fillText("WITH YOU", (COLS * CELL) / 2, (ROWS * CELL) / 2 + 12);
    }
    if (phaseRef.current === "pause") {
      ctx.fillStyle = "rgba(12, 10, 20, 0.7)";
      ctx.fillRect(0, 0, COLS * CELL, ROWS * CELL);
      ctx.fillStyle = "#ffe81f";
      ctx.font = "700 18px Consolas, monospace";
      ctx.textAlign = "center";
      ctx.fillText("PAUSED", (COLS * CELL) / 2, (ROWS * CELL) / 2);
    }
  };

  const lock = () => {
    const board = boardRef.current;
    const p = pieceRef.current;
    p.cells.forEach((row, r) =>
      row.forEach((v, c) => {
        if (v && p.y + r >= 0) board[p.y + r][p.x + c] = p.color;
      }),
    );
    let cleared = 0;
    for (let y = ROWS - 1; y >= 0; y--) {
      if (board[y].every((v) => v !== 0)) {
        board.splice(y, 1);
        board.unshift(Array<string | 0>(COLS).fill(0));
        cleared++;
        y++;
      }
    }
    if (cleared) {
      setScore((s) => s + [0, 100, 300, 500, 800][cleared] * levelRef.current);
      setLines((l) => {
        const total = l + cleared;
        const lvl = 1 + Math.floor(total / 10);
        levelRef.current = lvl;
        setLevel(lvl);
        return total;
      });
    }
    pieceRef.current = nextRef.current;
    nextRef.current = randomPiece();
    if (collides(board, pieceRef.current)) {
      setPhase("over");
    }
  };

  const move = (dx: number, dy: number): boolean => {
    const p = pieceRef.current;
    const trial = { ...p, x: p.x + dx, y: p.y + dy };
    if (!collides(boardRef.current, trial)) {
      pieceRef.current = trial;
      draw();
      return true;
    }
    return false;
  };

  const rotate = () => {
    const p = pieceRef.current;
    const cells = rotateCW(p.cells);
    for (const kick of [0, -1, 1, -2, 2]) {
      const trial = { ...p, cells, x: p.x + kick };
      if (!collides(boardRef.current, trial)) {
        pieceRef.current = trial;
        draw();
        return;
      }
    }
  };

  const drop = () => {
    if (!move(0, 1)) {
      lock();
      draw();
    }
  };

  const hardDrop = () => {
    while (move(0, 1)) {
      /* descend */
    }
    lock();
    draw();
  };

  const start = () => {
    boardRef.current = emptyBoard();
    pieceRef.current = randomPiece();
    nextRef.current = randomPiece();
    levelRef.current = 1;
    setScore(0);
    setLines(0);
    setLevel(1);
    setPhase("play");
    draw();
  };

  useEffect(() => {
    if (phase !== "play") return;
    const id = window.setInterval(drop, Math.max(110, 720 - (level - 1) * 65));
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, level]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") return;
      if (phaseRef.current === "play") {
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          move(-1, 0);
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          move(1, 0);
        } else if (e.key === "ArrowDown") {
          e.preventDefault();
          drop();
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          rotate();
        } else if (e.key === " ") {
          e.preventDefault();
          hardDrop();
        } else if (e.key.toLowerCase() === "p") {
          setPhase("pause");
          draw();
        }
      } else if (phaseRef.current === "pause" && e.key.toLowerCase() === "p") {
        setPhase("play");
        draw();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(draw, []);

  return (
    <div className="tetris" aria-label="Holo-Tetris">
      <div className="tetris__head">
        <span className="tetris__title">HOLO-TETRIS</span>
        <span className="tetris__stats">
          ✦ {score} · LINES {lines} · LVL {level}
        </span>
      </div>
      <div className="tetris__body">
        <canvas ref={canvasRef} width={COLS * CELL} height={ROWS * CELL} className="tetris__canvas" />
        <div className="tetris__side">
          {phase === "play" ? (
            <button type="button" className="btn btn--small" onClick={() => { setPhase("pause"); draw(); }}>
              ❚❚ PAUSE
            </button>
          ) : phase === "pause" ? (
            <button type="button" className="btn btn--small" onClick={() => { setPhase("play"); draw(); }}>
              ▶ RESUME
            </button>
          ) : (
            <button type="button" className="btn btn--small" onClick={start}>
              ▶ {phase === "over" ? "RETRY" : "START"}
            </button>
          )}
          <div className="tetris__keys" aria-hidden="true">
            <span>◀ ▶ ▼</span>
            <span>▲ ROTATE</span>
            <span>␣ DROP</span>
            <span>P PAUSE</span>
          </div>
          <div className="tetris__pad">
            <button type="button" onClick={() => phase === "play" && move(-1, 0)} aria-label="Left">
              ◀
            </button>
            <button type="button" onClick={() => phase === "play" && rotate()} aria-label="Rotate">
              ⟳
            </button>
            <button type="button" onClick={() => phase === "play" && move(1, 0)} aria-label="Right">
              ▶
            </button>
            <button type="button" onClick={() => phase === "play" && drop()} aria-label="Down">
              ▼
            </button>
            <button type="button" onClick={() => phase === "play" && hardDrop()} aria-label="Hard drop">
              ⤓
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
