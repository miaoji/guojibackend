import React from 'react'
import PropTypes from 'prop-types'
import styles from './Modal.less'
import classnames from 'classnames'
import { Form, Input, InputNumber, Modal, Select, Radio } from 'antd'
import city from '../../utils/city'

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

const modal = ({
  item = {},
  onOk,
  modalDis,
  getKdCompany,
  modalRadioDis,
  onModalDisState,
  selectParentOrder,
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

  const handleFocus = () => {
    // getKdCompany()
  }

  const handleChange = (e) => {
    const data = {
      ...getFieldsValue(),
    }
    onModalDisState({ ...data, cargoType: e.target.value })
    setFieldsValue({ parentId: undefined })
  }

  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  }

  const inputDisabled = modalOpts.type === 'update'

  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem style={{ marginTop: '20px' }} label="货物类型" hasFeedback {...formItemLayout}>
          {getFieldDecorator('cargoType', {
            initialValue: '-1',
            rules: [
              {
                required: true,
                message: '请输入货物类型!',
              },
            ],
          })(<Radio.Group onChange={handleChange}>
              <Radio value={'-1'}>普货</Radio>
              <Radio value={'-2'}>特货</Radio>
              <Radio disabled={modalRadioDis} value={'1'}>合单到指定订单</Radio>
            </Radio.Group>)}
        </FormItem>
        <div className={classnames({ [styles.hide]: modalDis })}>
          <FormItem label="指定订单单号" hasFeedback {...formItemLayout}>
            {getFieldDecorator('parentId', {
              rules: [
                {
                  // required: !modalDis,
                  message: '请选择订单单号',
                },
              ],
            })(<Select disabled={modalDis} showSearch placeholder="输入单号可搜索" onFocus={handleFocus} defaultValue="10" style={{ width: 286 }}>{selectParentOrder}</Select>)}
          </FormItem>
        </div>
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
