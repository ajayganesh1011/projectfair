import React, { useState, useEffect} from 'react'
import Header from '../components/Header'
import ProjectCard from '../components/ProjectCard'
import { searchProjectApi } from '../services/allApis'

function AllProjects() {

    const [data, setdata] = useState([])
    const [key,setKey] = useState("")

    useEffect(() => {
        getData()
    }, [key])

    const getData = async () => {
        const res = await searchProjectApi(key)
        if (res.status == 200) {
            setdata(res.data)
        }
    }

    console.log(data)

return (
    <>
        <Header />
        <div className="container-fluid p-3">
            <div className='d-flex justify-content-between'>
                <h3>All Projects</h3> 
                <input type="text" onChange={(e) => setKey(e.target.value)} placeholder="Search With Languages" className='form-control w-25' />
            </div>
            <div className="d-flex flex-wrap gap-3">
                {data.length > 0 ? (
                    data.map((item) => (
                        <ProjectCard project={item} />
                    ))
                ) : (
                    <h4 className="text-center text-danger">No Projects Available</h4>
                )}
            </div>
        </div>
    </>
)
}

export default AllProjects