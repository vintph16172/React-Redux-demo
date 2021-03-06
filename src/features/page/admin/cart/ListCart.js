import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react';
import { deleteProducts, getProducts, addId, changeBreadcrumb } from '../../../slice/ProductSlice';
import { Link } from 'react-router-dom'
import { Row, Col, Space, Table, Button, Input, Avatar, Descriptions } from 'antd';
import { SearchOutlined, EnvironmentOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { getCategory } from '../../../slice/CategorySlice';
import AdminPageHeader from '../../../../compoments/AdminPageHeader';
import { isAthenticate } from '../../../utils/localstorage'
import { changeUserValue } from '../../../slice/UserSlice';
import { onSelected, getCarts, getDetailCarts, editCarts } from "../../../slice/CartSlice"


const ListCart = () => {
    const products = useSelector(data => data.products.value)
    const categories = useSelector(data => data.category.value)
    const selected = useSelector(data => data.cart.selected)
    const arr = useSelector(data => data.products.arr)
    const breadcrumb = useSelector(data => data.products.breadcrumb)
    const user = useSelector(data => data.user.value)
    const cart = useSelector(data => data.cart.listCart)
    const cartDetail = useSelector(data => data.cart.listDetailCart)
    let totalSale = 0
    if (cart?.length !== 0) {
        cart?.forEach((item) => {
            totalSale += item.total
        })
    }
    console.log("Cart", cart);
    console.log("CartDetail", cartDetail);
    console.log("User", user);
    const dispatch = useDispatch()
    const hasSelected = selected.length > 0;

    console.log("Admin Products", products);
    console.log("Admin Products cate", categories);
    console.log("Admin Products  Selected", selected);

    const columns = [
        {
            title: "STT", dataIndex: "key", key: "key",
            sorter: (record1, record2) => { return record1.key > record2.key },

        },
        {
            title: "ID", dataIndex: "_id", key: "_id",
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => {
                return <div className="">
                    <Input
                        autoFocus
                        placeholder='T??m T??n S???n Ph???m'
                        value={selectedKeys[0]}
                        onChange={(e) => {
                            setSelectedKeys(e.target.value ? [e.target.value] : [])
                            confirm({ closeDropDown: false })
                        }}
                        onPressEnter={() => { confirm() }}
                        onBlur={() => { confirm() }}


                    >

                    </Input>
                    <Button onClick={() => clearFilters()} type="primary" danger >Reset</Button>
                </div>
            },
            filterIcon: () => {
                return <SearchOutlined />
            },
            onFilter: (value, record) => {
                return record._id.toLowerCase().includes(value.toLowerCase())
            }
        },
        {
            title: "Name", dataIndex: "name", key: "name",
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => {
                return <div className="">
                    <Input
                        autoFocus
                        placeholder='T??m T??n S???n Ph???m'
                        value={selectedKeys[0]}
                        onChange={(e) => {
                            setSelectedKeys(e.target.value ? [e.target.value] : [])
                            confirm({ closeDropDown: false })
                        }}
                        onPressEnter={() => { confirm() }}
                        onBlur={() => { confirm() }}


                    >

                    </Input>
                    <Button onClick={() => clearFilters()} type="primary" danger >Reset</Button>
                </div>
            },
            filterIcon: () => {
                return <SearchOutlined />
            },
            onFilter: (value, record) => {
                return record.name.toLowerCase().includes(value.toLowerCase())
            }


        },
        {
            title: "Email", dataIndex: "email", key: "email",

        },
        {
            title: "?????a Ch???", dataIndex: "address", key: "address",



        },
        {
            title: "S??? ??i???n Tho???i", dataIndex: "phone", key: "phone",

        },
        {
            title: "T???ng Gi??", dataIndex: "total", key: "total",
            sorter: (record1, record2) => { return record1.total > record2.total }
        },
        {
            title: "Tr???ng Th??i", dataIndex: "status", key: "status",

            filters: [
                { text: "??ang Giao H??ng", value: "??ang Giao H??ng" },
                { text: "Giao H??ng Th??nh C??ng", value: "Giao H??ng Th??nh C??ng" }
            ],
            onFilter: (value, record) => {
                return record.status == value
            }
        },
        Table.EXPAND_COLUMN,


        {
            title: "H??nh ?????ng", key: "action", render: (text, record) => (
                <Space align="center" size="middle">
                    {record.status !== "??ang Giao H??ng" ? <Button type="primary" className='btn-update' onClick={() => {
                        const recordUpdate = record
                        recordUpdate.status = 0
                        console.log(recordUpdate);
                        dispatch(editCarts(recordUpdate))
                    }}>
                        <CheckCircleOutlined />
                    </Button> : <Button type="primary" className='btn-update' onClick={() => {
                        const recordUpdate = record
                        recordUpdate.status = 1
                        console.log(recordUpdate);
                        dispatch(editCarts(recordUpdate))
                    }}>
                        <EnvironmentOutlined />
                    </Button>}


                </Space>
            ),
        }
    ]

    const columns2 = [
        {
            title: "STT", dataIndex: "key", key: "key",
            sorter: (record1, record2) => { return record1.key > record2.key },
        },
        { title: "ID", dataIndex: "_id", key: "_id" },
        {
            title: "???nh", dataIndex: "image", key: "image", render: (text, record) => (
                <img className="w-28 " src={record.image} />
            ),
        },
        {
            title: "Name", dataIndex: "name", key: "name",
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => {
                return <div className="">
                    <Input
                        autoFocus
                        placeholder='T??m T??n S???n Ph???m'
                        value={selectedKeys[0]}
                        onChange={(e) => {
                            setSelectedKeys(e.target.value ? [e.target.value] : [])
                            confirm({ closeDropDown: false })
                        }}
                        onPressEnter={() => { confirm() }}
                        onBlur={() => { confirm() }}


                    >

                    </Input>
                    <Button onClick={() => clearFilters()} type="primary" danger >Reset</Button>
                </div>
            },
            filterIcon: () => {
                return <SearchOutlined />
            },
            onFilter: (value, record) => {
                return record.name.toLowerCase().includes(value.toLowerCase())
            }


        },
        {
            title: "Category", dataIndex: "category", key: "category",
            filters: categories.map(item => { return { text: item.name, value: item.name } }),
            onFilter: (value, record) => {
                return record.category == value
            }


        },
        {
            title: "Price", dataIndex: "price", key: "price",
            sorter: (record1, record2) => { return record1.price > record2.price }
        },
        {
            title: "S??? L?????ng", dataIndex: "quantity", key: "quantity",

        },
        {
            title: "T???ng Gi??", dataIndex: "total", key: "total",

        }





    ]

    const dataTable = cart?.map((item, index) => { return { key: index + 1, _id: item._id, name: item.name, email: item.email, address: item.address, phone: item.phone, total: item.total, status: item.status == 0 ? "??ang Giao H??ng" : "Giao H??ng Th??nh C??ng" } })

    useEffect(() => {
        dispatch(getCarts())
        dispatch(getDetailCarts())
        dispatch(getProducts())
        dispatch(getCategory())
        dispatch(changeBreadcrumb("????n H??ng"))
        dispatch(changeUserValue(isAthenticate()))
    }, [])

    return (
        <div className="container">
            <AdminPageHeader />

            <span style={{ marginLeft: 8 }}>
                {hasSelected ? `???? ch???n ${selected.length} h??ng` : ''}
            </span>

            {selected.length > 0 ? <Button type="primary" danger onClick={() => deleteProducts(arr)}>
                X??a H???t
            </Button> : ""}


            <Table size="small" className="mt-6 mx-6"
                rowSelection={{

                    selectedRowKeys: selected,
                    onChange: (keys) => {
                        console.log(keys);
                        dispatch(onSelected(keys))

                    },
                    onSelect: (record) => {

                        console.log(record);

                    },

                    selections: [
                        Table.SELECTION_ALL,
                        Table.SELECTION_INVERT,
                        Table.SELECTION_NONE,
                        {
                            key: "odd",
                            text: "S??? L???",
                            onSelect: changableRowKeys => {
                                let newSelectedRowKeys = [];
                                newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                                    if (index % 2 !== 0) {
                                        return false;
                                    }
                                    return true;
                                });
                                // this.setState({ selectedRowKeys: newSelectedRowKeys });

                                dispatch(onSelected(newSelectedRowKeys))
                                console.log(selected);

                            },

                        },
                        {
                            key: "even",
                            text: "S??? Ch???n",
                            onSelect: changableRowKeys => {
                                let newSelectedRowKeys = [];
                                newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                                    if (index % 2 !== 0) {
                                        return true;
                                    }
                                    return false;
                                });
                                // this.setState({ selectedRowKeys: newSelectedRowKeys });

                                dispatch(onSelected(newSelectedRowKeys))
                                console.log(selected);

                            },

                        }
                    ]
                }}
                expandable={{
                    expandedRowRender: record => {

                        return cartDetail.map(item => {
                            const detailCart = []
                            if (record._id == item.cart) {
                                detailCart.push(item)
                                console.log("detailCart", detailCart);
                                return products.map(item2 => {
                                    if (item.product == item2._id) {
                                        const DetailCartTable = detailCart.map((item, index) => { return { key: index + 1, _id: item._id, image: item2.image, name: item2.name, category: categories.filter(cate => { return cate._id == item2.category }).map((item3) => { return item3.name }), price: item2.price, quantity: item.quantity, total: item.total } })
                                        // return <Table className="m-6"

                                        //     pagination={false }
                                        //     dataSource={DetailCartTable}
                                        //     columns={columns2}
                                        //     bordered
                                        //     title={() => 'Chi Ti???t ????n H??ng'}

                                        // />
                                        return DetailCartTable.map((item10, index) => {

                                            return <Descriptions title={<p>Chi Ti???t ????n H??ng {item10._id}</p>} layout="vertical" bordered column={{ sm: 8, md: 8 }} >
                                                <Descriptions.Item label="STT">{item10.key}</Descriptions.Item>
                                                <Descriptions.Item label="ID">{item10._id}</Descriptions.Item>
                                                <Descriptions.Item label="???nh"><img className="w-28 " src={item10.image} /></Descriptions.Item>
                                                <Descriptions.Item label="T??n">{item10.name}</Descriptions.Item>
                                                <Descriptions.Item label="Danh M???c">{item10.category}</Descriptions.Item>
                                                <Descriptions.Item label="Gi??">{item10.price}</Descriptions.Item>
                                                <Descriptions.Item label="S??? L?????ng">{item10.quantity}</Descriptions.Item>
                                                <Descriptions.Item label="T???ng Gi??">{item10.total}</Descriptions.Item>

                                            </Descriptions>
                                        })



                                    }
                                })

                            }
                        })





                    }


                }}
                dataSource={dataTable}
                columns={columns}
                bordered

                footer={() => { return <span>T???ng Doanh Thu: {totalSale ? totalSale : 0} VN??</span> }}
            />




        </div>
    )
}

export default ListCart