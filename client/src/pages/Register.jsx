import { useState } from 'react';
import FormInput from '../components/reusable/FormInput';
import { Link, useNavigate } from 'react-router-dom';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline';

const Register = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

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
      setLoading(true);
      const res = await fetch('/server/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/iniciar-sesion');
    } catch (error) {
      setLoading(false);
      setError(error.message);
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
          <form onSubmit={handleSubmit} className="space-y-6">
            <FormInput
              inputLabel={'Nombre'}
              labelFor={'username'}
              inputType={'text'}
              inputId={'username'}
              inputName={'username'}
              onChange={handleChange}
            />
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
                {loading ? 'Cargando...' : 'Registrarme'}
              </button>
              <button className="w-full flex justify-center mt-2 py-2 px-4 border border-cyan-600 rounded-md shadow-sm text-sm redhat-medium text-gray-700 bg-gray-50 hover:bg-gray-100">
                Continuar con Google
              </button>
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

export default Register;
