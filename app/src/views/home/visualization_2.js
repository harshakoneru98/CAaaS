import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    scales: {
        y: {
            suggestedMin: 0,
            suggestedMax: 100,
            title: {
                display: true,
                text: 'Percentage'
            }
        }
    },
    plugins: {
        legend: {
            position: 'right'
        },
        title: {
            display: true,
            text: 'Age Distribution of Stroke Patients by Gender'
        }
    }
};

const labels = ['<18', '18-30', '30-50', '50-70', '>70'];

export const data = {
    labels,
    datasets: [
        {
            label: 'Female',
            data: [1.41, 0, 8.5, 34, 56],
            backgroundColor: '#90D1C5'
        },
        {
            label: 'Male',
            data: [0, 0, 5.5, 43.5, 51],
            backgroundColor: '#FDBAAB'
        }
    ]
};

export default function Visualization2() {
    return <Bar options={options} data={data} />;
}
