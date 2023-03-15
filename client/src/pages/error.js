import {useSession} from "next-auth/react";
import {Link} from "react-router-dom";

const Error = () => {
  return (
    <div className="page">
      <div>
        <h1>404</h1>
        <h4>page not found</h4>
      </div>
    </div>
  );
};

export default Error;
