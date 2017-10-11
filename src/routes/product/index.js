import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Row, Col, Button, Popconfirm } from 'antd'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

const Product = ({ location, dispatch, product, loading }) => {
  const { list, pagination, currentItem, modalVisible, modalType, isMotion, selectedRowKeys, selectNation, selectParcelType, productDis } = product
  const { pageSize } = pagination

  const modalProps = {
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['product/update'],
    title: `${modalType === 'create' ? '新增产品类型' : '修改产品类型'}`,
    wrapClassName: 'vertical-center-modal',
    selectNation: selectNation,
    selectParcelType: selectParcelType,
    productDis: productDis,
    onOk (data) {
      dispatch({
        type: `product/${modalType}`,
        payload: data,
      })
    },
    getNation(){
      dispatch({
        type:`product/getNation`
      })
    },
    getParcelType(data){
      dispatch({
        type:`product/getParcelType`,
        payload: data
      })
    },
    onCancel () {
      dispatch({
        type: 'product/hideModal',
      })
    },
  }

  const listProps = {
    dataSource: list,
    loading: loading.effects['product/query'],
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
        type: 'product/markBlackList',
        payload: id
      })
    },
    onDeleteItem (id) {
      dispatch({
        type: 'product/delete',
        payload: id,
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'product/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      })
      dispatch({
        type:`product/getNation`
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
        pathname: '/product',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/product',
      }))
    },
    onAdd () {
      dispatch({
        type: 'product/showModal',
        payload: {
          modalType: 'create',
        },
      })
      dispatch({
        type:`product/getNation`
      })
    },
    switchIsMotion () {
      dispatch({ type: 'product/switchIsMotion' })
    },
  }

  const handleDeleteItems = () => {
    dispatch({
      type: 'product/multiDelete',
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

Product.propTypes = {
  product: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ product, loading }) => ({ product, loading }))(Product)
