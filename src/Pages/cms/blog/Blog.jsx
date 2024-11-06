import React, { useEffect, useState } from "react";
import Header from "../../../directives/header";
import Sidebar from "../../../directives/sidebar";
import DataTable from "react-data-table-component";
import { customStyles } from "../../../Component/CustomStyles";
import { Button, Col, Form, Row } from "react-bootstrap";
import JoditEditor from "jodit-react";
import { Link, useNavigate } from "react-router-dom";
import config from "../../../CoreFiles/config";
import { deleteBlog, getBlogAllBlogs, statusChangeOfBlog } from "../../../Action/action";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

export default function Blog() {

    const [blogListData, setBlogListData] = useState([])

    const navigate = useNavigate()


    // const featuredValue = blogListData.map((value) => {
    //     return value.is_featured
    // })

    // console.log('blogListData', featuredValue.length);

    const featuredValue = blogListData.filter((value) => value.is_featured === 1);

    console.log('Number of featured items:', featuredValue.length);

    const handleUpdate = (data) => {
        navigate(`${config.baseUrl}update-blog`, { state: data });
    }

    const handleViewComment = (data) => {
        navigate(`${config.baseUrl}comments`, { state: data?.id });
    }


    const handleFeaturedUnfeatured = (data) => {


        const isfeatured = !data.is_featured ? 1 : 0

        const confirmDelete = async (itemId) => {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: "This action cannot be undone!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Yes, Featured!',
                cancelButtonText: 'Cancel'
            });

            if (result.isConfirmed) {
                // Call your delete function here, passing the item ID

                const res = await statusChangeOfBlog({
                    "id": data.id,
                    "is_featured": isfeatured
                });
                if (res.success) {
                    // Toast.success("This comment is approved!");
                    Swal.fire("success", isfeatured === 0 ? 'Unfeatured' : 'Featured!', "success");
                    // resetForm();

                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                } else {
                    Swal.fire("Failed!", res.msg, "error");
                }

                Swal.fire(
                    isfeatured === 0 ? 'Unfeatured' : 'Featured!',
                    isfeatured === 0 ? 'Unfeatured' : 'Featured',
                    'success'
                );
            }
        };

        if (data.is_featured === 0) {
            if (featuredValue.length <= 4) {
                confirmDelete()
            } else {
                alert("You can only make 5 items featured.")
            }
        } else {
            confirmDelete()
        }
    }

    const columns = [
        {
            name: 'Title',
            selector: row => row.title.slice(0, 20) + '...',
            center: true
        },
        {
            name: 'Description',
            selector: row => {
                const htmlContent = "<p>Master the art & science of writing the best blog titles. for meta description</p>";
                const textContent = htmlContent.replace(/<\/?[^>]+(>|$)/g, ""); // Remove HTML tags

                return <>{textContent}</>; // Render as plain text without styles
            },

            //row.description.slice(0, 20) + '...',
            center: true
        },
        {
            name: 'Heading',
            selector: row => row.short_description.slice(0, 20) + '...',
            center: true
        },
        {
            name: 'Image',
            selector: row => <><img src={row.image ? (config.imageUrl + row.image) : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHZqj-XReJ2R76nji51cZl4ETk6-eHRmZBRw&s'} className="img-fluid list_image" /></>,
            center: true
        },
        {
            name: 'Labels',
            selector: row => row.labels,
            center: true
        },
        {
            name: 'Status',
            selector: row => row.is_featured === 0 ? "Non-Featured" : "Featured",
            center: true
        },
        {
            name: 'Categories',
            selector: row => row.categories_name,
            center: true,
            grow: 2,
        },
        {
            name: 'Comments',
            selector: row => <><Button onClick={() => { handleViewComment(row) }}>View Comment</Button></>,
            center: true,
            grow: 2,
        },
        {
            name: 'Action',
            grow: 3,
            selector: row => <div>
                <Button className="me-2" onClick={() => { handleUpdate(row) }}>Update</Button>
                <Button className="me-2" variant="primary" onClick={
                    () => { handleDelete(row) }
                }>
                    Delete
                </Button>
                <><Button className="me-2" onClick={() => { handleFeaturedUnfeatured(row) }}>{row.is_featured === 0 ? "Featured" : "Unfeatured"}</Button></>
            </div>,
            center: true
        },

    ];

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

                const res = await deleteBlog({ id: row.id });
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

    useEffect(() => {
        blogList()
    }, [])

    const blogList = async () => {
        try {
            let res = await getBlogAllBlogs(); //{ "authtoken": loginData.authToken}
            if (res.success) {
                setBlogListData(res.data)
            } else {
                setBlogListData([])
            }
        } catch (error) {
            setBlogListData([])
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
                                    <h2 className="press">Blog</h2>
                                </Col>

                                <Col xs={6} className="text-end">
                                    <Link to={`${config.baseUrl}add-blog`}>
                                        <Button>Add</Button>
                                    </Link>
                                </Col>
                            </Row>
                            <DataTable columns={columns} data={blogListData} customStyles={customStyles} pagination />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
