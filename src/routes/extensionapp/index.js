import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Row, Col, Button, Popconfirm } from 'antd'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

const Extensionapp = ({ location, dispatch, extensionapp, loading }) => {
  const { list, pagination, currentItem, modalVisible, modalType } = extensionapp
  const { pageSize } = pagination

  const modalProps = {
    type: modalType,
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    confirmLoading: loading.effects['boot/update'],
    title: `${modalType === 'create' ? '新增二维码' : '修改二维码'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: `extensionapp/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'extensionapp/hideModal',
      })
    },
  }

  const listProps = {
    dataSource: list,
    loading: loading.effects['extensionapp/query'],
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
        type: 'extensionapp/delete',
        payload: id,
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'extensionapp/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      })
    }
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
          page: 1,
          pageSize,
        },
      }))
    },
    onSearch (fieldsValue) {
      fieldsValue.keyword.length ? dispatch(routerRedux.push({
        pathname: '/extensionapp',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/extensionapp',
      }))
    },
    onAdd () {
      dispatch({
        type: 'extensionapp/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
    switchIsMotion () {
      dispatch({ type: 'extensionapp/switchIsMotion' })
    },
  }

  const handleDeleteItems = () => {
    dispatch({
      type: 'extensionapp/multiDelete',
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

Extensionapp.propTypes = {
  extensionapp: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ extensionapp, loading }) => ({ extensionapp, loading }))(Extensionapp)
