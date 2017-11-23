import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Row, Col, Button, Popconfirm } from 'antd'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'
import BootModal from './bootModal'
import AddModal from './addModal'
import StateModal from './stateModal'

const Order = ({ location, dispatch, order, loading }) => {
  const { list, pagination, currentItem, addModalVisible, stateModalVisible, modalVisible, bootModalVisible, modalType, isMotion, selectedRowKeys, selectKdCompany } = order
  const { pageSize } = pagination

  // 订单创建的modal
  const addModelProps = {
    type: modalType,
    item: currentItem,
    maskClosable: false,
    visible: addModalVisible,
    confirmLoading: loading.effects['order/create'],
    title: '创建订单',
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: 'order/addOrder',
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'order/hideAddModal',
      })
    },
  }

  // 订单修改modal
  const modalProps = {
    type: modalType,
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    maskClosable: true,
    confirmLoading: loading.effects['order/update'],
    title: `添加国际段快递信息`,
    wrapClassName: 'vertical-center-modal',
    selectKdCompany,
    onOk (data) {
      dispatch({
        type: `order/update`,
        payload: data,
      })
    },
    getKdCompany () {
      dispatch({
        type: 'order/getKdCompany',
      })
    },
    onCancel () {
      dispatch({
        type: 'order/hideModal',
      })
    },
  }

  // 补价modal
  const bootModalProps = {
    type: modalType,
    item: currentItem,
    visible: bootModalVisible,
    confirmLoading: loading.effects['order/update'],
    title: '提交补价',
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: 'order/addBoot',
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'order/hideBootModal',
      })
    },
  }

  // 改状态modal
  const stateModalProps = {
    type: modalType,
    item: currentItem,
    visible: stateModalVisible,
    confirmLoading: loading.effects['order/update'],
    title: '修改状态',
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: 'order/updateState',
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'order/hideStateModal',
      })
    },
  }

  const listProps = {
    filter: {
      ...location.query,
    },
    dataSource: list,
    loading: loading.effects['order/query'],
    pagination,
    location,
    isMotion,
    onChange (page, filter) {
      const value = {
        status: filter.STATUS ? filter.STATUS[0] : undefined,
      }
      const { query, pathname } = location
      dispatch(routerRedux.push({
        pathname,
        query: {
          ...query,
          ...value,
          page: page.current,
          pageSize: page.pageSize,
        },
      }))
    },
    onMarkItem (id) {
      dispatch({
        type: 'order/markBlackList',
        payload: id,
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
      dispatch({
        type: 'order/getKdCompany',
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
    showStateModal (item) {
      dispatch({
        type: 'order/showStateModal',
        payload: {
          currentItem: item,
        },
      })
    },
    onCreateCtorder (item) {
      dispatch({
        type: 'order/createChinaOrder',
        payload: {
          id: item.ID,
          orderNo: item.ORDER_NO,
        },
      })
    },
    filterStatus (value) {
      dispatch(routerRedux.push({
        pathname: location.pathname,
        query: {
          ...value,
        },
      }))
    },
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
        },
      }))
    },
    onAdd () {
      dispatch({
        type: 'order/showAddModal',
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
      <List {...listProps} />
      {modalVisible && <Modal {...modalProps} />}
      {bootModalVisible && <BootModal {...bootModalProps} />}
      {stateModalVisible && <StateModal {...stateModalProps} />}
      {addModalVisible && <AddModal {...addModelProps} />}
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
