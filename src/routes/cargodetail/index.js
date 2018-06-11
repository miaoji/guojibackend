import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
// import { Row, Col, Button, Popconfirm } from 'antd'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'
import BootModal from './bootModal'
import StateModal from './stateModal'
import WeightModal from './weightModal'
import ModifyModal from './modifyModal'
import RepairModal from './repairModal'
// import { queryURL, storage } from '../../utils'

const Cargodetail = ({ location, dispatch, cargodetail, loading }) => {
  const {
    list,
    modalDis,
    modalRadioDis,
    pagination,
    currentItem,
    modalVisible,
    modalType,
    isMotion,
    selectParentOrder,
    selectedRowKeys,
    selectKdCompany,
    bootModalVisible,
    stateModalVisible,
    weightModalVisible,
    modifyModalVisible,
    repairModalVisible,
    shelfDis,
    shelfCount,
  } = cargodetail

  const { pageSize } = pagination

  const modalProps = {
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['cargodetail/merge'],
    title: `${modalType === 'create' ? '创建消息' : '进行集运合包'}`,
    wrapClassName: 'vertical-center-modal',
    selectParentOrder,
    modalDis,
    modalRadioDis,
    onOk (data) {
      dispatch({
        type: 'cargodetail/mergeOrder',
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'cargodetail/hideModal',
      })
    },
    onModalDisState (state) {
      dispatch({
        type: 'cargodetail/setMergeSelectState',
        payload: state,
      })
    },
  }

  const bootModalProps = {
    item: currentItem,
    visible: bootModalVisible,
    maskClosable: true,
    confirmLoading: loading.effects['cargodetail/setFreight'],
    title: '确定订单运费金额',
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: 'cargodetail/setFreight',
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'cargodetail/hideBootModal',
      })
    },
  }

  const stateModalProps = {
    item: currentItem,
    modalType,
    visible: stateModalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['cargodetail/setStatus'],
    title: `${modalType === 'setOrderState' ? '设置订单状态' : '确认包裹是否到达中转站'}`,
    wrapClassName: 'vertical-center-modal',
    shelfDis,
    shelfCount,
    onOk (data) {
      dispatch({
        type: `${modalType === 'setOrderState' ? 'cargodetail/setOrderState' : 'cargodetail/setStatus'}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({ type: 'cargodetail/hideStateModal' })
    },
    handleChange (val) {
      if (val === '已到件') {
        dispatch({
          type: 'cargodetail/setShelfDis',
        })
      } else {
        // this.disSelect = false
      }
    },
    getShelfCount (val) {
      dispatch({
        type: 'cargodetail/getShelfCount',
        payload: val,
      })
    },
  }

  const weightModalProps = {
    item: currentItem,
    visible: weightModalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['cargodetail/setWeight'],
    title: '核实包裹重量及包裹的长宽高',
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: 'cargodetail/setWeight',
        payload: data,
      })
    },
    onCancel () {
      dispatch({ type: 'cargodetail/hideWeightModal' })
    },
  }

  const repairModalProps = {
    item: currentItem,
    visible: repairModalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['cargodetail/setRepair'],
    title: '核实包裹重量及包裹的长宽高',
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: 'cargodetail/setRepair',
        payload: data,
      })
    },
    onCancel () {
      dispatch({ type: 'cargodetail/hideRepairModal' })
    },
  }

  const modifyModalProps = {
    item: currentItem,
    visible: modifyModalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['cargodetail/setIntlNo'],
    title: '添加国际段快递信息',
    wrapClassName: 'vertical-center-modal',
    selectKdCompany,
    onOk (data) {
      dispatch({
        type: 'cargodetail/setIntlNo',
        payload: data,
      })
    },
    onCancel () {
      dispatch({ type: 'cargodetail/hideModifyModal' })
    },
  }

  const listProps = {
    dataSource: list,
    loading: loading.effects['cargodetail/query'],
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
    // onRowClick (data) {
    // },
    onSetCancel (data) {
      dispatch({
        type: 'cargodetail/setCancel',
        payload: data,
      })
    },
    onSetFreight (item) {
      dispatch({
        type: 'cargodetail/showBootModal',
        payload: {
          currentItem: item,
        },
      })
    },
    onSetStatus (item) {
      dispatch({
        type: 'cargodetail/showStateModal',
        payload: {
          currentItem: item,
          modalType: 'setStatus',
        },
      })
      dispatch({
        type: 'cargodetail/getShelfCount',
        payload: {
          shelfNo: item.shelfNo || 'A01',
        },
      })
    },
    onSetWeight (item) {
      dispatch({
        type: 'cargodetail/showWeightModal',
        payload: {
          currentItem: item,
        },
      })
    },
    onModifyOrder (item) {
      dispatch({
        type: 'cargodetail/showModifyModal',
        payload: {
          currentItem: item,
        },
      })
      dispatch({ type: 'cargodetail/getKdCompany' })
    },
    onSetRepair (item) {
      dispatch({
        type: 'cargodetail/showRepairModal',
        payload: {
          currentItem: item,
        },
      })
    },
    onDeleteItem (id) {
      dispatch({
        type: 'cargodetail/delete',
        payload: id,
      })
    },
    onSetState (item) {
      dispatch({
        type: 'cargodetail/showStateModal',
        payload: {
          currentItem: item,
          modalType: 'setOrderState',
        },
      })
    },
    rowSelection: {
      selectedRowKeys,
      onChange: (keys) => {
        dispatch({
          type: 'cargodetail/updateState',
          payload: {
            selectedRowKeys: keys,
          },
        })
      },
      getCheckboxProps: record => ({
        disabled: record.parentId !== 0 || record.cargoStatus === 0,
      }),
      // onSelect: (record, selected, selectedRows) => {
      // },
      // onSelectAll: (selected, selectedRows, changeRows) => {
      // },
    },
  }

  const filterProps = {
    isMotion,
    selectedRowKeys,
    filter: {
      ...location.query,
    },
    onFilterChange (value) {
      console.log('value', value)
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
        pathname: '/cargodetail',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/cargodetail',
      }))
    },
    onMergeOrder (val) {
      dispatch({
        type: 'cargodetail/showModal',
        payload: {
          modalType: 'merge',
          currentItem: { ids: val },
        },
      })
      dispatch({ type: 'cargodetail/getParentOrder' })
    },
    onAdd () {
      dispatch({
        type: 'cargodetail/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
  }

  // const handleDeleteItems = () => {
  //   dispatch({
  //     type: 'cargodetail/showModal',
  //     payload: {
  //       modalType: 'update',
  //       currentItem: { ids: selectedRowKeys },
  //     },
  //   })
  // }

  return (
    <div className="content-inner">
      <Filter {...filterProps} />
      <List {...listProps} />
      {modalVisible && <Modal {...modalProps} />}
      {bootModalVisible && <BootModal {...bootModalProps} />}
      {stateModalVisible && <StateModal {...stateModalProps} />}
      {weightModalVisible && <WeightModal {...weightModalProps} />}
      {modifyModalVisible && <ModifyModal {...modifyModalProps} />}
      {repairModalVisible && <RepairModal {...repairModalProps} />}
    </div>
  )
}

Cargodetail.propTypes = {
  cargodetail: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ cargodetail, loading }) => ({ cargodetail, loading }))(Cargodetail)
