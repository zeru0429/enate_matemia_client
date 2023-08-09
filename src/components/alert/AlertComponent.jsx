import Alert from 'react-bootstrap/Alert';

function AlertComponent({ color , message}) {
  return (
    <>
        <Alert key={color} variant={color}>
          {message}
        </Alert>

    </>
  );
}

export default AlertComponent;