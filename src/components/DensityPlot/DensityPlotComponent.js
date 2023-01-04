import React, { useState, useEffect } from 'react';
import useEcharts from 'react-hooks-echarts';
import echarts from "echarts";
import './style.css';

export default function DensityPlot(props) {
    // 声明一个新的叫做 data 的 state 变量，初始化为[]
    const [age, setAge] = useState([]);
    const [debt, setDebt] = useState([]);
    const [years, setYears] = useState([]);
    const [score, setScore] = useState([]);
    // const [income, setIncome] = useState([]);

    const [chartRefScatter, refScatter] = useEcharts();

    useEffect(() => {
        fetch('/api/getScatterplotData', {
          method: 'get',
          headers: {
              'Accept': 'application/json',
          },
        }).then(res => res.json())
        .then(res => {
          var age = [], debt = [], years = [], score = [], income = [];
          for(let i = 0; i < res.data.data.length; i++) {
            // if(res.data.data[i].flag == 3 && res.data.data[i].PriorDefault == 1) {
              debt.push(['Debt', res.data.data[i].Debt + 0.1])
              score.push(['CreditScore', res.data.data[i].CreditScore + 0.1])
              years.push(['YearsEmployed', res.data.data[i].YearsEmployed + 0.1])
              age.push(['Age', res.data.data[i].Age + 0.1])
            // } 
            // else {
            // }
            // income.push([5, parseFloat(res.data.data[i].Income)])
          }
          setAge(age);
          setDebt(debt);
          setYears(years);
          setScore(score);
          // setIncome(income);
        });        
    }, []);


    useEffect(() => {
        const scatterChart = chartRefScatter.current
        scatterChart.setOption({
          tooltip: {
            show: true,
          },
            xAxis: {
                splitLine: {
                  show: false,
                },
                type: 'category',
                axisLabel: {
                  interval: 0,
                  rotate: 45,
                },
              },
              yAxis: {
                splitLine: {
                  show: false,
                },
              },
            series: [
              {
                symbolSize: 37,
                symbol: 'rect',
                data: [...age, ...years, ...score, ...debt, ...[[7,-0.1], [8,-0.1], [9,-0.1]]],
                type: 'scatter',
                itemStyle: {
                  normal: {
                    color: function(e) {
                      if (e.data[0] == 'Age') {
                        return 'rgba(128, 128, 128, 0.05';
                      } else {
                        return 'rgba(99,178,238, 0.05)';
                      }
                    }
                  }
                },
                select: {
                  itemStyle: {
                    borderColor: '#212121',
                  }
                },
              }
            ]
        })
    }, [debt, score, years, age]);


    return (
      <div className='Wrapper'>
        <div className='WrapperTitle'>ViCE</div>
        <div className='WrapperContent'>
          <div ref={refScatter} className="ScatterPlot"></div>           
        </div>
      </div>
    )
} 