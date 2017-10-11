import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Row, Col, Button, Popconfirm } from 'antd'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

const Parceltype = ({ location, dispatch, parceltype, loading }) => {
  const { list, pagination, currentItem, modalVisible, modalType, isMotion, selectedRowKeys, selectNation } = parceltype
  const { pageSize } = pagination

  const modalProps = {
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['parceltype/update'],
    title: `${modalType === 'create' ? '新增包裹类型' : '修改包裹类型'}`,
    wrapClassName: 'vertical-center-modal',
    selectNation: selectNation,
    onOk (data) {
      dispatch({
        type: `parceltype/${modalType}`,
        payload: data,
      })
    },
    getNation(data){
      dispatch({
        type:`parceltype/getNation`
      })
    },
    onCancel () {
      dispatch({
        type: 'parceltype/hideModal',
      })
    },
  }

  const listProps = {
    dataSource: list,
    loading: loading.effects['parceltype/query'],
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
        type: 'parceltype/markBlackList',
        payload: id
      })
    },
    onDeleteItem (id) {
      dispatch({
        type: 'parceltype/delete',
        payload: id,
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'parceltype/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      })
      dispatch({
        type:`parceltype/getNation`
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
        pathname: '/parceltype',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/parceltype',
      }))
    },
    onAdd () {
      dispatch({
        type: 'parceltype/showModal',
        payload: {
          modalType: 'create',
        },
      })
      dispatch({
        type:`parceltype/getNation`
      })
    },
    switchIsMotion () {
      dispatch({ type: 'parceltype/switchIsMotion' })
    },
  }

  const handleDeleteItems = () => {
    dispatch({
      type: 'parceltype/multiDelete',
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

Parceltype.propTypes = {
  parceltype: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ parceltype, loading }) => ({ parceltype, loading }))(Parceltype)
