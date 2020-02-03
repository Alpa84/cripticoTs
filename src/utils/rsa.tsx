// straight from https://github.com/denysdovhan/rsa-labwork

import * as bigInt from 'big-integer'
import {BigInteger} from 'big-integer'
import {Keys} from '../Types'

const keyLength = 256

export const generateKeyPair = () => {
  let keys = RSA.generate(keyLength)
  return keysToPrivateKey(keys)
}
const keysToPrivateKey = (keys: Keys) => {
  return {
    address: `${keys.d.toString()},${keys.n.toString()}`,
    privateKey: `${keys.e.toString()},${keys.n.toString()}`,
  }
}
export class RSA {
  static randomPrime(bits: number) {
    const min = bigInt.one.shiftLeft(bits - 1);
    const max = bigInt.one.shiftLeft(bits).prev();

    while (true) {
      let p = bigInt.randBetween(min, max);
      if (p.isProbablePrime(256)) {
        return p;
      }
    }
  }

  static generate(keysize: number) {
    const e = bigInt(65537);
    let p;
    let q;
    let totient;

    do {
      p = this.randomPrime(keysize / 2);
      q = this.randomPrime(keysize / 2);
      totient = bigInt.lcm(
        p.prev(),
        q.prev()
      );
    } while (bigInt.gcd(e, totient).notEquals(1) || p.minus(q).abs().shiftRight(keysize / 2 - 100).isZero());

    return {
      d: e.modInv(totient),
      e,
      n: p.multiply(q),
    };
  }

  static encrypt(encodedMsg: BigInteger, n: BigInteger, e: BigInteger) {
    return bigInt(encodedMsg).modPow(e, n);
  }

  static decrypt(encryptedMsg: string, d: BigInteger, n: BigInteger) {
    return bigInt(encryptedMsg).modPow(d, n);
  }

  static encode(str: string) {
    const codes = str
      .split('')
      .map(i => i.charCodeAt(0))
      .join('');

    return bigInt(codes);
  }

  static decode(code: string) {
    const stringified = code.toString();
    let decodedString = '';

    for (let i = 0; i < stringified.length; i += 2) {
      let num = Number(stringified.substr(i, 2));

      if (num <= 30) {
        decodedString += String.fromCharCode(Number(stringified.substr(i, 3)));
        i++;
      } else {
        decodedString += String.fromCharCode(num);
      }
    }

    return decodedString;
  }
}