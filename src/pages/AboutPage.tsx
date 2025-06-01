import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Award, Users, Briefcase, CheckCircle, ChevronRight } from 'lucide-react';

const AboutPage = () => {
  useEffect(() => {
    // Update title
    document.title = 'About Us | EventVista';
  }, []);
  
  return (
    <div className="pt-24 pb-16">
      {/* Hero Section */}
      <section className="relative py-16 bg-gray-900 text-white">
        <div className="absolute inset-0">
          <img 
            src="https://images.pexels.com/photos/696218/pexels-photo-696218.jpeg?auto=compress&cs=tinysrgb&w=1920" 
            alt="Team collaboration" 
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="container-custom relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About EventVista</h1>
            <p className="text-xl text-gray-300 mb-8">
              We are a dedicated team of event management professionals committed to creating exceptional experiences that exceed expectations.
            </p>
          </div>
        </div>
      </section>
      
      {/* Our Story */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                EventVista was founded in 2018 with a simple yet powerful vision: to transform ordinary events into extraordinary experiences. What began as a small team of passionate event enthusiasts has grown into a full-service event management company with a reputation for excellence.
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Our journey has been defined by our commitment to innovation, attention to detail, and unwavering dedication to our clients' success. We believe that every event tells a story, and we're here to ensure that story is memorable.
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                From corporate conferences and product launches to weddings and social gatherings, we bring creativity, expertise, and flawless execution to every project we undertake.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img 
                src="https://images.pexels.com/photos/7551442/pexels-photo-7551442.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Event planning team" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Mission */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-600 dark:text-gray-400">
              To empower organizations and individuals through innovative event solutions that create meaningful connections, inspire audiences, and deliver exceptional results.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
              <div className="text-primary-500 mb-4">
                <Award size={40} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Excellence</h3>
              <p className="text-gray-600 dark:text-gray-400">
                We strive for excellence in every aspect of our work, from concept development to execution and follow-up.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
              <div className="text-primary-500 mb-4">
                <Users size={40} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Collaboration</h3>
              <p className="text-gray-600 dark:text-gray-400">
                We believe in the power of collaboration, working closely with our clients and partners to achieve shared goals.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
              <div className="text-primary-500 mb-4">
                <Briefcase size={40} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Integrity</h3>
              <p className="text-gray-600 dark:text-gray-400">
                We operate with transparency, honesty, and accountability in all our business relationships.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Team */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Our diverse team of experienced professionals brings creativity, expertise, and passion to every event.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="rounded-full overflow-hidden h-48 w-48 mx-auto mb-4">
                <img 
                  src="https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=300" 
                  alt="Sarah Johnson" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold mb-1">Sarah Johnson</h3>
              <p className="text-primary-500 mb-2">CEO & Founder</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                With over 15 years of experience in event management, Sarah leads our team with vision and expertise.
              </p>
            </div>
            
            <div className="text-center">
              <div className="rounded-full overflow-hidden h-48 w-48 mx-auto mb-4">
                <img 
                  src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300" 
                  alt="Michael Chen" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold mb-1">Michael Chen</h3>
              <p className="text-primary-500 mb-2">Creative Director</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Michael's innovative approach to event design has transformed countless ordinary spaces into extraordinary experiences.
              </p>
            </div>
            
            <div className="text-center">
              <div className="rounded-full overflow-hidden h-48 w-48 mx-auto mb-4">
                <img 
                  src="https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=300" 
                  alt="Alicia Rodriguez" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold mb-1">Alicia Rodriguez</h3>
              <p className="text-primary-500 mb-2">Operations Manager</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Alicia's meticulous attention to detail ensures that every event runs smoothly from start to finish.
              </p>
            </div>
            
            <div className="text-center">
              <div className="rounded-full overflow-hidden h-48 w-48 mx-auto mb-4">
                <img 
                  src="https://images.pexels.com/photos/3785424/pexels-photo-3785424.jpeg?auto=compress&cs=tinysrgb&w=300" 
                  alt="James Wilson" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold mb-1">James Wilson</h3>
              <p className="text-primary-500 mb-2">Technical Director</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                James specializes in integrating cutting-edge technology to create immersive and interactive event experiences.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose EventVista</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              We stand out from the competition through our commitment to excellence and client satisfaction.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex items-start space-x-4">
              <div className="text-primary-500 flex-shrink-0 mt-1">
                <CheckCircle size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">End-to-End Services</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  From concept development and planning to execution and post-event analysis, we handle every aspect of your event with precision and care.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="text-primary-500 flex-shrink-0 mt-1">
                <CheckCircle size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Tailored Solutions</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We understand that each event is unique, which is why we create customized solutions that align with your specific goals, brand, and audience.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="text-primary-500 flex-shrink-0 mt-1">
                <CheckCircle size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Experienced Team</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Our team of seasoned professionals brings years of industry experience and a wealth of knowledge to every project.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="text-primary-500 flex-shrink-0 mt-1">
                <CheckCircle size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Innovative Approach</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We stay ahead of industry trends and leverage the latest technologies to create fresh, engaging, and memorable event experiences.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Create an Unforgettable Event?</h2>
          <p className="text-primary-100 max-w-2xl mx-auto mb-8">
            Let's discuss how we can bring your vision to life and create an experience that exceeds your expectations.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/contact" className="btn-accent">
              Get in Touch
              <ChevronRight size={18} className="ml-1" />
            </Link>
            <Link to="/events" className="btn bg-white text-primary-600 hover:bg-gray-100">
              Explore Our Events
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;