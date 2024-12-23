import { MapPin } from "lucide-react";

const About = () => {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative py-20 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-heading font-bold mb-6">About Us</h1>
          <p className="text-xl max-w-3xl mx-auto">
            PT Perwira Duta Indonesia is your trusted partner in toy importation
            and forwarding services to Indonesia
          </p>
        </div>
      </section>

      {/* Company Info */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-heading font-bold mb-6">
                Our Story
              </h2>
              <p className="text-gray-600 mb-4">
                Founded with a vision to simplify the importing process, PT Perwira
                Duta Indonesia has grown to become a leading forwarding company
                specializing in toy importation.
              </p>
              <p className="text-gray-600 mb-4">
                We understand the unique requirements of toy importing, from safety
                certifications to proper handling, and we ensure every shipment
                meets the highest standards of quality and compliance.
              </p>
              <p className="text-gray-600">
                Our team of experts is dedicated to providing personalized service
                and support throughout the entire importing process.
              </p>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.7676767676767!2d106.8675!3d-6.3025!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTgnMDkuMCJTIDEwNsKwNTInMDMuMCJF!5e0!3m2!1sen!2sid!4v1620000000000!5m2!1sen!2sid"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Location Info */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-start space-x-4">
              <MapPin className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Our Location</h3>
                <p className="text-gray-600">
                  Komp. Nuansa Commercial Estate,
                  <br />
                  Jl. TB Simatupang No.17 blok A3,
                  <br />
                  RT.7/RW.3, Susukan, Kec. Ciracas,
                  <br />
                  Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 13750
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;