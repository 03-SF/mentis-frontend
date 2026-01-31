import jsPDF from 'jspdf';
import 'jspdf-autotable';

// Extend jsPDF types
declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
    lastAutoTable: {
      finalY: number;
    };
  }
}

// Brand colors
const COLORS = {
  primary: '#14b8a6', // teal-500
  secondary: '#06b6d4', // cyan-500
  dark: '#0f172a', // slate-900
  text: '#334155', // slate-700
  lightBg: '#f1f5f9' // slate-100
};

// Add header to PDF
const addHeader = (doc: jsPDF, title: string) => {
  // Logo/Brand area
  doc.setFillColor(COLORS.primary);
  doc.rect(0, 0, 210, 35, 'F');
  
  // Brand text
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('MENTIS', 20, 20);
  
  // Document title
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text('Career Guidance Platform', 20, 28);
  
  // Title
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(COLORS.dark);
  doc.text(title, 20, 50);
  
  // Line separator
  doc.setDrawColor(COLORS.primary);
  doc.setLineWidth(0.5);
  doc.line(20, 55, 190, 55);
  
  return 60; // Return Y position after header
};

// Add footer to PDF
const addFooter = (doc: jsPDF, pageNumber: number, totalPages: number) => {
  const pageHeight = doc.internal.pageSize.height;
  
  doc.setFillColor(COLORS.lightBg);
  doc.rect(0, pageHeight - 20, 210, 20, 'F');
  
  doc.setFontSize(9);
  doc.setTextColor(COLORS.text);
  doc.text(
    `Page ${pageNumber} of ${totalPages}`,
    105,
    pageHeight - 10,
    { align: 'center' }
  );
  
  doc.text('Powered by MENTISERA | mentisera.pk', 105, pageHeight - 5, {
    align: 'center'
  });
};

// Generate Roadmap PDF
export const generateRoadmapPDF = () => {
  const doc = new jsPDF();
  let yPos = addHeader(doc, 'Product Roadmap');
  
  yPos += 10;
  doc.setFontSize(10);
  doc.setTextColor(COLORS.text);
  doc.text('Our journey from MVP to a comprehensive career guidance ecosystem', 20, yPos);
  yPos += 15;
  
  const phases = [
    {
      title: 'MVP Launch (Q4 2025) - ✓ Completed',
      features: [
        'Psychometric assessment engine',
        'User authentication & profiles',
        'Basic career recommendations',
        'Admin dashboard',
        'Student dashboard'
      ]
    },
    {
      title: 'Enhanced Intelligence (Q1 2026) - ⏳ In Progress',
      features: [
        'AI-powered career matching',
        'Learning path recommendations',
        'Skill gap analysis',
        'Personalized career roadmaps',
        'Email notifications'
      ]
    },
    {
      title: 'Expanded Content (Q2 2026) - 📋 Planned',
      features: [
        'Video tutorials & resources',
        'Industry expert interviews',
        'Career mentorship matching',
        'Live webinar integration',
        'Resource library expansion'
      ]
    },
    {
      title: 'Advanced Analytics (Q3 2026) - 📋 Planned',
      features: [
        'Predictive career analytics',
        'Market trend integration',
        'Skills demand forecasting',
        'Success tracking & metrics',
        'Institutional reporting tools'
      ]
    },
    {
      title: 'Ecosystem Growth (Q4 2026) - 📋 Planned',
      features: [
        'University partnership portal',
        'Employer connection platform',
        'Scholarship opportunities',
        'Internship marketplace',
        'Mobile application launch'
      ]
    }
  ];
  
  phases.forEach((phase, index) => {
    if (yPos > 250) {
      doc.addPage();
      yPos = 20;
    }
    
    // Phase title
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(COLORS.primary);
    doc.text(phase.title, 20, yPos);
    yPos += 8;
    
    // Features
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(COLORS.text);
    phase.features.forEach(feature => {
      doc.text(`• ${feature}`, 25, yPos);
      yPos += 6;
    });
    yPos += 5;
  });
  
  addFooter(doc, 1, 1);
  doc.save('MENTIS_Product_Roadmap.pdf');
};

