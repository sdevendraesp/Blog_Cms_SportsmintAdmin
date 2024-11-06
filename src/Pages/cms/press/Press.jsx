import React, { useEffect, useRef, useState } from "react";
import Header from "../../../directives/header";
import Sidebar from "../../../directives/sidebar";
import DataTable from "react-data-table-component";
import { customStyles } from "../../../Component/CustomStyles";
import { Button, Col, Form, Row } from "react-bootstrap";
import TagsInput from "react-tagsinput";
import 'react-tagsinput/react-tagsinput.css'
import '../press/Press.css'
import { useFormik } from "formik";
import * as Yup from 'yup';
import config from "../../../CoreFiles/config";
import { Link, useNavigate } from "react-router-dom";
import { deletePressRelease, getPressRelease } from "../../../Action/action";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

export default function Press() {

    const [PressReleaseData, setPressReleaseData] = useState([])

    const navigate = useNavigate();

    const handleUpdate = (data) => {
        navigate(`${config.baseUrl}update-press`, { state: data });
    }

    const columns = [
        {
            name: 'Title',
            selector: row => row.title,
            center: true
        },
        {
            name: 'Url',
            selector: row => row.url,
            center: true
        },
        {
            name: 'Image',
            selector: row => <><img src={row.image ? (config.imageUrl + row.image) : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHZqj-XReJ2R76nji51cZl4ETk6-eHRmZBRw&s'} className="img-fluid list_image" /></>,
            center: true
        },
        {
            name: 'Short Description',
            selector: row => row.short_description,
            center: true
        },
        {
            name: 'Hashtag',
            selector: row => row.hashtag,
            center: true
        },
        {
            name: 'Action',
            selector: row => <>
                <Button className="me-2" onClick={() => { handleUpdate(row) }}>Update</Button>
                <Button variant="primary" onClick={
                    () => { handleDelete(row) }
                }>
                    Delete
                </Button>
            </>,
            center: true
        },
    ];

    useEffect(() => {
        categories()
    }, [])

    const categories = async () => {
        try {
            let res = await getPressRelease(); //{ "authtoken": loginData.authToken}
            if (res.success) {
                setPressReleaseData(res.data)
            } else {
                setPressReleaseData([])
            }
        } catch (error) {
            setPressReleaseData([])
        }
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

                const res = await deletePressRelease({ id: row.id });
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
            <div className="wrapper">
                <Header />
                <Sidebar />
                <div className="content-wrapper">
                    <div className="container-full">
                        <div className="p-3">
                            <div className="d-flex justify-content-between align-items-center">
                                <h2 className="press">Press</h2>
                                <Link to={`${config.baseUrl}add-press`}>
                                    <Button>Add</Button>
                                </Link>
                            </div>
                            <DataTable columns={columns} data={PressReleaseData} customStyles={customStyles} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}