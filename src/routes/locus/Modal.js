import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Modal, DatePicker, Button } from 'antd'
import moment from 'moment'
import classnames from 'classnames'
import styles from './Modal.less'

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
  locusDate = [],
  onSetLocusData,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
    setFieldsValue
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
      onOk({ ...data, locusDate })
    })
  }
  const handleClick = () => {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
        key: item.key,
      }
      locusDate.push({ route: data.route, routeTime: data.routeTime })
      onSetLocusData(locusDate)
      setFieldsValue({ route: null, routeTime: null })
    })
  }
  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  }

  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label="路由信息" hasFeedback {...formItemLayout}>
          {getFieldDecorator('route', {
            initialValue: item.route,
            rules: [
              {
                required: locusDate.length === 0,
                // pattern: /^[\u4e00-\u9fa5]{0,}$/,
                message: '请输入路由信息!',
              },
            ],
          })(<Input placeholder="请输入路由信息" />)}
        </FormItem>
        <FormItem label="路由时间" hasFeedback {...formItemLayout}>
          {getFieldDecorator('routeTime', {
            initialValue: item.routeTime ? moment(item.routeTime) : null,
            rules: [
              {
                required: locusDate.length === 0,
                // pattern: /^[\u4e00-\u9fa5]{0,}$/,
                message: '请选择路由时间!',
              },
            ],
          })(<DatePicker
            showTime
            defaultValue={item.routeTime ? moment(item.routeTime) : null}
            format="YYYY-MM-DD HH:mm:ss"
            placeholder="请选择路由时间"
            style={{ width: '100%' }}
          />)}
        </FormItem>
        <div className={classnames({ [styles.hide]: type === 'update' })} style={{ textAlign: 'center', paddingBottom: '25px' }}><Button type="primary" onClick={handleClick}>批量添加轨迹信息</Button></div>
        <div className={classnames({ [styles.hide]: locusDate.length === 0 || type === 'update' })}>
          <hr className={classnames({ [styles.hr]: true })} />
          <table className={classnames({ [styles.tables]: true })}>
            <tr>
              <td>路由信息</td>
              <td>路由时间</td>
            </tr>
            {
              locusDate.map((val) => {
                return (<tr>
                  <td>{val.route}</td>
                  <td>{val.routeTime._d.getTime()}</td>
                </tr>)
              })
            }
          </table>
          <hr className={classnames({ [styles.hr]: true })} />
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
  locusDate: PropTypes.array,
  onSetLocusData: PropTypes.func
}

export default Form.create()(modal)
