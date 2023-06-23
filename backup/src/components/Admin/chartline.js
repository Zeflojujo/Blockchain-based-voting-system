import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { makeStyles } from '@material-ui/core/styles';
import { format } from 'date-fns';
import { useSpring, animated } from 'react-spring';

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

const AnimatedLine = animated(Line);

const TimeChart = ({ startTime, endTime }) => {
  const classes = useStyles();

  const [data, setData] = useState([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentTime = new Date();
      const timeRemaining = Math.max(endTime.getTime() - currentTime.getTime(), 0);

      const updatedData = [
        { name: 'Start Time', time: 0 },
        { name: 'Current Time', time: 0 },
        { name: 'End Time', time: endTime.getTime() - startTime.getTime() },
      ];

      if (timeRemaining > 0) {
        updatedData[1].time = endTime.getTime() - currentTime.getTime();
        updatedData[1].formattedTime = format(currentTime, 'HH:mm:ss');
      } else {
        updatedData[1].time = endTime.getTime() - startTime.getTime();
        updatedData[1].formattedTime = format(endTime, 'HH:mm:ss');
      }

      setData(updatedData);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [startTime, endTime]);

  const animatedProps = useSpring({
    to: async (next) => {
      while (true) {
        await next({ currentPercent: 100 });
      }
    },
    from: { currentPercent: 0 },
    config: { duration: 10000 },
  });

  return (
    <div className={classes.chartContainer}>
      <div className={classes.chartHeading}>Voting System Time Consumption</div>
      <LineChart width={800} height={400} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip formatter={(value) => format(new Date(value), 'HH:mm:ss')} />
        <Legend />
        <AnimatedLine
          type="monotone"
          dataKey="time"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
          strokeDasharray={animatedProps.currentPercent.interpolate((value) =>
            value === 100 ? 'none' : '5 5'
          )}
          strokeWidth={2}
        />
      </LineChart>
    </div>
  );
};

export default TimeChart;
