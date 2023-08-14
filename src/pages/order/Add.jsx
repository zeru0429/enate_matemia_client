import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import AlertExample from '../../components/other/Alert';
import { server, imageserver } from '../../constants';
import { useStateValue } from "../../utility/stateprovider";

const Add = (props) => {
    const [{ user ,role}, dispatch] = useStateValue();
  let TOTAL = 0;
  const { selectedKind, amount, remain_price, totalPrice,handleKindChange } = props;
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [phone, setphone] = useState(0);
  const [full_name, setfull_name] = useState("");
  const [type_of_order, settype_of_order] = useState(null);
   const [state_of_order1, setstate_of_order1] = useState(null);
  const [total__price, setTotal__price] = useState();
  const [selectedProduct1, setselectedProduct1] = useState(null);
  const [total_remain_price, setTotal_remain_price] = useState(0);
  const [form, setForm] = useState({});
  const [amout_price, setAmout_price] = useState(0);
  const [paid_price, setPaid_price] = useState(0);
  const [selectedOrder, setselectedOrder] = useState(null);
  const [total, setTotal] = useState(0);
  const [errors, setErrors] = useState({});
  let cout = 3;
  const products = props.pro_name_list;
  useEffect(() => {
  // Set default values for input fields
  const defaultValues = {
    product_name: selectedProduct || '', // Set a default value here
    // ... Other field defaults ...
  };
  props.columns.forEach((column) => {
    defaultValues[column.field] = column.defaultValue || '';
  });
  setForm(defaultValues);
}, [props.columns, selectedProduct]);

  
  useEffect(() => {
    // Set default values for input fields
    const defaultValues = {};
    props.columns.forEach((column) => {
      defaultValues[column.field] = column.defaultValue || '';
    });
    setForm(defaultValues);
  }, [props.columns]);

  useEffect(() => {
    setTotal(total__price * amout_price);
    setTotal_remain_price(total__price * amout_price);
   // console.log(total__price * amout_price);
    
  }, [amout_price]);

  useEffect(() => {
  setTotal_remain_price(total-paid_price);
  //console.log(total__price * amout_price);
  
  }, [paid_price]);

//selectedProduct
  useEffect(() => {
    setselectedOrder(null)
    setTotal(0);
    setTotal_remain_price(0);
    setTotal_remain_price(0);
   
  //console.log(total__price * amout_price);
  
  }, [selectedProduct]);

  const setField = (field, value) => {
    setForm((prevForm) => ({
      ...prevForm,
      [field]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setForm((prevForm) => ({
      ...prevForm,
      profile: file,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    form.product_name = selectedProduct.product_name
    form.kind_of_product = selectedProduct.kind_of_product
    form.amount = amout_price;
    form.total_price = total;
    form.paid_price = paid_price;
    form.phone = phone;
    form.fullname = full_name;
    form.remain_price = total_remain_price;
    form.type_of_order = type_of_order;
    form.state_of_order = state_of_order1;
    form.casher_name=user
    console.log(form);
    //console.log(selectedProduct );
    if (validateForm()) {
    
    }
  };

  const validateForm = () => {
    let isValid = true;
    // Add your validation logic here
    return isValid;
  };

  const hudleOrderType = (e) => { 
  settype_of_order(e.target.value);
  
    if (selectedProduct) {
  
    const { product_name, kind_of_product } = selectedProduct;
      const home = getPrice(product_name, kind_of_product, e.target.value);
        console.log(product_name, kind_of_product);

    TOTAL = home;
    setTotal__price(TOTAL);
  }
};


  const hundleAmount = (e) => { 
    //setAmout_price(e.target.value)
    console.log(e.target.value);

  };

  function getPrice(productName, kindOfProduct, workAt) {
    // console.log(workAt);
    const matchedProduct = products.find(
      (product) =>
        product.product_name === productName && product.kind_of_product === kindOfProduct
    );
   
    //console.log(matchedProduct);
    if (matchedProduct) {
      if (workAt === 'home_price') { return matchedProduct.home_price; }
      else if (workAt === 'out_price'){ return matchedProduct.out_price; }
    }
    else
    {
      return 0;
    }
  }
  const handleProductChange = (e) => { 
   setSelectedProduct(e.target.value);
  }



  return (
    <>
    <div className="add container">
      <div className="modal1">
        <span className="close" onClick={() => {props.setOpen(false)}}>
        X
      </span>
      <h1>new {props.name}</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group key="product_name">
          <Form.Label>product_name</Form.Label>
          <Form.Control
            required
            as="select"
            name="product_name"
            onChange={handleProductChange}
            disabled={false} // You can adjust the disabled attribute as needed
          >
            <option value="">None</option>
            {props.columns[0].options.map((option) => (
              <option key={option.value} value={option.id}>
                {option.label}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
          
       
        <Form.Group key="type_of_order">
          <Form.Label>type_of_order</Form.Label>
          <Form.Control
            required
            as="select"
            name="type_of_order"
            value={type_of_order}
            onChange={hudleOrderType}
            disabled={!selectedProduct}
              >
            <option key='' value=''>None</option>
            <option key='printing' value='out_price'>printing only</option>
            <option key='home_made' value='home_price'>home_made</option>
        
          </Form.Control>
        </Form.Group>  
        <Form.Group key="amount">
          <Form.Label>amount</Form.Label>
              <Form.Control
            placeholder='amount'
            type="number"
            name="amount"
            value={amout_price}
            onChange={(e) =>setAmout_price(e.target.value)}
          />
        </Form.Group>
        <Form.Group key="total_price">
          <Form.Label>Single Pricing</Form.Label>
              <Form.Control
            id='totalId'
            type="number"
             name="total_price"
           value={total__price}
            onChange={(e) => setTotal__price(amout_price)}
            disabled
          />
        </Form.Group>
        <Form.Group key="paid_price">
          <Form.Label>paid_price</Form.Label>
          <Form.Control
            type="number"
            placeholder='paid_price'
            name="paid_price"
            value={paid_price}
            onChange={(e) =>setPaid_price(e.target.value)}
          />
        </Form.Group>
        <Form.Group key="remain_price">
          <Form.Label>remain_price</Form.Label>
          <Form.Control
            type="number"
            placeholder='remain_price'
            name="remain_price"
            value={total_remain_price}
            disabled='true'
          />
        </Form.Group>
        <Form.Group key="full_name">
          <Form.Label>full_name</Form.Label>
          <Form.Control
                type="text"
                placeholder='full_name'
            name="full_name"
                value={full_name}
                onChange={(e) =>setfull_name(e.target.value)}
          />
        </Form.Group>
        <Form.Group key="phone">
          <Form.Label>phone</Form.Label>
          <Form.Control
                type="text"
                placeholder='phone'
            name="phone"
                value={phone}
                 onChange={(e) =>setphone(e.target.value)}
          />
        </Form.Group>
        <Form.Group key="state_of_order">
          <Form.Label>state_of_order</Form.Label>
          <Form.Control
            required
            as="select"
                name="state_of_order1"
                value={state_of_order1}
                onChange={(e)=>setstate_of_order1(e.target.value)}


              >
            <option key='' value=''>None</option>
            <option key='normal' value='normal'>Normal</option>
            <option key='urgent' value='urgent'>Urgent</option>
        
          </Form.Control>
        </Form.Group>     
        <Form.Group className="item center"> <br />
        <Button variant="primary" type="submit" >
          Submit
        </Button>
        </Form.Group>
      </Form>
      </div>
    </div>
  </>
);

};

export default Add;