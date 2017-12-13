

const BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz";
export function int2char(n:number):string {
    return BI_RM.charAt(n);
}

// returns bit length of the integer x
export function nbits(x:number) {
    let  r = 1;
    let t;
    if ((t = x >>> 16) != 0) { x = t; r += 16; }
    if ((t = x >> 8) != 0) { x = t; r += 8; }
    if ((t = x >> 4) != 0) { x = t; r += 4; }
    if ((t = x >> 2) != 0) { x = t; r += 2; }
    if ((t = x >> 1) != 0) { x = t; r += 1; }
    return r;
}

// return index of lowest 1-bit in x, x < 2^31
export function lbit(x:number) {
    if (x == 0) { return -1; }
    let r = 0;
    if ((x & 0xffff) == 0) { x >>= 16; r += 16; }
    if ((x & 0xff) == 0) { x >>= 8; r += 8; }
    if ((x & 0xf) == 0) { x >>= 4; r += 4; }
    if ((x & 3) == 0) { x >>= 2; r += 2; }
    if ((x & 1) == 0) { ++r; }
    return r;
}

function linebrk(s:string, n:number) {
    let ret = "";
    let i = 0;
    while (i + n < s.length) {
        ret += s.substring(i, i + n) + "\n";
        i += n;
    }
    return ret + s.substring(i, s.length);
}

function byte2Hex(b:number):string {
    if (b < 0x10) {
        return "0" + b.toString(16);
    } else {
        return b.toString(16);
    }
}