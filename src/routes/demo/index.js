import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Row, Col, Button, Popconfirm } from 'antd'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

const Demo = ({ location, dispatch, demo, loading }) => {
  const { list, pagination, currentItem, modalVisible, modalType, isMotion, selectedRowKeys } = demo
  const { pageSize } = pagination

  const modalProps = {
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['demo/update'],
    title: `${modalType === 'create' ? '创建订单' : '更新订单'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: `demo/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'demo/hideModal',
      })
    },
  }

  const listProps = {
    dataSource: list,
    loading: loading.effects['demo/query'],
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
        type: 'demo/markBlackList',
        payload: id
      })
    },
    onDeleteItem (id) {
      dispatch({
        type: 'demo/delete',
        payload: id,
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'demo/showModal',
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
        pathname: '/demo',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/demo',
      }))
    },
    onAdd () {
      dispatch({
        type: 'demo/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
    switchIsMotion () {
      dispatch({ type: 'demo/switchIsMotion' })
    },
  }

  const handleDeleteItems = () => {
    dispatch({
      type: 'demo/multiDelete',
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

Demo.propTypes = {
  demo: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ demo, loading }) => ({ demo, loading }))(Demo)
