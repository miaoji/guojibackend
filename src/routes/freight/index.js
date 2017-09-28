import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Row, Col, Button, Popconfirm } from 'antd'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

const Freight = ({ location, dispatch, freight, loading }) => {
  const { list, pagination, currentItem, modalVisible, modalType, isMotion, selectedRowKeys, selectPackage, selectParcelType, selectProductType, productDis, freightDis, } = freight
  const { pageSize } = pagination

  const modalProps = {
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['freight/update'],
    title: `${modalType === 'create' ? '新增运费信息' : '修改运费信息'}`,
    wrapClassName: 'vertical-center-modal',
    selectPackage: selectPackage,
    selectParcelType: selectParcelType,
    selectProductType: selectProductType,
    productDis:productDis,
    freightDis:freightDis,
    onOk (data) {
      dispatch({
        type: `freight/${modalType}`,
        payload: data,
      })
    },
    getPackage (data) {
      dispatch({
        type: `freight/getPackage`
      })
    },
    getParcelType (data) {
      dispatch({
        type: `freight/getParcelType`,
        payload:data
      })
    },
    getProductType (data) {
      dispatch({
        type: `freight/getProductType`,
        payload:data
      })
    },
    onCancel () {
      dispatch({
        type: 'freight/hideModal',
      })
    },
  }

  const listProps = {
    dataSource: list,
    loading: loading.effects['freight/query'],
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
        type: 'freight/markBlackList',
        payload: id
      })
    },
    onDeleteItem (id) {
      dispatch({
        type: 'freight/delete',
        payload: id,
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'freight/showModal',
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
        pathname: '/freight',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/freight',
      }))
    },
    onAdd () {
      dispatch({
        type: 'freight/showModal',
        payload: {
          modalType: 'create',
        },
      })
      dispatch({
        type: `freight/getPackage`
      })
    },
    switchIsMotion () {
      dispatch({ type: 'freight/switchIsMotion' })
    },
  }

  const handleDeleteItems = () => {
    dispatch({
      type: 'freight/multiDelete',
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

Freight.propTypes = {
  freight: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ freight, loading }) => ({ freight, loading }))(Freight)
