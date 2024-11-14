import React, { useState, useEffect, useContext } from 'react'
import { Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import base_url from '../services/base_url';
import { updateProjectApi } from '../services/allApis';
import { toast } from 'react-toastify';
import { responseContext } from '../contextapi/ContextProvider';

function Edit({ project }) {

    const [show, setShow] = useState(false);

    const [data, setData] = useState({
        title: "", description: "", languages: "", github: "", demo: "", image: ""
    })
    const [preview, setPreview] = useState("")
    const { setResponse } = useContext(responseContext)

    useEffect(() => {
        setData({ ...project })
    }, [])

    useEffect(() => {
        if (data.image.type) {
            setPreview(URL.createObjectURL(data.image))
        }
        else {
            setPreview("")
        }
    }, [data.image])

    const handleProjectEdit = async () => {
        const { title, description, languages, github, demo, image } = data
        if (!title || !description || !languages || !github || !demo || !image) {
            toast.warning("Enter Valid Inputs!!")
        }
        else {
            if (data.image.type) {
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

                const res = await updateProjectApi(project._id, header, fd)
                console.log(res)
                if (res.status == 200) {
                    toast.success("Project Updated!!")
                    handleClose()
                    setResponse(res)
                }
                else {
                    toast.error("Something Went Wrong... Updation Failed!!")
                }
            }
            else {
                const header = {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${sessionStorage.getItem('token')}`
                }
                const res = await updateProjectApi(project._id, header, data)
                console.log(res)
                if (res.status == 200) {
                    toast.success("Project Updated!!")
                    handleClose()
                    setResponse(res)
                }
                else {
                    toast.error("Something Went Wrong... Updation Failed!!")
                }
            }
        }
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <button className="btn me-2" onClick={handleShow}>
                <i className="fa-solid fa-pen-to-square" size="xl" style={{ color: "#2497f0", }} />
            </button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit Project</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <label>
                                <input type="file" className="form-control" style={{ display: 'none' }} onChange={(e) => { setData({ ...data, image: e.target.files[0] }) }} />
                                <img src={preview ? preview : `${base_url}/uploads/${data.image}`}
                                    className='img-fluid' alt="" />
                            </label>
                        </Col>
                        <Col>
                            <input type="text" onChange={(e) => { setData({ ...data, title: e.target.value }) }} defaultValue={data.title} placeholder='Title' className="form-control mb-3" />
                            <input type="text" onChange={(e) => { setData({ ...data, description: e.target.value }) }} defaultValue={data.description} placeholder='Description' className="form-control mb-3" />
                            <input type="text" onChange={(e) => { setData({ ...data, languages: e.target.value }) }} defaultValue={data.languages} placeholder='Languages Used' className="form-control mb-3" />
                            <input type="text" onChange={(e) => { setData({ ...data, github: e.target.value }) }} defaultValue={data.github} placeholder='Git Repository Link' className="form-control mb-3" />
                            <input type="text" onChange={(e) => { setData({ ...data, demo: e.target.value }) }} defaultValue={data.demo} placeholder='Demo Link' className="form-control mb-3" />
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="success" onClick={handleProjectEdit}>Update</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Edit