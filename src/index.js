
const assert = require('assert');
Object.freeze(assert);

module.exports = function count(s, pairs) {
    // your implementation
    const MOD = 1000000007;
    let   N = 1
    let   primes = new Set()
    let   Nd2 = false;
    let   Nd3 = false;

    // if gdc == 1 return 1 else 2    
    // check by pairs primes - quiqly 
    const gcdOne = (a, b) =>{
        if ((Nd2 && a%2==0) || (Nd3 && a%3==0))
            return 2
        
        for (p of primes){
            if (p!=1 && a%p ==0){
                return 2;
            }    
        } 
        return 1;  
    }

    function pow(a,b) {
        var res = 1;
        while (b){
            if (b & 1){ 
                res *= a;
                //res %= MOD;
            }    
            a *= a;
            //a %= MOD;
            b >>= 1;
        }
        return res % MOD;
    }
    
    // Get N and its primes
    for (var i = 0; i < pairs.length; i++) {
       N *= pow(pairs[i][0], pairs[i][1]);
       primes.add(pairs[i][0]);
    }

    // Primary 2, 3 exist in N
    Nd2 = primes.has(2);
    Nd3 = primes.has(3);

    //primes = new Set([...primes].sort((a, b) => a-b));

    // Escape BIG N (solve come not now)
    if (N > 100000000)
        return -1;
    

    let fullpatt = 0; // compare to pattern length
    let answer   = 0;

    for (var k = 0; k < N; k++) {
        fullpatt = 0;
        for (var j = 0; j < s.length; j++) {
            let kj = k + j;

            if (kj>N) // Out of the range
                break;

            if (s[j]==='1' && kj%2==0 && Nd2) // 2 primes when we need 1
                break;
              
            if (s[j]==='1' && kj%3==0 && Nd3) // 2 primes when we need 1
                break;

            gtcv = gcdOne(kj, N);

            if (((s[j]==='1' && (gtcv == 1)) 
               || s[j]==='0' && (gtcv != 1)))
               fullpatt++;
        }   
     
        if (fullpatt == s.length) {
            answer++;
            k+= s.length-2 >=0 ?s.length-2: 0; // next searh position
        }
    }    
    const result = answer % 1000000007;
    return result;
}
