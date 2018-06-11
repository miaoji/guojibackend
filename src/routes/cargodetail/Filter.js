import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { FilterItem } from '../../components'
import { Form, Button, Row, Col, DatePicker, Input } from 'antd'
// import city from '../../utils/city'

// const InputGroup = Input.Group
// const Option = Select.Option
const Search = Input.Search
// const RadioButton = Radio.Button
// const RadioGroup = Radio.Group
const { RangePicker } = DatePicker

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
  // onAdd,
  // isMotion,
  onFilterChange,
  selectedRowKeys,
  onMergeOrder,
  filter,
  form: {
    getFieldDecorator,
    getFieldsValue,
    setFieldsValue,
  },
}) => {
  const handleFields = (fields) => {
    const { createTime, status, option } = fields
    if (status === 0) {
      delete fields.status
    }
    if (createTime.length) {
      fields.createTime = [createTime[0].format('YYYY-MM-DD'), createTime[1].format('YYYY-MM-DD')]
      fields.startDate = fields.createTime[0]
      fields.endDate = fields.createTime[1]
      delete fields.createTime
    } else {
      delete fields.createTime
    }
    if (option === 1) {
      fields.qrName = fields.extension
    } else {
      fields.appName = fields.extension
    }
    delete fields.extension
    delete fields.option
    return fields
  }

  const handleSubmit = () => {
    let fields = getFieldsValue()
    fields = handleFields(fields)
    for (let key in fields) {
      if (fields[key] === '') {
        fields[key] = undefined
      }
    }
    onFilterChange({ ...filter, ...fields })
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
    // 在刷新重置的时候让推广的下拉菜单有一个初始值(不会没有东西显示)
    fields.option = '1'
    setFieldsValue(fields)
    handleSubmit()
  }

  const handleChange = (key, values) => {
    let fields = getFieldsValue()
    fields[key] = values
    fields = handleFields(fields)
    onFilterChange(fields, ...filter)
  }

  // const onChangeRadio = (e) => {
  //   const newStarte = e.target.value
  //   let fields = getFieldsValue()
  //   fields = handleFields(fields)
  //   fields.status = newStarte
  //   // 如果查询的订单状态为全部即status==6,则不向后端传递status参数
  //   if (Number(newStarte) === 0) {
  //     delete fields.status
  //   }
  //   onFilterChange(fields)
  // }

  const { orderNo, customerNo } = filter

  let initialCreateTime = []
  if (filter.createTime && filter.createTime[0]) {
    initialCreateTime[0] = moment(filter.createTime[0])
  }
  if (filter.createTime && filter.createTime[1]) {
    initialCreateTime[1] = moment(filter.createTime[1])
  }

  const handleMergeClick = () => {
    onMergeOrder(selectedRowKeys)
  }

  return (
    <Row gutter={24}>
      {selectedRowKeys.length > 0 &&
        <Col {...ColProps} xl={{ span: 4 }} md={{ span: 8 }} sm={{ span: 12 }}>
          <Button type="primary" size="large" onClick={handleMergeClick} style={{ marginLeft: 8 }}>合单</Button>
          <span style={{ paddingLeft: '20px' }}>{`选中 ${selectedRowKeys.length} 条订单 `}</span>
        </Col>
      }
      <Col {...ColProps} xl={{ span: 4 }} md={{ span: 8 }}>
        {getFieldDecorator('orderNo', { initialValue: orderNo })(<Search placeholder="按订单号搜索" size="large" onSearch={handleSubmit} />)}
      </Col>
      <Col {...ColProps} xl={{ span: 4 }} md={{ span: 8 }}>
        {getFieldDecorator('customerNo', { initialValue: customerNo })(<Search placeholder="按客户编码搜索" size="large" onSearch={handleSubmit} />)}
      </Col>
      <Col {...ColProps} xl={{ span: 6 }} md={{ span: 8 }} sm={{ span: 12 }}>
        <FilterItem label="创建时间">
          {getFieldDecorator('createTime', { initialValue: initialCreateTime })(
            <RangePicker style={{ width: '100%' }} size="large" onChange={handleChange.bind(null, 'createTime')} />
          )}
        </FilterItem>
      </Col>
      <Col {...TwoColProps} xl={{ span: 8 }} md={{ span: 24 }} sm={{ span: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div >
            <Button type="primary" size="large" className="margin-right" onClick={handleSubmit}>搜索</Button>
            <Button size="large" onClick={handleReset}>刷新</Button>
          </div>
        </div>
      </Col>
    </Row>
  )
}

Filter.propTypes = {
  // onAdd: PropTypes.func,
  // isMotion: PropTypes.bool,
  form: PropTypes.object,
  filter: PropTypes.object,
  onFilterChange: PropTypes.func,
  selectedRowKeys: PropTypes.array,
  onMergeOrder: PropTypes.func
}

export default Form.create()(Filter)
