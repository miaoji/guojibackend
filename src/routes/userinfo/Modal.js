import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Radio, Modal } from 'antd'

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

  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label="昵称" hasFeedback {...formItemLayout}>
          {getFieldDecorator('realName', {
            initialValue: item.real_name,
            rules: [
              {
                required: true,
                pattern: /^[\u4e00-\u9fa5]{0,}$/,
                message: '请输入昵称(中文汉字)!',
              },
            ],
          })(<Input placeholder="请输入昵称(中文汉字)" />)}
        </FormItem>
        <FormItem label="登录名" hasFeedback {...formItemLayout}>
          {getFieldDecorator('userName', {
            initialValue: item.user_name || '',
            rules: [
              {
                required: true,
                pattern: /^[A-Za-z]{0,}([\s]{1}[A-Za-z]{1,}){0,}$/,
                message: '请输入登录名(用于账号密码登陆)!',
              },
            ],
          })(<Input placeholder="请输入登录名(用于账号密码登陆)" autocomplete="off" />)}
        </FormItem>
        <FormItem label="密码" hasFeedback {...formItemLayout}>
          {getFieldDecorator('password', {
            initialValue: '',
            rules: [
              {
                required: true,
                message: '请输入密码!',
              },
            ],
          })(<Input placeholder="请输入密码" type="password" autocomplete="off" />)}
        </FormItem>
        <FormItem label="手机号码" hasFeedback {...formItemLayout}>
          {getFieldDecorator('mobile', {
            initialValue: item.mobile,
            rules: [
              {
                required: true,
                pattern: /^1\d{10}$/,
                message: '请输入手机号(用于手机号登陆)!',
              },
            ],
          })(<Input placeholder="请输入手机号(用于手机号登陆)" />)}
        </FormItem>
        <FormItem label="性别" hasFeedback {...formItemLayout}>
          {getFieldDecorator('sex', {
            initialValue: item.sex || 1,
            rules: [
              {
                required: true,
                message: '请选择性别!',
              },
            ],
          })(
            <Radio.Group>
              <Radio value={1}>男</Radio>
              <Radio value={0}>女</Radio>
            </Radio.Group>
          )}
        </FormItem>
        <FormItem label="备注信息" hasFeedback {...formItemLayout}>
          {getFieldDecorator('remark', {
            initialValue: item.remark || '',
            rules: [
              {
                message: '请输入备注信息!',
              },
            ],
          })(<Input placeholder="请输入备注信息" />)}
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
