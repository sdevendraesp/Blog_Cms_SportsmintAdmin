import React from "react";
import Header from "../../directives/header";
import Sidebar from "../../directives/sidebar";
import DataTable from "react-data-table-component";
import { customStyles } from "../../Component/CustomStyles";
import { Button, Col, Form, Row } from "react-bootstrap";
import JoditEditor from "jodit-react";
import { Link } from "react-router-dom";
import config from "../../CoreFiles/config";

export default function Blog() {



    const columns = [
        {
            name: 'Title',
            selector: row => row.title,
        },
        {
            name: 'Description',
            selector: row => row.description,
        },
        {
            name: 'Heading',
            selector: row => row.heading,
        },
        {
            name: 'Image',
            selector: row => row.image,
        },
        {
            name: 'Labels',
            selector: row => row.labels,
        },
        {
            name: 'Categories',
            selector: row => row.cantegories,
        },
        {
            name: 'Action',
            grow: 2,
            selector: row => <div>
                <Button className="me-2">Update</Button>
                <Button>Delete</Button>
            </div>,
        },

    ];

    const data = [
        {
            id: 1,
            title: 'Beetlejuice',
            image: 'images',
            description: "description",
            cantegories: 'cantegories',
            labels: 'labels',
            heading: 'heading',
            tags: "tag's",
            action: <Button >Update</Button>,
        },
        {
            id: 2,
            title: 'Batman',
            image: 'images',
            tags: "tag's",
            description: "description",
            heading: 'heading',
            cantegories: 'cantegories',
            labels: 'labels',
            action: <Button >Update</Button>,
        },
    ];




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
                            <DataTable columns={columns} data={data} customStyles={customStyles} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
