import React, { useState, useEffect } from 'react';
import useEcharts from 'react-hooks-echarts';
import echarts from "echarts";
import './style.css';

export default function DensityPlot(props) {
    // 声明一个新的叫做 data 的 state 变量，初始化为[]
    const [age, setAge] = useState([]);
    const [debt, setDebt] = useState([]);

    const [chartRefAgeScatter, refAgeScatter] = useEcharts();

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        fetch('/api/getScatterplotData', {
          method: 'get',
          headers: {
              'Accept': 'application/json',
          },
        }).then(res => res.json())
        .then(res => {
          var age = [], debt = [];
          for(let i = 0; i < res.data.data.length; i++) {
            age.push([1, parseFloat(res.data.data[i].Age)])
            debt.push([2, parseFloat(res.data.data[i].Debt)])
          }
          setAge(age);
          setDebt(debt);
        });        
    }, []);


    useEffect(() => {
        const scatterChart = chartRefAgeScatter.current
        scatterChart.setOption({
            xAxis: {
                splitLine: {
                  show: false,
                },
              },
              yAxis: {
                splitLine: {
                  show: false,
                },
              },
            color: 'rgba(128, 128, 128, 0.05)',
            series: [
                {
                symbolSize: 20,
                symbol: 'rect',
                data: [...age, ...debt],
                type: 'scatter'
                }
            ]
        })
    }, [age, debt]);


    return (
      <div className='Wrapper'>
        <div className='WrapperTitle'>ViCE</div>
        <div className='WrapperContent'>
          <div ref={refAgeScatter} className="ScatterPlot"></div>           
        </div>
      </div>
    )
} 