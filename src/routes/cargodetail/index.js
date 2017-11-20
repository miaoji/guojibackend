import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Row, Col, Button, Popconfirm } from 'antd'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'
import { queryURL, storage, } from '../../utils'

const Cargodetail = ({ location, dispatch, cargodetail, loading }) => {
  const { list, pagination, currentItem, modalVisible, modalType, isMotion, selectedRowKeys } = cargodetail
  const { pageSize } = pagination

  const modalProps = {
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['storeUser/update'],
    title: `${modalType === 'create' ? '创建消息' : '进行集运合包'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      console.log('data',data)
      dispatch({
        type: `cargodetail/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'cargodetail/hideModal',
      })
    },
  }

  const listProps = {
    dataSource: list,
    loading: loading.effects['cargodetail/query'],
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
    onMarkItem (id) {
      dispatch({
        type: 'cargodetail/markBlackList',
        payload: id
      })
    },
    onDeleteItem (id) {
      dispatch({
        type: 'cargodetail/delete',
        payload: id,
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'cargodetail/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      })
    },
    rowSelection: {
      selectedRowKeys,
      onChange: (keys) => {
        console.log('keys', keys)
        dispatch({
          type: 'cargodetail/updateState',
          payload: {
            selectedRowKeys: keys,
          },
        })
      },
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
        pathname: '/cargodetail',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/cargodetail',
      }))
    },
    onAdd () {
      dispatch({
        type: 'cargodetail/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
    switchIsMotion () {
      dispatch({ type: 'cargodetail/switchIsMotion' })
    },
  }

  const handleDeleteItems = () => {
    dispatch({
      type: 'cargodetail/showModal',
      payload: {
        modalType: 'update',
        currentItem: {ids: selectedRowKeys},
      },
    })
  }

  return (
    <div className="content-inner">
      <Filter {...filterProps} />
      {
         selectedRowKeys.length > 0 &&
           <Row style={{ marginBottom: 24, textAlign: 'right', fontSize: 13 }}>
             <Col>
               {`选中 ${selectedRowKeys.length} 个消息 `}
                 <Button type="primary" onClick={handleDeleteItems} size="large" style={{ marginLeft: 8 }}>合单</Button>
             </Col>
           </Row>
      }
      <List {...listProps} />
      {modalVisible && <Modal {...modalProps} />}
    </div>
  )
}

Cargodetail.propTypes = {
  cargodetail: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ cargodetail, loading }) => ({ cargodetail, loading }))(Cargodetail)
