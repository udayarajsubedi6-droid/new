
import { Link, useRouteError } from 'react-router-dom';
import { AlertCircle, Home } from 'lucide-react';

export default function ErrorPage() {
  const error = useRouteError() as any;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertCircle size={40} className="text-red-600" />
        </div>
        
        <h1 className="font-heading text-4xl font-bold text-foreground mb-4">
          Oops! Something went wrong
        </h1>
        
        <p className="font-paragraph text-base text-secondary mb-2">
          {error?.statusText || error?.message || 'An unexpected error occurred'}
        </p>
        
        {error?.status && (
          <p className="font-paragraph text-sm text-secondary/60 mb-8">
            Error Code: {error.status}
          </p>
        )}
        
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          <Home size={20} />
          Back to Home
        </Link>
      </div>
    </div>
  );
}