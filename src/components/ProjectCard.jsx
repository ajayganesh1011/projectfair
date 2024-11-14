import React from 'react'
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Row, Col } from 'react-bootstrap';
import base_url from '../services/base_url';

function ProjectCard({ project }) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" style={{ cursor: 'pointer' }} height={'200px'} onClick={handleShow} 
                src={`${base_url}/uploads/${project.image}`} />
                <Card.Body>
                    <Card.Title>Project Title</Card.Title>
                </Card.Body>
            </Card>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Project</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <img src={`${base_url}/uploads/${project.image}`} 
                            className='img-fluid' alt="" />
                        </Col>
                        <Col>
                            <h4>{project.title}</h4>
                            <h6><span className='text-info'>Description:</span>
                                {project.description}
                            </h6>
                            <h6><span className='text-info'>Languages:</span>
                                {project.languages}
                            </h6>
                            <div className="mt-3 d-flex justify-content-between">
                                <a href={project.github}>
                                    <i className="fa-brands fa-github" />
                                </a>
                                <a href={project.demo}>
                                    <i className="fa-solid fa-link" />
                                </a>
                            </div>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ProjectCard