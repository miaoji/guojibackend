import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

const Locus = ({ location, dispatch, locus, loading }) => {
  const { list, pagination, currentItem, modalVisible, locusDate, modalType } = locus
  const { pageSize } = pagination
  const modalProps = {
    type: modalType,
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    confirmLoading: loading.effects['boot/update'],
    title: `${modalType === 'create' ? '新增微信菜单配置' : '修改微信菜单配置'}`,
    wrapClassName: 'vertical-center-modal',
    locusDate,
    onOk(data) {
      dispatch({
        type: `locus/${modalType}`,
        payload: data,
      })
    },
    onCancel() {
      dispatch({
        type: 'locus/hideModal',
      })
    },
    onSetLocusData(payload) {
      dispatch({
        type: 'locus/setLocusData',
        payload
      })
    }
  }

  const listProps = {
    dataSource: list,
    loading: loading.effects['locus/query'],
    pagination,
    location,
    onPushMsg(data) {
      dispatch({
        type: 'locus/pushMsg',
        payload: {
          ...data,
          orderId: location.query.orderId
        }
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
    onDeleteItem(id) {
      dispatch({
        type: 'locus/delete',
        payload: id,
      })
    },
    onEditItem(item) {
      dispatch({
        type: 'locus/showModal',
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
        pathname: '/locus',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/locus',
      }))
    },
    onAdd() {
      dispatch({
        type: 'locus/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
    onSubmitWeChat() {
      dispatch({
        type: 'locus/setmenu',
      })
    },
    switchIsMotion() {
      dispatch({ type: 'locus/switchIsMotion' })
    },
  }

  return (
    <div className="content-inner">
      <Filter {...filterProps} />
      <List {...listProps} />
      {modalVisible && <Modal {...modalProps} />}
    </div>
  )
}

Locus.propTypes = {
  locus: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
  locusDate: PropTypes.array
}

export default connect(({ locus, loading }) => ({ locus, loading }))(Locus)