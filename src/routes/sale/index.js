import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Row, Col, Button, Popconfirm } from 'antd'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

const Sale = ({ location, dispatch, sale, loading }) => {
  const { list, pagination, currentItem, modalVisible, modalType, isMotion, selectedRowKeys, selectNation } = sale
  const { pageSize } = pagination

  const modalProps = {
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['sale/update'],
    title: `${modalType === 'create' ? '新增包裹类型' : '修改包裹类型'}`,
    wrapClassName: 'vertical-center-modal',
    selectNation,
    onOk (data) {
      dispatch({
        type: `sale/${modalType}`,
        payload: data,
      })
    },
    getNation (data) {
      dispatch({
        type: 'sale/getNation',
      })
    },
    onCancel () {
      dispatch({
        type: 'sale/hideModal',
      })
    },
  }

  const listProps = {
    dataSource: list,
    loading: loading.effects['sale/query'],
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
        type: 'sale/markBlackList',
        payload: id,
      })
    },
    onDeleteItem (id) {
      dispatch({
        type: 'sale/delete',
        payload: id,
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'sale/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      })
      dispatch({
        type: 'sale/getNation',
      })
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
        pathname: '/sale',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/sale',
      }))
    },
    onAdd () {
      dispatch({
        type: 'sale/showModal',
        payload: {
          modalType: 'create',
        },
      })
      dispatch({
        type: 'sale/getNation',
      })
    },
    switchIsMotion () {
      dispatch({ type: 'sale/switchIsMotion' })
    },
  }

  const handleDeleteItems = () => {
    dispatch({
      type: 'sale/multiDelete',
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

Sale.propTypes = {
  sale: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ sale, loading }) => ({ sale, loading }))(Sale)
