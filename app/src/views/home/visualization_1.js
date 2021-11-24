import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Title, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend, Title, ChartDataLabels);

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
        },
        legend: {
            position: 'bottom'
        },
        title: {
            display: true,
            text: 'Smoking Status of Stroke Patients'
        }
    }
};

export const data = {
    labels: ['Smokes', 'Formerly Smoked', 'Never Smoked', 'Prefer not to say'],

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
