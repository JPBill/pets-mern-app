import { useState } from 'react';
import FormInput from '../components/reusable/FormInput';
import OAuth from '../components/OAuth';
import { Link, useNavigate } from 'react-router-dom';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline';
import { useDispatch, useSelector } from 'react-redux';
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from '../redux/user/userSlice';

const Login = () => {
  const { loading, error } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(loginStart());
      const res = await fetch('/server/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(loginFailure(data.message));
        return;
      }
      dispatch(loginSuccess(data));
      navigate('/');
    } catch (error) {
      dispatch(loginFailure(error.message));
    }
  };
  return (
    <div className="min-h-full bg-gray-50 flex flex-col justify-center py-8 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="mx-auto h-20 w-auto"
          src="/huellitas.svg"
          alt="HUELLITAS"
        />
        <h2 className="mt-4 text-center text-3xl redhat-bold text-gray-900">
          Inicia sesión
        </h2>
        <p className="mt-2 text-center redhat-medium text-sm text-gray-600">
          ¿No estás registrado?
          <Link
            to="/crear-cuenta"
            className="text-cyan-600 hover:text-cyan-500 ml-1"
          >
            Crear cuenta
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <FormInput
              inputLabel={'Email'}
              labelFor={'email'}
              inputType={'email'}
              inputId={'email'}
              inputName={'email'}
              onChange={handleChange}
            />

            <div className="redhat-medium text-sm">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Contraseña
              </label>
              <div className="relative mt-1">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  onChange={handleChange}
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                />
                <div
                  className="absolute inset-y-0 right-1 flex cursor-pointer items-center pr-2 text-gray-500"
                  onClick={handlePasswordVisibility}
                >
                  {showPassword ? (
                    <EyeIcon className="w-4 h-4" />
                  ) : (
                    <EyeOffIcon className="w-4 h-4" />
                  )}
                </div>
              </div>
            </div>

            <div>
              <button
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 rounded-md shadow-sm text-sm redhat-medium text-white bg-cyan-600 hover:bg-cyan-700"
              >
                {loading ? 'Cargando...' : 'Iniciar sesión'}
              </button>
              <OAuth />
            </div>
          </form>
          {error && (
            <div className="mt-6">
              <div className="w-full border-t border-gray-300" />
              <p className="mt-4 redhat-regular text-sm text-red-500 tracking-wide">
                {error}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
