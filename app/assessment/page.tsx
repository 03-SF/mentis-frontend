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
  const [showPreferencesModal, setShowPreferencesModal] = useState(false);
  const [preferences, setPreferences] = useState({
    comfortableWithPhysicalWork: null as boolean | null,
    wantsUniversityDegree: null as boolean | null,
    openToVocationalCareers: null as boolean | null
  });

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

    // Show preferences modal instead of submitting directly
    setShowPreferencesModal(true);
  };

  const handlePreferencesSubmit = async () => {
    // Check if all preferences are answered
    if (preferences.comfortableWithPhysicalWork === null || 
        preferences.wantsUniversityDegree === null || 
        preferences.openToVocationalCareers === null) {
      alert('Please answer all preference questions.');
      return;
    }

    setSubmitting(true);
    try {
      const answers = questions.map(q => ({
        questionId: q._id,
        selectedOptionIndex: selectedAnswers[q._id]
      }));

      console.log('Submitting assessment:', { answerCount: answers.length, preferences });
      const response = await assessmentApi.submitAssessment({ 
        answers,
        preferences
      });
      console.log('Assessment response:', response);
      
      if (response.success) {
        // Redirect to results page
        router.push('/results');
      } else {
        throw new Error(response.message || 'Submission failed');
      }
    } catch (err: unknown) {
      console.error('Error submitting assessment:', err);
      const error = err as { response?: { data?: { message?: string } }; message?: string };
      const errorMessage = error.response?.data?.message || error.message || 'Failed to submit assessment. Please try again.';
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
        {/* Gradient Header Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-2xl p-8 mb-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full -ml-24 -mb-24"></div>
          <div className="relative">
            <div className="flex items-center justify-center mb-4">
              <div className="p-4">
                <svg className="w-12 h-12 text-white" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
            </div>
            <h1 className="text-4xl font-bold text-center mb-2">Psychometric Assessment</h1>
            <p className="text-center text-blue-100">Answer honestly to discover your ideal career path</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8 bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between mb-3">
            <span className="text-sm font-semibold text-gray-700">
              Question {currentIndex + 1} of {questions.length}
            </span>
            <span className="text-sm font-semibold text-blue-600">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full transition-all duration-500 shadow-lg"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="mt-3 text-center">
            <span className="text-xs text-gray-600">
              {Object.keys(selectedAnswers).length} / {questions.length} answered
            </span>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6 border-2 border-transparent hover:border-blue-200 transition-all">
          <div className="flex items-start mb-6">
            <div className="bg-gradient-to-br from-blue-500 to-purple-500 text-white rounded-xl p-3 mr-4 font-bold text-lg min-w-[3rem] text-center">
              {currentIndex + 1}
            </div>
            <h2 className="text-xl font-semibold text-gray-800 leading-relaxed pt-2">
              {currentQuestion.questionText}
            </h2>
          </div>

          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionSelect(index)}
                className={`w-full text-left p-5 rounded-xl border-2 transition-all transform hover:scale-[1.02] ${
                  selectedOptionIndex === index
                    ? 'border-blue-600 bg-gradient-to-r from-blue-50 to-purple-50 shadow-lg'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50 hover:shadow-md'
                }`}
              >
                <div className="flex items-center">
                  <div className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center transition-all ${
                    selectedOptionIndex === index
                      ? 'border-blue-600 bg-gradient-to-br from-blue-600 to-purple-600'
                      : 'border-gray-300'
                  }`}>
                    {selectedOptionIndex === index && (
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className={`text-base ${
                    selectedOptionIndex === index ? 'font-semibold text-blue-900' : 'text-gray-700'
                  }`}>
                    {option.text}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className={`px-8 py-3 rounded-xl font-semibold transition-all transform ${
              currentIndex === 0
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50 hover:shadow-lg hover:scale-105'
            }`}
          >
            ← Previous
          </button>

          {currentIndex < questions.length - 1 ? (
            <button
              onClick={handleNext}
              disabled={selectedOptionIndex === undefined}
              className={`px-8 py-3 rounded-xl font-semibold transition-all transform ${
                selectedOptionIndex === undefined
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-xl hover:scale-105'
              }`}
            >
              Next →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!allAnswered || submitting}
              className={`px-10 py-3 rounded-xl font-semibold transition-all transform ${
                !allAnswered || submitting
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:shadow-xl hover:scale-105'
              }`}
            >
              {submitting ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </span>
              ) : '✓ Submit Assessment'}
            </button>
          )}
        </div>

        {/* Instructions */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border-2 border-blue-200 shadow-md">
          <div className="flex items-start">
            <div className="bg-gradient-to-br from-blue-500 to-purple-500 text-white p-3 rounded-xl mr-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h4 className="font-bold text-gray-800 mb-2 text-lg">Assessment Tips</h4>
              <ul className="text-sm text-gray-700 space-y-2">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  <span>Answer honestly based on your true preferences</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">✓</span>
                  <span>There are no right or wrong answers</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>You can navigate back and change your answers</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">✓</span>
                  <span>Submit only when all questions are answered</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* Preferences Modal */}
      {showPreferencesModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-2xl">
              <h2 className="text-2xl font-bold mb-2">A Few Quick Questions</h2>
              <p className="text-blue-100">Help us personalize your career recommendations</p>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Question 1 */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-5 border-2 border-blue-200">
                <h3 className="font-semibold text-gray-800 mb-4 text-lg">
                  Are you comfortable with physical outdoor work?
                </h3>
                <div className="flex gap-3">
                  <button
                    onClick={() => setPreferences({...preferences, comfortableWithPhysicalWork: true})}
                    className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
                      preferences.comfortableWithPhysicalWork === true
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg scale-105'
                        : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-green-500 hover:shadow-md'
                    }`}
                  >
                    ✓ Yes
                  </button>
                  <button
                    onClick={() => setPreferences({...preferences, comfortableWithPhysicalWork: false})}
                    className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
                      preferences.comfortableWithPhysicalWork === false
                        ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg scale-105'
                        : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-red-500 hover:shadow-md'
                    }`}
                  >
                    ✗ No
                  </button>
                </div>
              </div>

              {/* Question 2 */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-5 border-2 border-blue-200">
                <h3 className="font-semibold text-gray-800 mb-4 text-lg">
                  Do you want a university degree?
                </h3>
                <div className="flex gap-3">
                  <button
                    onClick={() => setPreferences({...preferences, wantsUniversityDegree: true})}
                    className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
                      preferences.wantsUniversityDegree === true
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg scale-105'
                        : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-green-500 hover:shadow-md'
                    }`}
                  >
                    ✓ Yes
                  </button>
                  <button
                    onClick={() => setPreferences({...preferences, wantsUniversityDegree: false})}
                    className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
                      preferences.wantsUniversityDegree === false
                        ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg scale-105'
                        : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-red-500 hover:shadow-md'
                    }`}
                  >
                    ✗ No
                  </button>
                </div>
              </div>

              {/* Question 3 */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-5 border-2 border-blue-200">
                <h3 className="font-semibold text-gray-800 mb-4 text-lg">
                  Are you open to practical training programs (trade schools, diplomas) instead of university degrees?
                </h3>
                <div className="flex gap-3">
                  <button
                    onClick={() => setPreferences({...preferences, openToVocationalCareers: true})}
                    className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
                      preferences.openToVocationalCareers === true
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg scale-105'
                        : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-green-500 hover:shadow-md'
                    }`}
                  >
                    ✓ Yes
                  </button>
                  <button
                    onClick={() => setPreferences({...preferences, openToVocationalCareers: false})}
                    className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
                      preferences.openToVocationalCareers === false
                        ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg scale-105'
                        : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-red-500 hover:shadow-md'
                    }`}
                  >
                    ✗ No
                  </button>
                </div>
              </div>

              {/* Info Note */}
              <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-4">
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-yellow-600 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm text-yellow-800">
                    Your answers help us show careers that match your practical preferences. You can still explore all career options later.
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-gray-50 p-6 rounded-b-2xl flex justify-between gap-4">
              <button
                onClick={() => {
                  setShowPreferencesModal(false);
                  setPreferences({
                    comfortableWithPhysicalWork: null,
                    wantsUniversityDegree: null,
                    openToVocationalCareers: null
                  });
                }}
                className="px-6 py-3 bg-white text-gray-700 border-2 border-gray-300 rounded-xl font-semibold hover:bg-gray-100 hover:shadow-md transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handlePreferencesSubmit}
                disabled={
                  preferences.comfortableWithPhysicalWork === null ||
                  preferences.wantsUniversityDegree === null ||
                  preferences.openToVocationalCareers === null ||
                  submitting
                }
                className={`px-8 py-3 rounded-xl font-semibold transition-all transform ${
                  preferences.comfortableWithPhysicalWork === null ||
                  preferences.wantsUniversityDegree === null ||
                  preferences.openToVocationalCareers === null ||
                  submitting
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:shadow-xl hover:scale-105'
                }`}
              >
                {submitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </span>
                ) : 'Continue to Results →'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
