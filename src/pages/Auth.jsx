import React, { useState ,useContext} from 'react'
import { Row, Col } from 'react-bootstrap'
import { loginApi, registerApi } from '../services/allApis'
import { toast } from 'react-toastify'
import {useNavigate } from 'react-router-dom'
import { logContext } from '../contextapi/AuthContext'

function Auth() {

  const [authStatus, setAuthStatus] = useState(false)
  const [user, setUser] = useState({
    email:"",username:"",password:""
  })

  const {setLogStatus}=useContext(logContext)

  const changeStatus = () => {
    setAuthStatus(!authStatus)
  }

  const nav = useNavigate()

  const handleRegister=async() => {
    console.log(user)
    const {email,username,password}=user
    if(!email || !username || !password) {
      toast.warning("Enter Valid Deta!!")
    }
    else{
      const res=await registerApi(user)
      console.log(res)
      if (res.status==200){
        toast.success("Registration Successfull!!")
        changeStatus()
        setUser({
          email:"",username:"",password:""
        })
        sessionStorage.setItem('token',res.data.token)
        sessionStorage.setItem('user',res.data.username)
      }
      else{
        toast.error("Registration Failed!!")
      }
    }
  }

  const handleLogin=async()=>{
    const {email,password}=user
    if(!email || !password){
      toast.warning("Enter Valid Data!!")
    }
    else{
      const res=await loginApi(user)
      if(res.status==200){
        toast.success("Login Successfull!!")
        setUser({
          email:"",password:""
        })
        sessionStorage.setItem('token',res.data.token)
        sessionStorage.setItem('user',res.data.username)
        sessionStorage.setItem('profile',res.data.profile)
        sessionStorage.setItem('github',res.data.github)
        sessionStorage.setItem('linkedin',res.data.linkedin)
        setAuthStatus(true)
        setLogStatus(true)
        nav('/')
      }
      else{
        toast.error("Login Failed")
      }
    }

}
  return (
    <>
      <div className="container-fluid w-100 d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className='w-75 border border-2 p-3 shadow'>
          <Row>
            <Col>
              <img src="https://krishnecs.in/wp-content/uploads/2023/09/login-animate-2.gif"
                className="img-fluid" alt="" />
            </Col>
            <Col className="d-flex flex-column justify-content-center">
              <h4>
                {
                  authStatus ?
                    <>Registration</> :
                    <>Login</>
                }
              </h4>
              <div>
                <input type="email" placeholder='Enter Email ID' className="form-control my-3" value={user.email} onChange={(e) => {setUser({...user,email:e.target.value})}} />
                {
                  authStatus &&
                  <input type="text" placeholder='Enter Username' className="form-control mb-3" value={user.username} onChange={(e) => {setUser({...user,username:e.target.value})}} />
                }
                <input type="password" placeholder='Enter Password' className="form-control mb-3" value={user.password} onChange={(e) => {setUser({...user,password:e.target.value})}} />
              </div>
              <div className="d-flex justify-content-between">
                {
                  authStatus ?
                    <button className="btn btn-info" onClick={handleRegister}>Registration</button>
                    :
                    <button className="btn btn-success" onClick={handleLogin}>Login</button>
                }
                <button className="btn btn-link text-info" onClick={changeStatus}>
                  {
                    authStatus ?
                      <>Already A User?</>
                      :
                      <>New User?</>
                  }
                </button>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  )
}

export default Auth