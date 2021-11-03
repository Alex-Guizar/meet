import React, { useEffect, useState } from 'react';
import {
  PieChart, Pie, Cell, ResponsiveContainer
} from 'recharts';

const EventGenre = ({ events }) => {
  const [data, setData] = useState([]);
  const dataColors = ['#cc34eb', '#8334eb', '#4634eb', '#3477eb', '#34b4eb'];

  const getData = () => {
    const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'AngularJS'];
    const data = genres.map((genre) => {
      const value = events.filter((event) => event.summary.split(' ').includes(genre)).length;

      return { name: genre, value };
    });

    return data;
  }

  useEffect(() => {
    setData(() => getData());
  }, [events]);

  return (
    <ResponsiveContainer height={400}>
      <PieChart>
        <Pie
          data={data}
          cx={200}
          cy={200}
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {
            data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={dataColors[index % dataColors.length]} />
            ))
          }
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}

export default EventGenre;