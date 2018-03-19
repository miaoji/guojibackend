import React from 'react'
import ReactEcharts from 'echarts-for-react'
import './theme/macarons.js'
import { time } from '../../../../utils'
import { mockEchartData } from '../../../../utils/mock'

const SimpleChartComponent = () => {
  const dataname = time.getLineTime()
  const option = {
    backgroundColor: '#fff',
    color: ['#f0f', '#90f', '#09f', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
    title: {
      text: '三十日内订单详情',
    },
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: ['直邮订单', '集运订单'],
    },
    toolbox: {
      show: true,
      feature: {
        magicType: { show: true, type: ['line', 'bar', 'stack', 'tiled'] }, // 平铺于堆叠的切换
        restore: { show: true },
        saveAsImage: {}, // 下载按钮
      },
    },
    grid: {
      left: '4%',
      right: '4%',
      bottom: '4%',
      containLabel: true,
    },
    xAxis: [
      {
        axisLabel: {
          rotate: 30,
          interval: 0
        },
        type: 'category',
        boundaryGap: false,
        data: [...dataname, '']
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],
    series: [
      {
        name: '直邮订单',
        type: 'line',
        // stack: '总量',
        smooth: false,
        label: {
          normal: {
            show: true,
            rotate: '36'
          }
        },
        data: mockEchartData(180)
      },
      {
        name: '集运订单',
        type: 'line',
        // stack: '总量',
        smooth: false,
        label: {
          normal: {
            show: true,
            rotate: '36'
          }
        },
        data: mockEchartData(100)
      }
    ],
  }
  return (
    <div className="examples">
      <div className="parent">
        <ReactEcharts
          option={option}
          style={{ height: '480px', width: '100%' }}
          className="react_for_echarts"
          theme="default"
        />
      </div>
    </div>
  )
}


export default SimpleChartComponent
