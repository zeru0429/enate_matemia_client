import React, { useEffect, useState } from 'react'
import './home.css'
import { myGlobalVariable} from '../../constants'
import PieChartBox from '../../components/pieCartBox/PieChartBox'
import BarChartBox from './BarChartBox'
import BigChartBox from "../../components/bigChartBox/BigChartBox";
import ChartBox  from '../../components/chartBox/ChartBox'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

// const axiosInstance = axios.create({
//   baseURL: 'http://localhost:8100/', // Adjust the URL accordingly
//   withCredentials: true,
// });


const datachart={
  color: "#8884d8",
  icon: "/userIcon.svg",
  title: "Total Users",
  number: "11.238",
  dataKey: "users",
  percentage: 45,
  chartData: [
    { name: "Sun", users: 400 },
    { name: "Mon", users: 600 },
    { name: "Tue", users: 500 },
    { name: "Wed", users: 700 },
    { name: "Thu", users: 400 },
    { name: "Fri", users: 500 },
    { name: "Sat", users: 450 },
  ],
}

const ChartData = [
  { name: "Category 1", data: 10 },
  { name: "Category 2", data: 20 },
  { name: "Category 3", data: 15 },
  { name: "Category 4", data: 30 },
  { name: "Category 5", data: 25 },
];



const chartBoxUser = {
  color: "#8884d8",
  icon: "/userIcon.svg",
  title: "Total Users",
  number: "11.238",
  dataKey: "users",
  percentage: 45,
  chartData: [
    { name: "Sun", users: 400 },
    { name: "Mon", users: 600 },
    { name: "Tue", users: 500 },
    { name: "Wed", users: 700 },
    { name: "Thu", users: 400 },
    { name: "Fri", users: 500 },
    { name: "Sat", users: 450 },
  ],
};
const Home = () => {
  const [name, setName] =useState('')
  const navigate = useNavigate();
  
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axiosInstance.get('session');
  //       console.log(response.data);

  //       if (response.data.valid) {
  //         setName(response.data.username);
  //       } else {
  //         // Handle the case when the session is not valid
  //       }
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   fetchData();
  // }, []);

   useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get('http://localhost:8100/checkLoginStatus');
        const data = response.data;
        console.log(response);
        if (data.status === 'success') {
          // User is already logged in, redirect to the homepage
          navigate('/login');
        } else { 
          navigate('/login');
        }
      } catch (error) {
        console.log('Error checking login status:', error.message);
      }
    };

    checkLoginStatus();
  }, [navigate]);


  return (
    <div className="start">
    <div className="home">
      <div className="box box1">
          <PieChartBox datachart={datachart} />
        </div>
        <h1>{name}</h1>
        <div className="box box2">
          <BarChartBox
            title="Sample Bar Chart"
            chartData={ChartData}
            dataKey="data"
            color="#8884d8" 
          />
      </div>
      <div className="box box3">
       <ChartBox  {...chartBoxUser}/>
      </div>
      <div className="box box4">
       <PieChartBox />
      </div>
      <div className="box box5">
        <BarChartBox
            title="Sample Bar Chart"
            chartData={ChartData}
            dataKey="data"
            color="#ff84d8" 
          />
      </div>
      <div className="box box6">
       <ChartBox  {...chartBoxUser}/>
      </div>
      <div className="box box7">
         <BigChartBox />
      </div>
      <div className="box box8">
        <ChartBox  {...chartBoxUser}/>
      </div>
      <div className="box box9">
        <ChartBox  {...chartBoxUser}/>
      </div>
      <div className="box box10">
       <BarChartBox
            title="Sample Bar Chart"
            chartData={ChartData}
            dataKey="data"
            color="#f824d0" 
          />
      </div>
      </div>
    
    </div>
  );
}

export default Home