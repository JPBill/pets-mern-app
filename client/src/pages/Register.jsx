import { useState } from 'react';
import FormInput from '../components/reusable/FormInput';
import { Link } from 'react-router-dom';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
          Crea tu cuenta
        </h2>
        <p className="mt-2 text-center redhat-medium text-sm text-gray-600">
          ¿Ya estás registrado?
          <Link
            to="/iniciar-sesion"
            className="text-cyan-600 hover:text-cyan-500 ml-1"
          >
            Inicia sesión
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6">
            <FormInput
              inputLabel={'Nombre'}
              labelFor={'username'}
              inputType={'text'}
              inputId={'username'}
              inputName={'username'}
            />
            <FormInput
              inputLabel={'Email'}
              labelFor={'email'}
              inputType={'email'}
              inputId={'email'}
              inputName={'email'}
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
              <button className="w-full flex justify-center py-2 px-4 rounded-md shadow-sm text-sm redhat-medium text-white bg-cyan-600 hover:bg-cyan-700">
                Registrarme
              </button>
              <button className="w-full flex justify-center mt-2 py-2 px-4 border border-cyan-600 rounded-md shadow-sm text-sm redhat-medium text-gray-700 bg-gray-50 hover:bg-gray-100">
                Continuar con Google
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
