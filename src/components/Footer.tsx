import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const phoneNumber = "+6287722677273";
  const whatsappUrl = `https://wa.me/${phoneNumber}`;

  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <img
              src="/lovable-uploads/6b51d257-df41-4be4-8099-3fd7ca451b22.png"
              alt="PT Perwira Duta Indonesia"
              className="h-16 w-auto bg-white p-2 rounded"
            />
            <p className="text-sm">
              Forwarder Mainan Terpercaya ke Indonesia
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Menu Cepat</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-secondary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-secondary transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-secondary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Informasi Kontak</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <Phone className="h-5 w-5" />
                <span>021-8779-6565</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-5 w-5" />
                <span>contact@perwiraduta.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <MessageCircle className="h-5 w-5" />
                <a 
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-secondary transition-colors flex items-center gap-2"
                >
                  <span>WhatsApp: +62 877-2267-7273</span>
                  <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">
                    Online
                  </span>
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="h-5 w-5 mt-1 flex-shrink-0" />
                <span className="text-sm">
                  Komp. Nuansa Commercial Estate, Jl. TB Simatupang No.17 blok A3,
                  RT.7/RW.3, Susukan, Kec. Ciracas, Jakarta Timur 13750
                </span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-white/10 text-center text-sm">
          <p>© {new Date().getFullYear()} PT Perwira Duta Indonesia. Hak Cipta Dilindungi.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;