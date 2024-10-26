import Card from 'react-bootstrap/Card';

export function CardBasic(props) {

  return (
    <Card style={{ width: `${props.width}rem`, height: "6rem" }}>
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Title>
        {props.data}
        </Card.Title>
      
      </Card.Body>
    </Card>
  );
}

