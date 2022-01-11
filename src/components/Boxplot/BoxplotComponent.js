import React, { useState } from 'react';
import ReactEcharts from 'echarts-for-react'
import './style.css'

export default function Boxplot() {
    // 声明一个新的叫做 data 的 state 变量，初始化为[]
    const [data, setData] = useState([]);

    return (
        <div className="boxplot">
            <ReactEcharts
                option={this.getOption()}
                notMerge={true}
                lazyUpdate={true}
                onEvents={onEvents}
                ref={(e) => { this.echarts = e;}} style={{width:'100%',height:'600px'}}
            />
        </div>
    )
} 
    

    componentDidMount() {
        let myChart = this.echarts && this.echarts.getEchartsInstance(); 
        //拿到实例后 通过getEchartsInstance()，在EchartsReactCore里ECharts实例
        //注意EchartsReactCore实例和ECharts实例的区别 下面附上图片
        //监听窗口onresize变化  这里有两种写法 推荐使用addEventListener写法 第一种方法绑定多个resize事件 会被覆盖
        //这里只是简写 这里可以把函数提出来
        //window.onresize = ()=> {
        // myChart&&myChart.resize();
        // };
        window.addEventListener('resize',()=>{
          myChart && myChart.resize();
        })
        fetch('/api/boxplot', {
            method: 'get',
            headers: {
                'Accept': 'application/json',
            },
        }).then(res => res.json())
            .then(res => {
                console.log(res.data.data)
                var json = res.data.data, 
                    newdata = [],
                    newgroupColors = [];
          });
    }

//         Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate.React limits the number of nested updates to prevent infinite loops
// 翻译过来的意思就是：当component在componentWillUpdate或componentDidUpdate时期内重复调用setState时，就会发生超过最大递归深度这个问题。

    getOption = (colors) => {
        return {
            title:{
                show:true,
                text:'T-SNE',
                x:'center',
                y:'top',
                textStyle: {
                    color: '#fff',
                },
                subtextStyle: {
                    color: 'rgb(230,230,230)',
                }
            },
            tooltip: {
                //trigger: 'item',
                // axisPointer: {
                //     type: 'cross'
                // }
            },
            formatter: function (params) {
                // do some thing
                return  "sid：" +params.value[2];
            },//好像这里是悬浮显示sid的
            xAxis: {
                axisLabel: {
                    show: false
                },
                axisLine: {
                    onZero: false,    //坐标轴固定在最左方
                    lineStyle:{
                    color:'#FFF',
                 }
                },
                splitLine: {
                    show: false     //取消网格线
                },
                axisTick: {
                    show: false     //取消刻度线
                }  
            },
            yAxis: {
                axisLabel: {
                    show: false
                },
                axisLine: {
                    onZero: false,    //坐标轴固定在最下方
                    lineStyle:{
                        color:'#FFF',
                    }
                },
                splitLine: {
                    show: false 
                },
                axisTick: {
                    show: false     //取消刻度线
                }
            },
            series: [{
                symbolSize: 6,
                data: this.state.data,
                type: 'scatter',
                itemStyle:{
                    normal:{
                        color: function(params) {
                            // build a color map as your need.
                            return colors[params.dataIndex];
                        }
                    }
                },
            }]
        }
    }