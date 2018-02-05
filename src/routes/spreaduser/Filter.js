import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Form, Button, Radio, Row, Col, Input } from 'antd'
import { time } from '../../utils'

const Search = Input.Search
// const { RangePicker } = DatePicker
import { DateRange } from '../../components'

const ColProps = {
  xs: 24,
  sm: 12,
  style: {
    marginBottom: 16,
  },
}

const TwoColProps = {
  ...ColProps,
  xl: 96,
}

const Filter = ({
  onAdd,
  onFilterChange,
  filter,
  form: {
    getFieldDecorator,
    getFieldsValue,
    setFieldsValue,
  },
}) => {
  const handleFields = (fields) => {
    const { createTime } = fields
    if (createTime && createTime[0] && createTime[1] && createTime.length === 2) {
      console.log('createtime', createTime)
      const repairTime = time.repairTime(fields.createTime)
      fields.startDate = new Date(repairTime.startTime).format('yyyy-MM-dd')
      fields.endDate = new Date(repairTime.endTime).format('yyyy-MM-dd')
    }
    delete fields.createTime
    return fields
  }

  const { parentId } = filter
  const handleSubmit = () => {
    let fields = getFieldsValue()
    fields = handleFields(fields)
    fields.parentId = parentId
    onFilterChange(fields)
  }

  const handleShowUserChange = (e) => {
    let fields = getFieldsValue()
    fields = handleFields(fields)
    fields.parentId = e.target.value
    onFilterChange(fields)
  }

  const handleReset = () => {
    const fields = getFieldsValue()
    for (let item in fields) {
      if ({}.hasOwnProperty.call(fields, item)) {
        if (fields[item] instanceof Array) {
          fields[item] = []
        } else {
          if (item === 'parentId') {
            return
          }
          fields[item] = undefined
        }
      }
    }
    setFieldsValue(fields)
    handleSubmit()
  }
  // 时间选择器change事件
  const handleChange = (key, values) => {
    let fields = getFieldsValue()
    for (let item in fields) {
      if ({}.hasOwnProperty.call(fields, item)) {
        if (fields[item] instanceof Array) {
          fields[item] = []
        } else {
          if (item === 'parentId') {
            return
          }
          fields[item] = undefined
        }
      }
    }
    fields[key] = values
    fields = handleFields(fields)
    onFilterChange({ ...filter, ...fields })
  }

  const { startDate, endDate, nickName } = filter
  let initialCreateTime = [startDate, endDate]
  if (filter.createTime && filter.createTime[0]) {
    initialCreateTime[0] = moment(filter.createTime[0])
  }
  if (filter.createTime && filter.createTime[1]) {
    initialCreateTime[1] = moment(filter.createTime[1])
  }

  return (
    <Row gutter={24}>
      <Col {...ColProps} xl={{ span: 4 }} md={{ span: 8 }} sm={{ span: 12 }}>
        {getFieldDecorator('nickName', { initialValue: nickName })(<Search placeholder="按推广人姓名搜索" size="large" onSearch={handleSubmit} />)}
      </Col>
      <Col {...ColProps} xl={{ span: 7 }} lg={{ span: 8 }} md={{ span: 12 }} sm={{ span: 16 }} sx={{ span: 24 }}>
        {getFieldDecorator('createTime', { initialValue: initialCreateTime })(
          <DateRange size="large" onChange={handleChange.bind(null, 'createTime')} />
        )}
      </Col>
      <Col {...TwoColProps} xl={{ span: 10 }} md={{ span: 24 }} sm={{ span: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div >
            <Button type="primary" size="large" className="margin-right" onClick={handleSubmit}>搜索</Button>
            <Button size="large" onClick={handleReset}>刷新</Button>
          </div>
          <div>
            <Radio.Group size="large" value={parentId} onChange={handleShowUserChange}>
              <Radio.Button size="large" value="1">后台创建推广人</Radio.Button>
              <Radio.Button size="large" value="0">顶级推广人</Radio.Button>
              <Radio.Button size="large" value="-1">全部推广人</Radio.Button>
            </Radio.Group>
          </div>
          <div>
            <Button size="large" type="ghost" onClick={onAdd}>新增</Button>
          </div>
        </div>
      </Col>
    </Row>
  )
}

Filter.propTypes = {
  onAdd: PropTypes.func,
  form: PropTypes.object,
  filter: PropTypes.object,
  onFilterChange: PropTypes.func,
}

export default Form.create()(Filter)
