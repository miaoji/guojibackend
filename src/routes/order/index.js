import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Row, Col, Button, Popconfirm } from 'antd'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'
import BootModal from './bootModal'

const Order = ({ location, dispatch, order, loading }) => {
  const { list, pagination, currentItem, modalVisible, bootModalVisible, modalType, isMotion, selectedRowKeys } = order
  const { pageSize } = pagination

  const modalProps = {
    type: modalType,
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    maskClosable: true,
    confirmLoading: loading.effects['order/update'],
    title: `${modalType === 'create' ? '创建订单' : '修改订单'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: `order/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'order/hideModal',
      })
    },
  }

  const bootModalProps = {
    type: modalType,
    item: currentItem,
    visible: bootModalVisible,
    confirmLoading: loading.effects['order/update'],
    title: '提交补价',
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      console.log('update data', data)
      dispatch({
        type: `order/addBoot`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'order/hideBootModal',
      })
    },
  }

  const listProps = {
    dataSource: list,
    loading: loading.effects['order/query'],
    pagination,
    location,
    isMotion,
    onChange (page) {
      const { query, pathname } = location
      dispatch(routerRedux.push({
        pathname,
        query: {
          ...query,
          page: page.current,
          pageSize: page.pageSize,
        },
      }))
    },
    onMarkItem (id) {
      dispatch({
        type: 'order/markBlackList',
        payload: id
      })
    },
    onDeleteItem (id) {
      dispatch({
        type: 'order/delete',
        payload: id,
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'order/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      })
    },
    addBoot (item) {
      dispatch({
        type: 'order/showBootModal',
        payload: {
          currentItem: item,
        },
      })
    },
    onCreateZtorder (item) {
      dispatch({
        type: 'order/createZtorder',
        payload: {
          id: item.id,
          serialNumber: item.serialnumber
        },
      })
    }
  }

  const filterProps = {
    isMotion,
    filter: {
      ...location.query,
    },
    onFilterChange (value) {
      dispatch(routerRedux.push({
        pathname: location.pathname,
        query: {
          ...value,
          page: 1,
          pageSize,
        },
      }))
    },
    onSearch (fieldsValue) {
      fieldsValue.keyword.length ? dispatch(routerRedux.push({
        pathname: '/order',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/order',
      }))
    },
    onAdd () {
      dispatch({
        type: 'order/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
    switchIsMotion () {
      dispatch({ type: 'order/switchIsMotion' })
    },
  }

  const handleDeleteItems = () => {
    dispatch({
      type: 'order/multiDelete',
      payload: {
        ids: selectedRowKeys,
      },
    })
  }

  return (
    <div className="content-inner">
      <Filter {...filterProps} />
      {
         selectedRowKeys.length > 0 &&
           <Row style={{ marginBottom: 24, textAlign: 'right', fontSize: 13 }}>
             <Col>
               {`选中 ${selectedRowKeys.length} 个微信用户 `}
               <Popconfirm title={'确定将这些用户打入黑名单吗?'} placement="left" onConfirm={handleDeleteItems}>
                 <Button type="primary" size="large" style={{ marginLeft: 8 }}>标记黑名单</Button>
               </Popconfirm>
             </Col>
           </Row>
      }
      <List {...listProps} />
      {modalVisible && <Modal {...modalProps} />}
      {bootModalVisible && <BootModal {...bootModalProps} />}
    </div>
  )
}

Order.propTypes = {
  order: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ order, loading }) => ({ order, loading }))(Order)
