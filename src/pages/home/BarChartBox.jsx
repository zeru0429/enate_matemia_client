import React from "react";
import { Bar, BarChart, ResponsiveContainer, Tooltip } from "recharts";
import { useEffect, useState } from "react";
import { server } from '../../constants';
import axios from "axios";

const BarChartBox = (props) => {
const [datacol, setDatacol] = useState({});
  const [chartdata, setChartData] = useState([]);

  useEffect(() => { 
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${server}orderStat`);
      setDatacol(response.data);
     // console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

useEffect(() => {
  if (datacol && Array.isArray(datacol)) { // Check if datacol is an array
    const formattedChartData = datacol.map(single => ({
      name: single.order_status,
      data: parseInt(single.count) // Convert the count to a number
    }));
    setChartData(formattedChartData);
  }
}, [datacol]);









  return (
    <div className="barChartBox">
      <h1>{props.title}</h1>
      <div className="chart">
        <ResponsiveContainer width="99%" height={150}>
          <BarChart data={chartdata}>
            <Tooltip
              contentStyle={{ background: "#003447", borderRadius: "5px" }}
              labelStyle={{ display: "none" }}
              cursor={{fill:"none"}}
            />
            <Bar dataKey={props.dataKey} fill={props.color} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarChartBox;