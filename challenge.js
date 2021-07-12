'use strict';

/*

// Challenge #1
// Data 1: Julia's data [3, 5, 2, 12, 7], 
// Kate's data [4, 1, 15, 8, 3]
// § Data 2: Julia's data [9, 16, 6, 8, 3], 
// Kate's data [10, 5, 6, 1, 4]
// Add 5 minutes to end timer. 18min total to complete

let dataJulia = [3, 5, 2, 12, 7];
let dataKate = [4, 1, 15, 8, 3]

dataJulia = [9, 16, 6, 8, 3]
dataKate = [10, 5, 6, 1, 4]

// const dataJuliaCorrected = dataJulia.slice(1, -2)
// console.log(...dataJuliaCorrected);



const checkDogs = function (dogsJulia, dogsKate) {  
  // const dataJuliaCorrected = dogsJulia.slice(1, -2)
  // console.log(dogsJulia);
  const dataJuliaCorrected = dogsJulia.slice();
  dataJuliaCorrected.splice(0, 1);
  dataJuliaCorrected.splice(-2);
  console.log(...dataJuliaCorrected);

  // My version was too long
  // dataJuliaCorrected.forEach((dogAge, i) => dogAge >= 3 ? console.log(`Dog number ${i + 1} is an adult and is ${dogAge} years old`): console.log(`Dog number ${i + 1} is a puppy`))

  // console.log(`--- Kate's Dogs---`)

  // dogsKate.forEach((dogAge, i) => dogAge >= 3 ? console.log(`Dog number ${i + 1} is an adult and is ${dogAge} years old`): console.log(`Dog number ${i + 1} is a puppy`))

  //Jonas' version
  const dogs = dataJuliaCorrected.concat(dogsKate);
  console.log(dogs)

  dogs.forEach((dogAge, i) => dogAge >= 3 ? console.log(`Dog number ${i + 1} is an adult and is ${dogAge} years old`) : console.log(`Dog number ${i + 1} is a puppy`))
  // Forgot to use the concate method to merge the array and the amount I would have to code

};

checkDogs(dataJulia, dataKate)

*/

/*

// Finished in 23 mins
// Challenge 2

const data1 = [5, 2, 4, 1, 15, 8, 3]
const data2 = [16, 6, 10, 5, 6, 1, 4]

const calcAverageHumanAge = function (ages) {
  let totalLength = 0
  const humanAge= ages
  .map(age => age <= 2 ? 2 * age : 16 + age * 4)
  .filter(age => age >= 18) 
  .reduce((acc, curr, i, arr) => {
    // totalLength = arr.length
    // return acc + curr
    return acc + curr / arr.length // implemented the new way of finding averages
  } ,0)
  return humanAge 
  // return humanAge/ totalLength // MY original way of finding the average
  // console.log(humanAge)
}

console.log(calcAverageHumanAge(data1));
console.log(calcAverageHumanAge(data2))

// Jonas and I started our code off pretty much the same, the one thing that I saw him do was pause at each step inside of his function and turn them into variables. I think that was something to consider, and something I would like to do in the future, because I feel like it would make the code a bit easier to read and make it easier on myself, because I had to find a way around not being able to return the average within my reduce method, so I had to create another variable to capture it. Just some important things to note is making each step a variable so it is not only easier for myself to read in the future but easier for others who would read my code. I think another reason why it would improve my code to make each section into a variable is because it would correspond with the instructions of the challenege making it easier to comprehend 
// Jonas Answer

// const calcAverageHumanAge = function (ages) {
//   const humanAges = ages.map(age => (age <= 2 ? 2* age : 16 + age * 4));
//   const adults = humanAges.filter(age => age >= 18);
//   console.log(humanAges);
//   console.log(adults);

//   // const average = adults.reduce((acc, age) => acc + age, 0) / adults.length;
  
//   const average = adults.reduce((acc, age, i , arr) => acc + age / arr.length , 0) ; // Good to use when chaining methods
  
//   // Calculating Average in a different way:
//     // (2+3) / 2 = 2.5 ===
//     // 2/2 + 3/2 = 2.5
  
//   return average
// };

// const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
// const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
// console.log(avg1, avg2);

*/

