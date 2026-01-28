'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { assessmentApi } from '../lib/api';

interface Option {
  text: string;
}

interface Question {
  _id: string;
  questionText: string;
  options: Option[];
}

export default function AssessmentPage() {
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: number }>({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/auth/login');
          return;
        }

        console.log('Fetching assessment questions...');
        const response = await assessmentApi.getQuestions();
        console.log('Questions response:', response);
        
        if (response.success && response.data) {
          setQuestions(response.data);
        } else {
          throw new Error('No questions data received');
        }
      } catch (err: any) {
        console.error('Error fetching questions:', err);
        console.error('Error response:', err.response);
        
        if (err.response?.status === 401) {
          // Unauthorized - redirect to login
          localStorage.clear();
          router.push('/auth/login');
          return;
        }
        
        if (err.message?.includes('already submitted')) {
          setError('You have already completed this assessment. View your results on the dashboard.');
        } else if (err.response?.status === 404) {
          setError('No assessment questions available. Please contact administrator.');
        } else if (err.response?.data?.message) {
          setError(err.response.data.message);
        } else if (err.message) {
          setError(err.message);
        } else {
          setError('Failed to load questions. Please make sure you are logged in and the backend server is running.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [router]);

  const handleOptionSelect = (optionIndex: number) => {
    const currentQuestionId = questions[currentIndex]._id;
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestionId]: optionIndex
    });
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSubmit = async () => {
    // Check if all questions are answered
    const unanswered = questions.filter(q => selectedAnswers[q._id] === undefined);
    if (unanswered.length > 0) {
      alert(`Please answer all questions. ${unanswered.length} question(s) remaining.`);
      return;
    }

    setSubmitting(true);
    try {
      const answers = questions.map(q => ({
        questionId: q._id,
        selectedOptionIndex: selectedAnswers[q._id]
      }));

      console.log('Submitting assessment:', { answerCount: answers.length });
      const response = await assessmentApi.submitAssessment({ answers });
      console.log('Assessment response:', response);
      
      if (response.success) {
        // Redirect to results page
        router.push('/results');
      } else {
        throw new Error(response.message || 'Submission failed');
      }
    } catch (err: any) {
      console.error('Error submitting assessment:', err);
      const errorMessage = err.response?.data?.message || err.message || 'Failed to submit assessment. Please try again.';
      alert(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const currentQuestion = questions[currentIndex];
  const selectedOptionIndex = currentQuestion ? selectedAnswers[currentQuestion._id] : undefined;
  const progress = questions.length > 0 ? ((Object.keys(selectedAnswers).length / questions.length) * 100) : 0;
  const allAnswered = questions.length > 0 && Object.keys(selectedAnswers).length === questions.length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading assessment...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="text-red-600 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => router.push('/dashboard')}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-2 px-6 rounded-lg hover:shadow-lg transition"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">No questions available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Psychometric Assessment</h1>
          <p className="text-gray-600">Answer all questions honestly to get accurate career recommendations</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Question {currentIndex + 1} of {questions.length}
            </span>
            <span className="text-sm font-medium text-gray-700">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-gradient-to-r from-blue-600 to-purple-600 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            {currentQuestion.questionText}
          </h2>

          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionSelect(index)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  selectedOptionIndex === index
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center">
                  <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                    selectedOptionIndex === index
                      ? 'border-blue-600 bg-blue-600'
                      : 'border-gray-300'
                  }`}>
                    {selectedOptionIndex === index && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                  <span className={`text-base ${
                    selectedOptionIndex === index ? 'font-medium text-blue-900' : 'text-gray-700'
                  }`}>
                    {option.text}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              currentIndex === 0
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50'
            }`}
          >
            Previous
          </button>

          <div className="text-sm text-gray-600">
            {Object.keys(selectedAnswers).length} / {questions.length} answered
          </div>

          {currentIndex < questions.length - 1 ? (
            <button
              onClick={handleNext}
              disabled={selectedOptionIndex === undefined}
              className={`px-6 py-2 rounded-lg font-semibold transition ${
                selectedOptionIndex === undefined
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg'
              }`}
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!allAnswered || submitting}
              className={`px-8 py-2 rounded-lg font-semibold transition ${
                !allAnswered || submitting
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:shadow-lg'
              }`}
            >
              {submitting ? 'Submitting...' : 'Submit Assessment'}
            </button>
          )}
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-200">
          <div className="flex items-start">
            <div className="text-blue-600 mr-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-1">Tips</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Answer honestly based on your preferences</li>
                <li>• There are no right or wrong answers</li>
                <li>• You can go back and change your answers</li>
                <li>• Submit only when all questions are answered</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
