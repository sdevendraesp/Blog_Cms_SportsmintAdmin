import React, { useEffect, useRef, useState } from "react";
import Header from "../../directives/header";
import Sidebar from "../../directives/sidebar";
import DataTable from "react-data-table-component";
import { customStyles } from "../../Component/CustomStyles";
import { Button, Col, Form, Row } from "react-bootstrap";
import 'react-tagsinput/react-tagsinput.css'
import '../cms/press/Press.css'
import { useFormik } from "formik";
import * as Yup from 'yup';
import Modal from 'react-bootstrap/Modal';
import { deleteBlogImages, getBlogAllImages, imageUpload, } from "../../Action/action";
import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";
import moment from "moment/moment";
import config from "../../CoreFiles/config";
import CopyToClipboard from "react-copy-to-clipboard";

export default function ImageUpload() {

    const [show, setShow] = useState(false);
    const [showupdate, setShowupdate] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    const [images, setImages] = useState([])

    const validationSchema = Yup.object().shape({
        pressImg: Yup.string().required('Image is required.'),
    });

    const initialValues = {
        pressImg: ''
    };

    const onChangeRowsPerPage = (page) => {
        setItemsPerPage(page);
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

                const res = await deleteBlogImages({ id: row.id });
                if (res.success) {
                    toast.success("Image delete successfully!");
                    Swal.fire("success", "Image deleted.", "success");
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

    const copieBtn = async () => {
        toast.success(`Copied!!`);
    };

    const columns = [
        {
            name: "S.No",
            selector: (row, index) => index + 1 + (currentPage - 1) * itemsPerPage,
            width: "60px",
            center: "true",
        },
        {
            name: 'Image',
            selector: row => <>
                {row.image
                    ?
                    <a href={config.imageUrl + row.image} target='_blank'>
                        <img src={row.image ? (config.imageUrl + row.image) : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHZqj-XReJ2R76nji51cZl4ETk6-eHRmZBRw&s'} className="img-fluid list_image" />
                    </a>
                    :
                    <img src={row.image ? (config.imageUrl + row.image) : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHZqj-XReJ2R76nji51cZl4ETk6-eHRmZBRw&s'} className="img-fluid list_image" />
                }
            </>,
            center: true
        },
        {
            name: "Image Url",
            selector: (item) => item.image,
            sortable: true,
            center: 'true',
            grow: 2,
            format: (item) => {
                return (
                    <>
                        <span data-bs-toggle="tooltip" data-bs-placement="top" style={{ cursor: 'pointer' }} title={item.wallet_address}>
                            {item.image == null || item.image == "N/A"
                                ? "-"
                                : item.image?.substring(0, 6) +
                                "...." +
                                item.image?.substring(item.image.length - 6)}
                        </span>
                        &nbsp;
                        {item.image && item.image !== 'N/A' && (
                            <CopyToClipboard text={config.imageUrl + item.image}>
                                <span
                                    title="Click to Copy"
                                    className="mr-copylink"
                                    id="token-buy-button"
                                    onClick={copieBtn}
                                    style={{ cursor: "pointer", color: "rgb(157 81 255)" }}
                                >
                                    <i className="fa fa-copy"></i>
                                </span>
                            </CopyToClipboard>
                        )}
                    </>
                );
            },
        },
        {
            name: 'Created Date',
            selector: row => moment(row?.created_at).format('DD-MM-YYYY'), //{ moment(row?.created_at).format('DD-MM-YYYY hh:mm:ss A') },
            center: true
        },
        {
            name: 'Action',
            selector: row => <>
                <Button variant="primary" onClick={
                    () => { handleDelete(row) }
                }>
                    Delete
                </Button>
            </>,
            grow: 1,
            center: true,
            // width: "200px",
        },
    ];

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const { errors, touched, handleBlur, setFieldValue, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                console.log("Form Submitted", values.pressImg);
                const res = await imageUpload({ category_name: values.pressImg });
                if (res.success) {
                    toast.success("Image updated successfully!");
                    Swal.fire("success", "Image Added.", "success");
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

    useEffect(() => {
        categories()
    }, [])

    const categories = async () => {
        try {
            let res = await getBlogAllImages(); //{ "authtoken": loginData.authToken}
            if (res.success) {
                setImages(res.data)
            } else {
                setImages([])
            }
        } catch (error) {
            setImages([])
        }
    };

    const handleFileChange = (event) => {
        setFieldValue("pressImg", event.currentTarget.files[0]);
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
                            <div className="d-flex justify-content-between align-items-center mt-2">
                                <h2 className="press">Images List</h2>

                                <Button variant="primary" onClick={handleShow}>
                                    Add
                                </Button>
                            </div>
                            <DataTable
                                columns={columns}
                                onChangeRowsPerPage={onChangeRowsPerPage}
                                onChangePage={handlePageChange}
                                data={images}
                                customStyles={customStyles}
                                pagination
                            />
                        </div>
                    </div>
                </div>

                {/* =============== modal form start ============= */}
                <Modal show={show} onHide={handleClose} backdrop="static">
                    <Modal.Header closeButton>
                        <Modal.Title>Images</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Add Image</Form.Label>
                                <Form.Control
                                    type="file"
                                    accept="image/*"
                                    name="pressImg"
                                    // ref={fileInputRef}
                                    onChange={handleFileChange}
                                    onBlur={handleBlur}
                                />
                                {touched.pressImg && errors.pressImg ? (
                                    <div className="text-danger mt-1">{errors.pressImg}</div>
                                ) : null}
                            </Form.Group>
                            {touched.categories && errors.categories ? (
                                <div className="text-danger">{errors.categories}</div>
                            ) : null}
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={() => {
                            handleSubmit()
                            if (errors.length === 0) {
                                handleClose()
                            }
                        }}>
                            Add Images
                        </Button>
                    </Modal.Footer>
                </Modal>

                {/* =============== modal form end ============= */}
            </div>
        </>
    );
}
