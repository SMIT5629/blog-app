import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { Compass, ArrowLeft } from 'lucide-react';

export const NotFoundPage = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 text-center">
      <div className="max-w-md">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-400">
          <Compass className="w-8 h-8" />
        </div>
        <span className="text-xs uppercase font-mono tracking-widest text-zinc-400 font-bold">
          404 • Page Not Found
        </span>
        <h1 className="font-serif font-extrabold text-4xl text-zinc-900 dark:text-zinc-50 mt-2 mb-4">
          Lost in the Archives
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed">
          The page you requested does not exist or has been archived. Let's return to the curated dispatch.
        </p>
        <Link to="/">
          <Button variant="primary" size="md">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Chronicle
          </Button>
        </Link>
      </div>
    </div>
  );
};
