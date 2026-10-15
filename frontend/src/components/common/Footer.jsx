import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './Button';
import { Send, CheckCircle2 } from 'lucide-react';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="mt-20 border-t border-zinc-200 dark:border-zinc-800 bg-[#F5F5F0] dark:bg-[#0E0E10] text-zinc-600 dark:text-zinc-400">
      {/* Newsletter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-zinc-200/80 dark:border-zinc-800/80">
        <div className="max-w-2xl mx-auto text-center">
          <span className="text-xs uppercase tracking-widest font-sans font-bold text-zinc-500 dark:text-zinc-400">
            The Weekly Dispatch
          </span>
          <h3 className="font-serif font-bold text-3xl sm:text-4xl text-zinc-900 dark:text-zinc-100 mt-2 mb-4 tracking-tight">
            Stories crafted for thoughtful minds.
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed">
            Delivered every Sunday morning. No noise, no algorithms — just curated essays on technology, design, literature, and human culture.
          </p>

          {subscribed ? (
            <div className="flex items-center justify-center gap-2 p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl text-emerald-800 dark:text-emerald-300 text-sm">
              <CheckCircle2 className="w-5 h-5" />
              <span>You are subscribed to the Dispatch. Welcome to the circle.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                required
                placeholder="Enter your email address..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100"
              />
              <Button type="submit" variant="primary" size="md" className="shrink-0">
                <span>Join</span>
                <Send className="w-3.5 h-3.5 ml-1.5" />
              </Button>
            </form>
          )}
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1 space-y-3">
            <Link to="/" className="flex items-center gap-2 font-serif font-bold text-xl text-zinc-900 dark:text-zinc-100">
              <div className="w-7 h-7 rounded bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 flex items-center justify-center text-sm font-bold">
                C
              </div>
              Chronicle
            </Link>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              An independent publishing forum committed to long-form nuance, thoughtful perspectives, and editorial clarity.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 mb-3">
              Explore
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/category/TECH" className="hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors">
                  Technology & Future
                </Link>
              </li>
              <li>
                <Link to="/category/LIFESTYLE" className="hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors">
                  Lifestyle & Thought
                </Link>
              </li>
              <li>
                <Link to="/category/TRAVEL" className="hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors">
                  Travel & Explorations
                </Link>
              </li>
              <li>
                <Link to="/category/FOOD" className="hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors">
                  Gastronomy & Culture
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 mb-3">
              Writers
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/create-post" className="hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors">
                  Start Writing
                </Link>
              </li>
              <li>
                <span className="text-zinc-400 dark:text-zinc-600">Editorial Guidelines</span>
              </li>
              <li>
                <span className="text-zinc-400 dark:text-zinc-600">Style Guide</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 mb-3">
              Colophon
            </h4>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Set in Playfair Display & Plus Jakarta Sans. Designed with intentional typography, micro-interactions, and balanced spacing.
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-zinc-200/60 dark:border-zinc-800/60 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-400 dark:text-zinc-500 gap-4">
          <p>© {new Date().getFullYear()} Chronicle Publishing Co. All rights reserved.</p>
          <div className="flex gap-6">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>RSS Feed</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
