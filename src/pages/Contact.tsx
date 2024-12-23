import { Phone, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const Contact = () => {
  const phoneNumber = "087722677273";
  const whatsappUrl = `https://wa.me/${phoneNumber}`;

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative py-20 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-heading font-bold mb-6">Hubungi Kami</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Hubungi kami untuk informasi lebih lanjut tentang layanan forwarding
            dan impor kami
          </p>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <h2 className="text-3xl font-heading font-bold mb-8">
                Informasi Kontak
              </h2>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Telepon</h3>
                    <p className="text-gray-600">02187796565</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p className="text-gray-600">contact@perwiraduta.com</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Alamat</h3>
                    <p className="text-gray-600">
                      Komp. Nuansa Commercial Estate,
                      <br />
                      Jl. TB Simatupang No.17 blok A3,
                      <br />
                      RT.7/RW.3, Susukan, Kec. Ciracas,
                      <br />
                      Jakarta Timur 13750
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* WhatsApp Contact Section */}
            <div className="flex flex-col items-center justify-center space-y-6 bg-gray-50 p-8 rounded-lg">
              <h2 className="text-2xl font-semibold text-center">
                Hubungi Kami via WhatsApp
              </h2>
              <p className="text-gray-600 text-center">
                Klik tombol di bawah untuk menghubungi kami langsung melalui WhatsApp
              </p>
              <Button
                asChild
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-6 text-lg"
              >
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Phone className="h-5 w-5" />
                  Chat via WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;