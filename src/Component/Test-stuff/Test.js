import { Button, Alert, Breadcrumb,Form, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Test() {
    return (
          <body>
            <Form>
            <Row>
                <Col>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="checkbox" />
                    </Form.Group>
                </Col>
                <Col>
                    <Button variant="primary" type="submit">
                    Submit
                    </Button>
                </Col>
            </Row>
            </Form>



            <Breadcrumb>
            <Breadcrumb.Item> Initial </Breadcrumb.Item>
            <Breadcrumb.Item> Parent </Breadcrumb.Item>
            <Breadcrumb.Item> Child </Breadcrumb.Item>
            </Breadcrumb>

            <Alert variant="success"> This is an alert </Alert>
            <Button> test button </Button>
          </body>
    );
  }
  
  export default Test;
  

