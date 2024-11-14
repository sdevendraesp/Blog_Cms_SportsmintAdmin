import React, { useEffect, useRef, useState } from "react";
import TagsInput from "react-tagsinput";
import { Button, Col, Form, Row } from "react-bootstrap";
import JoditEditor from "jodit-react";
import 'react-tagsinput/react-tagsinput.css';
import '../press/Press.css';
import { useFormik } from "formik";
import * as Yup from 'yup';
import { getBlogCategory, insertBlogCategory, insertBlogs, pressRelease } from '../../../Action/action';
import Swal from "sweetalert2";
import Header from "../../../directives/header";
import Sidebar from "../../../directives/sidebar";
import { useNavigate } from "react-router-dom";
import config from "../../../CoreFiles/config";
import toast, { Toaster } from 'react-hot-toast';

export default function PressForm() {

    const navigate = useNavigate()
    const fileInputRef = useRef(null);
    const [tags, setTags] = useState([]);
    const [categories, setCategories] = useState("");

    const [getBlogCategoryList, setGetBlogCategoryList] = useState([])

    const formik = useFormik({
        initialValues: {
            title: "",
            pressImg: null,
            url: "",
            hashtag: [],
            short_description: ''
        },
        validationSchema: Yup.object({
            title: Yup.string().required("title is required"),
            hashtag: Yup.array().required("At least one hashtag is required"),
            pressImg: Yup.mixed().required("Image is required"),
            url: Yup.string().required("Url is required"),
            short_description: Yup.string().required("Short Description is required"),
        }),
        onSubmit: async (values, { resetForm }) => {

            console.log("formData-", values);

            const formdata = {
                'url': values?.url,
                "title": values?.title,
                "image": values?.pressImg,
                "hashtag": values?.hashtag,
                "short_description": values?.short_description
            }

            try {
                const res = await pressRelease(formdata);

                if (res.success) {
                    Swal.fire("Press added!", res.msg, "success");
                    resetForm(); // Reset form only after a successful submission
                    setTags([]); // Clear the tags input

                    setTimeout(() => {
                        navigate(`${config.baseUrl}press`)
                    }, 800);
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
        console.log('newTags', newTags);

        if (newTags.length > 5) {
            toast.error('You can add only 5 hashtags.');
            return;
        }
        setTags(newTags);
        formik.setFieldValue("hashtag", newTags);
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

    console.log("getBlogCategoryList", getBlogCategoryList);

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
                                    <h2 className="press">Add Press</h2>
                                </Col>
                            </Row>

                            <div className="mt-4">
                                <Form onSubmit={formik.handleSubmit}>
                                    <Row className="mt-4">
                                        <Col md={6} className="my-2">
                                            <Form.Label>Url</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="url"
                                                placeholder="Enter url"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.url && formik.errors.url ? (
                                                <div className="text-danger">{formik.errors.url}</div>
                                            ) : null}
                                        </Col>

                                        <Col lg={6} className="my-2">
                                            <Form.Label>Title</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="title"
                                                placeholder="Title"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.title && formik.errors.title ? (
                                                <div className="text-danger">{formik.errors.title}</div>
                                            ) : null}
                                        </Col>

                                        <Col md={6} className="my-2">
                                            <Form.Label>Short Description</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="short_description"
                                                placeholder="Enter Short Description"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.short_description && formik.errors.short_description ? (
                                                <div className="text-danger">{formik.errors.short_description}</div>
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
                                                <div className="text-danger">{formik.errors.pressImg}</div>
                                            ) : null}
                                        </Col>

                                        <Col lg={6} className="my-2">
                                            <Form.Label>Tag</Form.Label>
                                            <TagsInput value={tags} onChange={handleTagChange} />
                                            {formik.touched.hashtag && formik.errors.hashtag ? (
                                                <div className="text-danger">{formik.errors.hashtag}</div>
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
