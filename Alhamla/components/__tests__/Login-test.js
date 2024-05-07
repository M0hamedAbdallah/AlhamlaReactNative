import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Login from './Login';
import { Provider } from 'react-redux';
import { store } from '@/store/store'; // Assuming the store is set up in this path

describe('Login Component', () => {
  it('test_validate_email_format', () => {
    const { getByPlaceholderText, getByText } = render(
      <Provider store={store}>
        <Login />
      </Provider>
    );

    const emailInput = getByPlaceholderText('Email');
    fireEvent.changeText(emailInput, 'invalidemail');
    fireEvent(emailInput, 'blur');

    const emailError = getByText('Invalid email format');
    expect(emailError).toBeTruthy();
  });

  it('test_successful_login', async () => {
    const { getByPlaceholderText, getByText, queryByText } = render(
      <Provider store={store}>
        <Login />
      </Provider>
    );

    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const loginButton = getByText('Login');

    fireEvent.changeText(emailInput, 'user@gmail.com');
    fireEvent(emailInput, 'blur');
    fireEvent.changeText(passwordInput, 'password123');
    fireEvent(passwordInput, 'blur');
    fireEvent.press(loginButton);

    await waitFor(() => {
      expect(queryByText('Logging in...')).toBeNull();
    });
  });

  it('test_login_failure_handling', async () => {
    const { getByPlaceholderText, getByText, queryByText } = render(
      <Provider store={store}>
        <Login />
      </Provider>
    );

    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const loginButton = getByText('Login');

    fireEvent.changeText(emailInput, 'user@gmail.com');
    fireEvent(emailInput, 'blur');
    fireEvent.changeText(passwordInput, 'wrongpassword');
    fireEvent(passwordInput, 'blur');
    fireEvent.press(loginButton);

    await waitFor(() => {
      const errorView = queryByText('Invalid credentials');
      expect(errorView).toBeTruthy();
    });
  });
});