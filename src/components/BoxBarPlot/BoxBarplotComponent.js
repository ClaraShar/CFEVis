import React, { useState, useEffect } from 'react';
import useEcharts from 'react-hooks-echarts';
import echarts from "echarts";
import './style.css';

export default function BoxBarplot(props) {
    // 声明一个新的叫做 data 的 state 变量，初始化为[]
    const [age0, setAge0] = useState([]);
    const [age1, setAge1] = useState([]);
    
    const [debt0, setDebt0] = useState([]);
    const [debt1, setDebt1] = useState([]);

    const [years0, setYears0] = useState([]);
    const [years1, setYears1] = useState([]);

    const [score0, setScore0] = useState([]);
    const [score1, setScore1] = useState([]);

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
          setAge0(age0);
          setAge1(age1);
          setDebt0(debt0);
          setDebt1(debt1);
          setYears0(years0);
          setYears1(years1);
          setScore0(score0);
          setScore1(score1);
          setIncome0(income0);
          setIncome1(income1);
        });        
    }, []);


    useEffect(() => {
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

      const barChart = chartRefAgeBar.current
        barChart.setOption({
          color: '#63b2ee',
          xAxis: {
            type: 'category',
            data: [-1.50431845,-0.94288497 -0.3814515,0.17998197,0.74141544,1.30284891,1.86428239,2.42571586,2.98714933,3.5485828,4.11001627].map((e) => e.toFixed(2))
        },
          yAxis: {
            type: 'value'
          },
          grid: {
            left: '15%',
            right: '5%',
          },
          series: [
            {
              data: [96,209,147,99,53,43,25,9,6,3],
              type: 'bar'
            }
          ]
        })
    }, [age0, age1]);

    useEffect(() => {
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
          xAxis: {
            type: 'category',
            data: [-0.95661321,-0.39374875,0.16911572,0.73198018,1.29484465,1.85770911,2.42057358,2.98343804,3.54630251,4.10916697,4.67203144].map((e) => e.toFixed(2))
        },
          yAxis: {
            type: 'value'
          },
          grid: {
            left: '15%',
            right: '5%',
          },
          series: [
            {
              data: [347,129,55,72,51,19,7,5,2,3],
              type: 'bar'
            }
          ]
        })
    }, [debt0, debt1]);

    useEffect(() => {
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
          xAxis: {
            type: 'category',
            data: [-0.66487669,0.18737375,1.03962418,1.89187462,2.74412505,3.59637549,4.44862592,5.30087636,6.15312679,7.00537723,7.85762766].map((e) => e.toFixed(2))
        },
          yAxis: {
            type: 'value'
          },
          grid: {
            left: '15%',
            right: '5%',
          },
          series: [
            {
              data: [523,95,37,12,12,6,2,2,0,1],
              type: 'bar'
            }
          ]
        })
    }, [years0, years1]);

    useEffect(() => {
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
          xAxis: {
            type: 'category',
            data: [-0.49388662,0.8848802,2.26364702,3.64241383,5.02118065,6.39994747,7.77871429,9.15748111,10.53624792,11.91501474,13.29378156].map((e) => e.toFixed(2))
        },
          yAxis: {
            type: 'value'
          },
          grid: {
            left: '15%',
            right: '5%',
          },
          series: [
            {
              data: [595,72,20,1,0,1,0,0,0,1],
              type: 'bar'
            }
          ]
        })
    }, [score0, score1]);

    useEffect(() => {
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
          xAxis: {
            type: 'category',
            data: [-0.19541334,1.72532701,3.64606735,5.5668077,7.48754804,9.40828839,11.32902873,13.24976908,15.17050942,17.09124977,19.01199011].map((e) => e.toFixed(2))
        },
          yAxis: {
            type: 'value'
          },
          grid: {
            left: '15%',
            right: '5%',
          },
          series: [
            {
              data: [677,8,1,1,0,2,0,0,0,1],
              type: 'bar'
            }
          ]
        })
    }, [income0, income1]);


    return (
      <div className='Wrapper'>
          <div className='Age'>
            <div className='WrapperTitle'>AgeNorm</div>
            <div className='WrapperContent'>
              <div ref={refAgeBar} className="Barchart"></div>
              <div ref={refAgeBox} className="Boxplot"></div>            
            </div>
          </div>
          <div className='Debt'>
            <div className='WrapperTitle'>DebtNorm</div>
            <div className='WrapperContent'>
              <div ref={refDebtBar} className="Barchart"></div>
              <div ref={refDebtBox} className="Boxplot"></div>
            </div>
          </div>
          <div className='Years'>
            <div className='WrapperTitle'>YearsNorm</div>
            <div className='WrapperContent'>
              <div ref={refYearsBar} className="Barchart"></div>
              <div ref={refYearsBox} className="Boxplot"></div>            
            </div>
          </div>
          <div className='Score'>
            <div className='WrapperTitle'>ScoreNorm</div>
            <div className='WrapperContent'>
              <div ref={refScoreBar} className="Barchart"></div>
              <div ref={refScoreBox} className="Boxplot"></div>
            </div>
          </div>
          <div className='Income'>
            <div className='WrapperTitle'>IncomeNorm</div>
            <div className='WrapperContent'>
              <div ref={refIncomeBar} className="Barchart"></div>
              <div ref={refIncomeBox} className="Boxplot"></div>
            </div>
          </div>
      </div>
    )
} 