// Generate How to Use PDF
export const generateHowToUsePDF = () => {
  const doc = new jsPDF();
  let yPos = addHeader(doc, 'How to Use MENTIS');
  
  yPos += 10;
  doc.setFontSize(10);
  doc.setTextColor(COLORS.text);
  doc.text('Your step-by-step guide to discovering the perfect career path', 20, yPos);
  yPos += 15;
  
  const steps = [
    {
      number: 1,
      title: 'Create Your Account',
      details: [
        'Visit the signup page and enter your details',
        'Choose a strong password for security',
        'Verify your email address',
        'Complete your student profile with education info'
      ]
    },
    {
      number: 2,
      title: 'Complete Assessment',
      details: [
        'Navigate to the Assessment section from your dashboard',
        'Answer all questions honestly - there are no wrong answers',
        'Take your time - the assessment takes 15-20 minutes',
        'Questions cover aptitude, personality, and interests'
      ]
    },
    {
      number: 3,
      title: 'Review Your Results',
      details: [
        'View your detailed assessment results',
        'Explore career matches based on your strengths',
        'See percentage compatibility for each career',
        'Understand your personality profile and aptitudes'
      ]
    },
    {
      number: 4,
      title: 'Explore Learning Paths',
      details: [
        'Browse recommended learning paths for your career goals',
        'Access curated courses, tutorials, and resources',
        'Track your progress and skill development',
        'Get certificates upon completion'
      ]
    },
    {
      number: 5,
      title: 'Plan Your Journey',
      details: [
        'Set short-term and long-term career goals',
        'Identify skill gaps and development areas',
        'Access mentorship opportunities',
        'Connect with universities and employers'
      ]
    }
  ];
  
  steps.forEach((step, index) => {
    if (yPos > 240) {
      doc.addPage();
      yPos = 20;
    }
    
    // Step number and title
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(COLORS.primary);
    doc.text(`Step ${step.number}: ${step.title}`, 20, yPos);
    yPos += 8;
    
    // Details
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(COLORS.text);
    step.details.forEach(detail => {
      const lines = doc.splitTextToSize(detail, 165);
      lines.forEach((line: string) => {
        doc.text(`→ ${line}`, 25, yPos);
        yPos += 6;
      });
    });
    yPos += 5;
  });
  
  addFooter(doc, 1, 1);
  doc.save('MENTIS_How_To_Use_Guide.pdf');
};

// Generate Career Paths PDF
export const generateCareerPathsPDF = () => {
  const doc = new jsPDF();
  let yPos = addHeader(doc, 'Career Paths Explorer');
  
  yPos += 10;
  doc.setFontSize(10);
  doc.setTextColor(COLORS.text);
  doc.text('Discover how your skills translate into careers and progression pathways', 20, yPos);
  yPos += 15;
  
  const careerPaths = [
    { skill: 'Analytical Thinking', role: 'Data Scientist', path: 'Statistics → Machine Learning → AI Research' },
    { skill: 'Analytical Thinking', role: 'Financial Analyst', path: 'Accounting → Senior Analyst → Portfolio Manager' },
    { skill: 'Creative Problem Solving', role: 'Software Engineer', path: 'Junior Developer → Senior Engineer → Tech Lead' },
    { skill: 'Creative Problem Solving', role: 'Product Designer', path: 'UI Designer → UX Designer → Design Lead' },
    { skill: 'Communication & Leadership', role: 'Marketing Manager', path: 'Marketing Coordinator → Brand Manager → CMO' },
    { skill: 'Communication & Leadership', role: 'Project Manager', path: 'Coordinator → PM → Senior PM → Director' },
    { skill: 'Scientific Reasoning', role: 'Research Scientist', path: 'Lab Assistant → Researcher → Principal Investigator' },
    { skill: 'Scientific Reasoning', role: 'Healthcare Professional', path: 'Medical Student → Resident → Specialist' },
    { skill: 'Artistic Expression', role: 'Content Creator', path: 'Freelancer → Influencer → Brand Partner' },
    { skill: 'Artistic Expression', role: 'Game Designer', path: 'Level Designer → Game Designer → Creative Director' },
    { skill: 'Social Intelligence', role: 'HR Manager', path: 'HR Coordinator → HR Manager → CHRO' },
    { skill: 'Social Intelligence', role: 'Counselor/Therapist', path: 'Counselor → Licensed Therapist → Clinical Director' }
  ];
  
  let currentSkill = '';
  careerPaths.forEach((path, index) => {
    if (yPos > 250) {
      doc.addPage();
      yPos = 20;
    }
    
    // Skill header (only when it changes)
    if (path.skill !== currentSkill) {
      currentSkill = path.skill;
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.setFillColor(COLORS.primary);
      doc.setTextColor(255, 255, 255);
      doc.rect(20, yPos - 5, 170, 8, 'F');
      doc.text(path.skill, 23, yPos);
      yPos += 10;
    }
    
    // Role
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(COLORS.secondary);
    doc.text(path.role, 25, yPos);
    yPos += 6;
    
    // Path
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(COLORS.text);
    const pathLines = doc.splitTextToSize(`→ ${path.path}`, 165);
    pathLines.forEach((line: string) => {
      doc.text(line, 30, yPos);
      yPos += 5;
    });
    yPos += 3;
  });
  
  addFooter(doc, 1, 1);
  doc.save('MENTIS_Career_Paths.pdf');
};

