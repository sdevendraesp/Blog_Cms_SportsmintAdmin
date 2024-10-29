import React, { useRef, useState } from "react";
import TagsInput from "react-tagsinput";
import { Button, Col, Form, Row } from "react-bootstrap";
import JoditEditor from "jodit-react";
import Header from "../../directives/header";
import Sidebar from "../../directives/sidebar";
import 'react-tagsinput/react-tagsinput.css';
import '../cms/Press.css';
import { useFormik } from "formik";
import * as Yup from 'yup';
import { insertBlogCategory, insertBlogs } from '../../Action/action';
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";

export default function BlogForm() {
    const fileInputRef = useRef(null);
    const [tags, setTags] = useState([]);
    const [categories, setCategories] = useState("");

    const formik = useFormik({
        initialValues: {
            categories: "",
            heading: "",
            subheading: "",
            pressImg: null,
            description: "",
            labels: []
        },
        validationSchema: Yup.object({
            categories: Yup.string().required("Please select a category"),
            heading: Yup.string().required("Heading is required"),
            subheading: Yup.string().required("Subheading is required"),
            pressImg: Yup.mixed().required("Image is required"),
            description: Yup.string().required("Description is required"),
            labels: Yup.array().required("At least one label is required"),
        }),
        onSubmit: async (values) => {
            const formData = new FormData();
            formData.append("category_id", values.categories);
            formData.append("heading", values.heading);
            formData.append("subHeading", values.subheading);
            formData.append("description", values.description);
            formData.append("image", values.pressImg);
            formData.append("labels", JSON.stringify(values.labels)); // Convert labels to JSON string if needed

            try {
                const res = await insertBlogs(formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data' // Set the appropriate headers
                    }
                });

                if (res.success) {
                    Swal.fire("Blog added!", res.msg, "success");
                } else {
                    Swal.fire("Failed!", res.msg, "error");
                }
            } catch (error) {
                console.error("Error during API call:", error);
                Swal.fire("Error!", "An error occurred during the submission.", "error");
            }
        },
    });

    const handleTagChange = (newTags) => {
        setTags(newTags);
        formik.setFieldValue("labels", newTags);
    };

    const handleFileChange = (event) => {
        formik.setFieldValue("pressImg", event.currentTarget.files[0]);
    };

    const handleCategoryChange = async (event) => {
        const selectedCategory = event.target.value;
        setCategories(selectedCategory);
        formik.setFieldValue("categories", selectedCategory);

        if (selectedCategory !== "no") {
            const res = await insertBlogCategory({ category_name: selectedCategory });
            if (res.success) {
                toast.success("Category updated successfully!");
            } else {
                Swal.fire("Failed!", res.msg, "error");
            }
        }
    };

    return (
        <>
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
                                                onChange={handleCategoryChange}
                                                onBlur={formik.handleBlur}
                                            >
                                                <option value="no">Select Categories</option>
                                                <option value="Games">Games</option>
                                                <option value="Action">Action</option>
                                                <option value="Popular Post">Popular Post</option>
                                            </Form.Select>
                                            {formik.touched.categories && formik.errors.categories ? (
                                                <div className="text-danger">{formik.errors.categories}</div>
                                            ) : null}
                                        </Col>
                                    </Row>

                                    <Row className="mt-4">
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
                                                <div className="text-danger">{formik.errors.heading}</div>
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
                                                <div className="text-danger">{formik.errors.subheading}</div>
                                            ) : null}
                                        </Col>

                                        <Col lg={6} className="my-2">
                                            <Form.Label>Image</Form.Label>
                                            <Form.Control
                                                type="file"
                                                name="pressImg"
                                                ref={fileInputRef}
                                                onChange={handleFileChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.pressImg && formik.errors.pressImg ? (
                                                <div className="text-danger">{formik.errors.pressImg}</div>
                                            ) : null}
                                        </Col>

                                        <Col lg={6} className="my-2">
                                            <Form.Label>Labels</Form.Label>
                                            <TagsInput value={tags} onChange={handleTagChange} />
                                            {formik.touched.labels && formik.errors.labels ? (
                                                <div className="text-danger">{formik.errors.labels}</div>
                                            ) : null}
                                        </Col>

                                        <Col sm={12} className="mt-4">
                                            <Form.Label>Description</Form.Label>
                                            <JoditEditor
                                                value={formik.values.description}
                                                onChange={(content) => formik.setFieldValue("description", content)}
                                            />
                                            {formik.touched.description && formik.errors.description ? (
                                                <div className="text-danger">{formik.errors.description}</div>
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
