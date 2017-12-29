import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Row, Col, Button, Popconfirm } from 'antd'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

const Spreaduser = ({ location, dispatch, spreaduser, loading }) => {
  const { qrTypeDis, spreadTypeDis, selectGrade, selectWxuser, list, pagination, currentItem, modalVisible, modalType, isMotion, selectedRowKeys } = spreaduser
  const { pageSize } = pagination

  const modalProps = {
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['spreaduser/update'],
    title: `${modalType === 'create' ? '新增包裹类型' : '修改包裹类型'}`,
    wrapClassName: 'vertical-center-modal',
    selectWxuser,
    selectGrade,
    spreadTypeDis,
    qrTypeDis,
    onOk (data) {
      dispatch({
        type: `spreaduser/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'spreaduser/hideModal',
      })
    },
    handleChange (val) {
      dispatch({
        type: 'spreaduser/updateState',
        payload: val
      })
    }
  }

  const listProps = {
    dataSource: list,
    loading: loading.effects['spreaduser/query'],
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
    onDeleteItem (id) {
      dispatch({
        type: 'spreaduser/delete',
        payload: id,
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'spreaduser/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      })
      dispatch({ type: 'spreaduser/getGradeInfo' })
      dispatch({ type: 'spreaduser/getWxuserInfo' })
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
          page: 1,
          pageSize,
        },
      }))
    },
    onSearch (fieldsValue) {
      fieldsValue.keyword.length ? dispatch(routerRedux.push({
        pathname: '/spreaduser',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/spreaduser',
      }))
    },
    onAdd () {
      dispatch({
        type: 'spreaduser/showModal',
        payload: {
          modalType: 'create',
        },
      })
      dispatch({ type: 'spreaduser/getGradeInfo' })
      dispatch({ type: 'spreaduser/getWxuserInfo' })
    },
    switchIsMotion () {
      dispatch({ type: 'spreaduser/switchIsMotion' })
    },
  }

  const handleDeleteItems = () => {
    dispatch({
      type: 'spreaduser/multiDelete',
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

Spreaduser.propTypes = {
  spreaduser: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ spreaduser, loading }) => ({ spreaduser, loading }))(Spreaduser)
