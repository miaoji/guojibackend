import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Modal, Select } from 'antd'

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
  selectKdCompany,
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
  }

  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  }

  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label="中转地址" hasFeedback {...formItemLayout}>
          {getFieldDecorator('transferAddress', {
            initialValue: item.TRANSFER_ADDRESS || '泰虹路168弄万科时一区1号楼302室',
            rules: [
              {
                required: true,
                message: '请输入中转地址!',
              },
            ],
          })(<Input disabled />)}
        </FormItem>
        <FormItem label="国际段快递公司" hasFeedback {...formItemLayout}>
          {getFieldDecorator('kdCompanyCode', {
            initialValue: item.KD_COMPANY_CODE,
            rules: [
              {
                required: true,
                message: '请选择快递公司名!',
              },
            ],
          })(<Select showSearch placeholder="输入快递公司名称可搜索" onFocus={handleFocus} style={{ width: 286 }}>{selectKdCompany}</Select>)}
        </FormItem>
        <FormItem label="国际段单号" hasFeedback {...formItemLayout}>
          {getFieldDecorator('intlNo', {
            initialValue: item.INTL_NO,
            rules: [
              {
                required: true,
                pattern: /^[A-Za-z0-9]{0,}$/,
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
  selectKdCompany: PropTypes.array
}

export default Form.create()(modal)
