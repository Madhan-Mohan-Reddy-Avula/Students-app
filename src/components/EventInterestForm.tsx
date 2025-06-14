
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { X, User, Mail, MessageSquare, Send, Music, Drama, Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface EventInterestFormProps {
  event: {
    id: string;
    title: string;
    event_date: string;
    start_time: string;
    location: string;
    category: string;
  };
  onClose: () => void;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  participationType?: string;
  skillLevel?: string;
  groupSize?: string;
}

interface OptionType {
  value: string;
  label: string;
  icon?: React.ComponentType<any>;
}

// Mock user data - in a real app, this would come from authentication/user context
const mockUserData = {
  name: 'John Smith',
  email: 'john.smith@email.com',
  phone: '+1 234 567 8900'
};

const EventInterestForm: React.FC<EventInterestFormProps> = ({ event, onClose }) => {
  const { toast } = useToast();
  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm<FormData>();

  // Auto-fill user data on component mount
  useEffect(() => {
    setValue('name', mockUserData.name);
    setValue('email', mockUserData.email);
    setValue('phone', mockUserData.phone);
  }, [setValue]);

  const participationType = watch('participationType');

  const onSubmit = (data: FormData) => {
    console.log('Form submitted:', { ...data, eventId: event.id });
    
    toast({
      title: "Interest Registered!",
      description: `Thank you for your interest in ${event.title}. We'll contact you soon.`,
    });
    
    reset();
    onClose();
  };

  const getCulturalOptions = (): OptionType[] => {
    if (event.category === 'Cultural') {
      return [
        { value: 'music', label: 'Music Performance', icon: Music },
        { value: 'dance', label: 'Dance Performance', icon: Drama },
        { value: 'script', label: 'Script/Drama', icon: Mic },
        { value: 'singing', label: 'Singing', icon: Music },
        { value: 'instrumental', label: 'Instrumental', icon: Music },
        { value: 'poetry', label: 'Poetry/Recitation', icon: Mic },
        { value: 'art', label: 'Art Display', icon: Drama }
      ];
    }
    return [];
  };

  const getSportsOptions = (): OptionType[] => {
    if (event.category === 'Sports') {
      return [
        { value: 'individual', label: 'Individual Events' },
        { value: 'team', label: 'Team Events' },
        { value: 'track', label: 'Track & Field' },
        { value: 'games', label: 'Indoor Games' }
      ];
    }
    return [];
  };

  const getAcademicOptions = (): OptionType[] => {
    if (event.category === 'Academic') {
      return [
        { value: 'presentation', label: 'Presentation' },
        { value: 'project', label: 'Project Display' },
        { value: 'competition', label: 'Competition' },
        { value: 'workshop', label: 'Workshop Attendance' }
      ];
    }
    return [];
  };

  const getEventSpecificOptions = (): OptionType[] => {
    return [...getCulturalOptions(), ...getSportsOptions(), ...getAcademicOptions()];
  };

  const eventOptions = getEventSpecificOptions();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                Express Interest
              </h2>
              <p className="text-sm text-gray-600">
                {event.title}
              </p>
              <p className="text-xs text-gray-500">
                {new Date(event.event_date).toLocaleDateString()} at {event.start_time}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <User className="w-4 h-4 inline mr-1" />
                Full Name
              </label>
              <Input
                {...register('name', { required: 'Name is required' })}
                placeholder="Enter your full name"
                className={errors.name ? 'border-red-500' : ''}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Mail className="w-4 h-4 inline mr-1" />
                Email Address
              </label>
              <Input
                type="email"
                {...register('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'Please enter a valid email'
                  }
                })}
                placeholder="Enter your email"
                className={errors.email ? 'border-red-500' : ''}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <Input
                {...register('phone', { required: 'Phone number is required' })}
                placeholder="Enter your phone number"
                className={errors.phone ? 'border-red-500' : ''}
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
              )}
            </div>

            {/* Event-specific participation options */}
            {eventOptions.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Participation Type
                </label>
                <Select onValueChange={(value) => setValue('participationType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select participation type" />
                  </SelectTrigger>
                  <SelectContent>
                    {eventOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex items-center space-x-2">
                          {option.icon && <option.icon className="w-4 h-4" />}
                          <span>{option.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Additional options based on participation type */}
            {participationType && event.category === 'Cultural' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Experience Level
                </label>
                <Select onValueChange={(value) => setValue('skillLevel', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                    <SelectItem value="professional">Professional</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {participationType && ['music', 'dance', 'script'].includes(participationType) && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Group Size
                </label>
                <Select onValueChange={(value) => setValue('groupSize', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Are you participating solo or in a group?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="solo">Solo Performance</SelectItem>
                    <SelectItem value="duo">Duo (2 people)</SelectItem>
                    <SelectItem value="small">Small Group (3-5 people)</SelectItem>
                    <SelectItem value="large">Large Group (6+ people)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <MessageSquare className="w-4 h-4 inline mr-1" />
                Additional Message (Optional)
              </label>
              <Textarea
                {...register('message')}
                placeholder="Any questions or additional information..."
                rows={3}
                className="resize-none"
              />
            </div>

            <div className="flex space-x-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-purple-600 hover:bg-purple-700"
              >
                <Send className="w-4 h-4 mr-2" />
                Submit Interest
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EventInterestForm;
