import * as ACTIONTYPES from "../redux/actionTypes";
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import toast, { Toaster } from 'react-hot-toast';
import Cookies from 'js-cookie';
import config from '../CoreFiles/config';
import * as Yup from 'yup';
import { LoginAction } from '../Action/action';
import Loader from "../Component/Loader";
import { FaUser,FaLock  } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const validationSchema = Yup.object().shape({
  username: Yup.string().required('Username are required.'),
  password: Yup.string().required('Password is required.'),
});

const LoginNew = () => {
  const initialValues = { username: '', password: '' };
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (values) => {
    setLoader(true);
    try {
      console.log(values);
      if (values.username.length < 3 || values.username.length > 15) {
        toast.error("User name can be between 3 and 15 characters long");
        setLoader(false);
        return
      }
      if (values.password.length < 5 || values.password.length > 15) {
        toast.error("Password can be between 5 and 15 characters long");
        setLoader(false);
        return
      }
      let res = await LoginAction(values);
      if (res.success) {
        dispatch({
          type: ACTIONTYPES.USERLOGIN,
          payload: res.data,
          token: res.data.authToken,
        });
        toast.success(res.msg);
        setLoader(false);
        navigate(`${config.baseUrl}press`);
      } else {
        toast.error(res.msg);
        setLoader(false);
      }
    } catch (error) {
      setLoader(false);
    }
  };

  return (
    <>
    <Toaster/>
      <div className="hold-transition theme-primary bg-img">
        <div className="container h-p100">
          <div className="row align-items-center justify-content-md-center h-p100 opacity_70">
            <div className="col-12">
              <div className="row justify-content-center g-0">
                <div className="col-lg-5 col-md-5 col-12">
                  <div className="bg-blue rounded10 shadow-lg admin-login">
                    <div className="content-top-agile p-20 pb-0">
                      <center className="loginLogo">
                        <img  alt='' width={"250px"} src={`${config.baseUrl}images/logo.svg`} />
                      </center>
                      <h2 className="text-white">Admin Panel</h2>
                      <p className="mb-0">Sign in to SportsMint Admin.</p>
                    </div>
                    <div className="p-40">
                      <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                      >
                        <Form>
                          <div className="form-group mb-3">
                            <div className="input-group ">
                              <span className="input-group-text">
                                <FaUser />
                              </span>
                              <Field
                                type="text"
                                className="form-control ps-15"
                                placeholder="Username"
                                name="username"
                              />
                            </div>
                            <ErrorMessage
                              name="username"
                              component="span"
                              className="validationErr"
                            />
                          </div>
                          <div className="form-group mb-3">
                            <div className="input-group">
                              <span className="input-group-text">
                                <FaLock/>
                              </span>
                              <Field
                                type="password"
                                className="form-control ps-15"
                                placeholder="Password"
                                name="password"
                              />
                            </div>
                            <ErrorMessage
                              name="password"
                              component="span"
                              className="validationErr"
                            />
                          </div>
                          <div className="row">
                            <div className="col-12 text-center">
                              {
                                loader?<button
                                type=""
                                disabled
                                className="btn btn-primary mt-10"
                              >
                                <Loader/>
                              </button>
                            :  <button
                                type="submit"
                                className="btn btn-primary mt-10"
                              >
                                SIGN IN
                              </button>
                              }
                            </div>
                          </div>
                        </Form>
                      </Formik>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginNew;
