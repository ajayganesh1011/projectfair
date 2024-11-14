import React, { useEffect,useState,useContext } from 'react'
import { Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { addProjectApi } from '../services/allApis';
import { responseContext } from '../contextapi/ContextProvider';

function Add() {

    const [show, setShow] = useState(false);
    const [project, setProject] = useState({
        title: "", description: "", languages: "", github: "", demo: "", image: ""
    })
    const [preview, setPreview] = useState("")
    const{setResponse}=useContext(responseContext)

    const handleProjectAdd = async () => {
        console.log(project)
        const { title, description, languages, github, demo, image } = project
        if (!title || !description || !languages || !github || !demo || !image) {
            toast.warning("Enter Valid Inputs!!")
        }
        else {
            const fd = new FormData()
            fd.append("title", title)
            fd.append("description", description)
            fd.append("languages", languages)
            fd.append("github", github)
            fd.append("demo", demo)
            fd.append("image", image)

            const header = {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Token ${sessionStorage.getItem('token')}`
            }

            const res = await addProjectApi(fd, header)
            console.log(res)
            if (res.status == 200) {
                toast.success("Project Added!!")
                handleClose()
                setResponse(res)
            }
        }
    }

    useEffect(() => {

        if (project.image) {
            setPreview(URL.createObjectURL(project.image))
        }
        else {
            setPreview("")
        }

    }, [project.image])

    const handleClose = () => {
        setShow(false);
        setProject({
            title: "", description: "", languages: "", github: "", demo: "", image: ""
        })
    }
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Add Project
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add Project</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <label>
                                <input type="file" onChange={(e) => setProject({ ...project, image: e.target.files[0] })} className="form-control" style={{ display: 'none' }} />
                                <img src={preview ? preview : "https://cdn.dribbble.com/users/419257/screenshots/1724076/scanningwoohoo.gif"}
                                    className='img-fluid' alt="" />
                            </label>
                        </Col>
                        <Col>
                            <input type="text" onChange={(e) => setProject({ ...project, title: e.target.value })} placeholder='Title' className="form-control mb-3" />
                            <input type="text" onChange={(e) => setProject({ ...project, description: e.target.value })} placeholder='Description' className="form-control mb-3" />
                            <input type="text" onChange={(e) => setProject({ ...project, languages: e.target.value })} placeholder='Languages Used' className="form-control mb-3" />
                            <input type="text" onChange={(e) => setProject({ ...project, github: e.target.value })} placeholder='Git Repository Link' className="form-control mb-3" />
                            <input type="text" onChange={(e) => setProject({ ...project, demo: e.target.value })} placeholder='Demo Link' className="form-control mb-3" />
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="success" onClick={handleProjectAdd}>Save</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Add