import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationHeader from '@/components/NavigationHeader';
import { User, Phone, Mail, MapPin, GraduationCap, Users, Shield, Heart, Calendar, BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface StudentProfile {
  id: string;
  roll_number: string;
  name: string;
  email: string;
  department: string;
  year: number;
  phone?: string;
  avatar_url?: string;
  class_id?: string;
  created_at: string;
  updated_at: string;
}

interface ClassInfo {
  id: string;
  name: string;
  section?: string;
  year: number;
}

const Profile = () => {
  const [studentData, setStudentData] = useState<StudentProfile | null>(null);
  const [classInfo, setClassInfo] = useState<ClassInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthAndFetchProfile();
  }, []);

  const checkAuthAndFetchProfile = async () => {
    try {
      // Check if user is authenticated
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        // No user is logged in, redirect to login page
        console.log('No authenticated user found, redirecting to login');
        navigate('/login');
        return;
      }

      setUser(session.user);
      console.log('Authenticated user found:', session.user);
      
      // Fetch user profile data
      await fetchStudentProfile();
      
    } catch (error) {
      console.error('Auth check error:', error);
      navigate('/login');
    }
  };

  const fetchStudentProfile = async () => {
    try {
      setLoading(true);
      
      // For demo purposes, we'll fetch the first profile
      // In a real app, this would be based on the authenticated user
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .limit(1)
        .single();

      if (profileError) {
        console.error('Error fetching profile:', profileError);
        toast.error('Failed to load profile data');
        return;
      }

      setStudentData(profile);

      // Fetch class information if class_id exists
      if (profile?.class_id) {
        const { data: classData, error: classError } = await supabase
          .from('classes')
          .select('*')
          .eq('id', profile.class_id)
          .single();

        if (!classError && classData) {
          setClassInfo(classData);
        }
      }

    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to load profile data');
    } finally {
      setLoading(false);
    }
  };

  const InfoCard = ({ title, icon: Icon, children }: { title: string; icon: any; children: React.ReactNode }) => (
    <Card className="card-3d animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-lg">
          <Icon className="w-5 h-5 text-purple-600" />
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );

  const InfoRow = ({ label, value }: { label: string; value: string }) => (
    <div className="flex justify-between py-2 border-b border-gray-100 last:border-b-0">
      <span className="text-gray-600 font-medium">{label}:</span>
      <span className="text-gray-800">{value}</span>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cream-50 to-cream-100">
        <NavigationHeader title="Profile" subtitle="Student Information" />
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading profile...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!studentData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cream-50 to-cream-100">
        <NavigationHeader title="Profile" subtitle="Student Information" />
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No profile found</h3>
          <p className="text-gray-600">Unable to load student profile data.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 to-cream-100">
      <NavigationHeader title="Profile" subtitle="Student Information" />
      
      <div className="max-w-6xl mx-auto p-6">
        {/* Profile Header */}
        <div className="card-3d p-8 mb-8 animate-fade-in">
          <div className="flex items-center space-x-6">
            <Avatar className="w-24 h-24">
              <AvatarImage src={studentData.avatar_url} />
              <AvatarFallback className="bg-gradient-to-br from-purple-500 to-purple-600 text-white text-2xl">
                {studentData.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                {studentData.name}
              </h2>
              <p className="text-purple-600 font-medium text-lg">
                {classInfo ? `${classInfo.name} - Section ${classInfo.section || 'A'}` : `Year ${studentData.year}`}
              </p>
              <p className="text-gray-600">
                {studentData.department} Department
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Roll Number: {studentData.roll_number}
              </p>
            </div>
          </div>
        </div>

        {/* Information Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Personal Information */}
          <InfoCard title="Personal Information" icon={User}>
            <div className="space-y-2">
              <InfoRow label="Full Name" value={studentData.name} />
              <InfoRow label="Roll Number" value={studentData.roll_number} />
              <InfoRow label="Email ID" value={studentData.email} />
              <InfoRow label="Phone Number" value={studentData.phone || 'Not provided'} />
              <InfoRow label="Department" value={studentData.department} />
              <InfoRow label="Year" value={studentData.year.toString()} />
              <InfoRow label="Student ID" value={studentData.id} />
            </div>
          </InfoCard>

          {/* Academic Information */}
          <InfoCard title="Academic Information" icon={GraduationCap}>
            <div className="space-y-2">
              <InfoRow label="Department" value={studentData.department} />
              <InfoRow label="Year" value={`Year ${studentData.year}`} />
              <InfoRow label="Class" value={classInfo?.name || 'Not assigned'} />
              <InfoRow label="Section" value={classInfo?.section || 'Not assigned'} />
              <InfoRow label="Roll Number" value={studentData.roll_number} />
              <InfoRow label="Student ID" value={studentData.id.substring(0, 8)} />
            </div>
          </InfoCard>

          {/* Contact Information */}
          <InfoCard title="Contact Information" icon={Phone}>
            <div className="space-y-2">
              <InfoRow label="Email Address" value={studentData.email} />
              <InfoRow label="Phone Number" value={studentData.phone || 'Not provided'} />
              <InfoRow label="Emergency Contact" value="Not available" />
            </div>
          </InfoCard>

          {/* Account Information */}
          <InfoCard title="Account Information" icon={Shield}>
            <div className="space-y-2">
              <InfoRow label="Account Created" value={new Date(studentData.created_at).toLocaleDateString()} />
              <InfoRow label="Last Updated" value={new Date(studentData.updated_at).toLocaleDateString()} />
              <InfoRow label="Profile Status" value="Active" />
            </div>
          </InfoCard>
        </div>
      </div>
    </div>
  );
};

export default Profile;
