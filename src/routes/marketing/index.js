import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
// import { Row, Col, Button } from 'antd'
import List from './List'
import Filter from './Filter'
import Modals from './Modal'

const Marketing = ({ location, dispatch, marketing, loading }) => {
  const { list, pagination, currentItem, modalVisible, modalType, selectedRowKeys } = marketing
  const { pageSize } = pagination

  const modalProps = {
    type: modalType,
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    confirmLoading: loading.effects['boot/update'],
    title: `${modalType === 'create' ? '向所有用户发送代金券' : '修改微信菜单配置'}`,
    wrapClassName: 'vertical-center-modal',
    onOk(data) {
      dispatch({
        type: `marketing/${modalType}`,
        payload: data,
      })
    },
    onCancel() {
      dispatch({
        type: 'marketing/hideModal',
      })
    },
  }

  const listProps = {
    dataSource: list,
    loading: loading.effects['marketing/query'],
    pagination,
    location,
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
    onPushMsgByUser(item) {
      dispatch({
        type: 'marketing/showModal',
        payload: {
          modalType: 'pushMsgByUser',
          currentItem: item,
        },
      })
    },
    onDeleteItem(id) {
      dispatch({
        type: 'marketing/delete',
        payload: id,
      })
    },
    onEditItem(item) {
      dispatch({
        type: 'marketing/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      })
    },
    rowSelection: {
      selectedRowKeys,
      onChange: (keys) => {
        dispatch({
          type: 'marketing/updateState',
          payload: {
            selectedRowKeys: keys,
          },
        })
      },
    },
  }

  const filterProps = {
    filter: {
      ...location.query,
    },
    selectedRowKeys,
    handlePush() {
      dispatch({
        type: 'marketing/showModal',
        payload: {
          modalType: 'sendVoucher',
        },
      })
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
        pathname: '/marketing',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/marketing',
      }))
    },
    onAdd() {
      dispatch({
        type: 'marketing/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
    onSubmitWeChat() {
      dispatch({
        type: 'marketing/setmenu',
      })
    },
    switchIsMotion() {
      dispatch({ type: 'marketing/switchIsMotion' })
    },
  }

  return (
    <div className="content-inner">
      <Filter {...filterProps} />
      <List {...listProps} />
      {modalVisible && <Modals {...modalProps} />}
    </div>
  )
}

Marketing.propTypes = {
  marketing: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ marketing, loading }) => ({ marketing, loading }))(Marketing)