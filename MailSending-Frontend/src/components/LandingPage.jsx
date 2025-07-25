import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Mail,
  Send,
  Shield,
  Clock,
  CheckCircle,
  Users,
  Lock,
  Settings,
  Globe,
  ChevronDown,
  ChevronUp,
  Zap,
  MessageSquare,
  UserPlus
} from 'lucide-react';

const AnimatedCard = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div className={`transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
      {children}
    </div>
  );
};

const FAQItem = ({ question, answer, isOpen, onClick }) => (
  <div className="border border-gray-200 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg">
    <button
      onClick={onClick}
      className="w-full flex justify-between items-center text-left"
    >
      <h3 className="font-semibold text-gray-900">{question}</h3>
      {isOpen ? <ChevronUp className="w-5 h-5 text-gray-500" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
    </button>
    <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 mt-4' : 'max-h-0'}`}>
      <p className="text-gray-600 leading-relaxed">{answer}</p>
    </div>
  </div>
);

export default function BulkEmailLanding() {
  const [openFAQ, setOpenFAQ] = useState(null);

  const features = [
    {
      icon: <Send className="w-8 h-8 text-blue-600" />,
      title: "Send unlimited emails at once",
      description: "No restrictions on batch size - send to hundreds or thousands of recipients simultaneously."
    },
    {
      icon: <Clock className="w-8 h-8 text-green-600" />,
      title: "Quick setup – no coding, no complex steps",
      description: "Get started in seconds with our intuitive interface. No technical knowledge required."
    },
    {
      icon: <Shield className="w-8 h-8 text-purple-600" />,
      title: "Secure: We never store your messages",
      description: "Your privacy is our priority. All data is processed securely without permanent storage."
    },
    {
      icon: <MessageSquare className="w-8 h-8 text-orange-600" />,
      title: "Personalize subject and message with ease",
      description: "Customize your emails with dynamic content and personalized messaging options."
    }
  ];

  const steps = [
    {
      icon: <Mail className="w-12 h-12 text-blue-600" />,
      title: "Enter your email and message",
      description: "Compose your message and set the sender details"
    },
    {
      icon: <UserPlus className="w-12 h-12 text-green-600" />,
      title: "Paste recipient emails",
      description: "Add your recipient list - comma separated or line by line"
    },
    {
      icon: <Zap className="w-12 h-12 text-purple-600" />,
      title: "Click Send — done!",
      description: "Hit send and watch your emails deliver instantly"
    }
  ];

  const trustBadges = [
    { icon: <Lock className="w-6 h-6" />, text: "Privacy-first architecture" },
    { icon: <Settings className="w-6 h-6" />, text: "Powered by modern stack" },
    { icon: <Globe className="w-6 h-6" />, text: "Used by educators, NGOs, startups" }
  ];

  const faqs = [
    {
      question: "Can I send attachments?",
      answer: "Currently, our service focuses on text-based emails for optimal delivery rates. We're working on adding attachment support in future updates."
    },
    {
      question: "Is there a daily limit?",
      answer: "Free tier users can send up to 25 emails per day. Premium users have higher limits based on their subscription plan."
    },
    {
      question: "Are the emails sent from my email or yours?",
      answer: "Emails are sent through our secure servers but appear to come from your specified sender address for authenticity."
    },
    {
      question: "Do you store my data?",
      answer: "No, we prioritize your privacy. Email content and recipient lists are not stored on our servers after delivery."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Hero Section */}
      <section className="relative px-6 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto text-center">
          <AnimatedCard>
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Zap className="w-4 h-4" />
                Lightning Fast Email Delivery
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                Send Bulk Emails
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> with Ease</span>
              </h1>
              <p className="text-xl lg:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                The fastest way to deliver notes, messages, or updates to hundreds — instantly.
              </p>
              <div className="flex flex-col space-y-4">
                <Link to="/dashboard">
                  <button
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 inline-flex items-center gap-2"
                  >
                    Start Sending Emails
                    <Send className="w-5 h-5" />
                  </button>
                </Link>
                <Link to="/login">
  <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg px-8 py-4 rounded-2xl inline-flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-2xl hover:scale-105">
    Login
  </button>
</Link>

              </div>


            </div>
          </AnimatedCard>

          {/* Hero Visual */}
          <AnimatedCard delay={200}>
            <div className="relative mt-16">
              <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                  <div className="bg-blue-50 rounded-2xl p-6 text-center">
                    <Mail className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                    <div className="text-sm text-gray-600">Compose</div>
                  </div>
                  <div className="flex justify-center">
                    <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
                  </div>
                  <div className="bg-purple-50 rounded-2xl p-6 text-center">
                    <Users className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                    <div className="text-sm text-gray-600">Delivered</div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedCard>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <AnimatedCard>
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Why Choose Our Platform?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Built for simplicity, powered by cutting-edge technology
              </p>
            </div>
          </AnimatedCard>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <AnimatedCard key={index} delay={index * 100}>
                <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 border border-white/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  <div className="mb-6">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-6 py-20 bg-white/30">
        <div className="max-w-7xl mx-auto">
          <AnimatedCard>
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                How It Works
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-4">
                Get started in 3 simple steps
              </p>
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
                <Clock className="w-4 h-4" />
                Takes less than 30 seconds
              </div>
            </div>
          </AnimatedCard>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <AnimatedCard key={index} delay={index * 150}>
                <div className="text-center">
                  <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 border border-white/20 hover:shadow-2xl transition-all duration-300 mb-6">
                    <div className="mb-6">
                      {step.icon}
                    </div>
                    <div className="text-sm font-semibold text-gray-500 mb-2">
                      STEP {index + 1}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      {step.title}
                    </h3>
                    <p className="text-gray-600">
                      {step.description}
                    </p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2">
                      <div className="w-8 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
                    </div>
                  )}
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <AnimatedCard>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Why Trust Us?
              </h2>
              <div className="flex flex-wrap justify-center gap-8">
                {trustBadges.map((badge, index) => (
                  <div key={index} className="flex items-center gap-3 bg-white/70 backdrop-blur-xl rounded-2xl px-6 py-4 border border-white/20">
                    <div className="text-blue-600">
                      {badge.icon}
                    </div>
                    <span className="font-medium text-gray-900">{badge.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedCard>
        </div>
      </section>

      {/* Pricing */}
      <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <AnimatedCard>
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Simple, Transparent Pricing
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Start free, scale as you grow
              </p>
            </div>
          </AnimatedCard>

          <div className="max-w-2xl mx-auto">
            <AnimatedCard delay={200}>
              <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                    <CheckCircle className="w-4 h-4" />
                    Free Tier Available
                  </div>

                  <div className="bg-green-50 rounded-2xl p-6 mb-8">
                    <div className="text-3xl font-bold text-green-600 mb-2">25 emails free</div>
                    <div className="text-green-700">No credit card required</div>
                  </div>
                  <Link to="/dashboard">
                    <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300">
                      Start Free Trial
                    </button></Link>
                </div>
              </div>
            </AnimatedCard>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-20 bg-white/30">
        <div className="max-w-4xl mx-auto">
          <AnimatedCard>
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-gray-600">
                Everything you need to know about our service
              </p>
            </div>
          </AnimatedCard>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <AnimatedCard key={index} delay={index * 100}>
                <FAQItem
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openFAQ === index}
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                />
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>


    </div>
  );
}