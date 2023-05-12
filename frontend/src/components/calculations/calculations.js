import React, { useState, useEffect } from "react";
import "../calculations/calculations.css";
import axios from "axios";
import { Table, Select, DatePicker } from 'antd';
import { UnorderedListOutlined, AreaChartOutlined } from "@ant-design/icons";
import moment from "moment";
import Analytics from "../analytics/analytics";
const { RangePicker } = DatePicker;


function Calculate() {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [frequency, setFrequency] = useState('7');
    const [selectedDate, setSelecteddate] = useState([]);
    const [viewData, setViewData] = useState('table');

    useEffect(() => {
        const getAllTransactions = async () => {
            try {
                const res = await axios.post("http://localhost:8070/transact/get-transaction", {
                    frequency,
                    selectedDate
                });
                setLoading(false);
                setData(res.data);
                console.log(res.data);
            } catch (error) {
                console.log(error);
                alert("Fetch issue!")
            }
        };
        getAllTransactions();
    }, [frequency, selectedDate])

    //get all transactions
    // const getTransactions = async () => {
    //     const response = await axios.get("http://localhost:8070/Transaction");

    //     if (response.status === 200) {
    //         setData(response.data);
    //     }
    // }


    console.log(data)
    //table data
    const columns = [
        {
            title: 'Subject',
            dataIndex: 'subject'
        },
        {
            title: 'Type',
            dataIndex: 'type'
        },
        {
            title: 'Amount',
            dataIndex: 'amount'
        },
        {
            title: 'Date',
            dataIndex: 'date',
            render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>

        },
        {
            title: 'Message',
            dataIndex: 'message'
        },
        {
            title: 'Reporter',
            dataIndex: 'reportedby'
        }

    ]

    return (
        <div className="FNCalcPage">
            <h1 className="FNCalcHeading">CALCULATIONS</h1>
            <br /><br />
            <div className="FNCalcTable">&nbsp;&nbsp;
                <h6 className="FNCalcTableHeading">Select Time Duration</h6>
                <Select className="FNCalcSelect"value={frequency} onChange={(values) => setFrequency(values)}>
                    <Select.Option value="7">Last Week Duration</Select.Option>
                    <Select.Option value="30">Last Month Duration</Select.Option>
                    <Select.Option value="365">Last Year Duration</Select.Option>
                    <Select.Option value="custom">Custom Time Duration</Select.Option>
                </Select>
                {frequency === 'custom' && <RangePicker value={selectedDate} onChange={(values) => setSelecteddate(values)} />}
                <br /><br />

                <div className="FNCalcIconDiv">
                &nbsp;
                    <UnorderedListOutlined className={`FNCalcListIcon ${viewData === 'table'}`} onClick={() => setViewData('table')} />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <AreaChartOutlined className={`FNCalcListIcon ${viewData === 'analytics'}`} onClick={() => setViewData('analytics')} />
                </div>

                <br />
                <div className="content">
                    {viewData === 'table' ? (<Table className="FNCalcRealTable" columns={columns} dataSource={data} /> ): (<Analytics data={data}/>)}
                
                </div>
                
            </div>
            <br /><br />

        </div>

    )
}

export default Calculate;