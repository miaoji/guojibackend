import React from 'react'
import PropTypes from 'prop-types'
// // import moment from 'moment'
// import { FilterItem } from '../../components'
import { Form, Button, Row, Col, Input } from 'antd'
// import city from '../../utils/city'
// import { DateRange } from '../../components'

const Search = Input.Search

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
    if (createTime && createTime.length) {
      fields.startDate = createTime[1].format('YYYY-MM-DD')
      fields.endDate = createTime[1].format('YYYY-MM-DD')
      delete fields.createTime
    }
    return fields
  }

  const handleSubmit = () => {
    let fields = getFieldsValue()
    fields = handleFields(fields)
    onFilterChange(fields)
  }

  const handleReset = () => {
    const fields = getFieldsValue()
    for (let item in fields) {
      if ({}.hasOwnProperty.call(fields, item)) {
        if (fields[item] instanceof Array) {
          fields[item] = []
        } else {
          fields[item] = undefined
        }
      }
    }
    setFieldsValue(fields)
    filter.endTime = undefined
    filter.startTime = undefined
    filter.page = undefined
    filter.pageSize = undefined
    handleSubmit()
  }

  // 时间选择器change事件
  // const handleChange = (key, values) => {
  //   let fields = getFieldsValue()
  //   fields[key] = values
  //   fields = handleFields(fields)
  //   for (let item in fields) {
  //     if (/^\s*$/g.test(fields[item])) {
  //       fields[item] = undefined
  //     }
  //   }
  //   onFilterChange({ ...filter, ...fields })
  // }

  const { country } = filter

  let initialCreateTime = []
  if (filter.createTime && filter.createTime[0]) {
    initialCreateTime[0] = filter.createTime[0]
  }
  if (filter.createTime && filter.createTime[1]) {
    initialCreateTime[1] = filter.createTime[1]
  }

  return (
    <Row gutter={24}>
      <Col {...ColProps} xl={{ span: 4 }} md={{ span: 8 }} sm={{ span: 12 }}>
        {getFieldDecorator('country', { initialValue: country })(<Search placeholder="按推广等级搜索" size="large" onSearch={handleSubmit} />)}
      </Col>
      {/* <Col {...ColProps} xl={{ span: 7 }} lg={{ span: 8 }} md={{ span: 12 }} sm={{ span: 16 }} sx={{ span: 24 }}>
        {getFieldDecorator('createTime', { initialValue: initialCreateTime })(
          <div style={{ display: 'none' }} >
            <DateRange size="large" onChange={handleChange.bind(null, 'createTime')} />
          </div>
        )}
      </Col> */}
      <Col {...TwoColProps} xl={{ span: 10 }} md={{ span: 24 }} sm={{ span: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div >
            <Button type="primary" size="large" className="margin-right" onClick={handleSubmit}>搜索</Button>
            <Button size="large" onClick={handleReset}>刷新</Button>
          </div>
          <div>
            <Button style={{ display: 'none' }} size="large" type="ghost" onClick={onAdd}>新增</Button>
          </div>
        </div>
      </Col>
    </Row>
  )
}

Filter.propTypes = {
  onAdd: PropTypes.func,
  switchIsMotion: PropTypes.func,
  form: PropTypes.object,
  filter: PropTypes.object,
  onFilterChange: PropTypes.func,
}

export default Form.create()(Filter)
