import React, { useState, useEffect } from 'react';
import useEcharts from 'react-hooks-echarts';
import './style.css';

export default function FeatureImportancePlot(props) {
    const [chartRefBar, refBar] = useEcharts();

    useEffect(() => {
        const barChart = chartRefBar.current
        barChart.setOption({
            title: {
                text: 'Feature Importance',
                left: 'center',
              },
              tooltip: {
                trigger: 'axis',
                axisPointer: {
                  type: 'shadow'
                }
              },
              grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true,
              },
              xAxis: {
                type: 'value',
                boundaryGap: [0, 0.01]
              },
              yAxis: {
                type: 'category',
                data: ['Ethnicity', 'Employed', 'EducationLevel', 'Age', 'Citizen', 'Debt','CreditScore', 'YearsEmployed', 'PriorDefault']
              },
              series: [
                {
                  type: 'bar',
                  data: [0.025079, 0.062647, 0.065417, 0.086645, 0.090377, 0.099940, 0.100262, 0.109382, 0.308404],
                  color: '#7898e1',
                }
              ]
        })

    }, []);

    return (
        <div>
            <div className="BarChartComp">
                {/* <div className='BarChartTitle'></div> */}
                <div ref={refBar} className="BarChartContent"></div>
            </div>
        </div>
    )
}