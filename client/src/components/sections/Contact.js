import React from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'

const Contact = () => {
    return (
        <div className='carousel-wrapper' id='contact' style={{ paddingTop: '70px', marginTop: '-70px' }}>
            <div className=''>
                <h2>Contact Us</h2>
                <p>We're always here to help. </p>
                <p>Whether you need more information about our services, have a question, </p>
                <p>or want to provide feedback about your experience, don't hesitate to get in touch with us.</p>
                <p>You can reach us by phone, email, or through our social media platforms.</p>
                <p> Let's make your paintball adventure unforgettable together!</p>
                <Form>
                    <Row>
                        <Col xs={6}>
                            <Form.Group controlId="email">
                                <Form.Label>Email:</Form.Label>
                                <Form.Control type="email" name="email" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={6}>
                            <Form.Group controlId="tel">
                                <Form.Label>Phone:</Form.Label>
                                <Form.Control type="number" name="tel" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={6}>
                            <Form.Group controlId="textarea">
                                <Form.Label>Your Text:</Form.Label>
                                <Form.Control as="textarea" name="text" rows={3} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Button className='m-2' variant="primary" type="submit">Send</Button>
                </Form>
            </div>
            <div className="map-container">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d33725.521385073545!2d-55.936573951024464!3d-27.31448168971653!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2spy!4v1686936878801!5m2!1sen!2spy"
                    title='map' allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
        </div>
    )
}

export default Contact