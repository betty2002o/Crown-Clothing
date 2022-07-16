import React from 'react';
import './auth.scss';
import SignUpForm from '../../components/sign-up-form/SignUpForm';
import SignInForm from '../../components/sign-in-form/signInForm';
function Auth() {
  return (
    <div className="authentication-container">
      <SignInForm />
      <SignUpForm />
    </div>
  );
}

export default Auth;
