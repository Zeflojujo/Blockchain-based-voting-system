import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { makeStyles } from '@material-ui/core/styles';
import { format, addSeconds } from 'date-fns';
import contractAbi from "../../abi/TimeControl.json";
import Web3 from 'web3';


const networkId = "http://127.0.0.1:7545";


const useStyles = makeStyles(() => ({
  chartContainer: {
    marginTop: 50,
    marginBottom: 50,
    padding: 20,
    border: '1px solid #ccc',
    borderRadius: 5,
  },
  chartHeading: {
    marginBottom: 20,
    fontSize: '1.2rem',
    fontWeight: 'bold',
  },
}));

const TimeChart = ({ startTime, endTime }) => {
  const classes = useStyles();

  const [currentTime, setCurrentTime] = useState(new Date());
  const [data, setData] = useState([]);
  const [time, setTime] = useState([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    const updatedData = [
      { name: 'Start Time', time: 0 },
      { name: 'Current Time', time: Math.max(currentTime.getTime() - startTime.getTime(), 0) },
      { name: 'End Time', time: endTime.getTime() - startTime.getTime() },
    ];

    setData(updatedData);
    getTime();
  }, [currentTime, startTime, endTime]);


  const getTime = async () => {
    const web3 = new Web3(networkId);
    const abi = contractAbi.abi;
    const address = contractAbi.networks[5777].address;
    const contract = new web3.eth.Contract(abi, address);
    const presidentRegNumberKeys = await contract.methods.getPresidentRegNumber().call();

    const timeData = [];

    for(let i=0; i<presidentRegNumberKeys.length; i++){
      const presidentRegNumber = presidentRegNumberKeys[i];
      // console.log(`the registration number is: ${voterRegNumber}`);
      const president = await contract.methods.viewPresident(presidentRegNumber).call();
      timeData.push(president);
      // console.log(president);
    }
    console.log(timeData)

    setTime(timeData);

  };

  return (
    <div className={classes.chartContainer}>
      <div className={classes.chartHeading}>Voting System Time Consumption</div>
      <LineChart width={800} height={400} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          tickFormatter={(value) => (value === 'Current Time' ? format(currentTime, 'HH:mm:ss') : value)}
        />
        <YAxis />
        <Tooltip
          formatter={(value) => (value !== 0 ? format(addSeconds(new Date(startTime), value), 'HH:mm:ss') : value)}
        />
        <Legend />
        <Line type="monotone" dataKey="time" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </div>
  );
};

export default TimeChart;
