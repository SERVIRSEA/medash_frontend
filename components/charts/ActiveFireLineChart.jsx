import React, { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import Highcharts from '@/utils/highcharts-setup';
import HighchartsReact from 'highcharts-react-official';
import { activeFireService } from '@/services';
import {
    activeFireChartDataAtom,
    activeFireChartDataLoadingAtom,
} from '@/state/activeFireAtom';
import LoadingCard from '../loaders/LoadingCard';

const ActiveFireLineChart = () => {
    const [lineChartData, setLineChartData] = useAtom(activeFireChartDataAtom);
    const [loading, setLoading] = useAtom(activeFireChartDataLoadingAtom);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchChartData = async () => {
            try {
                setLoading(true);
                const response = await activeFireService.getActiveFireChartData();
                const rawData = response.data;

                // Transform and sort the data
                const transformedData = Object.keys(rawData)
                    .flatMap((country) =>
                        rawData[country]?.[2025]?.map(({ date, count }) => [
                            new Date(date).getTime(), // Convert date to timestamp
                            count,
                        ])
                    )
                    .sort((a, b) => a[0] - b[0]); // Sort by date (ascending)

                // Store the transformed data in the atom
                setLineChartData({
                    time_series: transformedData || [],
                });
            } catch (err) {
                setError('Error fetching chart data');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        // Fetch the data only if it hasn't already been loaded
        if (!lineChartData) {
            fetchChartData();
        }
    }, [lineChartData, setLineChartData, setLoading]);

    if (loading) return <LoadingCard />;
    if (error) return <div className="error">Error: {error}</div>;

    // Handle null or undefined lineChartData
    const timeSeries = lineChartData?.time_series || [];

    const options = {
        chart: {
            type: 'line',
        },
        title: false,
		subtitle: false,
        tooltip: {
            formatter: function () {
                return `<b>${this.series.name}</b><br/>
                Date: ${Highcharts.dateFormat('%Y-%m-%d', this.x)}<br/>
                Fire Count: ${this.point.y}`;
            },
        },
        yAxis: {title: false,},
        xAxis: {
            type: 'datetime',
            labels: {
                format: '{value:%Y-%m-%d}', // Display full date
                rotation: -45, // Rotate labels for better readability
            },
        },
        plotOptions: {
            series: {
                color: '#d95252',
            },
        },
        legend: {
            align: 'center',
            verticalAlign: 'bottom',
        },
        series: [
            {
                data: timeSeries,
                name: 'Fire Counts',
                color: '#d95252',
                marker: {
                    enabled: true,
                    radius: 3,
                },
            },
        ],
        credits: {
            enabled: false,
        },
        exporting: {
            enabled: true,
            buttons: {
                contextButton: {
                    align: 'right',
                    verticalAlign: 'top',
                    x: 0,
                    y: -15,
                    menuItems: [
                        'viewFullscreen',
                        'separator',
                        'downloadPNG',
                        'downloadJPEG',
                        'downloadPDF',
                        'downloadSVG',
                        'separator',
                        'downloadCSV',
                        'downloadXLS',
                    ],
                },
            },
        },
    };

    return (
        <div className="active-fire-line-chart">
            <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
    );
};

export default ActiveFireLineChart;
