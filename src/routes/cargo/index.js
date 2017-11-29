import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Row, Col, Button, Popconfirm } from 'antd'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

const Cargo = ({ location, dispatch, cargo, loading }) => {
  const { list, pagination, currentItem, modalVisible, modalType, isMotion, selectedRowKeys, selectKdCompany } = cargo
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
    selectKdCompany,
    onOk (data) {
      dispatch({
        type: `cargo/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'cargo/hideModal',
      })
    },
  }

  const listProps = {
    dataSource: list,
    loading: loading.effects['cargo/query'],
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
        type: 'cargo/showModal',
        payload: {
          modalType: 'create',
        },
      })
    }
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