// Generate Privacy Policy PDF
export const generatePrivacyPolicyPDF = () => {
  const doc = new jsPDF();
  let yPos = addHeader(doc, 'Privacy Policy');
  
  yPos += 5;
  doc.setFontSize(9);
  doc.setTextColor(COLORS.text);
  doc.text('Last Updated: January 31, 2026', 20, yPos);
  yPos += 10;
  
  const sections = [
    {
      title: '1. Introduction',
      content: 'We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our career guidance and psychometric assessment platform.'
    },
    {
      title: '2. Information We Collect',
      content: 'We collect personal information (name, email, password), assessment data (responses, results, recommendations), and automatically collected information (device info, IP address, usage data, cookies).'
    },
    {
      title: '3. How We Use Your Information',
      content: 'We use your information to provide career guidance services, process assessments, manage your account, send updates, improve our platform, analyze trends, detect fraud, and comply with legal obligations.'
    },
    {
      title: '4. Data Sharing',
      content: 'We do not sell your personal information. We may share data with educational institutions (with consent), service providers, and when legally required.'
    },
    {
      title: '5. Data Security',
      content: 'We implement encryption, regular security audits, access controls, and secure backups to protect your data.'
    },
    {
      title: '6. Your Rights',
      content: 'You have the right to access, correct, delete, and port your data. You can opt-out of marketing and object to processing. Contact privacy@mentisera.pk to exercise these rights.'
    },
    {
      title: '7. Contact Us',
      content: 'Email: privacy@mentisera.pk | Phone: +92 300 123 4567 | Address: Lahore, Pakistan'
    }
  ];
  
  sections.forEach((section, index) => {
    if (yPos > 250) {
      doc.addPage();
      yPos = 20;
    }
    
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(COLORS.primary);
    doc.text(section.title, 20, yPos);
    yPos += 7;
    
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(COLORS.text);
    const lines = doc.splitTextToSize(section.content, 170);
    lines.forEach((line: string) => {
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }
      doc.text(line, 20, yPos);
      yPos += 5;
    });
    yPos += 5;
  });
  
  addFooter(doc, 1, 1);
  doc.save('MENTIS_Privacy_Policy.pdf');
};

// Generate Terms & Conditions PDF
export const generateTermsAndConditionsPDF = () => {
  const doc = new jsPDF();
  let yPos = addHeader(doc, 'Terms & Conditions');
  
  yPos += 5;
  doc.setFontSize(9);
  doc.setTextColor(COLORS.text);
  doc.text('Last Updated: January 31, 2026', 20, yPos);
  yPos += 10;
  
  const sections = [
    {
      title: '1. Agreement to Terms',
      content: 'By accessing or using MENTIS, you agree to be bound by these Terms and Conditions. If you disagree with any part, you may not access the Service.'
    },
    {
      title: '2. Use License',
      content: 'Permission is granted for personal, non-commercial use. You may not modify, copy for commercial purposes, reverse engineer software, remove copyright notices, or transfer materials to another server.'
    },
    {
      title: '3. User Accounts',
      content: 'You must provide accurate registration information, safeguard your password, and notify us of unauthorized access. We may terminate accounts for Terms violations.'
    },
    {
      title: '4. Acceptable Use',
      content: 'You agree not to violate laws, infringe rights, transmit harmful code, gain unauthorized access, impersonate others, harass users, interfere with services, or collect personal information without consent.'
    },
    {
      title: '5. Assessment Services',
      content: 'Our assessments are for guidance only and do not constitute professional counseling. Results vary based on individual circumstances and honesty of responses.'
    },
    {
      title: '6. Intellectual Property',
      content: 'The Service and its content are owned by MENTIS and protected by intellectual property laws. Assessment methodologies and algorithms are proprietary.'
    },
    {
      title: '7. Disclaimer',
      content: 'The Service is provided "AS IS" without warranties of merchantability, fitness for purpose, accuracy, or uninterrupted service.'
    },
    {
      title: '8. Limitation of Liability',
      content: 'MENTIS shall not be liable for indirect, incidental, special, consequential, or punitive damages arising from your use of the Service.'
    },
    {
      title: '9. Governing Law',
      content: 'These Terms are governed by the laws of Pakistan. Disputes are subject to the exclusive jurisdiction of Lahore courts.'
    },
    {
      title: '10. Contact',
      content: 'Email: legal@mentisera.pk | Phone: +92 300 123 4567 | Address: Lahore, Pakistan'
    }
  ];
  
  let pageNum = 1;
  sections.forEach((section, index) => {
    if (yPos > 250) {
      addFooter(doc, pageNum, 2);
      doc.addPage();
      pageNum++;
      yPos = 20;
    }
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(COLORS.primary);
    doc.text(section.title, 20, yPos);
    yPos += 7;
    
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(COLORS.text);
    const lines = doc.splitTextToSize(section.content, 170);
    lines.forEach((line: string) => {
      if (yPos > 270) {
        addFooter(doc, pageNum, 2);
        doc.addPage();
        pageNum++;
        yPos = 20;
      }
      doc.text(line, 20, yPos);
      yPos += 5;
    });
    yPos += 5;
  });
  
  addFooter(doc, pageNum, 2);
  doc.save('MENTIS_Terms_And_Conditions.pdf');
};
