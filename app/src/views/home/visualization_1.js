import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

export const options = {
    plugins: {
        datalabels: {
            formatter: (value, ctx) => {
                let datasets = ctx.chart.data.datasets;
                let percentage = 0;
                if (datasets.indexOf(ctx.dataset) === datasets.length - 1) {
                    let sum = datasets[0].data.reduce((a, b) => a + b, 0);
                    let percentage = Math.round((value / sum) * 100) + '%';
                    return percentage;
                } else {
                    return percentage;
                }
            },
            color: 'black'
        }
    }
};

export const data = {
    labels: ['Smokers', 'Former Smokers', 'Never Smoked', 'Unknown'],
    datasets: [
        {
            label: '# of Votes',
            data: [789, 885, 1892, 1544],
            backgroundColor: [
                '#FDBAAB',
                '#FFEBA5',
                '#99C3E1',
                '#90D1C5',
                '#66AAEE',
                '#33EEFF',
                '#33aaaa',
                '#cccccc'
            ]
        }
    ]
};

export default function Visualization1() {
    return <Pie data={data} options={options} />;
}
