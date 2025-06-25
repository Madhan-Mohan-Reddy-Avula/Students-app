// src/pages/Login.tsx
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

const Login = () => {
  const [rollNumber, setRollNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem('currentUser');
    if (stored) navigate('/');
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const trimmedRollNumber = rollNumber.trim().toUpperCase();

    try {
      const { data: profiles, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('roll_number', trimmedRollNumber);

      if (error) {
        toast.error('Database error');
        setIsLoading(false);
        return;
      }

      if (!profiles || profiles.length === 0) {
        toast.error('Invalid roll number');
        setIsLoading(false);
        return;
      }

      const profile = profiles[0];
      localStorage.setItem('currentUser', JSON.stringify(profile));
      toast.success(`Welcome ${profile.name}`);
      navigate('/');
    } catch (err) {
      toast.error('Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 to-cream-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md card-3d">
        <CardHeader className="text-center pb-8">
          <div className="flex justify-center mb-6">
            <img 
              src="/lovable-uploads/82ee4e3c-1177-441b-a939-b23f4a9f3496.png" 
              alt="Students App Logo" 
              className="w-20 h-20 object-contain"
            />
          </div>
          <h1 className="text-3xl font-bold gradient-text mb-2">Students App</h1>
          <p className="text-gray-600">Enter your roll number to sign in</p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="rollNumber">Roll Number</Label>
              <Input
                id="rollNumber"
                type="text"
                placeholder="e.g., CS2023001"
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value)}
                required
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white"
            >
              {isLoading ? 'Signing in...' : 'Login'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
