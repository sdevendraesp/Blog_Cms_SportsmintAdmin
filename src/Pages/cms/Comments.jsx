import React, { useEffect, useState } from "react";
import Header from "../../directives/header";
import Sidebar from "../../directives/sidebar";
import DataTable from "react-data-table-component";
import { customStyles } from "../../Component/CustomStyles";
import 'react-tagsinput/react-tagsinput.css'
import '../cms/press/Press.css'
import { Button, Toast } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { deleteComments, getCommentsByBlog, statusChangeOfComments } from "../../Action/action";
import Swal from "sweetalert2";
import { IoMdArrowBack } from "react-icons/io";
import Modal from 'react-bootstrap/Modal';
import toast from "react-hot-toast";

export default function Comments() {

    const [commentModal, setCommentModal] = useState("");
    const location = useLocation();
    const navigate = useNavigate()
    const id = location.state;

    const [commentList, setCommentList] = useState([])

    const [show, setShow] = useState(false);

    const handleApproveDisapprove = (data) => {

        const isapprove = !data.is_approve ? 1 : 0

        const confirmDelete = async (itemId) => {
            const result = await Swal.fire({
                title: 'Are you sure?',
                // text: "This action cannot be undone!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: isapprove === 0 ? 'Yes, Disapprove it' : 'Yes, Approve it', //'Yes, Approve!',
                cancelButtonText: 'Cancel'
            });

            if (result.isConfirmed) {
                // Call your delete function here, passing the item ID

                const res = await statusChangeOfComments({
                    "id": data.id,
                    "is_approve": isapprove
                });
                if (res.success) {
                    // Toast.success("This comment is approved!");
                    Swal.fire("success", "Approved.", "success");
                    // resetForm();
                    setTimeout(() => {
                        window.location.reload();
                    }, 800);
                } else {
                    Swal.fire("Failed!", res.msg, "error");
                }

                Swal.fire(
                    // isapprove === 0 ? 'Successful' : 'Successful',
                    // isapprove === 0 ? 'Successful' : 'Successful',
                    'Successful'
                );
            }
        };

        confirmDelete()
    }

    const handleShow = (data) => {
        setCommentModal(data); // Set the comment
        setShow(true); // Show the modal
    };

    const handleClose = () => {
        setShow(false);
    };

    const columns = [
        {
            name: "S.No",
            selector: (row, index) => index + 1,
            width: "60px",
            center: "true",
        },
        {
            name: 'Comment',
            selector: row =>
                <>
                    <div>
                        {row.comment.slice(0, 30) + '...'}
                        <span
                            style={{ color: 'rgb(123 123 255)', cursor: 'pointer' }}
                            onClick={() => handleShow(row.comment)}
                        >
                            Read More
                        </span>
                    </div>
                </>
            ,
            grow: 3,
            center: true
        },
        {
            name: 'Name',
            selector: row => row.name,
            center: true
        },
        {
            name: 'Website',
            selector: row => <a href={row.website} target="_blank">{row.website}</a>,
            center: true
        },
        {
            name: 'Email',
            selector: row => row.email,
            center: true
        },
        {
            name: 'Action',
            selector: row => <>
                <Button variant={row.is_approve === 0 ? 'danger' : 'success'} onClick={() => { handleApproveDisapprove(row) }}>{row.is_approve === 0 ? "Approve" : "Disapprove"}</Button>

                <Button variant="primary" className="ms-2" onClick={
                    () => { handleDelete(row) }
                }>
                    Delete
                </Button>
            </>,
            center: true
        },
    ];

    const hadleback = () => {
        navigate(-1)
    }

    useEffect(() => {
        comment()
    }, [])

    const comment = async () => {
        try {
            const res = await getCommentsByBlog({
                "blog_id": id
            });
            if (res.success) {
                setCommentList(res.data)
            } else {
                setCommentList([])
            }
        } catch (error) {
            setCommentList([])
        }
    }

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

                const res = await deleteComments({ id: row.id });
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

    return (
        <>
            <Toast />
            <div className="wrapper">
                <Header />
                <Sidebar />
                <div className="content-wrapper">
                    <div className="container-full">

                        <div className="p-3">
                            <div className="mt-2">

                                <div onClick={hadleback}>
                                    <span className="fs-3" style={{ cursor: 'pointer' }}><IoMdArrowBack /></span>
                                </div>

                                <h2 className="press">Comments</h2>
                            </div>
                            <DataTable
                                columns={columns}
                                data={commentList}
                                customStyles={customStyles}
                                pagination
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            <Modal
                className="comment_modal"
                show={show}
                onHide={handleClose}
                dialogClassName="modal-90w"
                aria-labelledby="example-custom-modal-styling-title"
            >
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        {commentModal} {/* Dynamically display the comment */}
                    </p>
                </Modal.Body>
            </Modal>
        </>
    );
}
