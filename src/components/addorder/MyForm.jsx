import React, { useState } from 'react';

const MyForm = ({ products }) => {
  const [selectedKindOfProduct, setSelectedKindOfProduct] = useState([]);
  const [selectedMeasurementUnits, setSelectedMeasurementUnits] = useState([]);

  // Event handler for the kind of product selection
  const handleKindOfProductChange = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions, (option) => option.value);
    setSelectedKindOfProduct(selectedOptions);
  };

  // Event handler for the measurement units selection
  const handleMeasurementUnitsChange = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions, (option) => option.value);
    setSelectedMeasurementUnits(selectedOptions);
  };

  // Filter the available measurement units based on the selected kind of product
  const availableMeasurementUnits = products
    .filter((product) => selectedKindOfProduct.includes(product.kind_of_product))
    .map((product) => product.measurement_units);

  // Filter the available home prices based on the selected kind of product and measurement units
  const availableHomePrices = products
    .filter(
      (product) =>
        selectedKindOfProduct.includes(product.kind_of_product) &&
        selectedMeasurementUnits.includes(product.measurement_units)
    )
    .map((product) => product.home_price);

  return (
    <form>
      <div>
        <label htmlFor="kind_of_product">Select kind of product:</label>
        <select
          id="kind_of_product"
          name="kind_of_product"
          multiple
          value={selectedKindOfProduct}
          onChange={handleKindOfProductChange}
        >
          {products.map((product) => (
            <option key={product.id} value={product.kind_of_product}>
              {product.kind_of_product}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="measurement_units">Select measurement units:</label>
        <select
          id="measurement_units"
          name="measurement_units"
          multiple
          value={selectedMeasurementUnits}
          onChange={handleMeasurementUnitsChange}
        >
          {availableMeasurementUnits.map((measurementUnit) => (
            <option key={measurementUnit} value={measurementUnit}>
              {measurementUnit}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="home_price">Select home price:</label>
        <select id="home_price" name="home_price" multiple>
          {availableHomePrices.map((homePrice) => (
            <option key={homePrice} value={homePrice}>
              {homePrice}
            </option>
          ))}
        </select>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default MyForm;