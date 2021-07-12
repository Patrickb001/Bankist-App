'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type} </div>
      <div class="movements__value">${mov}€</div>
    </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// displayMovements(account1.movements); // Only want to display this information once we actually get the login data

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance} €`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const outgoing = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(outgoing)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr, int);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}`;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc.movements);

  // Display Balance
  calcDisplayBalance(acc);

  // Display Summary
  calcDisplaySummary(acc);
};

// Event Handlers
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();
  // console.log('LOGIN')

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and welcome message
    labelWelcome.textContent = `Welcome Back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receieveAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receieveAcc &&
    currentAccount.balance >= amount &&
    receieveAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receieveAcc.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movmement
    currentAccount.movements.push(amount);

    //Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  //Clear field

  // Mini-challenge: write the IF statement for matching user/pin with input values
  if (
    currentAccount.username === inputCloseUsername.value &&
    currentAccount.pin === Number(inputClosePin.value)
  ) {
    // console.log('Valid entry')
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    //Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  console.log(sorted);
  sorted = !sorted;
  console.log(sorted);
});

// console.log(accounts);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

/*

// Simple Array Methods

let arr = ['a', 'b', 'c', 'd', 'e'];

// SLICE
console.log(arr.slice(2)); // returns ['c'...] all the way to the end
console.log(arr.slice(2, 4)); // length =end parameter minus the beginning, returns ['c', 'd']
console.log(arr.slice(-2)); // copies from the end of the array
console.log(arr.slice(-1));
console.log(arr.slice(1, -2))
console.log(arr.slice()); // can be used to create a shallow copy, returns the entire array
console.log([...arr]); // similar to the slice method above

// SPLICE
// console.log(arr.splice(2)) // extracted elements are gone from the original array
arr.splice(-1) // removes the last element
console.log(arr);
arr.splice(1, 2) // second parameter is the deleteCount... starts at position 1 and removes 2 elements i.e. 'b' and 'c'
console.log(arr);

// Reverse
// mutates the original array
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i','h','g','f']
console.log(arr2.reverse());
console.log(arr2);

// CONCAT
// Does not mutate original array
const letters = arr.concat(arr2);
console.log([...arr,...arr2]); // 2 ways to do the same thing ... matter of personal preference
console.log(letters);

// JOIN
console.log(letters.join('-'));

*/

/*

// Looping Arrays: forEach

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for (const movement of movements) {
for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i + 1} You deposited ${movement}`);
  } else {
    console.log(`Movement ${i + 1} You withdrew ${Math.abs(movement)}`);
  }
}
console.log('------ FOR EACH ------');
movements.forEach(function(mov, i, arr){
  if (mov > 0) {
    console.log(`Movement ${i + 1} You deposited ${mov}`);
  } else {
    console.log(`Movement ${i + 1} You withdrew ${Math.abs(mov)}`);
  }
})


// console.log('------ MY OWN FOR EACH ------');
// movements.forEach(movement => movement > 0 ? console.log(`You deposited ${movement}`) : console.log(`You withdrew ${Math.abs(movement)}`));
// 0: function(200)
// 1: function(450)
// 2: function(400)
// ...

*/

/*

// forEach with Maps and Sets

//Map
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function(value,key,map){
  console.log(`${key}: ${value}`);
})

// Set
const currienciesUnique = new Set (['USD', 'GBP', 'USD', 'EUR', 'EUR'])
console.log(currienciesUnique);
currienciesUnique.forEach(function(value, _,set){
  console.log(`${value}: ${value}`); // key and value are the same
})

*/

/*
Data Transformations: map, filter, and reduce

Map: Method that allows us to loop over arrays. Similar to forEach except it creates a brand new array based on the original.
- Loops through array, applies the function based on our code to the current array element and puts it into a new array
- We say that it maps the values of the original array to a new one
- Map returns a new array containing the results of applying an operation on all original array elements

Filter: Used to filter for elements in the original array which satisfy a certain condition.
- Only elements that meet the conditions specified by the filter method are put into the new array
- Filter returns a new array containing the array elements that passed a specified test condition

Reduce: used to boil down all of the elements of the original array into one single value i.e. adding them together
- In this case we would need to add current element to an accumulator variable as the array is looped over
- We say this process has reduced the original array into a single value
- The total is what is returned from the reduce method
- No new array is made in this case, just the reduced value


*/

/*

// The Map Method

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const euroToUsd= 1.1

// const movementsUSD= movements.map(function(mov){
//   return mov * euroToUsd;
// })
// Mini-Challenge: Arrow Functions
const movementsUSD = movements.map(mov => mov * euroToUsd)

console.log(movements, movementsUSD)

const movementsUSDfor = []
for (const mov of movements) movementsUSDfor.push(mov * euroToUsd)

// console.log(movementsUSDfor)

const movementsDescriptions = movements.map((mov, i) =>
  `Movement ${i + 1} You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(mov)}`
)

console.log(movementsDescriptions);

*/

