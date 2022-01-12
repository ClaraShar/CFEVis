import React, { useState, useEffect } from 'react';
import useEcharts from 'react-hooks-echarts';
import echarts from "echarts";
// import './style.css'

export default function Boxplot(props) {
    // 声明一个新的叫做 data 的 state 变量，初始化为[]
    const [data, setData] = useState([]);

    const [chartRef, ref] = useEcharts()

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
      // fetch('/api/getBoxplotData', {
      //       method: 'get',
      //       headers: {
      //           'Accept': 'application/json',
      //       },
      //   }).then(res => res.json())
      //       .then(res => {
      //         var getData = [], age = [], debt = [], years = [], score = [], income = []
      //         for(let i = 0; i < res.data.data.length; i++) {
      //           age.push(res.data.data[i]['Age'])
      //           debt.push(res.data.data[i]['Debt'])
      //           years.push(res.data.data[i]['YearsEmployed'])
      //           score.push(res.data.data[i]['CreditScore'])
      //           income.push(res.data.data[i]['Income'])
      //         }
      //         // getData.push(age)
      //         getData.push(debt)
      //         getData.push(years)
      //         // getData.push(score)
      //         // getData.push(income)
      //         console.log("getData:",getData)
      //         setData(getData)
      //     });
        const chart = chartRef.current
        chart.setOption({
            title: [
                {
                  text: 'Michelson-Morley Experiment',
                  left: 'center'
                },
                {
                  text: 'upper: Q3 + 1.5 * IQR \nlower: Q1 - 1.5 * IQR',
                  borderColor: '#999',
                  borderWidth: 1,
                  textStyle: {
                    fontWeight: 'normal',
                    fontSize: 14,
                    lineHeight: 20
                  },
                  left: '10%',
                  top: '90%'
                }
              ],
              dataset: [
                {
                  // prettier-ignore
                  source: data
                },
                {
                  transform: {
                    type: 'boxplot',
                    config: { itemNameFormatter: 'expr {value}' }
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
              grid: {
                left: '10%',
                right: '10%',
                bottom: '15%'
              },
              xAxis: {
                type: 'category',
                boundaryGap: true,
                nameGap: 30,
                splitArea: {
                  show: false
                },
                splitLine: {
                  show: false
                }
              },
              yAxis: {
                type: 'value',
                name: 'km/s minus 299,000',
                splitArea: {
                  show: true
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
                  datasetIndex: 2
                }
              ]
        })
    });

    return (
        <div ref={ref} className="boxplot" style={{ height: 800 }}>
        </div>
    )
} 