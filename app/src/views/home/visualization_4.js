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
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartDataLabels
);

export const options = {
    scaleShowValues: true,
    scales: {
        yAxes: {
            ticks: {
                autoSkip: false
            }
        },
        x: {
            title: {
                display: true,
                text: 'Deaths per 100,000 people'
            }
        }
    },
    indexAxis: 'y',
    elements: {
        bar: {
            borderWidth: 2
        }
    },
    responsive: true,
    plugins: {
        datalabels: {
            display: false
        },
        legend: {
            display: false
        },
        title: {
            display: true,
            text: 'State with Highest Stroke Mortality(2019)'
        }
    }
};

const labels = [
    'Oklahoma',
    'Mississippi',
    'Arkansas',
    'Alabama',
    'Louisiana',
    'Tennessee',
    'Nevada',
    'West Virginia',
    'Kentucky',
    'Michigan',
    'Ohio',
    'Missouri',
    'Indiana',
    'Georgia',
    'Iowa'
];

export const data = {
    labels,
    datasets: [
        {
            data: [
                231.4, 226.7, 226.5, 219.6, 207.8, 202.8, 198.1, 197.4, 196.4,
                193.8, 188.8, 187.0, 178.8, 175.5, 172.9
            ],
            borderColor: '#649CD9',
            backgroundColor: '#649CD9'
        }
    ]
};

export default function Visualization4() {
    return <Bar options={options} data={data} />;
}
