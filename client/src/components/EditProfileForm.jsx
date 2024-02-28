import { useState } from 'react';
import { useSelector } from 'react-redux';
import FormInput from './reusable/FormInput';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline';

const EditProfileForm = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <>
      <form className="space-y-6">
        <div className="shadow overflow-hidden rounded-lg">
          <div className="px-4 py-5 bg-white sm:p-6">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <FormInput
                  inputLabel={'Nombre'}
                  labelFor={'username'}
                  inputType={'text'}
                  inputId={'username'}
                  inputName={'username'}
                  inputDefaultValue={currentUser.username}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <FormInput
                  inputLabel={'Email'}
                  labelFor={'email'}
                  inputType={'email'}
                  inputId={'email'}
                  inputName={'email'}
                  inputDefaultValue={currentUser.email}
                />
              </div>

              <div className="col-span-6 sm:col-span-4">
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
              </div>
            </div>
          </div>

          <div className="px-4 py-3 redhat-medium bg-gray-50 text-right sm:px-6">
            <button className="inline-flex justify-center py-2 px-3 border border-cyan-600 shadow-sm text-sm rounded-md text-gray-700 bg-white hover:bg-gray-100">
              Eliminar cuenta
            </button>
            <button className="inline-flex justify-center ml-3 py-2 px-3 shadow-sm text-sm rounded-md text-white bg-cyan-600 hover:bg-cyan-700">
              Guardar cambios
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default EditProfileForm;
