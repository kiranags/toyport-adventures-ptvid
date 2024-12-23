import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [session, setSession] = useState<any>(null);
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account",
    });
  };

  const navigation = [
    { name: "Beranda", href: "/" },
    { name: "Produk", href: "/products" },
    { name: "Tentang", href: "/about" },
    { name: "Kontak", href: "/contact" },
    ...(session ? [{ name: "Dashboard", href: "/admin/dashboard" }] : []),
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center gap-3">
              <img
                src="/lovable-uploads/17147972-7ed7-4ffd-802d-0fc4d95b8234.png"
                alt="PT Perwira Duta Indonesia"
                className="h-12 w-auto"
              />
              <div className="flex flex-col items-start">
                <span className="font-bold text-lg text-primary">PT Perwira Duta Indonesia</span>
                <span className="text-sm text-gray-600">Forwarder Mainan Terpercaya</span>
              </div>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`${
                  isActive(item.href)
                    ? "text-accent font-semibold"
                    : "text-gray-600 hover:text-primary transition-colors"
                } px-3 py-2 text-sm font-medium`}
              >
                {item.name}
              </Link>
            ))}
            {session && (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors px-3 py-2 text-sm font-medium"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            )}
          </div>

          {/* Mobile Navigation Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-b border-gray-200">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`${
                  isActive(item.href)
                    ? "text-accent font-semibold"
                    : "text-gray-600 hover:text-primary"
                } block px-3 py-2 text-base font-medium`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            {session && (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-gray-600 hover:text-primary w-full px-3 py-2 text-base font-medium"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;