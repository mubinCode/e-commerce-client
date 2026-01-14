import { Suspense } from "react";
import RegisterClient from "./RegisterClient";

const RegisterPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RegisterClient />
    </Suspense>
  );
}

export default RegisterPage;