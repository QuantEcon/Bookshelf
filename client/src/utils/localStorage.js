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

export const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('token', serializedState);
    } catch(err){
        
    }
}