import { Button, Form, Modal } from 'react-bootstrap';
import Logout from './Logout'

export default function AccountError() {

    return (
        <div>
            <Modal show={true} backdrop="static" keyboard={false}>

                <Modal.Header>
                    <Modal.Title>User Account Error</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <div className="form-group">
                        </div>
                        <div className="form-group">
                            There seems to be an issue, please try again later,
                            <br/> if this persists contact a member of staff or click the button below to notify them
                            <br/> Sorry for the inconvenience !
                        </div>
                        
                        <div className="form-check">
                        </div>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button type="submit" className="btn btn-primary">
                        <Logout/>
                        {/* implement posting to admin from here somehow (even though server will be down) */}
                    </Button>
                </Modal.Footer>

            </Modal>
          </div>
    );
}
