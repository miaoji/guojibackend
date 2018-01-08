import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Row, Col, Button, Popconfirm } from 'antd'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

const Audit = ({ location, dispatch, audit, loading }) => {
  const { list, pagination, currentItem, modalVisible, modalType, isMotion, selectedRowKeys } = audit
  const { pageSize } = pagination

  const modalProps = {
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['audit/update'],
    title: `${modalType === 'create' ? '新增等级配置' : '修改等级配置'}`,
    wrapClassName: 'vertical-center-modal',
    onOk(data) {
      dispatch({
        type: `audit/${modalType}`,
        payload: data,
      })
    },
    onCancel() {
      dispatch({
        type: 'audit/hideModal',
      })
    },
  }

  const listProps = {
    dataSource: list,
    loading: loading.effects['audit/query'],
    pagination,
    location,
    isMotion,
    onChange(page) {
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
    onDeleteItem(id) {
      dispatch({
        type: 'audit/delete',
        payload: id,
      })
    },
    onEditItem(item) {
      dispatch({
        type: 'audit/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      })
    },
  }

  const filterProps = {
    isMotion,
    filter: {
      ...location.query,
    },
    onFilterChange(value) {
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
    onSearch(fieldsValue) {
      fieldsValue.keyword.length ? dispatch(routerRedux.push({
        pathname: '/audit',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/audit',
      }))
    },
    onAdd() {
      dispatch({
        type: 'audit/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
    switchIsMotion() {
      dispatch({ type: 'audit/switchIsMotion' })
    },
  }

  const handleDeleteItems = () => {
    dispatch({
      type: 'audit/multiDelete',
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

Audit.propTypes = {
  audit: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ audit, loading }) => ({ audit, loading }))(Audit)
