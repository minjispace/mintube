import {Form, SubmitButton} from '../components';

const login = () => {
  return (
    <div className="grid justify-center">
      <h2 className="text-center text-white text-4xl mb-10 mt-10">Login</h2>
      <Form type="login" field="email" />
      <Form type="login" field="password" />
      <SubmitButton type="login" />
    </div>
  );
};

export default login;
