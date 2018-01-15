import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Row, Col, Button, Popconfirm } from 'antd'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

const Qr = ({ location, dispatch, qr, loading }) => {
  const { list, pagination, currentItem, modalVisible, modalType, inputDis } = qr
  const { pageSize } = pagination

  const modalProps = {
    type: modalType,
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    confirmLoading: loading.effects['boot/update'],
    title: `${modalType === 'create' ? '新增二维码' : '修改二维码'}`,
    wrapClassName: 'vertical-center-modal',
    typeDis: modalType !== 'create',
    inputDis,
    onOk (data) {
      dispatch({
        type: `qr/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'qr/hideModal',
      })
    },
    onShowInput () {
      dispatch({
        type: 'qr/showInput',
      })
    },
    onHideInput () {
      dispatch({
        type: 'qr/hideInput',
      })
    },
  }

  const listProps = {
    dataSource: list,
    loading: loading.effects['qr/query'],
    pagination,
    location,
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
    onDeleteItem (id) {
      dispatch({
        type: 'qr/delete',
        payload: id,
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'qr/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      })
    },
  }

  const filterProps = {
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
    onSearch (fieldsValue) {
      fieldsValue.keyword.length ? dispatch(routerRedux.push({
        pathname: '/qr',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/qr',
      }))
    },
    onAdd () {
      dispatch({
        type: 'qr/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
    switchIsMotion () {
      dispatch({ type: 'qr/switchIsMotion' })
    },
  }

  const handleDeleteItems = () => {
    dispatch({
      type: 'qr/multiDelete',
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

Qr.propTypes = {
  qr: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ qr, loading }) => ({ qr, loading }))(Qr)
