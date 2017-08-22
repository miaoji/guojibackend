import React from 'react'
import PropTypes from 'prop-types'
import styles from './Modal.less'
import classnames from 'classnames'
import { Form, Input, InputNumber, Modal, Select } from 'antd'
import city from '../../utils/city'

const FormItem = Form.Item
const Option = Select.Option

const statusGroup = {
  '1': '待付款',
  '2': '付款完成',
  '3': '中通完成',
  '0': 'fpx完成',
  '4': '异常订单',
  '5': '取消订单',
}

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

  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  }

  const inputDisabled = modalOpts.type === 'update'

  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label="中转地址" hasFeedback {...formItemLayout}>
          {getFieldDecorator('transferAddr', {
            initialValue: item.transferAddr || '泰虹路168弄万科时一区1号楼302室',
            rules: [
              {
                required: true,
                message: '请输入中转地址!',
              },
            ],
          })(<Input disabled />)}
        </FormItem>
        <FormItem label="国际段单号" hasFeedback {...formItemLayout}>
          {getFieldDecorator('FPXNO', {
            initialValue: item.FPXNO,
            rules: [
              {
                required: false,
                message: '请输入国际段单号!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="订单状态" hasFeedback {...formItemLayout}>
          {getFieldDecorator('starte', {
            initialValue: statusGroup[item.starte],
            rules: [
              {
                required: true,
                message: '请输入订单状态!',
              },
            ],
          })(<Select defaultValue="1" style={{ width: 120 }} disabled={item.starte !== 1}>
            <Option value="1">待付款</Option>
            <Option value="2">已付款</Option>
          </Select>)}
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
