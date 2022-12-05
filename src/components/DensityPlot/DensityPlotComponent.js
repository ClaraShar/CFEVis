import React, { useState, useEffect } from 'react';
import useEcharts from 'react-hooks-echarts';
import echarts from "echarts";
import './style.css';

export default function DensityPlot(props) {
    // 声明一个新的叫做 data 的 state 变量，初始化为[]
    const [age, setAge] = useState([]);
    const [debt, setDebt] = useState([]);
    const [years, setYears] = useState([]);
    // const [feature0, setFeature0] = useState([]);
    // const [feature1, setFeature1] = useState([]);
    const [score, setScore] = useState([]);
    // const [income, setIncome] = useState([]);
    // const [ethnicity, setEthnicity] = useState([]);

    const [chartRefAgeScatter, refAgeScatter] = useEcharts();

    useEffect(() => {
        fetch('/api/getScatterplotData', {
          method: 'get',
          headers: {
              'Accept': 'application/json',
          },
        }).then(res => res.json())
        .then(res => {
          var age = [], debt = [], years = [], score = [], income = [], ethnicity = [], feature0 = [], feature1 = [];
          for(let i = 0; i < res.data.data.length; i++) {
            if(res.data.data[i].flag == 3 && res.data.data[i].PriorDefault == 1) {
              debt.push([1, res.data.data[i].Debt])
              score.push([2, res.data.data[i].CreditScore])
              years.push([3, res.data.data[i].YearsEmployed])
              age.push([4, res.data.data[i].Age])
            } 
            // else {
            //   feature1.push([2, parseInt(res.data.data[i].CreditScore)+5])
            // }
            // age.push([1, parseFloat(res.data.data[i].Age)])
            // debt.push([2, parseFloat(res.data.data[i].Debt)]) // +5,用于上移
            // years.push([3, parseInt(res.data.data[i].YearsEmployed)])
            // score.push([4, parseFloat(res.data.data[i].CreditScore)])
            // income.push([5, parseFloat(res.data.data[i].Income)])
            // ethnicity.push([6, parseFloat(res.data.data[i].Ethnicity)+1])
          }
          setAge(age);
          setDebt(debt);
          setYears(years);
          setScore(score);
          // setIncome(income);
          // setEthnicity(ethnicity);
          // setFeature0(feature0);
          // setFeature1(feature1);
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
            // color: 'rgba(128, 128, 128, 0.05)',
            color: 'rgba(99,178,238,0.05)',
            series: [
                {
                symbolSize: 37,
                symbol: 'rect',
                data: [...debt, ...score, ...years, ...age],
                type: 'scatter'
                }
            ]
        })
    }, [debt, score, years, age]);


    return (
      <div className='Wrapper'>
        <div className='WrapperTitle'>ViCE</div>
        <div className='WrapperContent'>
          <div ref={refAgeScatter} className="ScatterPlot"></div>           
        </div>
      </div>
    )
} 