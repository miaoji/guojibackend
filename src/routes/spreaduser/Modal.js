import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Modal, Cascader, Select } from 'antd'
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
  selectGrade,
  selectWxuser,
  handleChange,
  spreadTypeDis,
  qrTypeDis,
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
  
  const spreadTypeChange = (e) => {
    console.log('e', e.target.value)
    handleChange({ spreadType: e.target.value })
  }

  const qrTypeChange = (e) => {
    handleChange({ qrType: e.target.value })
    console.log('spreadTypeDis', e.target.value )
  }

  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  }

  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label="推广人微信" hasFeedback {...formItemLayout}>
          {getFieldDecorator('wxUserId', {
            initialValue: item.nickName,
            rules: [
              {
                required: true,
                message: '请选择推广人微信!',
              },
            ],
          })(<Select showSearch placeholder="点击选择">{selectWxuser}</Select>)}
        </FormItem>
        <FormItem label="晋级类型" hasFeedback {...formItemLayout}>
          {getFieldDecorator('spreadType', {
            initialValue: item.spreadUserType || 0,
            rules: [
              {
                required: true,
                message: '请选择晋级类型!',
              },
            ],
          })(<Radio.Group disabled={false} onChange={spreadTypeChange}>
            <Radio value={0}>自动晋级</Radio>
            <Radio value={1}>手动晋级</Radio>
          </Radio.Group>)}
        </FormItem>
        <div style={{ display: spreadTypeDis ? 'block' : 'none' }}>
          <FormItem label="推广等级" hasFeedback {...formItemLayout}>
            {getFieldDecorator('spreadLevelId', {
              initialValue: item.spreadName,
              rules: [
                {
                  required: spreadTypeDis,
                  message: '请选择推广等级!',
                },
              ],
            })(<Select showSearch placeholder="点击选择">{selectGrade}</Select>)}
          </FormItem>
        </div>
        <div style={{ display: !spreadTypeDis ? 'block' : 'none' }}>
          <FormItem label="推广费用比例" hasFeedback {...formItemLayout}>
            {getFieldDecorator('spreadeUserRatio', {
              initialValue: item.spreadeUserRatio,
              rules: [
                {
                  required: !spreadTypeDis,
                  message: '请选择推广费用比例!',
                },
              ],
            })(<Input/>)}
          </FormItem>
        </div>
        <FormItem label="有效时长" hasFeedback {...formItemLayout}>
          {getFieldDecorator('qrType', {
            initialValue: item.qrType || 1,
            rules: [
              {
                required: true,
                message: '请选择有效时长!',
              },
            ],
          })(<Radio.Group disabled={false} onChange={qrTypeChange}>
            <Radio value={1}>永久有效</Radio>
            <Radio value={0}>临时有效(最长一个月的时间)</Radio>
          </Radio.Group>)}
        </FormItem>
        <FormItem label="有效期(天)" hasFeedback {...formItemLayout}>
          {getFieldDecorator('seconds', {
            initialValue: item.seconds,
            rules: [
              {
                required: !qrTypeDis,
                pattern: /(^[1-9]{1}$)|(^[0-2]{1}[0-9]{1}$)|(^30$)/,
                message: '请输入有效期!',
              },
            ],
          })(<Input disabled={qrTypeDis} />)}
        </FormItem>
      </Form>
    </Modal>
  )
}

modal.propTypes = {
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  item: PropTypes.object,
  selectPackage: PropTypes.object,
  getPackage: PropTypes.func,
  onOk: PropTypes.func,
}

export default Form.create()(modal)
