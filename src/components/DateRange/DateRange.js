import React from 'react'
import { DatePicker, Form } from 'antd'
import PropTypes from 'prop-types'

class DateRange extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      startValue: props.startValue,
      endValue: props.endValue,
      endOpen: false,
      size: props.size,
    }
  }
  componentWillReceiveProps (props) {
    if (props.value.length !== 2) {
      this.setState({
        startValue: null,
        endValue: null,
      })
    }
  }

  onStartChange = (value) => {
    this.onChange('startValue', value)
  }

  onEndChange = (value) => {
    this.onChange('endValue', value)
  }

  onChange = (field, value) => {
    this.setState({
      [field]: value,
    })

    // 当用户清空了单个时间控件的值的时候同时清空两个控件的值,并发起一次页面请求
    if (value === null) {
      this.setState({ startValue: null, endValue: null })
      this.props.onChange([null, null], 'createTime')
      return
    }

    // 当用户进行了结束时间的选择的时候,发起一次页面请求
    if (field === 'endValue') {
      this.props.onChange([this.state.startValue, value], 'createTime')
    }
  }

  disabledStartDate = (startValue) => {
    const endValue = this.state.endValue
    if (!startValue || !endValue) {
      return false
    }
    return startValue.valueOf() > endValue.valueOf()
  }

  disabledEndDate = (endValue) => {
    const startValue = this.state.startValue
    if (!endValue || !startValue) {
      return false
    }
    return endValue.valueOf() <= startValue.valueOf()
  }

  handleStartOpenChange = (open) => {
    if (!open) {
      this.setState({ endOpen: true })
    }
  }

  handleEndOpenChange = (open) => {
    this.setState({ endOpen: open })
  }

  render () {
    const { startValue, endValue, endOpen } = this.state
    return (
      <div>
        <DatePicker
          disabledDate={this.disabledStartDate}
          format="YYYY-MM-DD"
          value={startValue}
          placeholder="开始时间"
          showToday={false}
          size={this.state.size}
          onChange={this.onStartChange}
          onOpenChange={this.handleStartOpenChange}
        />
        &nbsp;&nbsp;&nbsp;
        <DatePicker
          disabledDate={this.disabledEndDate}
          showToday={false}
          format="YYYY-MM-DD"
          value={endValue}
          placeholder="结束时间"
          size={this.state.size}
          onChange={this.onEndChange}
          open={endOpen}
          onOpenChange={this.handleEndOpenChange}
        />
      </div>
    )
  }
}

DateRange.propTypes = {
  onChange: PropTypes.func,
  startValue: PropTypes.string,
  endValue: PropTypes.string,
  size: PropTypes.string,
}

export default Form.create()(DateRange)
