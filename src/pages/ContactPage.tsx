import { useState, useEffect, FormEvent } from 'react';
import { Mail, Phone, MapPin, Send, Check } from 'lucide-react';
import toast from 'react-hot-toast';

const ContactPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  useEffect(() => {
    // Update title
    document.title = 'Contact Us | EventVista';
  }, []);
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !subject || !message) {
      toast.error('Please fill in all fields');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSubmitted(true);
      toast.success('Message sent successfully!');
      
      // Reset form
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
      
      // Reset submission status after a delay
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="pt-24 pb-16">
      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
            <p className="text-xl text-primary-100">
              We'd love to hear from you! Reach out with any questions or inquiries about our event management services.
            </p>
          </div>
        </div>
      </section>
      
      {/* Contact Info & Form */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary-50 dark:bg-primary-900/30 p-3 rounded-lg text-primary-500">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email Us</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-1">For general inquiries:</p>
                    <a 
                      href="mailto:info@eventvista.com" 
                      className="text-primary-500 hover:text-primary-600"
                    >
                      info@eventvista.com
                    </a>
                    <p className="text-gray-600 dark:text-gray-400 mt-2 mb-1">For support:</p>
                    <a 
                      href="mailto:support@eventvista.com" 
                      className="text-primary-500 hover:text-primary-600"
                    >
                      support@eventvista.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-primary-50 dark:bg-primary-900/30 p-3 rounded-lg text-primary-500">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Call Us</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-1">Main Office:</p>
                    <a 
                      href="tel:+15551234567" 
                      className="text-primary-500 hover:text-primary-600"
                    >
                      +1 (555) 123-4567
                    </a>
                    <p className="text-gray-600 dark:text-gray-400 mt-2 mb-1">Customer Support:</p>
                    <a 
                      href="tel:+15559876543" 
                      className="text-primary-500 hover:text-primary-600"
                    >
                      +1 (555) 987-6543
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-primary-50 dark:bg-primary-900/30 p-3 rounded-lg text-primary-500">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Visit Us</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      123 Event Plaza, Suite 400<br />
                      San Francisco, CA 94105<br />
                      United States
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                      <span className="font-medium">Business Hours:</span><br />
                      Monday-Friday: 9:00 AM - 6:00 PM<br />
                      Saturday: 10:00 AM - 2:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                
                {isSubmitted ? (
                  <div className="text-center py-8">
                    <div className="mx-auto w-16 h-16 bg-success-500/20 rounded-full flex items-center justify-center mb-4">
                      <Check size={32} className="text-success-500" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Message Sent Successfully!</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      Thank you for reaching out. We'll get back to you as soon as possible.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="btn-primary"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Your Name
                        </label>
                        <input
                          id="name"
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="input"
                          placeholder="John Doe"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Your Email
                        </label>
                        <input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="input"
                          placeholder="you@example.com"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Subject
                      </label>
                      <input
                        id="subject"
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="input"
                        placeholder="How can we help you?"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Message
                      </label>
                      <textarea
                        id="message"
                        rows={6}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="input"
                        placeholder="Tell us about your event or inquiry..."
                        required
                      ></textarea>
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white\" xmlns="http://www.w3.org/2000/svg\" fill="none\" viewBox="0 0 24 24">
                            <circle className="opacity-25\" cx="12\" cy="12\" r="10\" stroke="currentColor\" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <Send size={18} className="mr-2" />
                          Send Message
                        </span>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Map Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold mb-4">Find Us</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Our office is conveniently located in downtown San Francisco, easily accessible by public transportation.
            </p>
          </div>
          
          <div className="rounded-lg overflow-hidden shadow-md h-96">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50470.03336601623!2d-122.45335391534421!3d37.77492949493975!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858070cc2fbd55%3A0xa71491d736f62d5c!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1686230448930!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="EventVista Office Location"
            ></iframe>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Find answers to common questions about our event management services.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              <details className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 group">
                <summary className="font-semibold cursor-pointer list-none flex justify-between items-center">
                  What types of events do you manage?
                  <span className="transform group-open:rotate-180 transition-transform duration-200">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </summary>
                <div className="mt-3 text-gray-600 dark:text-gray-400">
                  We manage a wide range of events including corporate conferences, product launches, trade shows, weddings, social gatherings, awards ceremonies, gala dinners, and virtual/hybrid events. Our team has expertise in various industries and event types.
                </div>
              </details>
              
              <details className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 group">
                <summary className="font-semibold cursor-pointer list-none flex justify-between items-center">
                  How far in advance should I book your services?
                  <span className="transform group-open:rotate-180 transition-transform duration-200">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </summary>
                <div className="mt-3 text-gray-600 dark:text-gray-400">
                  We recommend booking our services at least 3-6 months in advance for large events, and 1-3 months for smaller events. However, we understand that some events require quick turnarounds, and we'll do our best to accommodate your timeline.
                </div>
              </details>
              
              <details className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 group">
                <summary className="font-semibold cursor-pointer list-none flex justify-between items-center">
                  What is your pricing structure?
                  <span className="transform group-open:rotate-180 transition-transform duration-200">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </summary>
                <div className="mt-3 text-gray-600 dark:text-gray-400">
                  Our pricing varies based on the scope, scale, and complexity of your event. We offer customized packages tailored to your specific needs and budget. Contact us for a personalized quote based on your event requirements.
                </div>
              </details>
              
              <details className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 group">
                <summary className="font-semibold cursor-pointer list-none flex justify-between items-center">
                  Do you offer virtual event management?
                  <span className="transform group-open:rotate-180 transition-transform duration-200">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </summary>
                <div className="mt-3 text-gray-600 dark:text-gray-400">
                  Yes, we specialize in virtual and hybrid event management. Our team is experienced in using various virtual event platforms and can help you create engaging online experiences for your audience, complete with interactive elements and professional production.
                </div>
              </details>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;