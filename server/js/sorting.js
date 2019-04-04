/**
 *  Function to change the order of notebook randomly with a given probability
 * 
 * @param {probability with which you want to swap a notebook} prob 
 * @param {the present index to operate on} currentIndex
 * @param {total number of notebooks} totalNo 
 * @param {which indexes have been visited and operated upon} visitedArray 
 * @param {the notebook data} data 
 */
function changeOrderRandomly(prob, currentIndex, totalNo, visitedArray, data) {
    let randomNumber = Math.round(Math.random()*(totalNo - 1))
    if (visitedArray.length < totalNo) {
        while (visitedArray.includes(randomNumber)) {
            randomNumber = Math.round(Math.random()*(totalNo - 1))
        }
    } else {
        return;
    }
    let changeIndex = (Math.random() <= prob)
    if (changeIndex) {
        let temp = data[randomNumber]
        data[randomNumber] = data[currentIndex]
        data[currentIndex] = temp;
        visitedArray.push(randomNumber);
        visitedArray.push(currentIndex);
    } else {
        if (!visitedArray.includes(currentIndex)) {
            visitedArray.push(currentIndex)
        }
    }
}

module.exports = {
    changeOrderRandomly,
};