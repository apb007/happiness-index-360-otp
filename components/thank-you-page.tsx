import React from 'react';
import { CheckCircle, Heart, Phone, ArrowRight } from 'lucide-react';

interface ThankYouPageProps {
  studentName?: string;
  showResults?: boolean;
  happinessScore?: number;
}

export default function ThankYouPage({ 
  studentName = "Student",
  showResults = false,
  happinessScore = 0 
}: ThankYouPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full border-4 border-green-200 mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Thank You for Your Participation!
          </h1>
          <p className="text-xl text-gray-600">
            Your responses have been submitted successfully.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-xl p-8 space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <ArrowRight className="w-6 h-6 text-teal-600" />
              What happens next?
            </h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-teal-600 rounded-full mt-2 flex-shrink-0" />
                <span>Your responses are <strong className="text-gray-900">100% anonymous</strong> and secure</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-teal-600 rounded-full mt-2 flex-shrink-0" />
                <span>Your teacher/counselor will receive aggregated insights to better support all students</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-teal-600 rounded-full mt-2 flex-shrink-0" />
                <span>Resources and support are available if you need them</span>
              </li>
            </ul>
          </div>

          {showResults && (
            <div className="bg-teal-50 border border-teal-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Your Happiness Index Score
              </h3>
              <div className="flex items-center gap-4">
                <div className="text-5xl font-bold text-teal-600">
                  {happinessScore}%
                </div>
                <p className="text-gray-600">
                  This score reflects your current wellbeing based on your responses.
                </p>
              </div>
            </div>
          )}

          <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Heart className="w-6 h-6 text-orange-600" />
              <h3 className="text-xl font-semibold text-gray-900">
                Need Support?
              </h3>
            </div>
            <p className="text-gray-700 mb-4">
              Taking this assessment shows strength and self-awareness. 
              If you are struggling, please know that help is available:
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-900">
                <Phone className="w-5 h-5 text-teal-600 flex-shrink-0" />
                <div>
                  <div className="font-semibold">School Counselor</div>
                  <div className="text-sm text-gray-600">Available during school hours - Visit the counseling office</div>
                </div>
              </div>
              <div className="flex items-center gap-3 text-gray-900">
                <Phone className="w-5 h-5 text-teal-600 flex-shrink-0" />
                <div>
                  <div className="font-semibold">Crisis Helpline</div>
                  <div className="text-sm text-gray-600">1-800-273-8255 (Available 24/7)</div>
                </div>
              </div>
              <div className="flex items-center gap-3 text-gray-900">
                <Phone className="w-5 h-5 text-teal-600 flex-shrink-0" />
                <div>
                  <div className="font-semibold">Trusted Adult</div>
                  <div className="text-sm text-gray-600">Talk to a parent, guardian, teacher, or mentor</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button 
              onClick={() => window.location.href = '/'}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Return to Home
            </button>
            {showResults && (
              <button 
                onClick={() => window.location.href = '/dashboard/student'}
                className="flex-1 bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                View Dashboard
              </button>
            )}
          </div>
        </div>

        <div className="text-center mt-8 text-sm text-gray-600">
          <p>Your mental health matters. Thank you for taking the time to check in with yourself.</p>
          <p className="mt-2">💙 MindWell - Modern School</p>
        </div>
      </div>
    </div>
  );
}
