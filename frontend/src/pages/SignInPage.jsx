import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { Lock, Mail, ArrowRight } from 'lucide-react';

export const SignInPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!identifier.trim() || !password) {
      setError('Please enter your credentials');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await login(identifier.trim(), password);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 sm:p-10 shadow-xl">
        
        {/* Brand header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 flex items-center justify-center font-serif font-bold text-lg">
              C
            </div>
            <span className="font-serif font-bold text-2xl text-zinc-900 dark:text-zinc-100">
              Chronicle
            </span>
          </Link>
          <h2 className="font-serif font-bold text-2xl text-zinc-900 dark:text-zinc-100">
            Welcome back
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            Enter your email or username to access your essays
          </p>
        </div>

        {error && (
          <div className="p-3 mb-6 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 rounded-xl text-rose-700 dark:text-rose-300 text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            id="identifier"
            label="Email or Username"
            type="text"
            required
            autoComplete="username"
            placeholder="alex or alex@example.com"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
          />

          <Input
            id="password"
            label="Password"
            type="password"
            required
            autoComplete="current-password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={isLoading}
              className="w-full justify-center"
            >
              <span>Sign In</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </div>
        </form>

        <div className="mt-8 pt-6 border-t border-zinc-100 dark:border-zinc-800 text-center">
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Don't have an author account?{' '}
            <Link
              to="/sign-up"
              className="font-semibold text-zinc-900 dark:text-zinc-100 hover:underline"
            >
              Create one now
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};
