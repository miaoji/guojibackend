import React from 'react'
import PropTypes from 'prop-types'
import styles from './Modal.less'
import classnames from 'classnames'
import { Form, Input, InputNumber, Radio, Modal, Cascader } from 'antd'
import city from '../../utils/city'

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
        <FormItem label="收件人" hasFeedback {...formItemLayout} className={classnames({ [styles.hide]: inputDisabled })}>
          {getFieldDecorator('buyerName', {
            initialValue: item.buyerName,
            rules: [
              {
                required: true,
                message: '请输入收件人!',
              },
            ],
          })(<Input disabled={inputDisabled} />)}
        </FormItem>
        <FormItem label="收件详细地址" hasFeedback {...formItemLayout} className={classnames({ [styles.hide]: inputDisabled })}>
          {getFieldDecorator('buyerAddr', {
            initialValue: item.buyerAddr,
            rules: [
              {
                required: true,
                message: '请输入收件详细地址!',
              },
            ],
          })(<Input disabled={inputDisabled} />)}
        </FormItem>
        <FormItem label="收件人证件号" hasFeedback {...formItemLayout} className={classnames({ [styles.hide]: inputDisabled })}>
          {getFieldDecorator('buyerIDCard', {
            initialValue: item.buyerIDCard,
            rules: [
              {
                required: true,
                message: '请输入收件人证件号!',
              },
            ],
          })(<Input disabled={inputDisabled} />)}
        </FormItem>
        <FormItem label="收件人电话" hasFeedback {...formItemLayout} className={classnames({ [styles.hide]: inputDisabled })}>
          {getFieldDecorator('buyerPhone', {
            initialValue: item.buyerPhone,
            rules: [
              {
                required: true,
                message: '请输入收件人电话!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="寄件人" hasFeedback {...formItemLayout} className={classnames({ [styles.hide]: inputDisabled })}>
          {getFieldDecorator('senderName', {
            initialValue: item.senderName,
            rules: [
              {
                required: true,
                message: '请输入寄件人!',
              },
            ],
          })(<Input disabled={inputDisabled} />)}
        </FormItem>
        <FormItem label="寄件人电话" hasFeedback {...formItemLayout} className={classnames({ [styles.hide]: inputDisabled })}>
          {getFieldDecorator('senderPhone', {
            initialValue: item.senderPhone,
            rules: [
              {
                required: true,
                message: '请输入寄件人电话!',
              },
            ],
          })(<Input disabled={inputDisabled} />)}
        </FormItem>
        <FormItem label="寄件人地址" hasFeedback {...formItemLayout} className={classnames({ [styles.hide]: inputDisabled })}>
          {getFieldDecorator('senderAddr', {
            initialValue: item.senderAddr,
            rules: [
              {
                required: true,
                message: '请输入寄件人地址!',
              },
            ],
          })(<Input disabled={inputDisabled} />)}
        </FormItem>
        <FormItem label="负重" hasFeedback {...formItemLayout} className={classnames({ [styles.hide]: inputDisabled })}>
          {getFieldDecorator('bearload', {
            initialValue: item.bearload,
            rules: [
              {
                required: true,
                message: '请输入寄件人地址!',
              },
            ],
          })(<Input disabled={inputDisabled} />)}
        </FormItem>
        <FormItem label="中转地址" hasFeedback {...formItemLayout}>
          {getFieldDecorator('transferAddr', {
            initialValue: item.transferAddr || '泰虹路168弄万科时一区1号楼302室',
            rules: [
              {
                required: true,
                message: '请输入中转地址!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="国际段单号" hasFeedback {...formItemLayout}>
          {getFieldDecorator('FPXNO', {
            initialValue: item.FPXNO,
            rules: [
              {
                required: true,
                message: '请输入国际段单号!',
              },
            ],
          })(<Input />)}
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
