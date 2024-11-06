import React, { useEffect, useRef, useState } from "react";
import Header from "../../directives/header";
import Sidebar from "../../directives/sidebar";
import DataTable from "react-data-table-component";
import { customStyles } from "../../Component/CustomStyles";
import { Button, Col, Form, Row } from "react-bootstrap";
import TagsInput from "react-tagsinput";
import 'react-tagsinput/react-tagsinput.css'
import '../cms/press/Press.css'
import { useFormik } from "formik";
import * as Yup from 'yup';
import JoditEditor from "jodit-react";
import Modal from 'react-bootstrap/Modal';
import { deleteBlogCategory, getBlogCategory, insertBlogCategory, updateBlogCategory } from "../../Action/action";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import moment from "moment/moment";

export default function Categories() {

    const [show, setShow] = useState(false);
    const [showupdate, setShowupdate] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCloseUpdate = () => setShowupdate(false);
    const handleShowUpdate = () => setShowupdate(true);

    const [categoriesData, setCategoriesData] = useState([])

    const validationSchema = Yup.object().shape({
        categories: Yup.string().required('Categories is required.'),
    });

    const validationSchemaUpdate = Yup.object().shape({
        categories: Yup.string().required('Categories is required.'),
    });

    const initialValues = {
        categories: ''
    };

    const [categoriesUpdate, setCategoriesUpdate] = useState([])
    const [categoriesDelete, setCategoriesDelete] = useState([])

    const initialValuesUpdate = {

        categories: setTimeout(() => categoriesUpdate?.category_name, 500)
    };


    const handleDelete = (row) => {

        const confirmDelete = async (itemId) => {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: "This action cannot be undone!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'Cancel'
            });

            if (result.isConfirmed) {
                // Call your delete function here, passing the item ID

                const res = await deleteBlogCategory({ id: row.id });
                if (res.success) {
                    toast.success("Category updated successfully!");
                    Swal.fire("success", "Category Added.", "success");
                    // resetForm();
                    window.location.reload();
                } else {
                    Swal.fire("Failed!", res.msg, "error");
                }

                Swal.fire(
                    'Deleted!',
                    'The item has been deleted.',
                    'success'
                );
            }
        };

        confirmDelete()

    }

    const columns = [
        {
            name: 'Categories',
            selector: row => row?.category_name,
            center: true
        },
        {
            name: 'Created Date',
            selector: row => row?.created_at, //{ moment(row?.created_at).format('DD-MM-YYYY hh:mm:ss A') },
            center: true
        },
        {
            name: 'Action',
            selector: row => <>
                {console.log("row--", row)}
                <Button variant="primary" onClick={() => {
                    setCategoriesUpdate(row)

                    handleShowUpdate()
                }} className="me-2">
                    Update
                </Button>

                <Button variant="primary" onClick={
                    () => { handleDelete(row) }
                }>
                    Delete
                </Button>
            </>,
            center: true
        },
    ];

    const { values, errors, touched, handleBlur, setFieldValue, handleSubmit, handleChange } = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                console.log("Form Submitted", values.categories);
                const res = await insertBlogCategory({ category_name: values.categories });
                if (res.success) {
                    toast.success("Category updated successfully!");
                    Swal.fire("success", "Category Added.", "success");
                    resetForm();
                    window.location.reload();
                } else {
                    Swal.fire("Failed!", res.msg, "error");
                }
            } catch (error) {
                console.error("Submission error:", error);
                Swal.fire("Error", "An error occurred while submitting the form.", "error");
            }
        }
    });

    const formik = useFormik({
        initialValues: initialValuesUpdate,
        validationSchema: validationSchemaUpdate,

        onSubmit: async (values, { resetForm }) => {

            try {
                const res = await updateBlogCategory({
                    id: categoriesUpdate.id,
                    category_name: values.categories
                });
                if (res.success) {
                    toast.success("Category updated successfully!");
                    Swal.fire("success", "Blog category updated successfully.", "success");
                    resetForm();
                    
                } else {
                    Swal.fire("Failed!", res.msg, "error");
                }
            } catch (error) {
                console.error("Submission error:", error);
                Swal.fire("Error", "An error occurred while submitting the form.", "error");
            }

            setTimeout(() => {
                window.location.reload();
            }, 1000);
        }
    });


    useEffect(() => {
        categories()
    }, [])

    const categories = async () => {
        try {
            let res = await getBlogCategory(); //{ "authtoken": loginData.authToken}
            if (res.success) {
                setCategoriesData(res.data)
            } else {
                setCategoriesData([])
            }
        } catch (error) {
            setCategoriesData([])
        }
    };

    useEffect(() => {
        // This will update Formik's categories field whenever categoriesUpdate changes
        if (categoriesUpdate.category_name) {
            formik.setFieldValue("categories", categoriesUpdate.category_name);
        }
    }, [categoriesUpdate]);

    return (
        <>
            <div className="wrapper">
                <Header />
                <Sidebar />
                <div className="content-wrapper">
                    <div className="container-full">

                        <div className="p-3">
                            <div className="d-flex justify-content-between align-items-center mt-2">
                                <h2 className="press">Categories</h2>

                                <Button variant="primary" onClick={handleShow}>
                                    Add
                                </Button>
                            </div>
                            <DataTable
                                columns={columns}
                                data={categoriesData}
                                customStyles={customStyles}
                                pagination
                            />
                        </div>
                    </div>
                </div>

                {/* =============== modal form start ============= */}
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Categories</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Add Categories"
                                    // autoFocus
                                    name="categories"
                                    value={values.categories}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </Form.Group>
                            {touched.categories && errors.categories ? (
                                <div className="text-danger">{errors.categories}</div>
                            ) : null}
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={() => {
                            handleSubmit()
                            if (Object.keys(errors).length === 0) {
                                handleClose()
                            }
                        }}>
                            Add Categories
                        </Button>
                    </Modal.Footer>
                </Modal>

                {/* update categories */}
                <Modal show={showupdate} onHide={handleCloseUpdate}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Categories</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Add Categories"
                                    // autoFocus
                                    name="categories"
                                    value={formik.values.categories}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </Form.Group>
                            {formik.touched.categories && formik.errors.categories ? (
                                <div className="text-danger">{formik.errors.categories}</div>
                            ) : null}
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={() => {
                            formik.handleSubmit()
                            if (Object.keys(formik.errors).length === 0) {
                                handleCloseUpdate()
                            }
                        }}>
                            Add Categories
                        </Button>
                    </Modal.Footer>
                </Modal>

                {/* =============== modal form end ============= */}
            </div>
        </>
    );
}
