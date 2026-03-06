'use client';
    
     import React, { useEffect, useState } from 'react';
     import { useRouter } from 'next/navigation';
     import { auth } from '../lib/auth';
      
      interface ProtectedRouteProps {
      children: React.ReactNode;
       }
     
      export default function ProtectedRoute({ children }: ProtectedRouteProps) {
      const [isAuthenticated, setIsAuthenticated] = useState(false);
      const [loading, setLoading] = useState(true);
      const router = useRouter();
    
      useEffect(() => {
      const session = auth.getSession();
      if (!session) {
      router.push('/login');
       } else {
      setIsAuthenticated(true);
         }
      setLoading(false);
      }, [router]);
     
      if (loading) {
      return <div>Loading...</div>;
       }
     
       if (!isAuthenticated) {
          return null;
        }
     
        return <>{children}</>;
      }
