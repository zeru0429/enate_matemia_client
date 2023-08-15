import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import "./pieChartBox.css";
import { useEffect, useState } from "react";
import { server } from '../../constants';
import axios from "axios";

const PieChartBox = () => {
  const [datacol, setDatacol] = useState({});
  const [chartdata, setChartData] = useState([]);

  useEffect(() => { 
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${server}userStat`);
      setDatacol(response.data[0]);
     // console.log(response.data[0]);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (datacol) {
      setChartData([
        { name: "Super", value: datacol.cashers_count*100, color: "#0088FE" },
        { name: "Admin", value: datacol.cashers_count*100, color: "#00C49F" },
        { name: "Guest", value: datacol.guests_count*100, color: "#FFBB28" },
        { name: "Casher", value: datacol.cashers_count*100, color: "#FF8042" },
        { name: "Operator", value: datacol.operators_count*100, color: "#0F8042" }
      ]);
    }
  }, [datacol]);


  return (
    <div className="pieChartBox">
      <h1>Users</h1>
      <div className="chart">
        <ResponsiveContainer width="99%" height={300}>
          <PieChart>
            <Tooltip
              contentStyle={{ background: "white", borderRadius: "5px" }}
            />
            <Pie
              data={chartdata}
              innerRadius={"70%"}
              outerRadius={"90%"}
              paddingAngle={5}
              dataKey="value"
            >
              {chartdata.map((item) => (
                <Cell key={item.name} fill={item.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="options">
        {chartdata.map((item) => (
          <div className="option" key={item.name}>
            <div className="title">
              <div className="dot" style={{ backgroundColor: item.color }} />
              <span>{item.name}</span>
            </div>
            <span>{item.value/100}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PieChartBox;
