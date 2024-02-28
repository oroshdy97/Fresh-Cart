import React, { createContext, useEffect, useState } from 'react'
export const authContext = createContext();

function AuthContextProvider({children}) {
    const [token, setToken] = useState(null);

    useEffect(()=>{
        const theToken = localStorage.getItem('token');
        if(theToken !== null){
            setToken(theToken)
        }
    },[])
    return <>
    <authContext.Provider value={{token, setToken}}>
        {children}
    </authContext.Provider>
    
    </>
}

export default AuthContextProvider
