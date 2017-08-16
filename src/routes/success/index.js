import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Row, Col, Button, Popconfirm } from 'antd'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

const Success = ({ location, dispatch, success, loading }) => {
  const { list, pagination, currentItem, modalVisible, modalType, isMotion, selectedRowKeys } = success
  const { pageSize } = pagination

  const modalProps = {
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    maskClosable: true,
    confirmLoading: loading.effects['success/update'],
    title: `${modalType === 'create' ? '创建订单' : '修改订单'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: `success/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'success/hideModal',
      })
    },
  }

  const listProps = {
    dataSource: list,
    loading: loading.effects['success/query'],
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
        type: 'success/markBlackList',
        payload: id
      })
    },
    onDeleteItem (id) {
      dispatch({
        type: 'success/delete',
        payload: id,
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'success/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      })
    }
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
        pathname: '/success',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/success',
      }))
    },
    onAdd () {
      dispatch({
        type: 'success/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
    switchIsMotion () {
      dispatch({ type: 'success/switchIsMotion' })
    },
  }

  const handleDeleteItems = () => {
    dispatch({
      type: 'success/multiDelete',
      payload: {
        ids: selectedRowKeys,
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
               {`选中 ${selectedRowKeys.length} 个微信用户 `}
               <Popconfirm title={'确定将这些用户打入黑名单吗?'} placement="left" onConfirm={handleDeleteItems}>
                 <Button type="primary" size="large" style={{ marginLeft: 8 }}>标记黑名单</Button>
               </Popconfirm>
             </Col>
           </Row>
      }
      <List {...listProps} />
      {modalVisible && <Modal {...modalProps} />}
    </div>
  )
}

Success.propTypes = {
  success: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ success, loading }) => ({ success, loading }))(Success)
