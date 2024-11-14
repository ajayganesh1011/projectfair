import React,{useState,useEffect} from 'react'
import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ProjectCard from '../components/ProjectCard'
import { getAllProjectsApi } from '../services/allApis'

function Landing() {

    const [logStatus, setlogStatus] = useState(false)
    const[data,setData] = useState([])

    useEffect(() => {
        if (sessionStorage.getItem('token')) {
            setlogStatus(true)
        }
        else {
            setlogStatus(false)
        }
        getData()
    }, [])

    const getData = async () => {
        const res = await getAllProjectsApi()
        if(res.status==200){
            setData(res.data)
        }
    }
    console.log(data)

    return (
        <>
            <div className="container-fluid d-flex justify-content-center align-items-center" style={{ height: '90vh', backgroundColor: 'black' }}>
                <Row>
                    <Col className='d-flex flex-column justify-content-center'>
                        <h2 className="text-warning">Project Fair</h2>
                        <p style={{ textAlign: 'justify' }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, enim laborum repudiandae laboriosam hic ut non. Enim animi rerum debitis, quae, neque obcaecati accusantium, inventore sed expedita quasi doloremque dolor.</p>
                        <div className="d-grid">
                            {
                                logStatus ?
                                    <Link to={'/dash'} className="btn btn-warning mt-3" >Go to Dashboard</Link>
                                    :
                                    <Link to={'/auth'} className='btn btn-primary mt-3'>Start to Explore</Link>
                            }
                        </div>
                    </Col>
                    <Col>
                        <img src="https://camo.githubusercontent.com/2366b34bb903c09617990fb5fff4622f3e941349e846ddb7e73df872a9d21233/68747470733a2f2f63646e2e6472696262626c652e636f6d2f75736572732f3733303730332f73637265656e73686f74732f363538313234332f6176656e746f2e676966"
                            alt="" className='img-fluid' />
                    </Col>
                </Row>
            </div>
            <h2 className='text-center'>Sample Projects</h2>
            {
                data.length > 0 ?
                <div className='justify-content-around my-5 d-flex'>
                    {
                        data.slice(0, 3).map((item) => (
                            <ProjectCard project={item} />
                        ))
                    }
            </div>
            :
            <h3 className="my-3 text-center text-info">No Projects Available</h3>
                }
           
            <div className='text-center text-info my-3'>
                <Link to={'/projects'}>
                    View More
                    {'   '}
                    <i className="fa-solid fa-angles-down" />
                </Link>
            </div>
        </>
    )
}

export default Landing