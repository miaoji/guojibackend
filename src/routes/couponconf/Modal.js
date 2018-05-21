import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, DatePicker, Modal, Radio } from 'antd'
import moment from 'moment'

const RadioGroup = Radio.Group
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

  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  }
  if (item.effective_date) {
    item.effective_date = moment(item.effective_date)
  }
  if (item.expiry_date) {
    item.expiry_date = moment(item.expiry_date)
  }

  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label="优惠券名称" hasFeedback {...formItemLayout}>
          {getFieldDecorator('couponName', {
            initialValue: item.coupon_name,
            rules: [
              {
                required: true,
                // pattern: /^[\u4e00-\u9fa5]{0,}$/,
                message: '请输入优惠券名称!',
              },
            ],
          })(<Input autosize="true" placeholder="请输入优惠券名称" />)}
        </FormItem>
        <FormItem label="优惠金额" hasFeedback {...formItemLayout}>
          {getFieldDecorator('couponMoney', {
            initialValue: item.coupon_money,
            rules: [
              {
                required: true,
                // pattern: /^[\u4e00-\u9fa5]{0,}$/,
                message: '请输入优惠金额!',
              },
            ],
          })(<InputNumber style={{ width: '100%' }} autosize="true" placeholder="请输入优惠金额" />)}
        </FormItem>
        <FormItem label="优惠卷生效时间" hasFeedback {...formItemLayout}>
          {getFieldDecorator('effectiveDate', {
            initialValue: item.effective_date,
            rules: [
              {
                required: true,
                // pattern: /^[\u4e00-\u9fa5]{0,}$/,
                message: '请选择优惠卷生效时间!',
              },
            ],
          })(<DatePicker
            showTime
            // defaultValue={item.routeTime ? moment(item.routeTime) : null}
            format="YYYY-MM-DD"
            placeholder="请选择优惠卷生效时间"
            style={{ width: '100%' }}
          />)}
        </FormItem>
        <FormItem label="优惠卷截止时间" hasFeedback {...formItemLayout}>
          {getFieldDecorator('expiryDate', {
            initialValue: item.expiry_date,
            rules: [
              {
                required: true,
                // pattern: /^[\u4e00-\u9fa5]{0,}$/,
                message: '请选择优惠卷截止时间!',
              },
            ],
          })(<DatePicker
            showTime
            // defaultValue={item.routeTime ? moment(item.routeTime) : null}
            format="YYYY-MM-DD"
            placeholder="请选择优惠卷截止时间"
            style={{ width: '100%' }}
          />)}
        </FormItem>
        <FormItem label="优惠券使用门槛" hasFeedback {...formItemLayout}>
          {getFieldDecorator('couponThreshold', {
            initialValue: item.coupon_threshold,
            rules: [
              {
                required: true,
                // pattern: /^[\u4e00-\u9fa5]{0,}$/,
                message: '请输入优惠券使用门槛!',
              },
            ],
          })(<InputNumber style={{ width: '100%' }} autosize="true" placeholder="请输入优惠券使用门槛" />)}
        </FormItem>
        <FormItem label="生成规则(前缀)" hasFeedback {...formItemLayout}>
          {getFieldDecorator('couponPrefix', {
            initialValue: item.coupon_prefix,
            rules: [
              {
                required: true,
                pattern: /^[a-zA-Z]+$/,
                message: '请输入正确的生成规则(前缀)!',
              },
            ],
          })(<Input autosize="true" placeholder="请输入生成规则(前缀)" />)}
        </FormItem>
        <FormItem label="生成规则(位数)" hasFeedback {...formItemLayout}>
          {getFieldDecorator('couponDigit', {
            initialValue: item.coupon_digit,
            rules: [
              {
                required: true,
                // pattern: /^[\u4e00-\u9fa5]{0,}$/,
                message: '请输入生成规则(位数)!',
              },
            ],
          })(<InputNumber style={{ width: '100%' }} autosize="true" placeholder="请输入生成规则(位数)" />)}
        </FormItem>
        <FormItem label="发放数量" hasFeedback {...formItemLayout}>
          {getFieldDecorator('couponCount', {
            initialValue: item.coupon_count,
            rules: [
              {
                required: true,
                // pattern: /^[\u4e00-\u9fa5]{0,}$/,
                message: '请输入发放数量!',
              },
            ],
          })(<InputNumber style={{ width: '100%' }} autosize="true" placeholder="请输入发放数量" />)}
        </FormItem>
        <FormItem label="发放方式" hasFeedback {...formItemLayout}>
          {getFieldDecorator('couponType', {
            initialValue: item.coupon_type || 0,
            rules: [
              {
                required: true,
                message: '请选择发放方式!',
              },
            ],
          })(<RadioGroup>
            <Radio value={0}>关注发放</Radio>
            <Radio value={1}>下单支付发放</Radio>
          </RadioGroup>)}
        </FormItem>
        <FormItem label="备注信息" hasFeedback {...formItemLayout}>
          {getFieldDecorator('remark', {
            initialValue: item.remark,
            rules: [
              {
                required: false,
                // pattern: /^[\u4e00-\u9fa5]{0,}$/,
                message: '请输入备注信息!',
              },
            ],
          })(<Input autosize="true" placeholder="请输入备注信息" />)}
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
