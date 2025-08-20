import { Star } from 'lucide-react';
import Card from './Card';

interface TestimonialCardProps {
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar: string;
}

export default function TestimonialCard({
  name,
  role,
  company,
  content,
  rating,
  avatar,
}: TestimonialCardProps) {
  return (
    <Card className="p-6 h-full">
      <div className="flex items-center mb-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            className={`w-5 h-5 ${
              index < rating
                ? 'text-yellow-400 fill-current'
                : 'text-gray-300 dark:text-gray-600'
            }`}
          />
        ))}
      </div>
      
      <blockquote className="text-gray-700 dark:text-gray-300 mb-6 italic">
        "{content}"
      </blockquote>
      
      <div className="flex items-center">
        <img
          src={avatar}
          alt={name}
          className="w-12 h-12 rounded-full object-cover mr-4"
        />
        <div>
          <div className="font-semibold text-gray-900 dark:text-white">
            {name}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {role} at {company}
          </div>
        </div>
      </div>
    </Card>
  );
}
