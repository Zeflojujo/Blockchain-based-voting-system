// import React, { useEffect, useState } from 'react';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
// import { makeStyles } from '@material-ui/core/styles';
// import { format } from 'date-fns';
// import { useSpring, animated } from 'react-spring';

// const useStyles = makeStyles(() => ({
//   chartContainer: {
//     marginTop: 50,
//     marginBottom: 50,
//     padding: 20,
//     border: '1px solid #ccc',
//     borderRadius: 5,
//   },
//   chartHeading: {
//     marginBottom: 20,
//     fontSize: '1.2rem',
//     fontWeight: 'bold',
//   },
// }));

// const TimeChart = ({ startTime, endTime }) => {
//   const classes = useStyles();

//   const [currentTime, setCurrentTime] = useState(new Date());
//   const [data, setData] = useState([]);
//   const [animatedTime, setAnimatedTime] = useState(0);

//   const animatedProps = useSpring({
//     time: animatedTime,
//     from: { time: 0 },
//     to: { time: Math.max(currentTime.getTime() - startTime.getTime(), 0) },
//     config: { duration: 1000 },
//     onRest: () => {
//       setAnimatedTime(Math.max(currentTime.getTime() - startTime.getTime(), 0));
//     },
//   });

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       setCurrentTime(new Date());
//     }, 1000);

//     return () => {
//       clearInterval(intervalId);
//     };
//   }, []);

//   useEffect(() => {
//     const updatedData = [
//       { name: 'Start Time', time: 0 },
//       { name: 'Current Time', time: animatedTime },
//       { name: 'End Time', time: endTime.getTime() - startTime.getTime() },
//     ];

//     setData(updatedData);
//   }, [animatedTime, startTime, endTime]);

//   return (
//     <div className={classes.chartContainer}>
//       <div className={classes.chartHeading}>Voting System Time Consumption</div>
//       <LineChart width={800} height={400} data={data}>
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis
//           dataKey="name"
//           tickFormatter={(value) => (value === 'Current Time' ? format(currentTime, 'HH:mm:ss') : value)}
//         />
//         <YAxis />
//         <Tooltip
//           formatter={(value) => (value !== 0 ? format(new Date(startTime.getTime() + value), 'HH:mm:ss') : value)}
//         />
//         <Legend />
//         <Line
//           type="monotone"
//           dataKey="time"
//           stroke="#8884d8"
//           activeDot={{ r: 8 }}
//           dot={<CustomizedDot />}
//         />
//       </LineChart>
//     </div>
//   );
// };

// const CustomizedDot = (props) => {
//   const { cx, cy, value } = props;

//   return (
//     <animated.circle
//       cx={cx}
//       cy={cy}
//       r={6}
//       fill="#8884d8"
//       style={{
//         transform: animatedProps.time.interpolate((t) => `translateX(${t}px)`),
//       }}
//     />
//   );
// };

// export default TimeChart;
