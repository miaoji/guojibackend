import React from 'react'
import PropTypes from 'prop-types'
import {
  Form,
  Button,
  Row,
  Col,
  Input,
  Modal
} from 'antd'

const Search = Input.Search
const confirm = Modal.confirm

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
  onSubmitWeChat,
  onFilterChange,
  handlePush,
  filter,
  selectedRowKeys,
  form: {
    getFieldDecorator,
    getFieldsValue,
    setFieldsValue,
  },
}) => {
  const onSubmit = () => {
    confirm({
      title: '确定要向微信用户发送优惠券吗?',
      onOk () {
        onSubmitWeChat()
      },
    })
  }
  const handleFields = (fields) => {
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
    handleSubmit()
  }

  const { name } = filter

  return (
    <Row gutter={24}>
      <Col {...ColProps} xl={{ span: 4 }} md={{ span: 8 }}>
        {getFieldDecorator('name', { initialValue: name })(<Search placeholder="按微信名搜索" size="large" onSearch={handleSubmit} />)}
      </Col>
      <Col {...TwoColProps} xl={{ span: 10 }} md={{ span: 24 }} sm={{ span: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div >
            <Button type="primary" size="large" className="margin-right" onClick={handleSubmit}>搜索</Button>
            <Button size="large" onClick={handleReset}>刷新</Button>
          </div>
          <div style={{ display: 'none' }}>
            <Button size="large" type="ghost" onClick={onSubmit}>发送优惠卷</Button>
          </div>
          <div style={{ display: 'block' }}>
            <Button size="large" type="ghost" onClick={onAdd}>向所有用户发送代金券</Button>
          </div>
        </div>
      </Col>
      <Col>
        {
          selectedRowKeys.length > 0
          && <div style={{ textAlign: 'right', fontSize: 13 }}>
            <div>
              {`选中 ${selectedRowKeys.length} 个用户 `}
              <Button type="primary" size="large" onClick={handlePush} style={{ marginLeft: 8 }}>发送代金券</Button>
            </div>
          </div>
        }
      </Col>
    </Row>
  )
}

Filter.propTypes = {
  onAdd: PropTypes.func,
  onSubmitWeChat: PropTypes.func,
  switchIsMotion: PropTypes.func,
  form: PropTypes.object,
  filter: PropTypes.object,
  onFilterChange: PropTypes.func,
  selectedRowKeys: PropTypes.array,
  handlePush: PropTypes.func
}

export default Form.create()(Filter)
