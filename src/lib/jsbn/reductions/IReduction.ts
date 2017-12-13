import {BigInteger} from "../BigInteger";


export interface IReduction {
    convert(b:BigInteger):BigInteger;
    revert(b:BigInteger):BigInteger;
    sqrTo(a:BigInteger, b:BigInteger):void;
    mulTo(x:BigInteger, y:BigInteger, r:BigInteger):void;
}
