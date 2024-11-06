import React, { useEffect, useState } from "react";
import Header from "../../directives/header";
import Sidebar from "../../directives/sidebar";
import DataTable from "react-data-table-component";
import { customStyles } from "../../Component/CustomStyles";
import 'react-tagsinput/react-tagsinput.css'
import '../cms/press/Press.css'
import { Button, Toast } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { getCommentsByBlog, statusChangeOfComments } from "../../Action/action";
import Swal from "sweetalert2";

export default function Comments() {

    const location = useLocation();
    const id = location.state;

    const [commentList, setCommentList] = useState([])



    const handleApproveDisapprove = (data) => {

        const isapprove = !data.is_approve ? 1 : 0

        const confirmDelete = async (itemId) => {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: "This action cannot be undone!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Yes, Approve!',
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
            name: 'Comment',
            selector: row => row.comment,
            center: true
        },
        {
            name: 'Name',
            selector: row => row.name,
            center: true
        },
        {
            name: 'Website',
            selector: row => row.website,
            center: true
        },
        {
            name: 'Email',
            selector: row => row.email,
            center: true
        },
        {
            name: 'Action',
            selector: row => <><Button variant={row.is_approve === 0 ? 'danger' : 'success'} onClick={() => { handleApproveDisapprove(row) }}>{row.is_approve === 0 ? "Approve" : "Disapprove"}</Button></>,
            center: true
        },
    ];

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

    return (
        <>
            <div className="wrapper">
                <Header />
                <Sidebar />
                <div className="content-wrapper">
                    <div className="container-full">

                        <div className="p-3">
                            <div className="d-flex justify-content-between align-items-center mt-2">
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
        </>
    );
}
