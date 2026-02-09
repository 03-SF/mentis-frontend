'use client';

import { useRouter } from 'next/navigation';
import Footer from '@/components/Footer';

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  linkedin?: string;
  email?: string;
}

const teamMembers: TeamMember[] = [
  {
    name: 'Saba Noor',
    role: 'CEO & Founder',
    bio: 'Visionary leader with a passion for transforming career guidance through innovative technology and data-driven insights.',
    image: 'https://ui-avatars.com/api/?name=Saba+Noor&background=14b8a6&color=fff&size=200',
    linkedin: 'https://linkedin.com',
    email: 'saba@mentisera.pk'
  },
  {
    name: 'Shahid Hussain Soomro',
    role: 'Co-Founder & Execution Owner',
    bio: 'Strategic operations expert focused on delivering high-quality educational solutions and ensuring seamless execution.',
    image: 'https://ui-avatars.com/api/?name=Shahid+Soomro&background=06b6d4&color=fff&size=200',
    linkedin: 'https://linkedin.com',
    email: 'shahid@mentisera.pk'
  },
  {
    name: 'Sumrun Fatima',
    role: 'Lead Developer',
    bio: 'Full-stack developer specializing in scalable platforms and AI-powered career recommendation systems.',
    image: 'https://ui-avatars.com/api/?name=Sumrun+Fatima&background=14b8a6&color=fff&size=200',
    linkedin: 'https://linkedin.com',
    email: 'sumrun@mentisera.pk'
  },
  {
    name: 'Maheen Razzaq',
    role: 'Deputy Supervisor',
    bio: 'Experienced project coordinator ensuring quality oversight and effective team collaboration across all initiatives.',
    image: 'https://ui-avatars.com/api/?name=Maheen+Razzaq&background=06b6d4&color=fff&size=200',
    linkedin: 'https://linkedin.com',
    email: 'maheen@mentisera.pk'
  }
];

export default function TeamPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center mb-16">
            <button
              onClick={() => router.back()}
              className="inline-flex items-center text-teal-400 hover:text-teal-300 mb-8 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back
            </button>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
                Meet Our Team
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              A diverse group of passionate professionals dedicated to empowering students with data-driven career guidance
            </p>
          </div>
        </div>
      </div>

      {/* Team Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="group bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 hover:border-teal-500/50 transition-all duration-300 hover:scale-105"
            >
              {/* Profile Image */}
              <div className="relative mb-6">
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden ring-4 ring-teal-500/20 group-hover:ring-teal-500/50 transition-all">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-xs px-4 py-1 rounded-full font-semibold">
                  {member.role.split(' ')[0]}
                </div>
              </div>

              {/* Member Info */}
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-2">{member.name}</h3>
                <p className="text-teal-400 font-medium mb-4">{member.role}</p>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
