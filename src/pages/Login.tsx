
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import usersData from '../data/users.json';

const Login = () => {
  const [rollNumber, setRollNumber] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempted with:', { rollNumber, password });
    
    // Check credentials against dummy data
    const user = usersData.users.find(
      u => u.rollNumber === rollNumber && u.password === password
    );

    if (user) {
      toast.success(`Welcome back, ${user.name}!`);
      console.log('Login successful for user:', user);
      
      // Store user data in localStorage for the session
      localStorage.setItem('currentUser', JSON.stringify(user));
      
      // Navigate to profile page
      navigate('/profile');
    } else {
      toast.error('Invalid roll number or password');
      console.log('Login failed: Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 to-cream-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md card-3d">
        <CardHeader className="text-center pb-8">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img 
              src="/lovable-uploads/82ee4e3c-1177-441b-a939-b23f4a9f3496.png" 
              alt="Students App Logo" 
              className="w-20 h-20 object-contain"
            />
          </div>
          
          {/* Title */}
          <h1 className="text-3xl font-bold gradient-text mb-2">
            Students App
          </h1>
          <p className="text-gray-600">
            Sign in to your account
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Roll Number Input */}
            <div className="space-y-2">
              <Label htmlFor="rollNumber" className="text-sm font-medium text-gray-700">
                Roll Number
              </Label>
              <Input
                id="rollNumber"
                type="text"
                placeholder="Enter your roll number"
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value)}
                required
                className="w-full"
              />
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full"
              />
            </div>

            {/* Login Button */}
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-medium py-2 px-4 rounded-md transition-all duration-200"
            >
              Login
            </Button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Demo Credentials:</h3>
            <div className="text-xs text-gray-600 space-y-1">
              <p><strong>Roll:</strong> CS001 | <strong>Pass:</strong> password123</p>
              <p><strong>Roll:</strong> ME002 | <strong>Pass:</strong> student456</p>
              <p><strong>Roll:</strong> IT004 | <strong>Pass:</strong> test123</p>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-6 text-sm text-gray-500">
            <p>© 2024 Students App - Empowering your educational journey</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
