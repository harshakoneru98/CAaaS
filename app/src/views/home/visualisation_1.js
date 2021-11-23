import embed from 'vega-embed';

function Visualisation1(props) {
    let chartSpec = {
        $schema: 'https://vega.github.io/schema/vega-lite/v4.json',
        title: {
            text: 'Smoking Habits Statistics',
            dy: -12,
            subtitle: 'United States of America'
        },
        background: '#F6F6F6',
        padding: { top: 14, right: 14, bottom: 14, left: 14 },
        data: {
            values: [
                { category: 'Unknown', quantity: 1544 },
                { category: 'formerly smoked', quantity: 885 },
                { category: 'never smoked', quantity: 1892 },
                { category: 'smokes', quantity: 789 }
            ]
        },
        transform: [
            {
                joinaggregate: [
                    {
                        op: 'sum',
                        field: 'quantity',
                        as: 'Count'
                    }
                ]
            },
            {
                calculate: 'datum.quantity/datum.Count',
                as: 'PercentOfTotal'
            }
        ],
        encoding: {
            theta: { field: 'quantity', type: 'quantitative', stack: true },
            color: {
                field: 'quantity',
                type: 'nominal',
                scale: {
                    range: [
                        '#FDBAAB',
                        '#FFEBA5',
                        '#99C3E1',
                        '#90D1C5',
                        '#66AAEE',
                        '#33EEFF',
                        '#33aaaa',
                        '#cccccc'
                    ]
                },
                legend: null
            },
            order: { field: 'quantity', sort: 'descending' },
            tooltip: [
                { field: 'category', type: 'nominal', title: 'Smoking Status' },
                {
                    field: 'quantity',
                    type: 'quantitative',
                    title: 'Relative value'
                },
                {
                    field: 'PercentOfTotal',
                    type: 'quantitative',
                    title: '% of total',
                    format: '.0%'
                }
            ]
        },

        layer: [
            {
                mark: { type: 'arc', outerRadius: 150, stroke: '#fff' }
            },
            {
                mark: {
                    type: 'text',
                    radius: 190,
                    fill: '#202630',
                    fontSize: 12
                },
                encoding: {
                    text: { field: 'category', type: 'nominal' }
                }
            },
            {
                mark: {
                    type: 'text',
                    radius: 100,
                    fill: '#000000',
                    fontSize: 15
                },
                encoding: {
                    text: {
                        field: 'PercentOfTotal',
                        type: 'quantitative',
                        title: '% of total',
                        format: '.0%'
                    }
                }
            }
        ],
        view: { stroke: null }
    };

    const result = embed('#' + props.name, chartSpec);

    return (
        <div>
            <div id={props.name}></div>
        </div>
    );
}

export default Visualisation1;
