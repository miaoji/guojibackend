import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Row, Col, Button, Popconfirm } from 'antd'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

const Spreaduserlist = ({ location, dispatch, spreaduserlist, loading }) => {
  const { list, pagination, currentItem, modalVisible, modalType, isMotion, selectedRowKeys } = spreaduserlist
  const { pageSize } = pagination

  const modalProps = {
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['spreaduserlist/update'],
    title: `${modalType === 'create' ? '新增等级配置' : '修改等级配置'}`,
    wrapClassName: 'vertical-center-modal',
    onOk(data) {
      dispatch({
        type: `spreaduserlist/${modalType}`,
        payload: data,
      })
    },
    onCancel() {
      dispatch({
        type: 'spreaduserlist/hideModal',
      })
    },
  }

  const listProps = {
    dataSource: list,
    loading: loading.effects['spreaduserlist/query'],
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
        type: 'spreaduserlist/delete',
        payload: id,
      })
    },
    onEditItem(item) {
      dispatch({
        type: 'spreaduserlist/showModal',
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
        pathname: '/spreaduserlist',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/spreaduserlist',
      }))
    },
    onAdd() {
      dispatch({
        type: 'spreaduserlist/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
    switchIsMotion() {
      dispatch({ type: 'spreaduserlist/switchIsMotion' })
    },
  }

  const handleDeleteItems = () => {
    dispatch({
      type: 'spreaduserlist/multiDelete',
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

Spreaduserlist.propTypes = {
  spreaduserlist: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ spreaduserlist, loading }) => ({ spreaduserlist, loading }))(Spreaduserlist)
