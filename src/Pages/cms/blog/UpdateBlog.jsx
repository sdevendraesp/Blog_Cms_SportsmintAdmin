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
import { getBlogCategory, insertBlogs, updateBlogs } from '../../../Action/action';
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import config from "../../../CoreFiles/config";
import toast, { Toaster } from "react-hot-toast";

export default function UpdateBlog() {

    const navigate = useNavigate()

    const fileInputRef = useRef(null);
    const location = useLocation();
    const data = location.state;

    const [previousData, setPreviousData] = useState({
        ...data,
        hashtag: Array.isArray(data?.hashtag) ? data.hashtag : data?.hashtag?.split(",") || []
    });

    const str = previousData?.labels;
    const arr = typeof str === 'string' ? str.split(",") : Array.isArray(str) ? str : [];

    console.log('arr', previousData);


    const [getBlogCategoryList, setGetBlogCategoryList] = useState([]);
    const [tags, setTags] = useState(arr || []);

    console.log("tags", tags);


    useEffect(() => {
        // Set previousData whenever `data` changes.
        setPreviousData({
            ...data,
            hashtag: Array.isArray(data?.hashtag) ? data.hashtag : data?.hashtag?.split(",") || []
        });
    }, [data]);

    useEffect(() => {
        getBlogCategorylist();
    }, []);

    const getBlogCategorylist = async () => {
        try {
            const res = await getBlogCategory();
            setGetBlogCategoryList(res.success ? res.data : []);
        } catch (error) {
            setGetBlogCategoryList([]);
        }
    };


    const formik = useFormik({
        enableReinitialize: true, // This allows reinitialization when `initialValues` changes
        initialValues: {
            categories: previousData.category_id || "",
            meta_description: previousData.meta_description || '',
            heading: previousData.title || "",
            subheading: previousData.short_description || "",
            pressImg: previousData.image || null,
            description: previousData.description || "",
            labels: typeof previousData?.labels === 'string'
                ? previousData?.labels.split(",")
                : previousData?.labels || []
        },
        validationSchema: Yup.object({
            categories: Yup.string().required("Please select a category"),
            meta_description: Yup.string().required("Meta Description is required"),
            heading: Yup.string().required("Heading is required"),
            subheading: Yup.string().required("Subheading is required"),
            pressImg: Yup.mixed().required("Image is required"),
            description: Yup.string().required("Description is required"),
            labels: Yup.array().required("At least one label is required"),
        }),
        onSubmit: async (values, { resetForm }) => {
            console.log("values.categories", values.categories);

            const formdata = {
                id: previousData.id,
                category_id: values.categories,
                title: values.heading,
                short_description: values.subheading,
                description: values.description,
                image: values.pressImg,
                labels: values.labels,
                meta_description: values.meta_description
            };

            try {
                const res = await updateBlogs(formdata);
                if (res.success) {
                    Swal.fire("Blog Updated!", res.msg, "success");
                    resetForm();
                    setTags([]);

                    setTimeout(() => {
                        navigate(`${config.baseUrl}blog`)
                    }, 1000);

                } else {
                    Swal.fire("Failed!", res.msg, "error");
                }
            } catch (error) {
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
        formik.setFieldValue("labels", newTags);
    };

    const handleFileChange = (event) => {
        formik.setFieldValue("pressImg", event.currentTarget.files[0]);
    };

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

                                    <Row className="mt-4">

                                        <Col md={6}>
                                            <Form.Label>Categories</Form.Label>
                                            <Form.Select
                                                aria-label="Select Categories"
                                                name="categories"
                                                value={formik.values.categories}
                                                onChange={(e) => formik.setFieldValue('categories', Number(e.target.value))}
                                                onBlur={formik.handleBlur}
                                            >
                                                <option value="">Select Categories</option>
                                                {getBlogCategoryList.map((value, index) => (
                                                    <option value={Number(value.id)} key={index}>{value.category_name}</option>
                                                ))}
                                            </Form.Select>
                                            {formik.touched.categories && formik.errors.categories && (
                                                <div className="text-danger">{formik.errors.categories}</div>
                                            )}
                                        </Col>


                                        <Col lg={6} className="my-2">
                                            <Form.Label>Meta Description</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="meta_description"
                                                value={formik.values.meta_description}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.meta_description && formik.errors.meta_description && (
                                                <div className="text-danger">{formik.errors.meta_description}</div>
                                            )}
                                        </Col>

                                        <Col lg={6} className="my-2">
                                            <Form.Label>Title</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="heading"
                                                value={formik.values.heading}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.heading && formik.errors.heading && (
                                                <div className="text-danger">{formik.errors.heading}</div>
                                            )}
                                        </Col>

                                        <Col lg={6} className="my-2">
                                            <Form.Label>Short Description</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="subheading"
                                                value={formik.values.subheading}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.subheading && formik.errors.subheading && (
                                                <div className="text-danger">{formik.errors.subheading}</div>
                                            )}
                                        </Col>

                                        <Col lg={6} className="my-2">
                                            <Form.Label>Labels</Form.Label>
                                            <TagsInput value={tags} onChange={handleTagChange} />
                                            {formik.touched.labels && formik.errors.labels && (
                                                <div className="text-danger">{formik.errors.labels}</div>
                                            )}
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
                                            {formik.touched.pressImg && formik.errors.pressImg && (
                                                <div className="text-danger">{formik.errors.pressImg}</div>
                                            )}

                                            <div className="mt-3">
                                                <img src={previousData.image ? (config.imageUrl + previousData.image) : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHZqj-XReJ2R76nji51cZl4ETk6-eHRmZBRw&s'} alt=""
                                                    style={{ width: 'auto', height: '200px' }}
                                                />
                                            </div>
                                        </Col>

                                        {/* <Col lg={6}>
                                            <img src={previousData.image ? (config.imageUrl + previousData.image) : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHZqj-XReJ2R76nji51cZl4ETk6-eHRmZBRw&s'} alt="" 
                                            style={{width:'auto', height:'200px'}}
                                            />
                                        </Col> */}

                                        {/* <Row>
                                        
                                    </Row> */}

                                        <Col sm={12} className="mt-4">
                                            <Form.Label>Description</Form.Label>
                                            <JoditEditor
                                                value={formik.values.description}
                                                // config={{
                                                //     readonly: false,
                                                //     uploader: {
                                                //         insertImageAsBase64URI: true,
                                                //     },
                                                // }}
                                                //onChange={(e)=>{formik.values.description = e}}
                                                onChange={(content) => formik.setFieldValue("description", content)}
                                            />
                                            {formik.touched.description && formik.errors.description && (
                                                <div className="text-danger">{formik.errors.description}</div>
                                            )}
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
