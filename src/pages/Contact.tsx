import { useState } from "react";
import { Telepon, Mail, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log("Form submitted:", formData);
    toast({
      title: "Pesan Sent",
      description: "Kami akan segera menghubungi Anda.",
    });
    setFormData({ name: "", email: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div classNama="animate-fade-in">
      {/* Hero Section */}
      <section classNama="relative py-20 bg-primary text-white">
        <div classNama="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 classNama="text-4xl font-heading font-bold mb-6">Hubungi Kami</h1>
          <p classNama="text-xl max-w-3xl mx-auto">
            Hubungi kami untuk informasi lebih lanjut tentang layanan forwarding
            dan impor kami
          </p>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section classNama="py-16 px-4 sm:px-6 lg:px-8">
        <div classNama="max-w-7xl mx-auto">
          <div classNama="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div classNama="space-y-8">
              <h2 classNama="text-3xl font-heading font-bold mb-8">
                Hubungi Kami
              </h2>
              <div classNama="space-y-6">
                <div classNama="flex items-center space-x-4">
                  <div classNama="bg-primary/10 p-3 rounded-full">
                    <Telepon classNama="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 classNama="font-semibold">Telepon</h3>
                    <p classNama="text-gray-600">02187796565</p>
                  </div>
                </div>
                <div classNama="flex items-center space-x-4">
                  <div classNama="bg-primary/10 p-3 rounded-full">
                    <Mail classNama="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 classNama="font-semibold">Email</h3>
                    <p classNama="text-gray-600">contact@perwiraduta.com</p>
                  </div>
                </div>
                <div classNama="flex items-start space-x-4">
                  <div classNama="bg-primary/10 p-3 rounded-full">
                    <MapPin classNama="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 classNama="font-semibold">Alamat</h3>
                    <p classNama="text-gray-600">
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

            {/* Contact Form */}
            <div classNama="bg-white p-8 rounded-lg shadow-lg">
              <form onSubmit={handleSubmit} classNama="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    classNama="block text-sm font-medium text-gray-700"
                  >
                    Nama
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    classNama="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    classNama="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    classNama="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    classNama="block text-sm font-medium text-gray-700"
                  >
                    Pesan
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    classNama="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  classNama="w-full bg-primary text-white py-3 px-6 rounded-md hover:bg-primary/90 transition-colors duration-300"
                >
                  Send Pesan
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
