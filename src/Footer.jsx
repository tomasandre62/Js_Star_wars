import Card from 'react-bootstrap/Card';

function Footer() {
  return (
    
    <Card className="text-center mt-5 border-0 footer">
      <Card.Header style={{backgroundColor:'black', color:'white'}}>Tomas Ramirez</Card.Header>
      <Card.Body style={{backgroundColor:'black', color:'white'}}>
        <Card.Title>Proyecto para 4 Geeks</Card.Title>
        <Card.Text>
          Evaluacion final Frontend.
        </Card.Text>
      </Card.Body>
      <Card.Footer style={{backgroundColor:'black', color:'white'}} className="text-muted">2024</Card.Footer>
    </Card>
   
  );
}

export default Footer;