/*

// Challenge # 3
// Completed in 9 mins
const calcAverageHumanAge = function (ages) {
  const humanAge = ages
    .map(age => (age <= 2 ? age * 2 : 16 + age * 4))
    .filter(age => age > 18)
    .reduce((acc, age, i, arr) => {
      // console.log(arr);
      return acc + age / arr.length;
    }, 0);
  // console.log(humanAge);
  return humanAge;
};

const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);

console.log(avg1, avg2);

// Jonas' Answer
// const calcAverageHumanAge = ages => ages.map(age => (age <=2 ? 2* age : 16 + age * 4).filter(age => age >= 18).reduce((acc, age, i, arr) => acc + age / arr.length, 0);

*/

/*

// Challenge 4
// Took a break at 35:40 for date, 1h22 total
// Task 1
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

dogs.forEach(
  cur => (cur.recommendedFood = Math.trunc(cur.weight ** 0.75 * 28))
);

// console.log(dogs);
// Task 2.

// const sarahsDog = dogs.find(cur => {
//   const dogS = cur.owners.includes('Sarah');
//   return dogS;
// });

// console.log(dogs[2].recommendedFood);

// const diet = function (owner) {
//   return (
//     owner.curFood > owner.recommendedFood * 0.9 &&
//     owner.curFood < owner.recommendedFood * 1.1
//   );
// };

// console.log(diet(sarahsDog));

// Task 3.
// I completed this task, but initially I only completed a portion of it, going back and wathcing Jonas' video I realized I wanted to add the .map function after the filter function to retrieve all the owners who fit the criteria and then flatten the array, so i added it
// const ownersEatTooMuch = dogs // Old answer
//   // .map(dog => dog)
//   .filter(dog => dog.curFood >= dog.recommendedFood);

const ownersEatTooMuch = dogs
  .filter(dog => dog.curFood >= dog.recommendedFood)
  .flatMap(dog => dog.owners);

const ownersEatTooLittle = dogs
  .filter(dog => dog.curFood < dog.recommendedFood)
  .flatMap(dog => dog.owners);
console.log(ownersEatTooMuch);
console.log(ownersEatTooLittle);

// Task 4.
// My goal in this was to dynamically code this information in, but for the purpose of the task that was being asked I may have typed more than that was needed for the task and the answer Jonas came up with was a lot more simple and got the job done, but I think it is okay that we did not get the same answer this is all for me to learn.
const str = function (arr) {
  const owners = arr.join(' and ');

  const eatHowMuch =
    arr === ownersEatTooMuch
      ? ` dog's eat too much!`
      : ` dog's eat too little!`;

  const output = owners.concat(eatHowMuch);

  console.log(output);
};

str(ownersEatTooLittle);
str(ownersEatTooMuch);

// Task 5.

// const dietExact = function (owner) {
//   return owner.curFood === owner.recommendedFood;
// };

// console.log(dietExact(dogs[3]));
// console.log(dogs[3]);

// Can also do it this way:
console.log(dogs.some(dog => dog.curFood === dog.recommendedFood));

// Task 6

const dietOf = function (owner) {
  return (
    owner.curFood > owner.recommendedFood * 0.9 &&
    owner.curFood < owner.recommendedFood * 1.1
  );
};

// Can also do it this way
// console.log(
//   dogs.some(
//     dog =>
//       dog.curFood > dog.recommendedFood * 0.9 &&
//       dog.curFood < dog.recommendedFood * 1.1
//   )
// );

// Task 7
// const dogsOkay = dogs.map(dog => dog).filter(dog => dietOf(dog)); Old answer

const dogsOkay = dogs.filter(dog => dietOf(dog));

console.log(dogsOkay);

// Task 8
// I answered this problem, but I was not able to answer it in the correct way and probably by return all of the information I was supposed to return, i.e. the Entire object but having them sorted on in the order of the recFood
// const dogsSort = dogs
//   .map(dog => {
//     return dog.recommendedFood;
//   })
//   .sort((a, b) => a - b);

// console.log(dogsSort);

// Jonas' Answer
const dogsSorted = dogs
  .slice()
  .sort((a, b) => a.recommendedFood - b.recommendedFood);

console.log(dogsSorted);

*/