/*

// Filter Method
// Usually all we need to worry about is the current element
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const deposits = movements.filter(function(mov){
  return mov > 0;
})
console.log(movements);
console.log(deposits);

const depositsFor = [];
// const withdrawalsFor = [];
// for (const mov of movements) mov > 0 ? depositsFor.push(mov) : withdrawalsFor.push(mov); // Own method to fit both into one loop
for (const mov of movements) if (mov > 0) depositsFor.push(mov)
console.log(depositsFor);
// console.log(withdrawalsFor);

// Mini-Challenge: Create withdrawals array
const withdrawals = movements.filter(mov => mov < 0)
console.log(withdrawals)

// Benefit of using the map and filter method etc is that we can chain these methods together. that would be impossible using the for loop

*/

/*

// Reduce Method
// Used to boil down all elements in an array to one single value
// Also gets a call back function, first parameter is the accumulator, continues to accumulate the value we want to return
// Reduce method has a second parameter which is the initial value of the accumulator

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

console.log(movements)

// Accumulator is like a snowball
// const balance = movements.reduce(function (acc, cur,i , arr){
//   console.log(`Iteration #${i}: ${acc}`)
//   return acc + cur
// }, 0)
const balance = movements.reduce((acc, cur) => acc + cur, 0)

console.log(balance);

let balance2 = 0
for (const mov of movements) {
  balance2 += mov
}
console.log(balance2);

// Maximum value
const max = movements.reduce((acc, mov) => {
  if (acc > mov) return acc;
  else return mov
}, movements[0])
console.log(max);

*/

/*

// The Magic of Chaining Methods
// We can only chain a method after another if the first returns an array

// Like a pipeline for our data
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const euroToUsd = 1.1;
const totalDepositsUSD = movements
  .filter(mov => mov > 0)
  .map((mov, i, arr) => {
    // logging arr gives us the result of the previous opeaation
    // console.log(arr);
    return mov * euroToUsd;
  })
  // .map(mov => mov * euroToUsd)
  .reduce((acc, mov) => acc + mov, 0);
console.log(totalDepositsUSD);

*/

/*

// Find method
// lOOPS over an array and retrieves an element based on the condition
// RETURNS the first element in the array that satisfies the condition
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];


// const firstWithdrawal = movements.find(mov => mov < 0)
// console.log(movements);
// console.log(firstWithdrawal);

// console.log(accounts);
// const account = accounts.find(acc => acc.owner === 'Jessica Davis');
// console.log(account);

for (const [i, account] of accounts.entries()) {
  account.owner === 'Jessica Davis' && console.log(account)
}

*/

/*

// SOME and EVERY Method

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// Some:
// testing for a condition, returns boolean value
const anyDeposits = movements.some(mov => mov > 0);
console.log(anyDeposits);

console.log(movements.some(mov => mov === -130)); // similar to includes, in the case like this we would just use includes

console.log(movements.includes(-130)); // testing for equality

// Every: returns true if all elements in the array satisfy the condition (returns boolean value)
console.log(movements.every(mov => mov > 0));
console.log(account4.movements.every(mov => mov > 0));

// Seperate callback
const deposit = mov => mov < 0;
console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit));

*/

/*

// flat and flatMap

//Flat: remove nested arrays and flalttened the array, only goes 1 level deep. Can pass in an parameter to say how many levels deep we would like to go.
const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat());

const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arrDeep.flat(2));

// const accountMovements = accounts.map(acc => acc.movements);
// console.log(accountMovements);
// const allMovements = accountMovements.flat();
// console.log(allMovements);
// const overallBalance = allMovements.reduce((acc, mov) => acc + mov, 0);

const overallBalance = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
// using map/ flattening result is a pretty common operation
console.log(overallBalance);

// flatMap: combines map && flat method, only goes 1 level deep and we cannot change it, we would need the flat method
// because flatMap also does mapping it needs to receive the exact same callback as if it were a map method
const overallBalance2 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);
console.log(overallBalance2);

*/

/*

// Sorting arrays
// Mutates the original array
// takes two values in the parameter 'a'(current value), and 'b'(next value)
// Avoid using sort method when we are working with an array that contains strings and numbers

// STRINGS
const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
console.log(owners.sort());

//NUMBERS
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// console.log(movements.sort()); // Not sorted in the way we would expect returns: [-130, -400, -650, 1300, 200, 3000, 450, 70]
// Default does the sorting based on strings, converts everything to strings then proceeds to do the sorting

// return > 0, B, A (switch order)
// return < 0, A, B (keep order)

// Ascending order
// movements.sort((a, b) => {
//   if (a > b) return 1;
//   if (b > a) return -1;
// });

movements.sort((a, b) => a - b); // Works the same as the function above. If A is greater than B we will return a positive number, if B is greater than A it will return a negative number. if A and B equal each other their position remains unchanged.
console.log(movements);

// Descending order
// movements.sort((a, b) => {
//   if (a > b) return -1;
//   if (b > a) return 1;
// });

movements.sort((a, b) => b - a);
console.log(movements);

*/

