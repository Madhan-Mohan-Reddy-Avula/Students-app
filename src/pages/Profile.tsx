
import React from 'react';
import NavigationHeader from '@/components/NavigationHeader';
import { User, Phone, Mail, MapPin, GraduationCap, Users, Shield, Heart, Calendar, BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Profile = () => {
  // Sample student data
  const studentData = {
    personalInfo: {
      fullName: "Rajesh Kumar",
      profilePhoto: "",
      gender: "Male",
      dateOfBirth: "15/03/2008",
      contactNumber: "+91 9876543210",
      parentContact: "+91 9876543211",
      email: "rajesh.kumar@email.com",
      parentEmail: "parent.kumar@email.com",
      bloodGroup: "B+",
      aadhaarNumber: "1234 5678 9012",
      studentId: "STU2024001"
    },
    addressDetails: {
      presentAddress: "123, MG Road, Bangalore",
      permanentAddress: "456, Village Road, Mysore",
      city: "Bangalore",
      state: "Karnataka",
      pincode: "560001",
      country: "India"
    },
    academicInfo: {
      admissionNumber: "ADM2024001",
      rollNumber: "24001",
      class: "10th Grade",
      section: "A",
      schoolName: "St. Xavier's High School",
      board: "CBSE",
      academicYear: "2024-25",
      mediumOfInstruction: "English"
    },
    parentDetails: {
      fatherName: "Suresh Kumar",
      fatherOccupation: "Software Engineer",
      motherName: "Priya Kumar",
      motherOccupation: "Teacher",
      guardianName: "Suresh Kumar",
      parentContact1: "+91 9876543211",
      parentContact2: "+91 9876543212",
      parentEmail1: "suresh.kumar@email.com",
      parentEmail2: "priya.kumar@email.com"
    },
    additionalInfo: {
      emergencyContact: "+91 9876543213",
      transportRoute: "Route 5 - MG Road",
      accommodationType: "Day Scholar",
      sportsPreferences: "Cricket, Basketball",
      extracurriculars: "Debate Club, Science Club",
      specialNeeds: "None",
      medicalHistory: "No significant medical history"
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 to-cream-100">
      <NavigationHeader title="Profile" subtitle="Student Information" />
      
      <div className="max-w-6xl mx-auto p-6">
        {/* Profile Header */}
        <div className="card-3d p-8 mb-8 animate-fade-in">
          <div className="flex items-center space-x-6">
            <Avatar className="w-24 h-24">
              <AvatarImage src={studentData.personalInfo.profilePhoto} />
              <AvatarFallback className="bg-gradient-to-br from-purple-500 to-purple-600 text-white text-2xl">
                {studentData.personalInfo.fullName.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                {studentData.personalInfo.fullName}
              </h2>
              <p className="text-purple-600 font-medium text-lg">
                {studentData.academicInfo.class} - Section {studentData.academicInfo.section}
              </p>
              <p className="text-gray-600">
                {studentData.academicInfo.schoolName}
              </p>
            </div>
          </div>
        </div>

        {/* Information Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Personal Information */}
          <InfoCard title="Personal Information" icon={User}>
            <div className="space-y-2">
              <InfoRow label="Full Name" value={studentData.personalInfo.fullName} />
              <InfoRow label="Gender" value={studentData.personalInfo.gender} />
              <InfoRow label="Date of Birth" value={studentData.personalInfo.dateOfBirth} />
              <InfoRow label="Contact Number" value={studentData.personalInfo.contactNumber} />
              <InfoRow label="Email ID" value={studentData.personalInfo.email} />
              <InfoRow label="Blood Group" value={studentData.personalInfo.bloodGroup} />
              <InfoRow label="Student ID" value={studentData.personalInfo.studentId} />
              <InfoRow label="Aadhaar Number" value={studentData.personalInfo.aadhaarNumber} />
            </div>
          </InfoCard>

          {/* Address Details */}
          <InfoCard title="Address Details" icon={MapPin}>
            <div className="space-y-2">
              <InfoRow label="Present Address" value={studentData.addressDetails.presentAddress} />
              <InfoRow label="Permanent Address" value={studentData.addressDetails.permanentAddress} />
              <InfoRow label="City" value={studentData.addressDetails.city} />
              <InfoRow label="State" value={studentData.addressDetails.state} />
              <InfoRow label="Pincode" value={studentData.addressDetails.pincode} />
              <InfoRow label="Country" value={studentData.addressDetails.country} />
            </div>
          </InfoCard>

          {/* Academic Information */}
          <InfoCard title="Academic Information" icon={GraduationCap}>
            <div className="space-y-2">
              <InfoRow label="Admission Number" value={studentData.academicInfo.admissionNumber} />
              <InfoRow label="Roll Number" value={studentData.academicInfo.rollNumber} />
              <InfoRow label="Class" value={studentData.academicInfo.class} />
              <InfoRow label="Section" value={studentData.academicInfo.section} />
              <InfoRow label="School Name" value={studentData.academicInfo.schoolName} />
              <InfoRow label="Board" value={studentData.academicInfo.board} />
              <InfoRow label="Academic Year" value={studentData.academicInfo.academicYear} />
              <InfoRow label="Medium" value={studentData.academicInfo.mediumOfInstruction} />
            </div>
          </InfoCard>

          {/* Parent/Guardian Details */}
          <InfoCard title="Parent/Guardian Details" icon={Users}>
            <div className="space-y-2">
              <InfoRow label="Father's Name" value={studentData.parentDetails.fatherName} />
              <InfoRow label="Father's Occupation" value={studentData.parentDetails.fatherOccupation} />
              <InfoRow label="Mother's Name" value={studentData.parentDetails.motherName} />
              <InfoRow label="Mother's Occupation" value={studentData.parentDetails.motherOccupation} />
              <InfoRow label="Guardian" value={studentData.parentDetails.guardianName} />
              <InfoRow label="Parent Contact 1" value={studentData.parentDetails.parentContact1} />
              <InfoRow label="Parent Contact 2" value={studentData.parentDetails.parentContact2} />
              <InfoRow label="Parent Email 1" value={studentData.parentDetails.parentEmail1} />
              <InfoRow label="Parent Email 2" value={studentData.parentDetails.parentEmail2} />
            </div>
          </InfoCard>

          {/* Additional Information */}
          <InfoCard title="Additional Information" icon={BookOpen}>
            <div className="space-y-2">
              <InfoRow label="Emergency Contact" value={studentData.additionalInfo.emergencyContact} />
              <InfoRow label="Transport Route" value={studentData.additionalInfo.transportRoute} />
              <InfoRow label="Accommodation" value={studentData.additionalInfo.accommodationType} />
              <InfoRow label="Sports Preferences" value={studentData.additionalInfo.sportsPreferences} />
              <InfoRow label="Extracurriculars" value={studentData.additionalInfo.extracurriculars} />
              <InfoRow label="Special Needs" value={studentData.additionalInfo.specialNeeds} />
            </div>
          </InfoCard>

          {/* Medical Information */}
          <InfoCard title="Medical Information" icon={Heart}>
            <div className="space-y-2">
              <InfoRow label="Blood Group" value={studentData.personalInfo.bloodGroup} />
              <InfoRow label="Medical History" value={studentData.additionalInfo.medicalHistory} />
              <InfoRow label="Emergency Contact" value={studentData.additionalInfo.emergencyContact} />
            </div>
          </InfoCard>
        </div>
      </div>
    </div>
  );
};

export default Profile;
