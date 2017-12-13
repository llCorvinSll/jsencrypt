import {IReduction} from "./IReduction";
import {BigInteger, nbi} from "../BigInteger";


export class BarrettReduction implements IReduction {
    constructor(m:BigInteger) {
        this.r2 = nbi();
        this.q3 = nbi();
        BigInteger.ONE.dlShiftTo(2 * m.t, this.r2);
        this.mu = this.r2.divide(m);
        this.m = m;
    }

    // Barrett.prototype.convert = barrettConvert;
    public convert(x:BigInteger) {
        if (x.s < 0 || x.t > 2 * this.m.t) {
            return x.mod(this.m);
        } else if (x.compareTo(this.m) < 0) {
            return x;
        } else {
            const r = nbi();
            x.copyTo(r);
            this.reduce(r);
            return r;
        }
    }

    // Barrett.prototype.revert = barrettRevert;
    public revert(x:BigInteger) {
        return x;
    }

    // Barrett.prototype.reduce = barrettReduce;
    // x = x mod m (HAC 14.42)
    private reduce(x:BigInteger) {
        x.drShiftTo(this.m.t - 1, this.r2);
        if (x.t > this.m.t + 1) {
            x.t = this.m.t + 1;
            x.clamp();
        }
        this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3);
        this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2);
        while (x.compareTo(this.r2) < 0) {
            x.dAddOffset(1, this.m.t + 1);
        }
        x.subTo(this.r2, x);
        while (x.compareTo(this.m) >= 0) {
            x.subTo(this.m, x);
        }
    }

    // Barrett.prototype.mulTo = barrettMulTo;
    // r = x*y mod m; x,y != r
    public mulTo(x:BigInteger, y:BigInteger, r:BigInteger) {
        x.multiplyTo(y, r);
        this.reduce(r);
    }

    // Barrett.prototype.sqrTo = barrettSqrTo;
    // r = x^2 mod m; x != r
    public sqrTo(x:BigInteger, r:BigInteger) {
        x.squareTo(r);
        this.reduce(r);
    }

    private r2:BigInteger;
    private q3:BigInteger;
    private mu:BigInteger;
    private m:BigInteger;
}
