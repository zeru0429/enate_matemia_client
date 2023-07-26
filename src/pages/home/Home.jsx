import React from 'react'
import DataTable from '../../components/dataTable/DataTable'
import DataTable2 from '../../components/table/dataTable'
import List from '../../components/dataTable/List'
import Cards from '../../components/card/BorderExample'
import BasicExample from'../../components/card/BasicExample'
import PieChartBox from '../../components/pieCartBox/PieChartBox'
import ChartBox from '../../components/chartBox/ChartBox.tsx'
// import Item from '../../components/responsive/Item'

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

const Home = () => {



  return (
    <div className='container'>Home
    <div className="d-flex">
    <ChartBox {...datachart} />
    <ChartBox {...datachart} />
    <ChartBox {...datachart} />
    <ChartBox {...datachart} />

    <PieChartBox />
    <PieChartBox />
    <PieChartBox />
    </div>
    {/* <Item /> */}

    {/* <div className="d-flex">
      <BasicExample
        title='Banner' 
        description='normal non refletive banner with white color'
        
      />
      <BasicExample
        title='Banner' 
        description='normal non refletive banner with white color'
        
      />
    </div> */}
    
      {/* <Cards className='d-flex'/> */}
      

    {/* <List /> */}
    {/* <DataTable first='orders' /> */}

    </div>
  )
}

export default Home