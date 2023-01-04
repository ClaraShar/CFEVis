import React, { useState, useEffect } from 'react';
import useEcharts from 'react-hooks-echarts';
import * as echarts from 'echarts';
import './style.css';
import { style } from 'd3';
var ecStat = require("echarts-stat");

export default function BoxBarplot(props) {
    // 声明一个新的叫做 data 的 state 变量，初始化为[]
    const [age, setAge] = useState([]);
    const [age0, setAge0] = useState([]);
    const [age1, setAge1] = useState([]);
    
    const [debt, setDebt] = useState([]);
    const [debt0, setDebt0] = useState([]);
    const [debt1, setDebt1] = useState([]);

    const [years, setYears] = useState([]);
    const [years0, setYears0] = useState([]);
    const [years1, setYears1] = useState([]);

    const [score, setScore] = useState([]);
    const [score0, setScore0] = useState([]);
    const [score1, setScore1] = useState([]);

    const [income, setIncome] = useState([]);
    const [income0, setIncome0] = useState([]);
    const [income1, setIncome1] = useState([]);

    const [chartRefAgeBox, refAgeBox] = useEcharts();
    const [chartRefAgeBar, refAgeBar] = useEcharts();

    const [chartRefDebtBox, refDebtBox] = useEcharts();
    const [chartRefDebtBar, refDebtBar] = useEcharts();

    const [chartRefYearsBox, refYearsBox] = useEcharts();
    const [chartRefYearsBar, refYearsBar] = useEcharts();

    const [chartRefScoreBox, refScoreBox] = useEcharts();
    const [chartRefScoreBar, refScoreBar] = useEcharts();

    const [chartRefIncomeBox, refIncomeBox] = useEcharts();
    const [chartRefIncomeBar, refIncomeBar] = useEcharts();

    var interval;
    var min = Infinity, max = -Infinity;

    function renderItem(params, api) {
      let yValue = api.value(2);
      let start = api.coord([api.value(0), yValue]);
      let size = api.size([api.value(1) - api.value(0), yValue]);
      var style = api.style();

      return {
        type: 'rect',
        shape: {
          x: start[0] + 1,
          y: start[1],
          width: size[0] - 2,
          height: size[1],
        },
        style: {
          grid: {
            show: false,
            left: '15%',
            right: '5%',
          },
          xAxis: [{
            type: 'value',
            min: min,
            max: max,
            interval: interval,
          }],
          ...style,
        },
      }
    }

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        fetch('/api/getBoxplotData', {
          method: 'get',
          headers: {
              'Accept': 'application/json',
          },
        }).then(res => res.json())
        .then(res => {
          var age0 = [], debt0 = [], years0 = [], score0 = [], income0 = [], age1 = [], debt1 = [], years1 = [], score1 = [], income1 = []
          for(let i = 0; i < res.data.data.length; i++) {
            if(res.data.data[i].Approved == '0') {
              age0.push(parseFloat(res.data.data[i].Age))
              debt0.push(parseFloat(res.data.data[i].Debt))
              years0.push(parseFloat(res.data.data[i].YearsEmployed))
              score0.push(parseFloat(res.data.data[i].CreditScore))
              income0.push(parseFloat(res.data.data[i].Income))
            } else{
              age1.push(parseFloat(res.data.data[i].Age))
              debt1.push(parseFloat(res.data.data[i].Debt))
              years1.push(parseFloat(res.data.data[i].YearsEmployed))
              score1.push(parseFloat(res.data.data[i].CreditScore))
              income1.push(parseFloat(res.data.data[i].Income))
            }
          }
          setAge([...age0,...age1]);
          setAge0(age0);
          setAge1(age1);
          setDebt([...debt0,...debt1]);
          setDebt0(debt0);
          setDebt1(debt1);
          setYears([...years0,...years1]);
          setYears0(years0);
          setYears1(years1);
          setScore([...score0,...score1]);
          setScore0(score0);
          setScore1(score1);
          setIncome([...income0,...income1]);
          setIncome0(income0);
          setIncome1(income1);
        });        
    }, []);

    useEffect(() => {
      if(age.length === 0) return;
      var bins = ecStat.histogram(age)
      var data = echarts.util.map(bins.data, function(item, index) {
        let x0 = bins.bins[index].x0;
        let x1 = bins.bins[index].x1;
        interval = x1 - x0;
        min = Math.min(min, x0);
        max = Math.max(max, x1);
        return [x0, x1, item[1]]; 
      });

      const boxChart = chartRefAgeBox.current
        boxChart.setOption({
          dataset: [
            {
              // prettier-ignore
              source: [
                        age1,
                        age0,
                    ]
            },
            {
              transform: {
                type: 'boxplot',
                config: {
                  itemNameFormatter: function (params) {
                    return params.value;
                  }
                }
              }
            },
            {
              fromDatasetIndex: 1,
              fromTransformResult: 1
            }
          ],
          tooltip: {
            trigger: 'item',
            axisPointer: {
              type: 'shadow'
            }
          },
          // title: {
          //   text: "AgeStd",
          //   top: '10%',
          //   left: 'center',
          // },
          yAxis: {
            // name: 'Approved',
            type: 'category',
            boundaryGap: true,
            nameGap: 30,
            splitArea: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisLine: {
              onZero: false,
            },
          },
          xAxis: {
            type: 'value',
            splitArea: {
              show: false
            }
          },
          series: [
            {
              name: 'boxplot',
              type: 'boxplot',
              datasetIndex: 1
            },
            {
              name: 'outlier',
              type: 'scatter',
              encode: { x: 1, y: 0 },
              datasetIndex: 2,
              itemStyle:{
                color: '#76da91',
              },
            }
          ]
        })

      const barChart = chartRefAgeBar.current
        barChart.setOption({
          // title: {
          //   text: "AgeLog",
          //   top: '10%',
          //   left: 'center',
          // },
          color: '#63b2ee',
          xAxis: [{
            splitLine: {
              show: false,
            },
            // type: 'value',
            // min: min,
            // max: max,
            // interval: interval,
            // axisLabel: {
            //   show: false,
            // },
            // data: 
            // [0,0.125,0.25 ,0.375,0.5 ,0.625,0.75 ,0.875,1. ] // Log
            // [-1.50431845,-0.94288497 -0.3814515,0.17998197,0.74141544,1.30284891,1.86428239,2.42571586,2.98714933,3.5485828,4.11001627].map((e) => e.toFixed(2)), // std
            // [13.75,22.0625,30.375,38.6875,47,55.3125,63.625,71.9375,80.25].map((e) => e.toFixed(2)), 原始值
        }],
          yAxis: [{
            axisLine: false,
            type: 'value'
          }],
          grid: {
            left: '15%',
            right: '5%',
          },
          series: [
            {
              type: 'custom',
              renderItem: renderItem,
              encode: {
                x: [0,1],
                y: 2,
                tooltip: 2,
                label: 2,
              },
              data: data,
              // data: [210,0 ,0,0,0 ,0 ,0,480],// [96,209,147,99,53,43,25,9,6,3],std // [148,231,148,77,48,25,9,4], 原始值
              // type: 'bar'
            }
          ]
        })
    }, [age, age0, age1]);

    useEffect(() => {
      if(debt.length === 0) return;
      var bins = ecStat.histogram(debt)
      var data = echarts.util.map(bins.data, function(item, index) {
        let x0 = bins.bins[index].x0;
        let x1 = bins.bins[index].x1;
        interval = x1 - x0;
        min = Math.min(min, x0);
        max = Math.max(max, x1);
        return [x0, x1, item[1]]; 
      });

      const boxChart = chartRefDebtBox.current
        boxChart.setOption({
          dataset: [
            {
              // prettier-ignore
              source: [
                        debt1,
                        debt0,
                    ]
            },
            {
              transform: {
                type: 'boxplot',
                config: {
                  itemNameFormatter: function (params) {
                    return params.value;
                  }
                }
              }
            },
            {
              fromDatasetIndex: 1,
              fromTransformResult: 1
            }
          ],
          tooltip: {
            trigger: 'item',
            axisPointer: {
              type: 'shadow'
            }
          },
          yAxis: {
            type: 'category',
            boundaryGap: true,
            nameGap: 30,
            splitArea: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisLine: {
              onZero: false,
            },
          },
          xAxis: {
            type: 'value',
            splitArea: {
              show: false
            }
          },
          series: [
            {
              name: 'boxplot',
              type: 'boxplot',
              datasetIndex: 1
            },
            {
              name: 'outlier',
              type: 'scatter',
              encode: { x: 1, y: 0 },
              datasetIndex: 2,
              itemStyle:{
                color: '#76da91',
              },
            }
          ]
        })

      const barChart = chartRefDebtBar.current
        barChart.setOption({
          color: '#f8cb7f',
          xAxis: [{
            splitLine: {
              show: false,
            },
            // data: [2.62103955,2.84155297,3.06206639,3.2825798,3.50309322,3.72360664,3.94412005,4.16463347,4.38514689].map((e) => e.toFixed(2)), // log
            // [-0.95661321,-0.39374875,0.16911572,0.73198018,1.29484465,1.85770911,2.42057358,2.98343804,3.54630251,4.10916697,4.67203144].map((e) => e.toFixed(2)) std
        }],
        yAxis: [{
          axisLine: false,
          type: 'value'
        }],
          grid: {
            left: '15%',
            right: '5%',
          },
          series: [
            {
              type: 'custom',
              renderItem: renderItem,
              encode: {
                x: [0,1],
                y: 2,
                tooltip: 2,
                label: 2,
              },
              data: data,
            }
          ]
        })
    }, [debt, debt0, debt1]);

    useEffect(() => {
      if(years.length === 0) return;
      var bins = ecStat.histogram(years)
      var data = echarts.util.map(bins.data, function(item, index) {
        let x0 = bins.bins[index].x0;
        let x1 = bins.bins[index].x1;
        interval = x1 - x0;
        min = Math.min(min, x0);
        max = Math.max(max, x1);
        return [x0, x1, item[1]]; 
      });

      const boxChart = chartRefYearsBox.current
        boxChart.setOption({
          dataset: [
            {
              // prettier-ignore
              source: [
                        years1,
                        years0,
                    ]
            },
            {
              transform: {
                type: 'boxplot',
                config: {
                  itemNameFormatter: function (params) {
                    return params.value;
                  }
                }
              }
            },
            {
              fromDatasetIndex: 1,
              fromTransformResult: 1
            }
          ],
          tooltip: {
            trigger: 'item',
            axisPointer: {
              type: 'shadow'
            }
          },
          yAxis: {
            type: 'category',
            boundaryGap: true,
            nameGap: 30,
            splitArea: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisLine: {
              onZero: false,
            },
          },
          xAxis: {
            type: 'value',
            splitArea: {
              show: false
            }
          },
          series: [
            {
              name: 'boxplot',
              type: 'boxplot',
              datasetIndex: 1
            },
            {
              name: 'outlier',
              type: 'scatter',
              encode: { x: 1, y: 0 },
              datasetIndex: 2,
              itemStyle:{
                color: '#76da91',
              },
            }
          ]
        })

      const barChart = chartRefYearsBar.current
        barChart.setOption({
          color: '#f89588',
          xAxis: [{
            splitLine: {
              show: false,
            },
          }],
        yAxis: [{
          axisLine: false,
          type: 'value'
        }],
          grid: {
            left: '15%',
            right: '5%',
          },
          series: [
            {
              type: 'custom',
              renderItem: renderItem,
              encode: {
                x: [0,1],
                y: 2,
                tooltip: 2,
                label: 2,
              },
              data: data,
            }
          ]
        })
    }, [years, years0, years1]);

    useEffect(() => {
      if(score.length === 0) return;
      var bins = ecStat.histogram(score)
      var data = echarts.util.map(bins.data, function(item, index) {
        let x0 = bins.bins[index].x0;
        let x1 = bins.bins[index].x1;
        interval = x1 - x0;
        min = Math.min(min, x0);
        max = Math.max(max, x1);
        return [x0, x1, item[1]]; 
      });

      const boxChart = chartRefScoreBox.current
        boxChart.setOption({
          dataset: [
            {
              // prettier-ignore
              source: [
                        score1,
                        score0,
                    ]
            },
            {
              transform: {
                type: 'boxplot',
                config: {
                  itemNameFormatter: function (params) {
                    return params.value;
                  }
                }
              }
            },
            {
              fromDatasetIndex: 1,
              fromTransformResult: 1
            }
          ],
          tooltip: {
            trigger: 'item',
            axisPointer: {
              type: 'shadow'
            }
          },
          yAxis: {
            type: 'category',
            boundaryGap: true,
            nameGap: 30,
            splitArea: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisLine: {
              onZero: false,
            },
          },
          xAxis: {
            type: 'value',
            splitArea: {
              show: false
            }
          },
          series: [
            {
              name: 'boxplot',
              type: 'boxplot',
              datasetIndex: 1
            },
            {
              name: 'outlier',
              type: 'scatter',
              encode: { x: 1, y: 0 },
              datasetIndex: 2,
              itemStyle:{
                color: '#76da91',
              },
            }
          ]
        })

      const barChart = chartRefScoreBar.current
        barChart.setOption({
          color: '#7cd6cf',
          xAxis: [{
            splitLine: {
              show: false,
            },
          }],
        yAxis: [{
          axisLine: false,
          type: 'value'
        }],
          grid: {
            left: '15%',
            right: '5%',
          },
          series: [
            {
              type: 'custom',
              renderItem: renderItem,
              encode: {
                x: [0,1],
                y: 2,
                tooltip: 2,
                label: 2,
              },
              data: data,
            }
          ]
        })
    }, [score, score0, score1]);

    useEffect(() => {
      if(income.length === 0) return;
      var bins = ecStat.histogram(income)
      var data = echarts.util.map(bins.data, function(item, index) {
        let x0 = bins.bins[index].x0;
        let x1 = bins.bins[index].x1;
        interval = x1 - x0;
        min = Math.min(min, x0);
        max = Math.max(max, x1);
        return [x0, x1, item[1]]; 
      });

      const boxChart = chartRefIncomeBox.current
        boxChart.setOption({
          dataset: [
            {
              // prettier-ignore
              source: [
                        income1,
                        income0,
                    ]
            },
            {
              transform: {
                type: 'boxplot',
                config: {
                  itemNameFormatter: function (params) {
                    return params.value;
                  }
                }
              }
            },
            {
              fromDatasetIndex: 1,
              fromTransformResult: 1
            }
          ],
          tooltip: {
            trigger: 'item',
            axisPointer: {
              type: 'shadow'
            }
          },
          yAxis: {
            type: 'category',
            boundaryGap: true,
            nameGap: 30,
            splitArea: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisLine: {
              onZero: false,
            },
          },
          xAxis: {
            type: 'value',
            splitArea: {
              show: false
            }
          },
          series: [
            {
              name: 'boxplot',
              type: 'boxplot',
              datasetIndex: 1
            },
            {
              name: 'outlier',
              type: 'scatter',
              encode: { x: 1, y: 0 },
              datasetIndex: 2,
              itemStyle:{
                color: '#76da91',
              },
            }
          ]
        })

      const barChart = chartRefIncomeBar.current
        barChart.setOption({
          color: '#efa666',
          xAxis: [{
            splitLine: {
              show: false,
            },
          }],
        yAxis: [{
          axisLine: false,
          type: 'value'
        }],
          grid: {
            left: '15%',
            right: '5%',
          },
          series: [
            {
              type: 'custom',
              renderItem: renderItem,
              encode: {
                x: [0,1],
                y: 2,
                tooltip: 2,
                label: 2,
              },
              data: data,
            }
          ]
        })
    }, [income, income0, income1]);


    return (
      <div className='Wrapper'>
          <div className='Age'>
            <div className='WrapperTitle'>Age</div>
            <div className='WrapperContent'>
              <div ref={refAgeBar} className="Barchart"></div>
              <div ref={refAgeBox} className="Boxplot"></div>            
            </div>
          </div>
          <div className='Debt'>
            <div className='WrapperTitle'>DebtStd</div>
            <div className='WrapperContent'>
              <div ref={refDebtBar} className="Barchart"></div>
              <div ref={refDebtBox} className="Boxplot"></div>
            </div>
          </div>
          <div className='Years'>
            <div className='WrapperTitle'>YearsEmployedStd</div>
            <div className='WrapperContent'>
              <div ref={refYearsBar} className="Barchart"></div>
              <div ref={refYearsBox} className="Boxplot"></div>            
            </div>
          </div>
          <div className='Score'>
            <div className='WrapperTitle'>CreditScoreLog</div>
            <div className='WrapperContent'>
              <div ref={refScoreBar} className="Barchart"></div>
              <div ref={refScoreBox} className="Boxplot"></div>
            </div>
          </div>
          <div className='Income'>
            <div className='WrapperTitle'>IncomeLog</div>
            <div className='WrapperContent'>
              <div ref={refIncomeBar} className="Barchart"></div>
              <div ref={refIncomeBox} className="Boxplot"></div>
            </div>
          </div>
      </div>
    )
} 