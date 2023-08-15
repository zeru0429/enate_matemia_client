import React, { useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';

const MyForm = ({ products }) => {
  const [selectedKindOfProduct, setSelectedKindOfProduct] = useState([]);
  const [selectedMeasurementUnits, setSelectedMeasurementUnits] = useState([]);

  const handleKindOfProductChange = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions, (option) => option.value);
    setSelectedKindOfProduct(selectedOptions);

    // Filter the measurement units based on the selected kind of product
    const availableMeasurementUnits = products
      .filter((product) => selectedOptions.includes(product.kind_of_product))
      .map((product) => product.measurement_units);

    // Reset the selected measurement units if they are not available for the selected kind of product
    setSelectedMeasurementUnits((prevSelectedMeasurementUnits) =>
      prevSelectedMeasurementUnits.filter((unit) => availableMeasurementUnits.includes(unit))
    );
  };

  const handleMeasurementUnitsChange = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions, (option) => option.value);
    setSelectedMeasurementUnits(selectedOptions);
  };

  const availableMeasurementUnits = products
    .filter((product) => selectedKindOfProduct.includes(product.kind_of_product))
    .map((product) => product.measurement_units);

  const availableHomePrices = products
    .filter(
      (product) =>
        selectedKindOfProduct.includes(product.kind_of_product) &&
        selectedMeasurementUnits.includes(product.measurement_units)
    )
    .map((product) => product.home_price);

  return (
    <Form>
      <Form.Group as={Row} controlId="kind_of_product">
        <Form.Label column sm={2}>
          Select kind of product:
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            as="select"
            multiple
            value={selectedKindOfProduct}
            onChange={handleKindOfProductChange}
          >
            {products.map((product) => (
              <option key={product.id} value={product.kind_of_product}>
                {product.kind_of_product}
              </option>
            ))}
          </Form.Control>
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="measurement_units">
        <Form.Label column sm={2}>
          Select measurement units:
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            as="select"
            multiple
            value={selectedMeasurementUnits}
            onChange={handleMeasurementUnitsChange}
            disabled={selectedKindOfProduct.length === 0}
          >
            {availableMeasurementUnits.map((measurementUnit) => (
              <option key={measurementUnit} value={measurementUnit}>
                {measurementUnit}
              </option>
            ))}
          </Form.Control>
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="home_price">
        <Form.Label column sm={2}>
          Select home price:
        </Form.Label>
        <Col sm={10}>
          <Form.Control as="select" multiple>
            {availableHomePrices.map((homePrice) => (
              <option key={homePrice} value={homePrice}>
                {homePrice}
              </option>
            ))}
          </Form.Control>
        </Col>
      </Form.Group>

      <Form.Group as={Row}>
        <Col sm={{ span: 10, offset: 2 }}>
          <Button type="submit">Submit</Button>
        </Col>
      </Form.Group>
    </Form>
  );
};

export default MyForm;