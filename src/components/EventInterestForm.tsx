
import React from 'react';
import { useForm } from 'react-hook-form';
import { X, User, Mail, MessageSquare, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface EventInterestFormProps {
  event: {
    id: number;
    title: string;
    date: string;
    time: string;
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
}

const EventInterestForm: React.FC<EventInterestFormProps> = ({ event, onClose }) => {
  const { toast } = useToast();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    // Simulate form submission
    console.log('Form submitted:', { ...data, eventId: event.id });
    
    toast({
      title: "Interest Registered!",
      description: `Thank you for your interest in ${event.title}. We'll contact you soon.`,
    });
    
    reset();
    onClose();
  };

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
                {new Date(event.date).toLocaleDateString()} at {event.time}
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
