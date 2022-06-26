import React, { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { Divider, Form, Input, Button, Checkbox, Upload, Select, Avatar, message } from 'antd';
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { getCategory, addCategory, } from '../../../slice/CategorySlice';
import { changeBreadcrumb } from '../../../slice/ProductSlice';
import { v4 as uuidv4 } from 'uuid';
import AdminPageHeader from '../../../../compoments/AdminPageHeader';

const CategoryAdd = () => {
    const [form] = Form.useForm();
    const { register, handleSubmit, formState: { errors }, reset, control } = useForm()
    const categories = useSelector(data => data.category.value)
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { id } = useParams();
    console.log(id);

    const onFinish = async (value) => {
        console.log(value);

        dispatch(addCategory({ id: uuidv4(), ...value }));
        message.success('Thêm Thành Công');
        navigate("/admin/category");
    };

    const onFinishFailed = (errorInfo) => {
        message.warning('Thêm Không Thành Công!');
    };
    const category = categories.map((item) => {
        return {
            id: item._id,
            cate: item.name
        };
    });

    useEffect(() => {

        dispatch(getCategory())
        dispatch(changeBreadcrumb("Thêm Danh Mục"))
    }, [])




    return (
        <div className="container">
            <AdminPageHeader />

            <div className="mx-6 pb-6">
                <Form layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed} >
                    <Form.Item label="_id" name="_id" hidden={true}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Tên Danh Mục"
                        name="name"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>


                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Thêm
                        </Button>
                    </Form.Item>
                </Form>

            </div>




        </div>
    )
}

export default CategoryAdd