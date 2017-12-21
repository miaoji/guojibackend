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
console.log('data', data)

const provinceData = ['Zhejiang', 'Jiangsu'];
const cityData = {
    Zhejiang: ['Hangzhou', 'Ningbo', 'Wenzhou'],
    Jiangsu: ['Nanjing', 'Suzhou', 'Zhenjiang'],
};
class SelectShelf extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            cities: cityData[provinceData[0]],
            secondCity: cityData[provinceData[0]][0],
        }
    }
    handleProvinceChange = (value) => {
        this.setState({
            cities: cityData[value],
            secondCity: cityData[value][0],
        });
    }
    onSecondCityChange = (value) => {
        this.setState({
            secondCity: value,
        });
    }
    render() {
        const provinceOptions = provinceData.map(province => <Option key={province}>{province}</Option>);
        const cityOptions = this.state.cities.map(city => <Option key={city}>{city}</Option>);
        return (
            <div>
                <Select defaultValue={provinceData[0]} style={{ width: 90 }} onChange={this.handleProvinceChange}>
                    {provinceOptions}
                </Select>
                <Select value={this.state.secondCity} style={{ width: 90 }} onChange={this.onSecondCityChange}>
                    {cityOptions}
                </Select>
            </div>
        );
    }
}

export default Form.create()(SelectShelf)