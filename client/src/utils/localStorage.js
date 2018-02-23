/**
 * @file Local storage utilities
 * @author Trevor Lyon
 * 
 * @module localStorage
 */

/**
 * @function loadState
 * @description Loads the JWT from the local storage
 */
export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('token');
        if(serializedState === null){
            return undefined
        }
        return JSON.parse(serializedState);
    } catch(err){
        console.log('[LocalStorage] - error loading state: ', err);
        return undefined;
    }
}

/**
 * @function saveState
 * @description Saves the state to local storage. State should just contain a JWT
 * @param {Object} state State to save in local storage
 */
export const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('token', serializedState);
    } catch(err){
        
    }
}