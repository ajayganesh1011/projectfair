import React,{useState,useEffect} from 'react'
import { createContext } from 'react'

export const logContext = createContext()

function AuthContext({children}) {

    useEffect(() => {
        checkLogStatus()
    },[])

    const checkLogStatus = () => {
        if(sessionStorage.getItem("token")){
            setLogStatus(true)
        }
        else{
            setLogStatus(false)
        }
    }

    const [logStatus, setLogStatus] = useState(false)

  return (
    <>
    <logContext.Provider value={{logStatus, setLogStatus}}>
        {children}
    </logContext.Provider>
    </>
  )
}

export default AuthContext