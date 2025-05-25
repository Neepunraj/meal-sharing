
console.log('Test Hello')
console.log(process.argv)
/* results [nodeExe, nodeScript and then only numbers ] in string*/


const provideArguments = process.argv.slice(2).map(Number)
console.log(provideArguments)
/* mapped to array */
function findAverage() {
    const totalSum = provideArguments.reduce((sum, item) => sum + item, 0)
    return totalSum / provideArguments.length

}
console.log(findAverage())


/* What should happen if the provided arguments are not numbers (node avg.js 1 two hello 4)? */
/* string is converted to Number using map(Number), this will give NaN and add NaN gives NaN */

/* What about if no arguments are provided (node avg.js)? there will be empty arrya [] and will give nan */