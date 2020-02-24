// General constants
const id = x => x;
const add = x => y => x + y;
const transpose = xsxs => xsxs[0].map((col, i) => xsxs.map(row => row[i]));
const mirror = xsxs => xsxs.map(xs => xs.reverse());
const pipe = (...fns) => x => [...fns].reduce((acc, f) => f(acc), x);
const map = f => xs => xs.map(f);
const range = min => max => [...Array(max).keys()].map((_, i) => i + min);
const k = x => _ => x;
const join = s => xs => xs.join(s);
const rep = c => n => map(k(c))(range(0)(n));
const concat = x1 => x2 => x1.concat(x2);
const mapi = f => xs => xs.map((x, i) => f(x)(i));
const ifelse = c => t => f => x => (c(x) ? t(x) : f(x));
const reduce = f => z => xs => xs.reduce((acc, x) => f(acc)(x), z);
const eq = x => y => x == y;
const find = f => xs => xs.find(f);
const append = x => xs => [...xs, xs];
const not = f => x => !f(x);
const and = x => y => x && y;
const or = x => y => x || y;
const all = f => pipe(map(f), reduce(and)(true));
const any = f => pipe(map(f), reduce(or)(false));
const flip = f => x => y => f(y)(x);
const filter = f => xs => xs.filter(f);
const gt = x => y => x > y;
const lt = x => y => x < y;
const prop = p => o => o[p];
const both = f => g => x => f(x) && g(x);

const Color = {};
Color.black = s => `\x1b[30m${s}\x1b[om`;
Color.red = s => `\x1b[31m${s}\x1b[om`;
Color.green = s => `\x1b[32m${s}\x1b[om`;
Color.yellow = s => `\x1b[33m${s}\x1b[om`;
Color.blue = s => `\x1b[34m${s}\x1b[om`;
Color.magenta = s => `\x1b[35m${s}\x1b[om`;
Color.cyan = s => `\x1b[36m${s}\x1b[om`;
Color.white = s => `\x1b[37m${s}\x1b[om`;

const Pieces = {
  I: [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ],
  O: [
    [2, 2],
    [2, 2]
  ],
  T: [
    [0, 3, 0],
    [3, 3, 3],
    [0, 0, 0]
  ],
  S: [
    [0, 4, 4],
    [4, 4, 0],
    [0, 0, 0]
  ],
  Z: [
    [0, 0, 0],
    [5, 5, 0],
    [0, 5, 5]
  ],
  J: [
    [0, 0, 0],
    [6, 6, 6],
    [0, 0, 6]
  ],
  L: [
    [0, 0, 7],
    [7, 7, 7],
    [0, 0, 0]
  ]
};

const Piece = {};
Piece.rand = () => Random.pick(Object.values(Pieces));
Piece.toStr = n => {
  switch (n) {
    case 0:
      return " ";
      break;
    case 1:
      return Color.cyan("▓");
      break;
    case 2:
      return Color.yellow("▓");
      break;
    case 3:
      return Color.magenta("▓");
      break;
    case 4:
      return Color.green("▓");
      break;
    case 5:
      return Color.red("▓");
      break;
    case 6:
      return Color.blue("▓");
      break;
    case 7:
      return Color.white("▓");
      break;
    case -1:
      return " ";
      break;
    default:
      return "░";
      break;
  }
};

const Matrix = {};
Matrix.sum = pipe(map(reduce(add)(0)), reduce(add)(0));
Matrix.toStr = x => pipe(map(join(" ")), join("\r\n"))(x);
Matrix.row = x => m => rep(x)(m[0].length);
Matrix.frame = m => append(Matrix.row("▔")(m))(m);
Matrix.rotate = pipe(transpose, mirror);
Matrix.make = rows => cols => rep(rep(0)(cols))(rows);
Matrix.mound = f => pos => m1 => m2 =>
  mapi(row => y =>
    mapi(val => x =>
      y >= pos.y &&
      y - pos.y < m1.length &&
      x >= pos.x && x - pos.x < m1[0].length
        ? f(m1[y - pos.y][x - pos.x])(m2[y][x])
        : m2[y][x]
    )(row)
  )(m2);
