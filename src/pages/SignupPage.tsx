import React, { useState } from 'react';
import axios from 'axios';

interface SignupForm {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

const initialForm: SignupForm = {
  name: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
};

const SignupPage: React.FC = () => {
  const [form, setForm] = useState<SignupForm>(initialForm);
  const [step, setStep] = useState<'form' | 'otp' | 'success'>('form');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
    setInfo('');
  };

  const validate = () => {
    if (!form.name || !form.email || !form.phone || !form.password || !form.confirmPassword) {
      setError('All fields are required.');
      return false;
    }
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email)) {
      setError('Invalid email format.');
      return false;
    }
    if (!/^\d{10,15}$/.test(form.phone)) {
      setError('Phone must be 10-15 digits.');
      return false;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return false;
    }
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setError('');
    setInfo('');
    try {
      const res = await axios.post('/api/auth/register', {
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password,
      });
      setInfo(res.data.message || 'OTP sent to your email.');
      setStep('otp');
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Signup failed.');
      } else {
        setError('Signup failed.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp) {
      setError('Please enter the OTP sent to your email.');
      return;
    }
    setLoading(true);
    setError('');
    setInfo('');
    try {
      const res = await axios.post('/api/auth/verify-otp', {
        email: form.email,
        otp,
      });
      setStep('success');
      setInfo(res.data.message || 'Account verified! You can now log in.');
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'OTP verification failed.');
      } else {
        setError('OTP verification failed.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center luxury-bg">
      <div className="w-full max-w-md p-8 rounded-2xl shadow-xl border border-gray-200 bg-white/80">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-black">Sign Up for ShopHub</h2>
        {step === 'form' && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none"
              autoComplete="name"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none"
              autoComplete="email"
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none"
              autoComplete="tel"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none"
              autoComplete="new-password"
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none"
              autoComplete="new-password"
            />
            {error && <div className="text-red-600 text-sm">{error}</div>}
            {info && <div className="text-green-600 text-sm">{info}</div>}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-black font-semibold py-2 rounded-lg transition"
              aria-label="Sign Up"
            >
              {loading ? 'Signing Up...' : 'Sign Up'}
            </button>
          </form>
        )}
        {step === 'otp' && (
          <form onSubmit={handleOtpSubmit} className="space-y-4">
            <input
              type="text"
              name="otp"
              placeholder="Enter OTP"
              value={otp}
              onChange={e => setOtp(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none"
              autoComplete="one-time-code"
              disabled={loading}
            />
            {error && <div className="text-red-600 text-sm">{error}</div>}
            {info && <div className="text-green-600 text-sm">{info}</div>}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-black font-semibold py-2 rounded-lg transition"
              aria-label="Verify OTP"
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
          </form>
        )}
        {step === 'success' && (
          <div className="text-center">
            <div className="text-green-600 font-semibold mb-4">{info}</div>
            <a href="/login" className="text-blue-600 dark:text-blue-400 underline">Go to Login</a>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignupPage;
