import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Row, Col, Button, Popconfirm } from 'antd'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

const Cargo = ({ location, dispatch, cargo, loading }) => {
  const { list, pagination, currentItem, modalVisible, modalType, isMotion, selectedRowKeys, selectKdCompany, } = cargo
  const { pageSize } = pagination

  // 订单修改modal
  const modalProps = {
    type: modalType,
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    maskClosable: true,
    confirmLoading: loading.effects['cargo/update'],
    title: `${modalType === 'create' ? '创建订单' : '修改订单'}`,
    wrapClassName: 'vertical-center-modal',
    selectKdCompany: selectKdCompany,
    onOk (data) {
      dispatch({
        type: `cargo/${modalType}`,
        payload: data,
      })
    },
    getKdCompany () {
      dispatch({
        type: `cargo/getKdCompany`
      })
    },
    onCancel () {
      dispatch({
        type: 'cargo/hideModal',
      })
    },
  }

  const listProps = {
    filter: {
      ...location.query,
    },
    dataSource: list,
    loading: loading.effects['cargo/query'],
    pagination,
    location,
    isMotion,
    onChange (page,filter) {
      const value = {
        status:filter.STATUS?filter.STATUS[0]:undefined
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
        type: 'cargo/markBlackList',
        payload: id
      })
    },
    onDeleteItem (id) {
      dispatch({
        type: 'cargo/delete',
        payload: id,
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'cargo/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      })
    },
    addBoot (item) {
      dispatch({
        type: 'cargo/showBootModal',
        payload: {
          currentItem: item,
        },
      })
    },
    showStateModal (item) {
      dispatch({
        type: 'cargo/showStateModal',
        payload: {
          currentItem: item
        }
      })
    },
    onCreateCtcargo (item) {
      dispatch({
        type: 'cargo/createChinacargo',
        payload: {
          id: item.ID,
          cargoNo: item.cargo_NO
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
        },
      }))
    },
    onAdd () {
      dispatch({
        type: 'cargo/showAddModal',
        payload: {
          modalType: 'create',
        },
      })
    },
    switchIsMotion () {
      dispatch({ type: 'cargo/switchIsMotion' })
    },
  }

  const handleDeleteItems = () => {
    dispatch({
      type: 'cargo/multiDelete',
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
    </div>
  )
}

Cargo.propTypes = {
  cargo: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ cargo, loading }) => ({ cargo, loading }))(Cargo)
