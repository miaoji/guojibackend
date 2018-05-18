import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
// import { Row, Col, Button, Popconfirm } from 'antd'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'
import TimeModal from './TimeModal'

const Spreaduser = ({ location, dispatch, spreaduser, loading }) => {
  const { timeModalVisible, qrTypeDis, spreadTypeDis, selectGrade, selectWxuser, list, pagination, currentItem, modalVisible, modalType, isMotion } = spreaduser
  const { pageSize } = pagination

  const modalProps = {
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['spreaduser/update'],
    title: `${modalType === 'create' ? '新增推广用户' : '修改推广用户'}`,
    wrapClassName: 'vertical-center-modal',
    selectWxuser,
    selectGrade,
    spreadTypeDis,
    qrTypeDis,
    modalType,
    onOk(data) {
      dispatch({
        type: `spreaduser/${modalType}`,
        payload: data,
      })
    },
    onCancel() {
      dispatch({
        type: 'spreaduser/hideModal',
      })
    },
    handleChange(val) {
      dispatch({
        type: 'spreaduser/updateState',
        payload: val,
      })
    },
  }
  const timeModalProps = {
    item: currentItem,
    visible: timeModalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['spreaduser/update'],
    title: '修改推送时间',
    wrapClassName: 'vertical-center-modal',
    selectWxuser,
    selectGrade,
    spreadTypeDis,
    qrTypeDis,
    modalType,
    onOk(data) {
      const { query } = location
      dispatch({
        type: 'spreaduser/updatePushTime',
        payload: { ...data, ...query },
      })
    },
    onCancel() {
      dispatch({
        type: 'spreaduser/hideTimeModal',
      })
    },
    handleChange(val) {
      dispatch({
        type: 'spreaduser/updateState',
        payload: val,
      })
    },
  }

  const listProps = {
    dataSource: list,
    loading: loading.effects['spreaduser/query'],
    pagination,
    location,
    isMotion,
    onQuery(data) {
      dispatch({
        type: 'spreaduser/query',
        payload: data
      })
    },
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
    onShowTimeModal(item) {
      dispatch({
        type: 'spreaduser/showTimeModal',
        payload: {
          currentItem: item
        }
      })
    },
    onDeleteItem(id) {
      const { query } = location
      dispatch({
        type: 'spreaduser/delete',
        payload: { id, ...query },
      })
    },
    onEditItem(item) {
      dispatch({
        type: 'spreaduser/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      })
      // 判断晋级类型若为手动则显示分润比例输入框
      if (item.spreadUserType === 1) {
        dispatch({
          type: 'spreaduser/updateState',
          payload: { spreadType: 1 }
        })
      }
      dispatch({ type: 'spreaduser/getGradeInfo' })
      dispatch({ type: 'spreaduser/getWxuserInfo' })
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
        pathname: '/spreaduser',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/spreaduser',
      }))
    },
    onAdd() {
      dispatch({
        type: 'spreaduser/showModal',
        payload: {
          modalType: 'create',
        },
      })
      dispatch({ type: 'spreaduser/getGradeInfo' })
      dispatch({ type: 'spreaduser/getWxuserInfo' })
    },
    switchIsMotion() {
      dispatch({ type: 'spreaduser/switchIsMotion' })
    },
  }

  return (
    <div className="content-inner">
      <Filter {...filterProps} />
      <List {...listProps} />
      {modalVisible && <Modal {...modalProps} />}
      {timeModalVisible && <TimeModal {...timeModalProps} />}
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
