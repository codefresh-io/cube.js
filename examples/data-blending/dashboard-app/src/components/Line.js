import React, { useState, useEffect } from 'react';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
const staticOptions = {
  chart: {
    type: 'line',
    styledMode: true,
    spacingRight: 25,
    spacingLeft: 20,
  },
  credits: {
    enabled: false,
  },
  xAxis: {
    categories: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
  },

  yAxis: {
    title: {
      enabled: false,
    },
    gridLineColor: '#D0D0DA40',
  },

  legend: {
    align: 'center',
  },
  colors: ['#FF6492', '#7A77FF', '#FFC3BA'],
  plotOptions: {
    line: {
      lineWidth: 1.5,
      marker: {
        symbol: 'circle',
      },
    },
  },
  responsive: {
    rules: [
      {
        condition: {
          maxWidth: 500,
        },
        chartOptions: {
          legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'bottom',
          },
        },
      },
    ],
  },
};

const Line = ({ title, data }) => {
  const [options, setOptions] = useState({});
  useEffect(() => {
    setOptions({
      ...staticOptions,
      title: {
        text: `Orders by status <small>implemented with ${title}</small>`,
        useHTML: true,
      },
      series: data,
    });
  }, [data, title]);

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default Line;
