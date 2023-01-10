import React, { useState, useEffect } from 'react';
import useEcharts from 'react-hooks-echarts';
import './style.css';

export default function HeatMapplot(props) {
    const [data0, setData0] = useState([]);
    const [data1, setData1] = useState([]);

    const [chartRefHeatMap0, refHeatMap0] = useEcharts();
    const [chartRefHeatMap1, refHeatMap1] = useEcharts();

    useEffect(() => {
        fetch('/api/getHeatmapplotData', {
          method: 'get',
          headers: {
              'Accept': 'application/json',
          },
        }).then(res => res.json())
        .then(res => {
          var temp0 = [], temp1 = [];
          console.log(res.data.data);
          for(let i = 0; i < res.data.data.length; i++) {
            if(parseFloat(res.data.data[i].Approved) == 0) {
                temp0.push([i, 0, parseFloat(res.data.data[i].PriorDefault)])
                temp0.push([i, 1, parseFloat(res.data.data[i].Employed) > 0 ? 0 : 1])
                temp0.push([i, 2, parseFloat(res.data.data[i].Debt)])
                temp0.push([i, 3, parseFloat(res.data.data[i].YearsEmployed)])
                temp0.push([i, 4, parseFloat(res.data.data[i].Age)])
                temp0.push([i, 5, parseFloat(res.data.data[i].CreditScore)])
                temp0.push([i, 6, parseFloat(res.data.data[i].Income)])
                temp0.push([i, 7, parseFloat(res.data.data[i].EducationLeval)])
            } else{
                temp1.push([i, 0, parseFloat(res.data.data[i].PriorDefault)])
                temp1.push([i, 1, parseFloat(res.data.data[i].Employed) > 0 ? 0 : 1])
                temp1.push([i, 2, parseFloat(res.data.data[i].Debt)])
                temp1.push([i, 3, parseFloat(res.data.data[i].YearsEmployed)])
                temp1.push([i, 4, parseFloat(res.data.data[i].Age)])
                temp1.push([i, 5, parseFloat(res.data.data[i].CreditScore)])
                temp1.push([i, 6, parseFloat(res.data.data[i].Income)])
                temp1.push([i, 7, parseFloat(res.data.data[i].EducationLeval)])
            }
          }
          setData0(temp0)
          setData1(temp1)
        //   setData0(temp0.map(function (item) {
        //     return [item[1], item[0], item[2] || '-'];
        //   }))
        //   setData1(temp1.map(function (item) {
        //     return [item[1], item[0], item[2] || '-'];
        //   }))
        });
    }, []);

    useEffect(() => {
        if(data0.length === 0 || data1.length === 0) return;
        const heatMapChart0 = chartRefHeatMap0.current
        heatMapChart0.setOption({
            tooltip: {
                position: 'top'
              },
              /* 该版本是实例视图的渐变条
              gradientColor: {
                0: '#3CB371',
                1: '#fff',
                2: '#EE7621',
              },
              visualMap: {
                min: 0,
                max: 1,
                precision: 3,
                text: ['True', 'False'],
                formatter: function (value) {
                    return value // * 100 + '%'; // 范围标签显示内容。
                },
                calculable: true,
                orient: 'horizontal',
                left: 'center',
                bottom: '15%'
              }, */
              grid: {
                left: '12%',
              },
              xAxis: {
                type: 'category',
                splitArea: {
                  show: true
                }
              },
              yAxis: {
                type: 'category',
                data: ['PriorDefault', 'Employed', 'Debt', 'YearsEmployed', 'Age', 'CreditScore', 'Income', 'EducationLevel'],
                splitArea: {
                  show: true
                }
              },
              visualMap: {
                min: 0,
                max: 1,
                calculable: true,
                orient: 'vertical',
                left: 'left',
                bottom: '20%',
                left: '3%'
              },
              series: [
                {
                  name: 'Punch Card',
                  type: 'heatmap',
                  data: data0,
                  label: {
                    show: false
                  },
                  emphasis: {
                    itemStyle: {
                      shadowBlur: 10,
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                  }
                }
              ]
        })

        const heatMapChart1 = chartRefHeatMap1.current
        heatMapChart1.setOption({
            tooltip: {
                position: 'top'
              },
              grid: {
                left: '12%',
              },
              xAxis: {
                type: 'category',
                splitArea: {
                  show: true
                }
              },
              yAxis: {
                type: 'category',
                data: ['PriorDefault', 'Employed', 'Debt', 'YearsEmployed', 'Age', 'CreditScore', 'Income', 'EducationLevel'],
                splitArea: {
                  show: true
                }
              },
              visualMap: {
                min: 0,
                max: 1,
                calculable: true,
                orient: 'vertical',
                left: 'left',
                bottom: '20%',
                left: '3%'
              },
              series: [
                {
                  name: 'Punch Card',
                  type: 'heatmap',
                  data: data1,
                  label: {
                    show: false
                  },
                  emphasis: {
                    itemStyle: {
                      shadowBlur: 10,
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                  }
                }
              ]
        })

    }, [data0, data1]);

    return (
        <div>
            <div className="HeatMapComp">
                <div className='HeatMapTitle'>热力图-分类0</div>
                <div ref={refHeatMap0} className="HeatMap0"></div>
                <div className='HeatMapTitle'>热力图-分类1</div>
                <div ref={refHeatMap1} className="HeatMap1"></div>
            </div>
        </div>
    )
}