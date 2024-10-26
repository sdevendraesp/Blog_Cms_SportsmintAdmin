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

export default function Blog() {

    const validationSchema = Yup.object().shape({
        title: Yup.string().required('Title is required.'),
        heading: Yup.string().required('Heading is required.'),
        pressImg: Yup.mixed().required('Image is required.'), // Validating the file input
        categories: Yup.string().required('Categories is required.'),
        label: Yup.string().required('Label is required.'),
    });

    const [form, setForm] = useState(true);
    const [tags, setTags] = useState([]);
    const fileInputRef = useRef(null);
    const [termsandcondition, settermsandcondition] = useState("");

    const initialValues = {
        title: '',
        heading: '',
        pressImg: null,
        categories: '',
        label: '',
    };

    const columns = [
        {
            name: 'Title',
            selector: row => row.title,
        },
        {
            name: 'Description',
            selector: row => row.description,
        },
        {
            name: 'Heading',
            selector: row => row.heading,
        },
        {
            name: 'Image',
            selector: row => row.image,
        },
        {
            name: 'Labels',
            selector: row => row.labels,
        },
        {
            name: 'Categories',
            selector: row => row.cantegories,
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
            image: 'images',
            description: "description",
            cantegories: 'cantegories',
            labels: 'labels',
            heading: 'heading',
            tags: "tag's",
            action: <Button onClick={() => setForm(false)}>Update</Button>,
        },
        {
            id: 2,
            title: 'Batman',
            image: 'images',
            tags: "tag's",
            description: "description",
            heading: 'heading',
            cantegories: 'cantegories',
            labels: 'labels',
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
                            <h2 className="press">Blog</h2>
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

                                            {/* <Col lg={6} className="my-2">
                                                <Form.Control
                                                    type="text"
                                                    name="description"
                                                    placeholder="Description"
                                                    value={values.description}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                />
                                                {errors.description && touched.description && <div className="error mt-1" style={{ color: 'red' }}>{errors.description}</div>}
                                            </Col> */}

                                            <Col lg={6} className="my-2">
                                                <Form.Control
                                                    type="text"
                                                    name="heading"
                                                    placeholder="Heading"
                                                    onBlur={handleBlur}
                                                    value={values.heading}
                                                    onChange={handleChange}
                                                />
                                                {errors.heading && touched.heading && <div className="error mt-1" style={{ color: 'red' }}>{errors.heading}</div>}
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

                                            {/* <Col lg={6} className="my-2">
                                                <TagsInput value={tags} onChange={handleChange1} />
                                            </Col> */}

                                            <Col lg={6} className="my-2">
                                                <Form.Select aria-label="Default select example" name="categories" value={values.categories} onBlur={handleBlur} onChange={handleChange}>
                                                    <option>Open this select menu</option>
                                                    <option value="Games">Games</option>
                                                    <option value="Action">Action</option>
                                                    <option value="Popular Post">Popular Post</option>
                                                </Form.Select>
                                                {errors.categories && touched.categories && <div className="error mt-1" style={{ color: 'red' }}>{errors.categories}</div>}
                                            </Col>

                                            <Col lg={6} className="my-2">
                                                <Form.Control
                                                    type="text"
                                                    name="label"
                                                    placeholder="Label"
                                                    value={values.label}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                />
                                                {errors.label && touched.label && <div className="error mt-1" style={{ color: 'red' }}>{errors.label}</div>}
                                            </Col>

                                            <Col sm={12}>
                                                <JoditEditor
                                                    value={termsandcondition}
                                                    onChange={inputHandler1}
                                                />
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
