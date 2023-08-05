import Alert from 'react-bootstrap/Alert';

function BasicAlert({ message,variant}) {
  return (
    <>
              <Alert key={variant} variant={variant}>
                  {message}
              </Alert>
          
    </>
  );
}

export default BasicAlert;