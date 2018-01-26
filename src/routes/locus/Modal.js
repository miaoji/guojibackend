import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Modal, DatePicker } from 'antd'
import moment from 'moment'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

const modal = ({
  item = {},
  onOk,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
  type,
  ...modalProps
}) => {
  const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
        key: item.key,
      }
      onOk(data)
    })
  }
  const onChange = (value, dateString) => {
    console.log('这是value', value._d.getTime())
    console.log('这是另一个时间', dateString)
  }
  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  }

  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label="路由信息" hasFeedback {...formItemLayout}>
          {getFieldDecorator('route', {
            initialValue: item.route,
            rules: [
              {
                required: true,
                // pattern: /^[\u4e00-\u9fa5]{0,}$/,
                message: '请输入路由信息!',
              },
            ],
          })(<Input placeholder="请输入路由信息" />)}
        </FormItem>
        <FormItem label="路由时间" hasFeedback {...formItemLayout}>
          {getFieldDecorator('routeTime', {
            initialValue: moment(item.routeTime),
            rules: [
              {
                required: true,
                // pattern: /^[\u4e00-\u9fa5]{0,}$/,
                message: '请选择路由时间!',
              },
            ],
          })(<DatePicker
            showTime
            defaultValue={moment(item.routeTime)}
            format="YYYY-MM-DD HH:mm:ss"
            placeholder="请选择路由时间"
            style={{ width: '100%' }}
            onChange={onChange}
            // onOk={onOk}
          />)}
        </FormItem>
      </Form>
    </Modal>
  )
}

modal.propTypes = {
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default Form.create()(modal)
