import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Row, Col, Button, Popconfirm } from 'antd'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'
import BootModal from './bootModal'
import StateModal from './stateModal'
import { queryURL, storage, } from '../../utils'

const Cargodetail = ({ location, dispatch, cargodetail, loading }) => {
  const { list, pagination, currentItem, modalVisible, modalType, isMotion, selectedRowKeys, bootModalVisible, stateModalVisible } = cargodetail
  const { pageSize } = pagination

  const modalProps = {
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['cargodetail/merge'],
    title: `${modalType === 'create' ? '创建消息' : '进行集运合包'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: `cargodetail/mergeOrder`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'cargodetail/hideModal',
      })
    },
  }

  const bootModalProps = {
    item: currentItem,
    visible: bootModalVisible,
    maskClosable: true,
    confirmLoading: loading.effects['cargodetail/setFreight'],
    title: `确定订单运费金额`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: `cargodetail/setFreight`,
        payload: data
      })
    },
    onCancel () {
      console.log('currentItem', currentItem)
      dispatch({
        type: `cargodetail/hideBootModal`
      })
    }
  }

  const stateModalProps = {
    item: currentItem,
    visible: stateModalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['cargodetail/setStatus'],
    title: '确认订单是否到件',
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: 'cargodetail/setStatus',
        payload: data
      })
    },
    onCancel () {
      dispatch({type:'cargodetail/hideStateModal'})
    }
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
    onSetCancel (id) {
      dispatch({
        type: 'cargodetail/setCancel',
        payload: id
      })
    },
    onSetFreight (item) {
      console.log('item啊啊啊', item)
      dispatch({
        type: 'cargodetail/showBootModal',
        payload: {
          currentItem: item
        }
      })
    },
    onSetStatus (item) {
      dispatch({
        type: 'cargodetail/showStateModal',
        payload: {
          currentItem: item
        }
      })
    },
    onDeleteItem (id) {
      dispatch({
        type: 'cargodetail/delete',
        payload: id
      })
    },
    rowSelection: {
      selectedRowKeys,
      onChange: (keys) => {
        console.log('keys', keys)
        dispatch({
          type: 'cargodetail/updateState',
          payload: {
            selectedRowKeys: keys,
          },
        })
      },
      getCheckboxProps: record => ({
        disabled: record.parentId !== 0 || record.status === 7,
      }),
      onSelect: (record, selected, selectedRows) => {
        console.log(record, selected, selectedRows);
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
        console.log(selected, selectedRows, changeRows);
      }
    }
  }

  const filterProps = {
    isMotion,
    selectedRowKeys,
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
        pathname: '/cargodetail',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/cargodetail',
      }))
    },
    onMergeOrder (selectedRowKeys) {
      dispatch({
        type: 'cargodetail/showModal',
        payload: {
          modalType: 'merge',
          currentItem: {ids: selectedRowKeys},
        }
      })
    },
    onAdd () {
      dispatch({
        type: 'cargodetail/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
    switchIsMotion () {
      dispatch({ type: 'cargodetail/switchIsMotion' })
    },
  }

  const handleDeleteItems = () => {
    dispatch({
      type: 'cargodetail/showModal',
      payload: {
        modalType: 'update',
        currentItem: {ids: selectedRowKeys},
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
