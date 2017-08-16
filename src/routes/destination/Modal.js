import React from 'react'
import PropTypes from 'prop-types'
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
      data.address = data.address.join(' ')
      onOk(data)
    })
  }

  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  }

  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label="国家" hasFeedback {...formItemLayout}>
          {getFieldDecorator('country', {
            initialValue: item.country,
            rules: [
              {
                required: true,
                message: '请输入国家名!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="省份" hasFeedback {...formItemLayout}>
          {getFieldDecorator('sheng', {
            initialValue: item.sheng,
            rules: [
              {
                required: true,
                message: '请输入省份名!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="市级" hasFeedback {...formItemLayout}>
          {getFieldDecorator('shi', {
            initialValue: item.shi,
            rules: [
              {
                required: true,
                message: '请输入市级!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="县级" hasFeedback {...formItemLayout}>
          {getFieldDecorator('xian', {
            initialValue: item.xian,
            rules: [
              {
                required: true,
                message: '请输入县级!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="详细地址" hasFeedback {...formItemLayout}>
          {getFieldDecorator('xiangxi', {
            initialValue: item.xiangxi,
            rules: [
              {
                required: true,
                message: '请输入详细地址!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="邮编" hasFeedback {...formItemLayout}>
          {getFieldDecorator('ycode', {
            initialValue: item.ycode,
            rules: [
              {
                required: true,
                message: '请输入邮编!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="用户ID" hasFeedback {...formItemLayout}>
          {getFieldDecorator('did', {
            initialValue: item.did,
            rules: [
              {
                required: true,
                message: '请输入用户ID!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="发件公司" hasFeedback {...formItemLayout}>
          {getFieldDecorator('fagongsi', {
            initialValue: item.fagongsi,
            rules: [
              {
                required: true,
                message: '请输入发件公司!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="电话" hasFeedback {...formItemLayout}>
          {getFieldDecorator('phone', {
            initialValue: item.phone,
            rules: [
              {
                required: true,
                message: '请输入电话!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="联系人" hasFeedback {...formItemLayout}>
          {getFieldDecorator('cname', {
            initialValue: item.cname,
            rules: [
              {
                required: true,
                message: '请输入联系人!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="证件号" hasFeedback {...formItemLayout}>
          {getFieldDecorator('uid', {
            initialValue: item.uid,
            rules: [
              {
                required: true,
                message: '请输入证件号!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="备注" hasFeedback {...formItemLayout}>
          {getFieldDecorator('remark', {
            initialValue: item.remark,
            rules: [
              {
                required: true,
                message: '请输入备注信息!',
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
