import React, { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Eye, EyeOff } from 'lucide-react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LoadCanvasTemplate, loadCaptchaEnginge, validateCaptcha } from 'react-simple-captcha';
import { login } from '../../../services/index/users';
import { userActions } from '../../../store/reducers/userReducer';
import { motion } from 'framer-motion';

const VendorLogin = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const [captchaValue, setCaptchaValue] = useState('');

  useEffect(() => {
    loadCaptchaEnginge(4, '#f3f4f6');
  }, []);

  const { mutate, isLoading } = useMutation({
    mutationFn: ({ email, password }) => login({ email, password }),
    onSuccess: (data) => {
      dispatch(userActions.setUserInfo(data));
      localStorage.setItem('vendorAccount', JSON.stringify(data));
      toast.success('Vendor logged in successfully');
      navigate('/vendor/dashboard');
    },
    onError: (error) => {
      console.log(error);
      toast.error('An error occurred');
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { email: '', password: '' },
    mode: 'onChange',
  });

  const submitHandler = (data) => {
    if (!validateCaptcha(captchaValue)) {
      toast.error('Please complete the reCAPTCHA verification.');
      return;
    }

    toast.loading('Please wait...');
    const { email, password } = data;
    mutate({ email, password });
    toast.dismiss();
  };

  useEffect(() => {
    const userInfo = userState?.userInfo || JSON.parse(localStorage.getItem("vendorAccount"));
    if (userInfo && userInfo.user && userInfo.user.role === "vendor") {
      navigate("/vendor/dashboard");
      toast("You are already logged in!");
    }
  }, [navigate, userState]);

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="mt-8 space-y-6">
      <div className="rounded-md shadow-sm -space-y-px">
        <div>
          <label htmlFor="email" className="sr-only">
            Email address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaEnvelope className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="email"
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Enter a valid email',
                },
              })}
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm pl-10"
              placeholder="Email address"
            />
          </div>
        </div>
        <div>
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaLock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="password"
              type={isVisible ? 'text' : 'password'}
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm pl-10"
              placeholder="Password"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <button type="button" onClick={toggleVisibility} className="focus:outline-none">
                {isVisible ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {(errors.email || errors.password) && (
        <div className="text-red-500 text-xs mt-1">
          {errors.email?.message || errors.password?.message}
        </div>
      )}

      <div className="rounded-md shadow-sm -space-y-px">
        <LoadCanvasTemplate />
        <input
          type="text"
          placeholder="Enter the CAPTCHA"
          className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          value={captchaValue}
          onChange={(e) => setCaptchaValue(e.target.value)}
        />
      </div>

      <div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Sign in'}
        </motion.button>
      </div>
    </form>
  );
};

export default VendorLogin;