import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Datatable from '../../components/dataTable/DataTable';
import Add from './Add';
import { server } from '../../constants';

const Order = () => {
  let pro_name = [{}];
  let productsKind = [{}];
  let productsMunit = [{}];
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedKind, setSelectedKind] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${server}products`);
        setProducts(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, []);

  if (products) { 
    products.map((single,i) => { 
      pro_name.push(
         { label: single.product_name, value: single.product_name,id:i  }
                )
      productsKind.push({
      label: single.kind_of_product, value: single.kind_of_product ,id:i },
      )
    })
  }
  const handleProductChange = (selectedProductId) => {
    const selectedProduct = products.find((product) => product.id === selectedProductId);
    setSelectedProduct(selectedProduct);
    setSelectedKind(null);
    setTotalPrice(0);
  };

  const handleKindChange = (selectedKind) => {
    setSelectedKind(selectedKind);
    if (selectedProduct && selectedKind) {
      // Fetch the price from the server based on selectedProduct and selectedKind
      const calculatedTotalPrice = calculateTotalPrice(selectedProduct, selectedKind);
      setTotalPrice(calculatedTotalPrice);
    }
  };

  const calculateTotalPrice = (product, kind) => {
    
    // Implement your logic to fetch and calculate the total price
    return 0; // Placeholder value, replace with your actual calculation
  };

   const columns = [
  {
    field: 'product_name',
    headerName: 'product_name',
    type: 'select',
      options: pro_name,
    required: true
  },
    {
    field: 'kind_of_product',
    headerName: 'kind_of_product',
    type: 'select',
    options: productsKind,
    required: true
     },
     {
    field: 'amount',
    headerName: 'amount',
    type: 'number',
      required: true,
    defaultValue: 0
  },
  {
  field: 'total_price',
  headerName: 'total_price',
  type: 'number',
  required: true,
  disabled: true,
  defaultValue: 0
     },

 {
    field: 'type_of_order',
    headerName: 'type_of_order',
    type: 'select',
    options: [
      { label: 'printing', value: 'out_price',id:1 },
      { label: 'home_made', value: 'home_price',id: 2 },
    ],
    required: true
  },
    
  
    {
    field: 'paid_price',
    headerName: 'paid_price',
    type: 'number',
      required: true,
    defaultValue: 0
    },
      {
  field: 'remain_price',
  headerName: 'remain_price',
  type: 'number',
  required: true,
  disabled: true,
     },
  {
    field: 'state_of_order',
    headerName: 'state_of_order',
    type: 'select',
    options: [
      { label: 'normal', value: 'normal',id:1 },
      { label: 'urgent', value: 'urgent',id:2 }
    ],
    required: true
  },
    {
    field: 'fullname',
    headerName: 'fullname',
    type: 'text',
    required: true
  },
    {
    field: 'phone',
    headerName: 'phone',
    type: 'text',
    required: true
  },

];

  return (
    <div className="products container">
      <div className="info center">
        <h1>Orders</h1>
        <button className="btn btn-primary" onClick={() => setOpen(true)}>
          Add new order
        </button>
      </div>
      <Datatable first="orders" />
      {open && (
        <Add
          name="orders"
          columns={columns}
          setOpen={setOpen}
          selectedProduct={selectedProduct}
          selectedKind={selectedKind}
          totalPrice={totalPrice}
          handleProductChange={handleProductChange}
          handleKindChange={handleKindChange}
        />
      )}
    </div>
  );
};

export default Order;

