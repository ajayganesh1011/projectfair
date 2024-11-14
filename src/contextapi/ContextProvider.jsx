import React from 'react'
import { createContext, useState } from 'react'

export const responseContext = createContext()

function ContextProvider({children}) {

    const [response, setResponse] = useState("")

    return (
        <>
            <responseContext.Provider value={{ response, setResponse }}>
                {children}
            </responseContext.Provider>
        </>
    )
}

export default ContextProvider