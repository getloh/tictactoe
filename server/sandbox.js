function smushAndCheckMoves(arr){
    //Takes an array of numbers, and checks for winning state
    return arr.sort().join('');
}

console.log(smushAndCheckMoves([1,8,5,2]))