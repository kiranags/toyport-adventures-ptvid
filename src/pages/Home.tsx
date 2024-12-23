import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-secondary/90" />
        <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold mb-6">
            Forwarder Mainan Terpercaya ke Indonesia
          </h1>
          <p className="text-xl sm:text-2xl mb-8 max-w-3xl mx-auto">
            Spesialis jasa impor dan forwarding mainan dengan keahlian dan kepedulian
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center px-6 py-3 border-2 border-white text-lg font-medium rounded-md text-white hover:bg-white hover:text-primary transition-colors duration-300"
          >
            Mulai Sekarang
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-center mb-12">
            Layanan Kami
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={service.title}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="text-accent mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-heading font-bold mb-6">
            Ready to Mulai Sekarang?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Hubungi kami sekarang untuk konsultasi tentang kebutuhan impor Anda
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center px-6 py-3 border-2 border-white text-lg font-medium rounded-md text-white hover:bg-white hover:text-primary transition-colors duration-300"
          >
            Hubungi Kami
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

const services = [
  {
    title: "Impor Mainan",
    description: "Penanganan khusus impor mainan dengan semua sertifikasi dan kepatuhan yang diperlukan.",
    icon: <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>,
  },
  {
    title: "Jasa Forwarding",
    description: "Solusi logistik lengkap untuk kebutuhan impor Anda dengan pelacakan dan dukungan.",
    icon: <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
  },
  {
    title: "Pengurusan Bea Cukai",
    description: "Penanganan ahli untuk dokumentasi dan prosedur bea cukai.",
    icon: <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  },
];

export default Home;