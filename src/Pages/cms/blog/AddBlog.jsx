import React, { useEffect, useRef, useState } from "react";
import TagsInput from "react-tagsinput";
import { Button, Col, Form, Row } from "react-bootstrap";
import JoditEditor from "jodit-react";
import Header from "../../../directives/header";
import Sidebar from "../../../directives/sidebar";
import 'react-tagsinput/react-tagsinput.css';
import '../press/Press.css';
import { useFormik } from "formik";
import * as Yup from 'yup';
import { getBlogCategory, insertBlogCategory, insertBlogs } from '../../../Action/action';
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import config from "../../../CoreFiles/config";
import { useNavigate } from "react-router-dom";

export default function BlogForm() {
    const navigate = useNavigate()

    const fileInputRef = useRef(null);
    const [tags, setTags] = useState([]);
    const [categories, setCategories] = useState("");

    const [getBlogCategoryList, setGetBlogCategoryList] = useState([])

    const formik = useFormik({
        initialValues: {
            categories: "",
            meta_description: '',
            heading: "",
            subheading: "",
            pressImg: null,
            description: "",
            labels: []
        },
        validationSchema: Yup.object({
            categories: Yup.string().required("Please select a category"),
            meta_description: Yup.string().required("Meta Description is required"),
            heading: Yup.string().required("Title is required"),
            subheading: Yup.string().required("Short Description is required"),
            pressImg: Yup.mixed().required("Image is required"),
            description: Yup.string().required("Description is required"),
            labels: Yup.array().required("At least one label is required"),
        }),
        onSubmit: async (values, { resetForm }) => {

            // console.log("formData-", values);

            const formdata = {
                'category_id': values?.categories,
                "title": values.heading,
                "short_description": values.subheading,
                "description": values.description,
                "image": values.pressImg,
                "labels": values.labels,
                "meta_description": values.meta_description
            }

            try {
                const res = await insertBlogs(formdata);

                if (res.success) {
                    Swal.fire("Blog added!", res.msg, "success");
                    resetForm(); // Reset form only after a successful submission
                    setTags([]); // Clear the tags input

                    setTimeout(() => {
                        navigate(`${config.baseUrl}blog`)
                    }, 1000);
                } else {
                    Swal.fire("Failed!", res.msg, "error");
                }
            } catch (error) {
                console.error("Error during API call:", error);
                Swal.fire("Error!", "An error occurred during the submission.", "error");
            }
        },
    });

    // const handleTagChange = (newTags) => {
    //     setTags(newTags);
    //     formik.setFieldValue("labels", newTags);
    // };

    const handleTagChange = (newTags) => {
        console.log('newTags', newTags);

        if (newTags.length > 5) {
            toast.error('You can add only 5 hashtags.');
            return;
        }
        setTags(newTags);
        formik.setFieldValue("labels", newTags);
    };

    const handleFileChange = (event) => {
        formik.setFieldValue("pressImg", event.currentTarget.files[0]);
    };

    useEffect(() => {
        getBlogCategorylist()
    }, [])

    const getBlogCategorylist = async () => {
        const res = await getBlogCategory()
        try {
            let res = await getBlogCategory(); //{ "authtoken": loginData.authToken}
            if (res.success) {
                setGetBlogCategoryList(res.data)
            } else {
                setGetBlogCategoryList([])
            }
        } catch (error) {
            setGetBlogCategoryList([])
        }
    }

    // const editorConfig = {
    //     uploader: { insertImageAsBase64URI: true }, // Disable image uploads
    // };

    return (
        <>
            <Toaster />
            <div className="wrapper">
                <Header />
                <Sidebar />
                <div className="content-wrapper">
                    <div className="container-full">
                        <div className="p-3">
                            <Row>
                                <Col xs={6}>
                                    <h2 className="press">Add Blog</h2>
                                </Col>
                            </Row>

                            <div className="mt-4">
                                <Form onSubmit={formik.handleSubmit}>
                                    <Row>
                                        <Col md={6}>
                                            <Form.Label>Categories</Form.Label>
                                            <Form.Select
                                                aria-label="Select Categories"
                                                name="categories"
                                                onChange={(e) => formik.setFieldValue('categories', Number(e.target.value))}
                                                onBlur={formik.handleBlur}
                                            >
                                                <option value="no">Select Categories</option>
                                                {getBlogCategoryList.map((value, index) => {
                                                    return <option value={Number(value.id)} key={index}>{value.category_name}</option>
                                                })}
                                            </Form.Select>
                                            {formik.touched.categories && formik.errors.categories ? (
                                                <div className="text-danger mt-1">{formik.errors.categories}</div>
                                            ) : null}
                                        </Col>
                                    </Row>

                                    <Row className="mt-4">


                                        <Col lg={6} className="my-2">
                                            <Form.Label>Meta Description</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="meta_description"
                                                placeholder="meta_description"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.meta_description && formik.errors.meta_description ? (
                                                <div className="text-danger mt-1">{formik.errors.meta_description}</div>
                                            ) : null}
                                        </Col>

                                        <Col lg={6} className="my-2">
                                            <Form.Label>Title</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="heading"
                                                placeholder="Title"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.heading && formik.errors.heading ? (
                                                <div className="text-danger mt-1">{formik.errors.heading}</div>
                                            ) : null}
                                        </Col>

                                        <Col lg={6} className="my-2">
                                            <Form.Label>Short Description</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="subheading"
                                                placeholder="Short Description"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.subheading && formik.errors.subheading ? (
                                                <div className="text-danger mt-1">{formik.errors.subheading}</div>
                                            ) : null}
                                        </Col>

                                        <Col lg={6} className="my-2">
                                            <Form.Label>Image</Form.Label>
                                            <Form.Control
                                                type="file"
                                                accept="image/*"
                                                name="pressImg"
                                                ref={fileInputRef}
                                                onChange={handleFileChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.pressImg && formik.errors.pressImg ? (
                                                <div className="text-danger mt-1">{formik.errors.pressImg}</div>
                                            ) : null}
                                        </Col>

                                        <Col lg={6} className="my-2">
                                            <Form.Label>Labels</Form.Label>
                                            <TagsInput value={tags} onChange={handleTagChange} />
                                            {formik.touched.labels && formik.errors.labels ? (
                                                <div className="text-danger mt-1">{formik.errors.labels}</div>
                                            ) : null}
                                        </Col>

                                        <Col sm={12} className="mt-4">
                                            <Form.Label>Description</Form.Label>
                                            <JoditEditor
                                                value={formik.values.description}
                                                // config={editorConfig}
                                                onChange={(content) => {
                                                    formik.setFieldValue("description", content)
                                                }}
                                            />
                                            {formik.touched.description && formik.errors.description ? (
                                                <div className="text-danger mt-1">{formik.errors.description}</div>
                                            ) : null}
                                        </Col>

                                        <Col lg={12} className="mt-4 text-center">
                                            <Button type="submit">Submit</Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
