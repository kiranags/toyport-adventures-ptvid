import { Phone } from "lucide-react";

const WhatsAppButton = () => {
  const phoneNumber = "+62877-2267-7273";
  const whatsappUrl = `https://wa.me/${phoneNumber.replace(/\s+/g, '')}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-all z-50"
      aria-label="Chat on WhatsApp"
    >
      <Phone className="h-6 w-6" />
    </a>
  );
};

export default WhatsAppButton;