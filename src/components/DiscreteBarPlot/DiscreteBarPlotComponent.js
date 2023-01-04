import React, { useEffect } from 'react';
import useEcharts from 'react-hooks-echarts';
import './style.css';

export default function DiscreteBarPlot(props) {
    const [chartRefPriorDefaultBar, refPriorDefaultBar] = useEcharts();
    const [chartRefEmployedBar, refEmployedBar] = useEcharts();

    useEffect(() => {
        const barChart = chartRefPriorDefaultBar.current
        barChart.setOption({
            title: {
                text: 'Approval based on PriorDefault',
                left: 'center',
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              }
            },
            legend: {
              orient: 'veritical',
              left: 'right',
              top: '10%',
            },
            grid: {
              left: '3%',
              right: '12%',
              bottom: '3%',
              containLabel: true
            },
            xAxis: [
              {
                type: 'category',
                data: [0, 1],
                name: 'PriorDefault'
              }
            ],
            yAxis: [
              {
                type: 'value',
                name: 'Frequency'
              }
            ],
            series: [
              {
                name: '0',
                type: 'bar',
                stack: 'Ad',
                emphasis: {
                  focus: 'series'
                },
                data: [306, 77],
              },
              {
                name: '1',
                type: 'bar',
                stack: 'Ad',
                emphasis: {
                  focus: 'series'
                },
                data: [23, 284],
                color: 'pink',
              },
            ]
        })

    }, []);

    useEffect(() => {
        const barChart = chartRefEmployedBar.current
        barChart.setOption({
            title: {
                text: 'Approval based on Employed',
                left: 'center',
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              }
            },
            legend: {
              orient: 'veritical',
              left: 'right',
              top: '10%',
            },
            grid: {
              left: '3%',
              right: '12%',
              bottom: '3%',
              containLabel: true
            },
            xAxis: [
              {
                type: 'category',
                data: [0, 1],
                name: 'Employed'
              }
            ],
            yAxis: [
              {
                type: 'value',
                name: 'Frequency'
              }
            ],
            series: [
              {
                name: '0',
                type: 'bar',
                stack: 'Ad',
                emphasis: {
                  focus: 'series'
                },
                data: [297, 86],
              },
              {
                name: '1',
                type: 'bar',
                stack: 'Ad',
                emphasis: {
                  focus: 'series'
                },
                data: [98, 209],
                color: 'pink',
              },
            ]
        })

    }, []);

    return (
        <div>
            {/* <div className="DiscreteBarPlot"> */}
                {/* <div className='BarChartTitle'></div> */}
                <div ref={refPriorDefaultBar} className="DiscreteBar1"></div>
                <div ref={refEmployedBar} className="DiscreteBar2"></div>
            {/* </div> */}
        </div>
    )
}