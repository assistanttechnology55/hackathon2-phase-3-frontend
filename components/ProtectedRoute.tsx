// frontend/components/ProtectedRoute.tsx

'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authLib } from '../lib/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectPath?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  redirectPath = '/login' 
}) => {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const session = await authLib.getSession();
        if (session) {
          setIsAuthorized(true);
        } else {
          setIsAuthorized(false);
          router.push(redirectPath);
        }
      } catch (error) {
        console.error('Authentication check failed:', error);
        setIsAuthorized(false);
        router.push(redirectPath);
      }
    };

    checkAuth();
  }, [redirectPath, router]);

  if (isAuthorized === null) {
    // Loading state while checking authentication
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Checking authentication...</p>
      </div>
    );
  }

  if (isAuthorized) {
    return <>{children}</>;
  }

  // If not authorized, we already redirected above
  return null;
};

export default ProtectedRoute;