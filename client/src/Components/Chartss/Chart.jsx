import React ,{useState} from 'react'
import "./Chart.css"
import {Bar} from 'react-chartjs-2'
import {Chart as ChartJS,BarElement,CategoryScale,LinearScale,PointElement,Title,Tooltip,Legend,Ticks} from 'chart.js';
ChartJS.register(BarElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

function Chart() {
  var [a,b]=useState(0);
  const data={
    labels:['Jan','Feb','March','April','May','June','July','August','Sep','Oct','Nov','Dec'],
    datasets:[
      {
        label : 'Problems in 2025',
        data : [30,25,35,26,13,22],
        borderColor:'red',
        backgroundColor: 'rgba(0, 0, 0, 0.96)',
        tension: 0.4,
      },
      {
        label : 'Problems Solved in 2025',
        data : [22,32,15,23,12,a],
        borderColor:'red',
        backgroundColor: 'rgba(129, 107, 43, 0.96)',
        tension: 0.4,
        
      }
    ]
  }
const option={
  plugins: {
    title: {
      display: true,
      text: 'Monthly Problems and Solutions (2025)',
      font: {
        size: 20,
      },
      color: 'black',
      padding: {
        top: 10, 
        bottom: 20,
      },
    },
  },
  scales:{
    x: {
      title: {
        display: true, 
        text: 'Months', 
        font: {
          size: 16, 
        },
        color: 'black',
      },
      grid: {
        color: 'rgba(0, 0, 0, 0.5)',
      },
      barPercentage: 1.0, 
      categoryPercentage: 1.0,
    },
    y:
      {
        title: {
          display: true,
          text: 'Number of Problems', 
          font: {
            size: 16, 
          },
          color: 'black',
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.5)', 
        },
          min:0,
          max:50,
          ticks: {
            stepSize:5
          }
      }
  }
}
const handleIncrement = () => {
  const totalProblems = data.datasets[0].data[5];
  if (a<totalProblems)
  {
    b(a+1);
  } 
  else
  {
    alert('Number of problems solved cannot exceed the total number of problems!');
  }
};
  return (
    <div className="pp">
       <button onClick={handleIncrement}></button>
       <Bar data={data} options={option}/>
     </div>
  )
}

export default Chart
