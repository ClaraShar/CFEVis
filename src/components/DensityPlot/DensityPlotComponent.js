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
  const [education, setEducation] = useState([]);
  const [ethnicity, setEthnicity] = useState([]);

  const [chartRefScatter, refScatter] = useEcharts();

  useEffect(() => {
    fetch('/api/getHeatmapplotData', {
      method: 'get',
      headers: {
        'Accept': 'application/json',
      },
    }).then(res => res.json())
      .then(res => {
        var age = [], debt = [], years = [], score = [], income = [];
        for (let i = 0; i < res.data.data.length; i++) {
          // flag: 0-TN, 1-FP, 2-FN, 3-TP
          if (res.data.data[i].Approved == 0) { // Approved：0 is +, 1 is -
            debt.push(['Debt', res.data.data[i].Debt + 0.1])
            score.push(['CreditScore', res.data.data[i].CreditScore + 0.1])
            years.push(['YearsEmployed', res.data.data[i].YearsEmployed + 0.1])
            age.push(['Age', res.data.data[i].Age + 0.1])
          }
        }
        setAge(age);
        setDebt(debt);
        setYears(years);
        setScore(score);
        // setIncome(income);
      });
  }, []);

  useEffect(() => {
    fetch('/api/getScatterplotData', {
      method: 'get',
      headers: {
        'Accept': 'application/json',
      },
    }).then(res => res.json())
      .then(res => {
        var education = [], ethnicity = [];
        for (let i = 0; i < res.data.data.length; i++) {
          if (res.data.data[i].Approved == 0) {
            education.push(['EducationLevel', res.data.data[i].EducationLevel / 13 + 0.05])
            ethnicity.push(['Ethnicity', res.data.data[i].Ethnicity / 8 + 0.07])
          }
        }
        setEducation(education);
        setEthnicity(ethnicity);
      });
  }, []);


  useEffect(() => {
    const scatterChart = chartRefScatter.current
    scatterChart.setOption({
      tooltip: {
        show: true,
      },
      xAxis: {
        data: ['Male', 'Married', 'DriversLicense', 'BankCustomer', 'PriorDefault', 'Employed', 'Citizen', 'EducationLevel', 'Ethnicity', 'Age', 'YearsEmployed', 'CreditScore', 'Debt'],
        axisTick: {
          show: false,
        },
        splitLine: {
          show: true,
        },
        type: 'category',
        axisLabel: {
          interval: 0,
          rotate: 45,
          color: 'rgba(128, 128, 128)',
        },
        axisLine: {
          lineStyle: {
            color: 'rgba(128, 128, 128, 0.3)',
          },
        },
      },
      yAxis: {
        max: 1.4,
        // show: false,
        axisLabel: {
          show: false,
        },
        splitLine: {
          lineStyle: {
            // 使用深浅的间隔色
            color: ['#fff', '#fff', '#fff', '#fff', '#fff', 'rgb(128,128,128,0.5)']
          },
          // show: false,
        },
      },
      series: [
        {
          symbolSize: 20,
          // 锁定
          symbol: 'path://M799.999553 384.000994h-23.999963c-4.399993 0-7.999988-3.599994-7.999987-7.999988V258.001189C767.999603 116.701409 652.399782-0.498409 511.000002 0.00159 370.10022 0.501589 256.000397 114.901412 256.000397 256.001192v119.999814c0 4.399993-3.599994 7.999988-7.999987 7.999988h-23.999963c-52.999918 0-95.999851 42.999933-95.999851 95.999851v447.999304c0 52.999918 42.999933 95.999851 95.999851 95.999851h575.999106c52.999918 0 95.999851-42.999933 95.999851-95.999851V480.000845c0-52.999918-42.999933-95.999851-95.999851-95.999851zM569.69991 748.700427c-15.999975 12.099981-25.69996 30.699952-25.69996 50.799922V864.000248c0 17.499973-14.199978 31.799951-31.599951 31.999951-17.799972 0.2-32.39995-14.799977-32.399949-32.699949V800.000348c0-20.199969-9.599985-39.099939-25.79996-51.299921C431.000126 731.200455 416.000149 703.300498 416.000149 672.000547c0-52.199919 42.399934-95.299852 94.599853-95.999851 53.699917-0.799999 97.399849 42.499934 97.399849 95.999851 0 31.299951-14.999977 59.199908-38.299941 76.69988zM703.999702 376.001006c0 4.399993-3.599994 7.999988-7.999988 7.999988H328.000286c-4.399993 0-7.999988-3.599994-7.999988-7.999988V256.001192c0-51.29992 19.999969-99.499846 56.199913-135.799789C412.500154 84.00146 460.70008 64.001491 512 64.001491s99.499846 19.999969 135.799789 56.199912C683.999733 156.501347 703.999702 204.701272 703.999702 256.001192v119.999814z M512 672.000547m-31.99995 0a31.99995 31.99995 0 1 0 63.9999 0 31.99995 31.99995 0 1 0-63.9999 0Z',
          symbolKeepAspect: true,
          color: 'grey',
          data: [
            ['Male', 1.3],
            ['Married', 1.3],
            ['Age', 1.3],
            ['Ethnicity', 1.3],
          ],
          type: 'scatter',
        },
        {
          symbolSize: 20,
          // 解锁
          symbol: 'path://M510.600002 576.000696c-52.199919 0.699999-94.599853 43.799932-94.599853 95.999851 0 31.299951 14.999977 59.199908 38.199941 76.69988 16.099975 12.199981 25.79996 31.099952 25.79996 51.299921v63.399901c0 17.799972 14.599977 32.899949 32.399949 32.59995 17.399973-0.2 31.599951-14.499977 31.599951-31.999951v-64.499899c0-20.099969 9.699985-38.69994 25.69996-50.799922C592.999874 731.200455 607.999851 703.300498 607.999851 672.000547c0-53.499917-43.699932-96.69985-97.399849-95.999851z m1.399998 127.999801c-17.599973 0-31.99995-14.399978-31.99995-31.99995s14.399978-31.99995 31.99995-31.999951 31.99995 14.399978 31.99995 31.999951-14.399978 31.99995-31.99995 31.99995z M328.000286 384.000994c-4.399993 0-7.999988-3.599994-7.999988-7.999988V256.001192c0-51.29992 19.999969-99.499846 56.199913-135.799789C412.500154 84.00146 460.70008 64.001491 512 64.001491s99.499846 19.999969 135.799789 56.199912C683.999733 156.501347 703.999702 204.701272 703.999702 256.001192v1.999997c0 16.599974 13.399979 29.999953 29.999953 29.999954h3.999994c16.599974 0 29.999953-13.399979 29.999954-29.999954C767.999603 116.701409 652.399782-0.498409 511.000002 0.00159 370.10022 0.501589 256.000397 114.901412 256.000397 256.001192v119.999814c0 4.399993-3.599994 7.999988-7.999987 7.999988h-23.999963c-52.999918 0-95.999851 42.999933-95.999851 95.999851v447.999304c0 52.999918 42.999933 95.999851 95.999851 95.999851h575.999106c52.999918 0 95.999851-42.999933 95.999851-95.999851V480.000845c0-52.999918-42.999933-95.999851-95.999851-95.999851H328.000286z m471.999267 575.999105H224.000447c-17.699973 0-31.99995-14.299978-31.99995-31.99995V480.000845c0-17.699973 14.299978-31.99995 31.99995-31.999951h575.999106c17.699973 0 31.99995 14.299978 31.99995 31.999951v447.999304c0 17.699973-14.299978 31.99995-31.99995 31.99995z',
          symbolKeepAspect: true,
          color: 'grey',
          data: [
            ['DriversLicense', 1.3],
            ['BankCustomer', 1.3],
            ['PriorDefault', 1.3],
            ['Citizen', 1.3],
            ['YearsEmployed', 1.3],
            ['CreditScore', 1.3],
            ['Debt', 1.3],
            ['Employed', 1.3],
            ['EducationLevel', 1.3],
          ],
          type: 'scatter',
        },
        {
          symbolSize: 36,
          symbol: 'rect',
          // symbol: 'path://M510.600002 576.000696c-52.199919 0.699999-94.599853 43.799932-94.599853 95.999851 0 31.299951 14.999977 59.199908 38.199941 76.69988 16.099975 12.199981 25.79996 31.099952 25.79996 51.299921v63.399901c0 17.799972 14.599977 32.899949 32.399949 32.59995 17.399973-0.2 31.599951-14.499977 31.599951-31.999951v-64.499899c0-20.099969 9.699985-38.69994 25.69996-50.799922C592.999874 731.200455 607.999851 703.300498 607.999851 672.000547c0-53.499917-43.699932-96.69985-97.399849-95.999851z m1.399998 127.999801c-17.599973 0-31.99995-14.399978-31.99995-31.99995s14.399978-31.99995 31.99995-31.999951 31.99995 14.399978 31.99995 31.999951-14.399978 31.99995-31.99995 31.99995z M767.999603 376.001006V258.001189C767.999603 116.701409 652.399782-0.498409 511.000002 0.00159 370.10022 0.501589 256.000397 114.901412 256.000397 256.001192v119.999814c0 4.399993-3.599994 7.999988-7.999987 7.999988h-23.999963c-52.999918 0-95.999851 42.999933-95.999851 95.999851v447.999304c0 52.999918 42.999933 95.999851 95.999851 95.999851h575.999106c52.999918 0 95.999851-42.999933 95.999851-95.999851V480.000845c0-52.999918-42.999933-95.999851-95.999851-95.999851h-23.999963c-4.399993 0-7.999988-3.599994-7.999987-7.999988zM320.000298 256.001192c0-51.29992 19.999969-99.499846 56.199913-135.799789C412.500154 84.00146 460.70008 64.001491 512 64.001491s99.499846 19.999969 135.799789 56.199912C683.999733 156.501347 703.999702 204.701272 703.999702 256.001192v119.999814c0 4.399993-3.599994 7.999988-7.999988 7.999988H328.000286c-4.399993 0-7.999988-3.599994-7.999988-7.999988V256.001192z m479.999255 703.998907H224.000447c-17.699973 0-31.99995-14.299978-31.99995-31.99995V480.000845c0-17.699973 14.299978-31.99995 31.99995-31.999951h575.999106c17.699973 0 31.99995 14.299978 31.99995 31.999951v447.999304c0 17.699973-14.299978 31.99995-31.99995 31.99995z',
          data: [...age, ...years, ...score, ...debt],
          type: 'scatter',
          itemStyle: {
            normal: {
              color: function (e) {
                if (e.data[0] == 'Age') {
                  return 'rgba(128, 128, 128, 0.05)';
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
        },
        {
          symbolSize: 36, // education
          symbol: 'path://M112 272h1100v450H112z',
          symbolKeepAspect: true,
          data: [...education],
          type: 'scatter',
          color: 'rgba(99,178,238, 0.05)', // 'rgba(128, 128, 128, 0.05)',
          select: {
            itemStyle: {
              borderColor: '#212121',
            }
          },
        },
        {
          symbolSize: 34, // ethnicity
          symbol: 'path://M112 272h1000v720H112z',
          symbolKeepAspect: true,
          data: [...ethnicity],
          type: 'scatter',
          color: 'rgba(128, 128, 128, 0.05)',
          select: {
            itemStyle: {
              borderColor: '#212121',
            }
          },
        },
        {
          symbolSize: 25,
          // 线，放最后避免覆盖，或者设置z
          symbol: 'path://M32 464h960V576H32z',
          symbolKeepAspect: true,
          color: 'black',
          data: [
            ['Male', 0.2],
            ['Married', 1.04],
            ['DriversLicense', 0.3],
            ['BankCustomer', 1.04],
            ['PriorDefault', 0.05],
            ['Employed', 0.15],
            ['Citizen', 0.5],
            ['EducationLevel', 5 / 13 + 0.05],
            ['Ethnicity', 2 / 8 + 0.07],
            ['Age', 52.17 / 63 * 1.16],
            ['YearsEmployed', 0.02],
            ['CreditScore', 0.02],
            ['Debt', 0.02],
          ],
          label: {
            show: true,
            formatter: (e) => {
              if(e.data[0] == 'Male') {
                return 0;
              } else if(e.data[0] == 'Married') {
                return 2;
              } else if(e.data[0] == 'DriversLicense') {
                return 0;
              } else if(e.data[0] == 'BankCustomer') {
                return 2;
              } else if(e.data[0] == 'PriorDefault') {
                return 0;
              } else if(e.data[0] == 'Employed') {
                return 0;
              } else if(e.data[0] == 'Citizen') {
                return 0;
              } else if(e.data[0] == 'EducationLevel') {
                return Math.round((e.data[1] - 0.05) * 13);
              } else if(e.data[0] == 'Ethnicity') {
                return Math.round((e.data[1] - 0.07) * 8);
              } else if(e.data[0] == 'Age') {
                return 52.17;
              } else if(e.data[0] == 'YearsEmployed') {
                return 0;
              } else if(e.data[0] == 'CreditScore') {
                return 0;
              } else if(e.data[0] == 'Debt') {
                return 0;
              }
            },
            position: 'top',
          },
          type: 'scatter',
        },
        {
          // 堆叠柱状图
          name: '0',
          type: 'bar',
          stack: 'Ad',
          // emphasis: {
          //   focus: 'series'
          // },
          // data: [0.353, 0.003, 0.629, 0.883, 0.553, 0.66, 1.05], // All
          data: [0.37, 0.008, 0.608, 0.982, 0.087, 0.370, 1.084], // Positive
          // data: [0.339, 0, 0.645, 0.803, 0.927, 0.9, 1.024], // Negative
          barWidth: 40,
          color: '#5470c6',
        },
        {
          name: '1',
          type: 'bar',
          stack: 'Ad',
          // data: [0.807, 0.883, 0.531, 0.003, 0.61, 0.5, 0.01], // All
          data: [0.79, 0.98, 0.552, 0.008, 1.073, 0.79, 0.019], // Positive
          // data: [0.821, 0.803, 0.515, 0, 0.233, 0.26, 0.009], // Negative
          color: 'pink',
        },
        {
          name: '2',
          type: 'bar',
          stack: 'Ad',
          // data: [0, 0.274, 0, 0.274, 0, 0, 0.1], // All
          data: [0, 0.17, 0, 0.17, 0, 0, 0.057], // Positive
          // data: [0, 0.357, 0, 0.357, 0, 0, 0.127], // Negative
          color: '#91cc75',
        }
      ]
    })
  }, [debt, score, years, age, education, ethnicity]);

  return (
    <div className='Wrapper'>
      <div className='WrapperTitle'>ViCE</div>
      <div className='WrapperContent'>
        <div ref={refScatter} className="ScatterPlot"></div>
      </div>
    </div>
  )
} 