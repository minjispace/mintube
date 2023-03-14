import {Link} from 'react-router-dom';

const Error = () => {
  return (
    <Wrapper className="page">
      <div>
        <h1>404</h1>
        <h4>page not found</h4>
        <Link to="/" className="btn">
          Back Home
        </Link>
      </div>
    </Wrapper>
  );
};

export default Error;
