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

export default function Press() {

    const validationSchema = Yup.object().shape({
        title: Yup.string().required('Title is required.'),
        url: Yup.string().required('URL is required.'),
        pressImg: Yup.mixed().required('Image is required.') // Validating the file input
    });

    const [form, setForm] = useState(true);
    const [tags, setTags] = useState([]);
    const fileInputRef = useRef(null);

    const initialValues = {
        title: '',
        url: '',
        pressImg: null, // Ensure initial value is null for file input
    };

    const columns = [
        {
            name: 'Title',
            selector: row => row.title,
        },
        {
            name: 'Url',
            selector: row => row.url,
        },
        {
            name: 'Image',
            selector: row => row.image,
        },
        {
            name: 'Tags',
            selector: row => row.tags,
        },
        {
            name: 'Action',
            selector: row => row.action,
        },
    ];

    const data = [
        {
            id: 1,
            title: 'Beetlejuice',
            url: '1988',
            image: 'images',
            tags: "tag's",
            action: <Button onClick={() => setForm(false)}>Update</Button>,
        },
        {
            id: 2,
            title: 'Batman',
            url: '1992',
            image: 'images',
            tags: "tag's",
            action: <Button onClick={() => setForm(false)}>Update</Button>,
        },
    ];

    const handleChange1 = (newTags) => {
        setTags(newTags);
    };

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
        }
    });

    console.log("errors", errors);


    return (
        <>
            <div className="wrapper">
                <Header />
                <Sidebar />
                <div className="content-wrapper">
                    <div className="container-full">
                        <div className="p-3">
                            <h2 className="press">Press</h2>
                            {
                                form
                                    ? <DataTable columns={columns} data={data} customStyles={customStyles} />
                                    : <div>
                                        <Row>
                                            <Col lg={6} className="my-2">
                                                <Form.Control
                                                    type="text"
                                                    name="title"
                                                    placeholder="Title"
                                                    value={values.title}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                />
                                                {errors.title && touched.title && <div className="error mt-1" style={{ color: 'red' }}>{errors.title}</div>}
                                            </Col>

                                            <Col lg={6} className="my-2">
                                                <Form.Control
                                                    type="text"
                                                    name="url"
                                                    placeholder="URL"
                                                    value={values.url}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                />
                                                {errors.url && touched.url && <div className="error mt-1" style={{ color: 'red' }}>{errors.url}</div>}
                                            </Col>

                                            <Col lg={6} className="my-2">
                                                <Form.Control
                                                    type="file"
                                                    name="pressImg"
                                                    ref={fileInputRef}
                                                    onBlur={handleBlur}
                                                    onChange={(event) => {
                                                        setFieldValue("pressImg", event.currentTarget.files[0]); // Set file in Formik state
                                                    }}
                                                />
                                                {errors.pressImg && touched.pressImg && <div className="error mt-1" style={{ color: 'red' }}>{errors.pressImg}</div>}
                                            </Col>

                                            <Col lg={6} className="my-2">
                                                <TagsInput value={tags} onChange={handleChange1} />
                                            </Col>

                                            <Col lg={12} className="mt-4 text-end">
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
