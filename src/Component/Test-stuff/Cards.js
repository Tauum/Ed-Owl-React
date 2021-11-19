import { Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Cards() {
    return (
          <body>
             <Card style={{ width: '18rem', color:"#000" }}>
                <Card.Img variant="top" src="https://picsum.photos/200/100" background="gray" />
                <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Text>
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                </Card.Body>
            </Card>
          </body>
    );
  }
  
  export default Cards;
  


  