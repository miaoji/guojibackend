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
  selectNation,
  selectProvince,
  selectCity,
  selectCounty,
  getCountry,
  getProvince,
  getCity,
  getCounty,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
    setFieldsValue,
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

  const handleClick= async function() {
    await getCountry()
  }

  const countryChange = async function(e){
    await getProvince(e)
    setFieldsValue({
      transferProv: null,
      transferCity: null,
      transferCounty: null
    })
  }

  const provinceChange = async function(e){
    await getCity(e)
    setFieldsValue({
      transferCity: null,
      transferCounty: null
    })
  }

  const cityChange = async function(e){
    await getCounty(e)
    setFieldsValue({
      transferCounty: null
    })
  }

  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  }

  return (
    <Modal {...modalOpts}>
      <Form>
        <FormItem label="寄件人姓名" hasFeedback {...formItemLayout}>
          {getFieldDecorator('transferName', {
            initialValue: item.transfer_name,
            rules: [
              {
                required: true,
                message: '请输入寄件人姓名!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="收件人公司" hasFeedback {...formItemLayout}>
          {getFieldDecorator('transferCompany', {
            initialValue: item.transfer_company,
            rules: [
              {
                required: true,
                message: '请输入收件人公司!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="收件人电话" hasFeedback {...formItemLayout}>
          {getFieldDecorator('transferMobile', {
            initialValue: item.transfer_mobile,
            rules: [
              {
                required: true,
                message: '请输入收件人电话!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="收件人国家" hasFeedback {...formItemLayout}>
          {getFieldDecorator('transferCountry', {
            initialValue: item.transfer_country,
            rules: [
              {
                required: true,
                message: '请选择收件人国家!',
              },
            ],
          })(<Select onChange={countryChange} placeholder='输入文字可搜索' onFocus={handleClick}>{selectNation}</Select>)}
        </FormItem>
        <FormItem label="收件人省" hasFeedback {...formItemLayout}>
          {getFieldDecorator('transferProv', {
            initialValue: item.transfer_prov,
            rules: [
              {
                required: true,
                message: '请选择收件省!',
              },
            ],
          })(<Select placeholder='点击选择' onChange={provinceChange}>{selectProvince}</Select>)}
        </FormItem>
        <FormItem label="收件人市" hasFeedback {...formItemLayout}>
          {getFieldDecorator('transferCity', {
            initialValue: item.transfer_city,
            rules: [
              {
                required: true,
                message: '请选择收件人市!',
              },
            ],
          })(<Select placeholder='点击选择' onChange={cityChange}>{selectCity}</Select>)}
        </FormItem>
        <FormItem label="收件人区" hasFeedback {...formItemLayout}>
          {getFieldDecorator('transferCounty', {
            initialValue: item.transfer_county,
            rules: [
              {
                required: true,
                message: '请选择收件人区!',
              },
            ],
          })(<Select placeholder='点击选择'>{selectCounty}</Select>)}
        </FormItem>
        <FormItem label="收件人详细地址" hasFeedback {...formItemLayout}>
          {getFieldDecorator('transferAddress', {
            initialValue: item.transfer_address,
            rules: [
              {
                required: true,
                message: '请输入收件人详细地址!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="收件人邮编" hasFeedback {...formItemLayout}>
          {getFieldDecorator('transferPostcode', {
            initialValue: item.transfer_postcode,
            rules: [
              {
                required: true,
                message: '请输入收件邮编!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="备注" hasFeedback {...formItemLayout}>
          {getFieldDecorator('remark', {
            initialValue: item.remark,
            rules: [
              {
                required: false,
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
  selectPackage: PropTypes.object,
  getPackage: PropTypes.func,
  onOk: PropTypes.func
}

export default Form.create()(modal)
