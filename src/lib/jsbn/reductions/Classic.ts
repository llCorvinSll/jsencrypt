import {BigInteger} from "../BigInteger";
import {IReduction} from "./IReduction";

// Modular reduction using "classic" algorithm
export class ClassicReduction implements IReduction {
    constructor(private m:BigInteger) {
    }

    public convert(x:BigInteger) {
        if (x.s < 0 || x.compareTo(this.m) >= 0) {
            return x.mod(this.m);
        } else {
            return x;
        }
    }


    // Classic.prototype.revert = cRevert;
    public revert(x:BigInteger) {
        return x;
    }

    // Classic.prototype.reduce = cReduce;
    public reduce(x:BigInteger) {
        x.divRemTo(this.m, null, x);
    }

    // Classic.prototype.mulTo = cMulTo;
    public mulTo(x:BigInteger, y, r) {
        x.multiplyTo(y, r);
        this.reduce(r);
    }

    // Classic.prototype.sqrTo = cSqrTo;
    public sqrTo(x:BigInteger, r:BigInteger) {
        x.squareTo(r);
        this.reduce(r);
    }



}