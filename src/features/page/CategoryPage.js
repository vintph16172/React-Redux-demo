import React, { useEffect } from 'react'
import { List, Typography, Row, Col, Card, Space } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import { getProducts, getProductsQuery } from '../slice/ProductSlice';
import { getCategory, getProductCategory } from '../slice/CategorySlice';
import { Link, useParams } from 'react-router-dom'


const CategoryPage = () => {

    const { category, product } = useSelector(data => data.category.productCate)
    const categories = useSelector(data => data.category.value)
    const dispatch = useDispatch()
    const { Meta } = Card;
    const { id } = useParams();

    const priceSort = [
        <Link className="text-black" to={`/products?price_gte=${50000}&price_lte=${100000}`} >50.000 - 100.000</Link>,
        <Link className="text-black" to={`/products?price_gte=${100000}&price_lte=${200000}`}>100.000 - 200.000</Link>,
        <Link className="text-black" to={`/products?price_gte=${200000}&price_lte=${500000}`} >200.000 - 500.000</Link>,
        <Link className="text-black" to={`/products?price_gte=${500000}&price_lte=${10000000}`} >500.000 - 1.000.000</Link>,

    ]

    useEffect(() => {

        dispatch(getCategory())
        dispatch(getProductCategory(id))

    }, [id])
    return (
        <Row className="pt-28 ">
            <Col span={6} className="pl-4  ">
                <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                    <Card title="Danh Mục" size="small">
                        <List


                            dataSource={categories}
                            renderItem={item => (
                                <List.Item>
                                    <Link className="text-black" to={`/category/${item._id}`} >{item.name}</Link>
                                </List.Item>
                            )}
                        />
                    </Card>
                    <Card title="Giá" size="small">
                        <List


                            dataSource={priceSort}
                            renderItem={item => (
                                <List.Item>
                                    {item}
                                </List.Item>
                            )}
                        />
                    </Card>

                </Space>
            </Col>
            <Col span={18}>
                <List
                    grid={{ gutter: 16, sm: 2, md: 4, column: 4 }}

                    size="large"
                    pagination={{
                        onChange: page => {
                            console.log(page);
                        },
                        pageSize: 8,
                    }}
                    dataSource={product}

                    renderItem={item => (

                        <div className="w-full md:w-full p-6 flex flex-col flex-grow flex-shrink">
                            <Card
                                hoverable
                                // style={{ width: 378 }}
                                className={"flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow"}
                                cover={<Link to={`/products/${item._id}`}  ><img className="h-50 w-50" alt="example" src={item.image} /></Link>}
                            >
                                <Meta title={
                                    <div className="w-full font-bold text-xl text-gray-800 px-6">
                                        <Link className="font-bold text-xl text-gray-800  " to={`/products/${item._id}`} >{item.name}</Link>
                                    </div>
                                } description={
                                    <div className="">
                                        <p className="text-gray-800 text-base px-6 mb-5">
                                            <Link className="text-gray-800 text-base" to={`/category/${item.category}`} >{category.name}</Link>
                                        </p>

                                        <Link to={`/products/${item._id}`} >
                                            <button className="mx-auto lg:mx-2 hover:underline gradient text-white font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
                                                {item.price} VNĐ
                                            </button>
                                        </Link>
                                    </div>
                                }
                                />
                            </Card>
                        </div>

                    )}
                />
            </Col>

        </Row>
    )
}

export default CategoryPage