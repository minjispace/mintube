import React from 'react';
import {Form, SubmitButton} from '../components';

const Register = () => {
  return (
    <div className="grid justify-center">
      <h2 className="text-center text-white text-4xl mb-10 mt-10">Register</h2>
      <Form type="register" field="name" />
      <Form type="register" field="email" />
      <Form type="register" field="password" />
      <SubmitButton type="register" />
    </div>
  );
};

export default Register;
