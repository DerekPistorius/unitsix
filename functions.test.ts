const {shuffleArray} = require('./utils')

describe('shuffleArray should', () => {
    // CODE HERE
    it("verify that shuffle array returns an array", () => {
       const arr = [];
       expect(Array.isArray(shuffleArray(arr))).toBe(true); 
    });

    it("verify that calling shuffle Array will return the same length of the array passed in", () => {
        const arr = [1,2,3,4,5,6,7];
        expect(shuffleArray(arr).length).toBe(7);
    });

    it("verify that shuffleArray result contains all the elements from the original array", () => {
        const originalArr = ["apple", "banana", "orange", "grape", "watermelon"];
        const resultArr = shuffleArray(originalArr);
        const doesAllElementExist = resultArr.filter(ele => originalArr.indexOf(ele) !== -1).length === 5;

        expect(doesAllElementExist).toBeTruthy();
    });

    it("verify that shuffleArray actually shuffles the items in the array", () => {
        const originalArr = ["apple", "banana", "orange", "grape", "watermelon"];
        const resultArr = shuffleArray(originalArr);

        const isArrayShuffled = resultArr.filter((ele, idx) => {
           const originalEleIdx = originalArr.indexOf(ele);
           return idx !== originalEleIdx;
        }).length > 0;

        expect(isArrayShuffled).toBeTruthy();
    });
})