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