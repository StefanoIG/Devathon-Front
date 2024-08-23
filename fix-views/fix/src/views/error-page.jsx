import { useRouteError } from "react-router-dom";

const  ErrorPage=() => {
  const error = useRouteError();
  console.error(error);
  const boleanError  = error.statusText || error.messag
  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{boleanError}</i>
      </p>
    </div>
  );
}

export default ErrorPage;