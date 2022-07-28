import { useState } from 'react';
import './sign-in-form.styles.scss';
import FormInput from '../form-input/form-input';
import Button from '../button/button';
import {
  signInAuthUserWithEmailandPassord,
  SignInWithGooglePopup,
} from '../../utils/firebase/firebase.utils';

function SignInForm() {
  const defaultFormField = { email: '', password: '' };
  const [formField, setFormField] = useState(defaultFormField);
  const { email, password } = formField;

  const resetFormField = () => {
    setFormField(defaultFormField);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormField({ ...formField, [name]: value });
  };

  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInAuthUserWithEmailandPassord(email, password);
      resetFormField();
    } catch (error) {
      console.log('user sign in failed', error.code);
    }
  };

  const logGoogleUser = async () => {
    await SignInWithGooglePopup();
  };

  return (
    <div className="sign-in-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSignInSubmit}>
        <FormInput
          label="Email"
          type="email"
          name="email"
          value={email}
          onChange={handleInputChange}
        />
        <FormInput
          label="Password"
          type="password"
          name="password"
          value={password}
          onChange={handleInputChange}
        />
        <div className="buttons-container">
          <Button type="Submit"> Sign In </Button>
          <Button type="button" onClick={logGoogleUser} buttonType="google">
            Sign in With Google
          </Button>
        </div>
      </form>
    </div>
  );
}

export default SignInForm;
