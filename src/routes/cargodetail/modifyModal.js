import React from 'react'
import PropTypes from 'prop-types'
// import styles from './Modal.less'
// import classnames from 'classnames'
import { Form, Input, InputNumber, Modal, Select } from 'antd'

const FormItem = Form.Item
const Option = Select.Option

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

const ModifyModal = ({
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
        <FormItem style={{ marginTop: '20px' }} label="中转地址" hasFeedback {...formItemLayout}>
          {getFieldDecorator('transferAddress', {
            initialValue: item.transferAddress || '泰虹路168弄万科时一区1号楼302室',
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
            initialValue: item.kdCompanyCode,
            rules: [
              {
                required: true,
                message: '请选择快递公司名!',
              },
            ],
          })(<Select showSearch placeholder="输入快递备注名可搜索" onFocus={handleFocus} defaultValue="dhlen" style={{ width: 286 }}>{selectKdCompany}</Select>)}
        </FormItem>
        <FormItem label="国际段单号" hasFeedback {...formItemLayout}>
          {getFieldDecorator('intlNo', {
            initialValue: item.intlNo,
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

ModifyModal.propTypes = {
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default Form.create()(ModifyModal)
