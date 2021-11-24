import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    scales: {
        y: {
            title: {
                display: true,
                text: 'Deaths per 100,000 people'
            }
        }
    },
    plugins: {
        legend: {
            position: 'bottom'
        },
        title: {
            display: true,
            text: 'Mortality Rates of Leading Causes of Death (1950-2018)'
        }
    }
};

const labels = [1950, 1960, 1970, 1980, 1990, 2000, 2010, 2018];

export const data = {
    labels,
    datasets: [
        {
            label: 'Heart Diseases',
            data: [588.8, 559.0, 492.7, 412.1, 321.8, 257.6, 179.1, 183.6],
            borderColor: '#FF595F',
            backgroundColor: '#FF595F'
        },
        {
            label: 'Cerebrovascular Diseases',
            data: [180.7, 177.9, 147.7, 96.2, 65.3, 60.9, 39.1, 37.1],
            borderColor: '#FF9C94',
            backgroundColor: '#FF9C94'
        },
        {
            label: 'Cancer',
            data: [193.9, 193.9, 198.6, 207.9, 216.0, 199.6, 172.8, 149.1],
            borderColor: '#FFD65A',
            backgroundColor: '#FFD65A'
        },
        {
            label: 'Respiratory Diseases',
            data: [0, 0, 0, 28.3, 37.2, 44.2, 42.2, 39.7],
            borderColor: '#5AB0C4',
            backgroundColor: '#5AB0C4'
        },
        {
            label: 'Unintentional Injuries',
            data: [78.0, 62.3, 60.1, 46.4, 36.3, 34.9, 38.0, 48.0],
            borderColor: '#57C1A5',
            backgroundColor: '#57C1A5'
        }
    ]
};

export default function Visualization3() {
    return <Line options={options} data={data} />;
}
