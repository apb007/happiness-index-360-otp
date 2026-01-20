import React from 'react';
import { Heart, Shield, TrendingUp } from 'lucide-react';

export default function StudentWelcome({ studentName = "Student" }) {
  return (
    <div className="bg-gradient-to-r from-teal-50 to-blue-50 border border-teal-200 rounded-lg p-6 mb-6 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="bg-teal-100 p-3 rounded-full flex-shrink-0">
          <Heart className="w-6 h-6 text-teal-600" />
        </div>
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Welcome, {studentName}! 👋
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            We are glad you are here. Your happiness matters, and taking out time to check that is a sign of awareness and strength.
          </p>
          
          <div className="grid md:grid-cols-3 gap-4">
            {/* 100% Anonymous */}
            <div className="bg-white p-5 rounded-lg border border-teal-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="w-5 h-5 text-teal-600" />
                <h3 className="font-semibold text-gray-900">100% Anonymous</h3>
              </div>
              <p className="text-sm text-gray-600">
                Your responses are private and secure. No one can identify you.
              </p>
            </div>
            
            {/* Track Progress */}
            <div className="bg-white p-5 rounded-lg border border-teal-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-5 h-5 text-teal-600" />
                <h3 className="font-semibold text-gray-900">Track Progress</h3>
              </div>
              <p className="text-sm text-gray-600">
                See how you're doing over time and celebrate improvements.
              </p>
            </div>
            
            {/* Get Support */}
            <div className="bg-white p-5 rounded-lg border border-teal-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 mb-3">
                <Heart className="w-5 h-5 text-teal-600" />
                <h3 className="font-semibold text-gray-900">Get Support</h3>
              </div>
              <p className="text-sm text-gray-600">
                Receive personalized resources based on your assessment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
