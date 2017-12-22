import React from 'react'
import { Select, Form } from 'antd'
const Option = Select.Option

let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
str = str.split('')
const number = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '70', '71', '72', '73', '74', '75', '76', '77', '78', '79', '80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '90', '91', '92', '93', '94', '95', '96', '97', '98', 99]
const data = {}

for (let i = 0; i < str.length; i++) {
    data[str[i]]=number
}
class SelectShelf extends React.Component {
    constructor(props) {
        console.log('props', props)
        super(props)
        this.state = {
            str: '',
            shelfStr: props.initValue.split('')[0],
            shelfNum: props.initValue.split('')[1] + '' + props.initValue.split('')[2]
        }
    }
    handlesheleStrChange = (value) => {
        this.setState({
            str: value.split('')[0],
            shelfStr: data[value.split('')[0]],
            shelfNum: '01'
        })
        this.props.onChange(JSON.stringify({
            str: value.split('')[0],
            num: '01'
        }))
    }
    onshelfNumChange = (value) => {
        this.setState({
            shelfNum: value,
        })
        this.props.onChange(JSON.stringify({
            str: this.state.str,
            num: value
        }))
    }
    render() {
        const sheleStrOptions = str.map(item => {
            const val = item + item.toLowerCase()
            return <Option key={val}>{item}</Option>
        })
        const cityOptions = data[str[0]].map(city => <Option key={city}>{city}</Option>)
        return (
            <div>
                <Select showSearch defaultValue={this.state.shelfStr} style={{ width: 100, marginRight: 20 }} onChange={this.handlesheleStrChange}>
                    {sheleStrOptions}
                </Select>
                <Select showSearch value={this.state.shelfNum} style={{ width: 100 }} onChange={this.onshelfNumChange}>
                    {cityOptions}
                </Select>
            </div>
        )
    }
}

export default Form.create()(SelectShelf)