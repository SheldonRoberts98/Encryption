
// this computes x to the power of y modulo z - we need a special function for this for very large numbers: do NOT use (x ** y) % z
// it takes three numbers as inputs and returns a number
function modulo(x, y, z) {
	r = 1;
	while (y > 0) {
		if (y % 2 == 1) {
			r = (r * x) % z;		}
		y = Math.floor(y / 2); 
		x = (x * x) % z;
	}
	return r;
}

// this will return the totient function of inputs p and q
// it takes two numbers as inputs and returns a number
function totient(p,q) {
	if ((p <= 1) || (q <= 1)) {
		return "Inputs need to be larger!";
	}

	return ((p - 1) * (q - 1))*(1/gCD(p - 1, q -1));
}

// this will return a random exponent used for encryption from a number n
// it takes a number as input and returns a number
function genExp(n) {
	function isPrime(n) {
		if (n < 2) {
			return false;
		}
		for (var i = 2; i <= Math.round(Math.sqrt(n)); i++) {
			if (n % i == 0) {
				return false;
			}
		}
		return true;
	}
	var stop = false; 
	while (!stop) {
		var num = 2 + Math.round((n-3)*Math.random());
		if (isPrime(num) && (gCD(n,num) == 1)) {
			return num;
		}
	}
}

// this computes the modular multiplicative inverse of a mod m, used in generating the private key
// it takes two numbers as inputs and returns a number
function genInverse(a,m) {
	var b = m;
   	var x = 0;
   	var y = 1;
   	var u = 1;
   	var v = 0;

   	while (a !== 0) {
   		var q = Math.floor(m / a);
   		var r = m % a;
   		var p = x - (u * q);
   		var n = y - (v * q);
   		m = a;
   		a = r;
   		x = u;
   		y = v;
   		u = p;
   		v = n;
   	}

 	var out = [m, x, y];
 	if (out[1] < 0) {
 		out[1] = b + out[1];
 	}
	 return out[1];
	 
}




////////////////////////
////////////////////////
// The following will generate a public key and a private key from the random generation of prime numbers

// ADD ANY OTHER NECESSARY FUNCTIONS HERE

function primeCheck(n){
	//checks if the number is less than 2 as there are no prime numbers less than 2
	if (n < 2){
		return false
	}

	//checks if the other numbers from 2 upwards to the n^2 can be divided perfectly by n, if there is the number is not prime
	for (var i = 2; i <= Math.sqrt(n); i++){
		if (n % i == 0){
			return false;
		}
	}
	return true;

}
function genPrimeLen(len) {

	//used to break the loop 
	var stop = false;
	//uses a loop so that if the random number generated between 2 and the len inputted isnt prime, a new number is generated
	while(!stop){
		var randomPrime = 2 + Math.round((len-2)*Math.random());
		//calls the primeCheck function to see if the current number is prime
		if(primeCheck(randomPrime)){
			//returns the value
			return randomPrime;
		}
	}

		
	
}


function genPairPrimes(len) {
	// this should return an array of two elements, where each element is a randomly generated prime number with len digits
	twoPrimes = [genPrimeLen(len), genPrimeLen(len)];
	return twoPrimes;
	
}

function gCD(a,b) {
	// this should return a number, which is the greatest common divisor of two numbers, a and b
	var gcd;
	for (var i = 1; i <= a + b; i++ ){
		//if they are equal the for loop doesnt need to be carried out
		if (a==b){
			break;
		}
		else if (a>b){
			gcd=a-b;
		}
		else if (b>a){
			gcd=b-a;
		}
	}
	return gcd;

	
}

function genPublicKey(prime1,prime2) {
	// this should return an array of two elements, where the first element is the product of the primes (prime1 and prime2) and the second element is what's returned by genExp for particular inputs
	number1 = prime1*prime2;
	number2 = genExp(totient(prime1,prime2))
	publicArray = [number1,number2];
	return publicArray
	
}

function genPrivateKey(product,exponent,totient) {
	// this should return an array of two elements, where the first element is the product of the primes (prime1 and prime2) and the second element is what's returned by genInverse for particular inputs
}

var table = ["e", "t", "a", "i", "n", "o", "s", "h", "r", , "d", "l", "u", "c", "m", "f", "w", "y", "g", , "p", "b", "v", "k", "q", "j", "x", "z"];

function encode(string) {
	// this should return a number from a string, which will be the word we wish to encode using table
	var result = "";
	var stringLength = string.length;
	for (var i = 0; i < stringLength; i++) {
		for (var j = 0; j < table.length; j++) {
			if (string.charAt(i) == table[j]) {
				result = result + (j+1) + 0;
				
			}
		}
	}
	//converts the string to a number data type
	return parseInt(result);
	


}

function encrypt(number, publicKey) {
	// this will produce a new encrypted number using the publicKey


}

// The following will decrypt messages

function decrypt(message,privateKey) {
	// this will return a number from the input parameters message and privateKey

}
 
// this will convert numbers into words
function convertToText(number) {
	// when completed this will return a string which is the initial word encoded above
	var string;
	var n = string.length;
	var i = 0;
	var word = "";
	while (i < n) {
		var num = "";
		while (string.charAt(i) != 0) {
			num = num + string.charAt(i);
			i++;
		}
		num = parseInt(num);
		word = word + table[num - 1];
		i++;
	}
}

// var primes = genPairPrimes(3);
// var publicKey = genPublicKey(primes[0], primes[1]);
// console.log(publicKey);

var word = "hi";
var message = encode(word);
console.log(message);
console.log(typeof message);