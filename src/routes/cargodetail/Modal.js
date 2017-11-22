import React from 'react'
import PropTypes from 'prop-types'
import styles from './Modal.less'
import classnames from 'classnames'
import { Form, Input, InputNumber, Modal, Select, Radio } from 'antd'
import city from '../../utils/city'

const FormItem = Form.Item
const Option = Select.Option

const statusGroup = {
  1: '待付款',
  2: '付款完成',
  3: '中通完成',
  0: 'fpx完成',
  4: '异常订单',
  5: '取消订单',
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
  selectKdCompany,
  getKdCompany,
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

  const handleFocus = () => {
    // getKdCompany()
  }

  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  }

  const inputDisabled = modalOpts.type === 'update'

  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label="货物类型" hasFeedback {...formItemLayout}>
          {getFieldDecorator('cargoType', {
            initialValue: item.cargoType,
            rules: [
              {
                required: true,
                message: '请输入货物类型!',
              },
            ],
          })(<Radio.Group defaultValue={'-1'}>
              <Radio value={'-1'}>普货</Radio>
              <Radio value={'-2'}>特货</Radio>
            </Radio.Group>)}
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
