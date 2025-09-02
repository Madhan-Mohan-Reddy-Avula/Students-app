import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from 'sonner';

const Login = () => {
  const [rollNumber, setRollNumber] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Check if student exists in profiles table
      const { data: profiles, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('roll_number', rollNumber)
        .maybeSingle();

      if (profileError) {
        throw profileError;
      }

      if (!profiles) {
        setError('Invalid roll number or password');
        return;
      }

      // For demo purposes, use roll number as password
      // In production, implement proper password hashing
      if (password !== rollNumber) {
        setError('Invalid roll number or password');
        return;
      }

      // Store user session in localStorage for demo
      localStorage.setItem('currentUser', JSON.stringify(profiles));
      localStorage.setItem('currentClassId', profiles.class_id || '');
      localStorage.setItem('isAuthenticated', 'true');

      toast.success('Login successful!');
      navigate('/');
    } catch (error: any) {
      console.error('Login error:', error);
      setError(error.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Student Login
          </CardTitle>
          <p className="text-muted-foreground">Enter your credentials to access the portal</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="rollNumber">Roll Number</Label>
              <Input
                id="rollNumber"
                type="text"
                placeholder="e.g., CS2021003"
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-700 font-medium mb-2">Demo Credentials:</p>
            <p className="text-xs text-blue-600">Roll Number: CS21A001</p>
            <p className="text-xs text-blue-600">Password: CS21A001</p>
            <p className="text-xs text-blue-600 mt-1 italic">Student: Alexandra Johnson</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;