/*

// More ways of creating and filling arrays

const arr = [1, 2, 3, 4, 5, 6, 7];
console.log(new Array(1, 2, 3, 4, 5, 6, 7));

// Empty Arrays + Fill method
// Defining Arrays Programmatically
const x = new Array(7); // returns an array w/ 7 empty elements, we cannot use this array for anything i.e. calling methods
// We are able to call the fill method on this array, this mutates the array
console.log(x);
// console.log(x.map(() => 5));

x.fill(1, 3, 5); // Second/Third argument specifies where we want this fill to start and end
x.fill(1);
console.log(x);

// Filling non-empty arrays
arr.fill(23, 2, 6);
console.log(arr);

// Array.from method
// first argument is the length, and the second argument is a mapping function
// This was introduced to create arrays from array-like structures, i.e.: strings, maps or sets. They can be converted to real arrays using Array.from
const y = Array.from({ length: 7 }, () => 1);
console.log(y);

// The call back function is exactly the same as the one in a map method. We can think of it as using mapping an empty array.
// We can place an underscore where the current element parameter would go because we do not need it at all

const z = Array.from({ length: 7 }, (_, i) => i + 1);
console.log(z);

// const diceRoll = Array.from({ length: 100 }, (_, i) =>
//   // console.log(Math.random());
//   Math.trunc(Math.random() * 100 + 1)
// );

// console.log(diceRoll);

labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => Number(el.textContent.replace('€', ''))
  );

  console.log(movementsUI);

  movementsUI2 = [...document.querySelectorAll('.movements__value')]; // Spreading the results into an array, but we would have to do the mapping process seperately
});

*/

/*

// Which array method to use?
We should start by asking, What is it I actually want from this method?
  -Mutate the original array
      -Methods: Add: .push, .unshift, Remove: .pop, .shift, .splice, Others: .reverse, .sort, .fill
  -A new array
      -Methods: Computed from original: .map, 
      Filtered using condition: .filter, 
      Portion of the original: .slice,
      Adding original to other: .concat,
      Flattening the original: .flat, .flatMap
  -Retrieve An array index: Methods: Based on value: .indexOf,
      Based on test condition: .findIndex  
  -An array element: Methods: Based on test condition: .find
  -Know if an array includes somethings, Method: // Used in something like a if/else statement
      Based on Value: .includes
      Based on test condition: .some, .every
  -Obtain a new string: Method: Based on seperator string: .join
  -Transform the array into a new value Method:
      Based on accumulator: .reduce
      //Boil down array to single value of any type ... number, string, boolean, even a new object or array
  -Loop over the array: Methods
      Based on callback: .forEach // does not create a new array     

*/

/*

// Array Methods Practice

// 1.
const bankDepsoitSum = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((sum, cur) => sum + cur, 0);
// console.log(accounts);
console.log(bankDepsoitSum);

// 2.
const numDeposits1000 = accounts
  .flatMap(acc => acc.movements)
  // .filter(mov => mov >= 1000).length;
  // .reduce((count, cur) => (cur >= 1000 ? count + 1 : count), 0);
  .reduce((count, cur) => (cur >= 1000 ? ++count : count), 0);
// plus plus increments the value but it still returns the previous value
// To solve this we can use the plus plus prefix operator

console.log(numDeposits1000);

// Prefixed ++
let a = 10;
console.log(a++); // returns 10
console.log(a); // returns 11
console.log(++a); // prefix plus plus, returns 12, on time

// 3.
const { deposits, withdrawals } = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sums, cur) => {
      // cur > 0 ? (sums.deposits += cur) : (sums.withdrawals += cur);
      sums[cur > 0 ? 'deposits' : 'withdrawals'] += cur;
      return sums;
    },
    { deposits: 0, withdrawals: 0 }
  ); // starting point will be an object, because our goal is to create a new object

console.log(deposits, withdrawals);

// 4.
// this is a nice title -> This Is a Nice Title
const convertTitleCase = function (title) {
  const capitalize = str => str[0].toUpperCase() + str.slice(1);

  const exceptions = ['a', 'an', 'and', 'the', 'but', 'or', 'on', 'in', 'with'];

  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word => (exceptions.includes(word) ? word : capitalize(word)))
    .join(' ');
  return capitalize(titleCase);
};

console.log(convertTitleCase('this is a nice title'));
console.log(convertTitleCase('this is a LONG title but not too long'));
console.log(convertTitleCase('and here is another title with an EXAMPLE'));

*/
