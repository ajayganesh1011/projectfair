import React, { useState, useEffect, useContext } from 'react'
import Header from '../components/Header'
import { Row, Col } from 'react-bootstrap'
import Add from '../components/Add'
import Edit from '../components/Edit'
import Profile from '../components/Profile'
import { getProjectApi, deleteProjectApi} from '../services/allApis'
import { responseContext } from '../contextapi/ContextProvider'
import { toast } from 'react-toastify'

function Dashboard() {

  const [uname, setUname] = useState("")
  const [projects, setProjects] = useState([])
  const { response } = useContext(responseContext)

  const getData = async () => {
    const header = {
      'Content-Type': 'application/json',
      'Authorization': `Token ${sessionStorage.getItem('token')}`
    }
    const res = await getProjectApi(header)
    console.log(res)
    if (res.status == 200) {
      setProjects(res.data)
    }
  }

  useEffect(() => {
    if (sessionStorage.getItem('user')) {
      setUname(sessionStorage.getItem('user'))
    }
    getData()
  }, [response])

  const handleDelete = async (id) => {
    const header = {
      'Content-Type': 'application/json',
      'Authorization': `Token ${sessionStorage.getItem('token')}`
    }
    const res = await deleteProjectApi(id, header)
    console.log(res)
    if (res.status == 200) {
      getData()
      toast.success("Project Deleted!!")
    }
    else {
      toast.error("Project Not Deleted!!")
    }
  }

  return (
    <>
      <Header />
      <div className="container-fluid p-3">
        <h1 className="text-center my-3">Welcome, <span className="text-info">{uname}</span></h1>
        <Row>
          <Col md={8} sm={12}>
            <h3>Projects</h3>
            <div className="border border-3 border-dark shadow p-2">
              <Add />
              <div className="my-2">
                {
                  projects.length > 0 ?
                    projects.map((item) => (
                      <div className='border p-2 border-2 border-info shadow mb-3 d-flex justify-content-between'>
                        <h5>{item.title}</h5>
                        <div>
                          <a href={item.github} className='btn me-2'><i className="fa-brands fa-github" style={{ color: "#050605", }} /></a>
                          <Edit project={item} />
                          <button className="btn" onClick={() => handleDelete(item._id)}>
                            <i className="fa-solid fa-trash" size="xl" style={{ color: "#e61919", }} />
                          </button>
                        </div>
                      </div>
                    ))
                    :
                    <h5 className='text-center text-danger'>No Projects Added Yet!!</h5>
                }
              </div>
            </div>
          </Col>
          <Col md={4} sm={12}>
            <Profile/>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default Dashboard