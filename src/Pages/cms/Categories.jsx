import React, { useRef, useState } from "react";
import Header from "../../directives/header";
import Sidebar from "../../directives/sidebar";
import DataTable from "react-data-table-component";
import { customStyles } from "../../Component/CustomStyles";
import { Button, Col, Form, Row } from "react-bootstrap";
import TagsInput from "react-tagsinput";
import 'react-tagsinput/react-tagsinput.css'
import '../cms/Press.css'
import { useFormik } from "formik";
import * as Yup from 'yup';
import JoditEditor from "jodit-react";

export default function Categories() {

    const validationSchema = Yup.object().shape({
        categories: Yup.string().required('Categories is required.'),
    });

    const [form, setForm] = useState(true);
    const [tags, setTags] = useState([]);
    const fileInputRef = useRef(null);
    const [termsandcondition, settermsandcondition] = useState("");

    const initialValues = {
        categories: ''
    };

    const columns = [
        {
            name: 'Categories',
            selector: row => row.categories,
            center: true
        },
        {
            name: 'Action',
            selector: row => row.action,
            center: true
        },

    ];

    const data = [
        {
            id: 1,
            categories: 'categories',
            action: <Button onClick={() => setForm(false)}>Update</Button>,
        },
        {
            id: 2,
            categories: 'categories',
            action: <Button onClick={() => setForm(false)}>Update</Button>,
        },
    ];

    const { values, errors, touched, handleBlur, setFieldValue, handleSubmit, handleChange } = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: (values, { resetForm }) => {
            console.log("Form Submitted", values);
            resetForm();
            setTags([]);

            if (fileInputRef.current) {
                fileInputRef.current.value = null;
            }

            setForm(true)
        }
    });

    const inputHandler1 = async (e) => {
        settermsandcondition(e);
    };


    return (
        <>
            <div className="wrapper">
                <Header />
                <Sidebar />
                <div className="content-wrapper">
                    <div className="container-full">
                        <div className="p-3">
                            <h2 className="press">Categories</h2>
                            {
                                form
                                    ? <DataTable columns={columns} data={data} customStyles={customStyles} />
                                    : <div>
                                        <Row>
                                            <Col lg={6} className="my-2">
                                                <Form.Select aria-label="Default select example" name="categories" value={values.categories} onBlur={handleBlur} onChange={handleChange}>
                                                    <option>Open this select menu</option>
                                                    <option value="Games">Games</option>
                                                    <option value="Action">Action</option>
                                                    <option value="Popular Post">Popular Post</option>
                                                </Form.Select>
                                                {errors.categories && touched.categories && <div className="error mt-1" style={{ color: 'red' }}>{errors.categories}</div>}
                                            </Col>

                                            <Col lg={12} className="mt-4 text-center">
                                                <Button onClick={handleSubmit}>Submit</Button>
                                            </Col>


                                        </Row>
                                    </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
