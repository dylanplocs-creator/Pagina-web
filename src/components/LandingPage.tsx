import React, { useState, useEffect, useRef } from "react";
import {
  Menu, X, MapPin, Phone, Clock, Car,
  ChevronDown, Star, CheckCircle2,
  Expand, ArrowRight, Instagram, Facebook, MessageCircle,
  Stethoscope, Syringe, Sparkles, Smile, ShieldAlert, Heart
} from "lucide-react";

// --- FadeIn Helper ---
function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// --- Data ---
const treatments = [
  { name: "Restauraciones", desc: "Devolvemos la función y estética a tus dientes con materiales de alta calidad.", icon: ShieldAlert, img: "/images/restauraciones_2.png" },
  { name: "Atención Pediátrica", desc: "Cuidado dental especializado para los más pequeños, en un ambiente cálido y sin miedo.", icon: Smile, img: "/images/paciente-pediatrico.png" },
  { name: "Blanqueamientos", desc: "Aclara el tono de tus dientes de forma segura y eficaz.", icon: Sparkles, img: "/images/galeria-sonrisa.png" },
  { name: "Limpiezas dentales", desc: "Prevención y cuidado para mantener encías y dientes sanos.", icon: Stethoscope, img: "/images/galeria-herramientas.png" },
  { name: "Extracciones", desc: "Procedimientos seguros y sin dolor para dientes problemáticos.", icon: Syringe, img: "/images/clinica-interior.png" },
];

const galleryImages = [
  "/images/galeria-clinica.png",
  "/images/restauraciones_2.png",
  "/images/galeria-herramientas.png",
  "/images/paciente-pediatrico.png",
  "/images/galeria-sonrisa.png",
  "/images/clinica-interior.png",
];

const reviews = [
  { text: "El doctor Dilan es increíblemente paciente y dedicado. Me explicó todo el procedimiento y nunca sentí dolor.", author: "Carlos M.", rating: 5 },
  { text: "La clínica es muy limpia y moderna. Me atendieron de maravilla y quedé encantada con mi blanqueamiento.", author: "Valentina R.", rating: 5 },
  { text: "Excelente atención desde la primera llamada. El doctor Ugarte es muy profesional y amable.", author: "Jorge P.", rating: 5 },
  { text: "Muy recomendable. Me hice las carillas y el resultado superó mis expectativas.", author: "Sofía L.", rating: 5 },
];

export function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % reviews.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  const handleReservation = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen bg-[#FFFEF7] text-gray-800 font-['Plus_Jakarta_Sans'] selection:bg-[#2FB2A6] selection:text-white overflow-x-hidden">
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white/95 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex flex-col cursor-pointer group" onClick={() => handleNavClick("inicio")}>
            <span className={`font-['Fraunces'] text-2xl font-bold transition-colors ${isScrolled ? "text-[#0B3F3C]" : "text-white group-hover:text-[#2FB2A6]"}`}>
              Dr. Ugarte
            </span>
            <span className={`text-[10px] uppercase tracking-widest font-semibold transition-colors ${isScrolled ? "text-[#2FB2A6]" : "text-white/80"}`}>
              Clínica Dental
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {["Inicio", "Nosotros", "Tratamientos", "Galería"].map((item) => (
              <button
                key={item}
                onClick={() => handleNavClick(item.toLowerCase())}
                className={`text-sm font-medium transition-colors hover:text-[#2FB2A6] ${
                  isScrolled ? "text-gray-600" : "text-white/90"
                }`}
              >
                {item}
              </button>
            ))}
            <button
              onClick={() => handleNavClick("reservar")}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all transform hover:scale-105 ${
                isScrolled
                  ? "bg-[#2FB2A6] text-white shadow-md hover:bg-[#25978d]"
                  : "bg-white text-[#0B3F3C] hover:bg-[#2FB2A6] hover:text-white"
              }`}
            >
              Reserva tu cita
            </button>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={isScrolled ? "text-[#0B3F3C]" : "text-white"}
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl flex flex-col py-4 px-6 gap-4 border-t border-gray-100">
            {["Inicio", "Nosotros", "Tratamientos", "Galería"].map((item) => (
              <button
                key={item}
                onClick={() => handleNavClick(item.toLowerCase())}
                className="text-left text-lg font-medium text-[#0B3F3C] hover:text-[#2FB2A6] transition-colors"
              >
                {item}
              </button>
            ))}
            <button
              onClick={() => handleNavClick("reservar")}
              className="bg-[#2FB2A6] text-white px-5 py-3 rounded-md text-center font-semibold mt-2 active:bg-[#25978d]"
            >
              Reserva tu cita
            </button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="inicio" className="relative h-[100dvh] w-full flex items-center justify-center overflow-hidden bg-[#0B3F3C]">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/hero-smile.png')" }}
        />
        <div className="absolute inset-0 z-10 bg-black/40" />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
          <FadeIn>
            <h1 className="font-['Fraunces'] text-5xl md:text-7xl lg:text-8xl text-white font-bold leading-tight mb-4 drop-shadow-lg">
              Cuidamos tu sonrisa
            </h1>
          </FadeIn>
          <FadeIn delay={200}>
            <p className="font-['Plus_Jakarta_Sans'] text-xl md:text-2xl text-white/90 font-light mb-10 drop-shadow-md">
              Acompañada con los mejores dentistas
            </p>
          </FadeIn>
          <FadeIn delay={400} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button
              onClick={() => handleNavClick("reservar")}
              className="bg-[#2FB2A6] hover:bg-[#25978d] text-white px-8 py-4 rounded-full font-semibold text-lg transition-all transform hover:scale-105 shadow-xl w-full sm:w-auto"
            >
              Reserva tu cita
            </button>
            <button
              onClick={() => handleNavClick("tratamientos")}
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#0B3F3C] px-8 py-4 rounded-full font-semibold text-lg transition-all w-full sm:w-auto"
            >
              Ver tratamientos
            </button>
          </FadeIn>
        </div>

        <button
          onClick={() => handleNavClick("nosotros")}
          className="absolute bottom-10 z-20 text-white animate-bounce hover:text-[#2FB2A6] transition-colors"
        >
          <ChevronDown size={40} />
        </button>
      </section>

      {/* Nosotros Section */}
      <section id="nosotros" className="py-24 px-4 bg-[#FFFEF7]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <div className="relative group">
                <div className="absolute -inset-4 bg-[#2FB2A6]/10 rounded-2xl transform rotate-3 transition-transform group-hover:rotate-6"></div>
                <img
                  src="/images/dr-ugarte.png"
                  alt="Dr. Dilan Ugarte"
                  className="relative rounded-2xl shadow-xl w-full object-cover aspect-[4/5] z-10"
                  loading="lazy"
                />
                <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur p-4 rounded-xl shadow-lg z-20">
                  <h3 className="font-['Fraunces'] text-xl font-bold text-[#0B3F3C]">Dr. Dilan Ugarte</h3>
                  <p className="text-[#2FB2A6] text-sm font-semibold">Cirujano Dentista</p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={200}>
              <h2 className="font-['Fraunces'] text-4xl md:text-5xl text-[#0B3F3C] font-bold mb-6">
                Excelencia en cada sonrisa
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed text-lg mb-8">
                <p>
                  En Clínica Dr. Ugarte creemos que una sonrisa sana es el reflejo de tu bienestar general. Ubicados en el corazón de Providencia, ofrecemos una atención dental de primer nivel en un ambiente cálido y relajante.
                </p>
                <p>
                  Nuestro enfoque se centra en ti. Nos tomamos el tiempo necesario para escuchar tus necesidades, explicar cada tratamiento con claridad y asegurar tu comodidad en todo momento. Trabajamos con tecnología de vanguardia y materiales de la más alta calidad.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 italic text-gray-700 relative">
                <div className="text-4xl text-[#2FB2A6]/30 font-serif absolute top-4 left-4">"</div>
                <p className="relative z-10 pl-6 text-lg">
                  Me atendí con el doctor, muy paciente y profesional. Me sentí en confianza desde el primer momento. El resultado fue excelente.
                </p>
                <p className="mt-4 pl-6 text-sm font-semibold text-[#0B3F3C]">— María G.</p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Tratamientos Section */}
      <section id="tratamientos" className="py-24 px-4 bg-[#0B3F3C] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#2FB2A6]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#2FB2A6]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="font-['Fraunces'] text-4xl md:text-5xl text-white font-bold mb-4">
                Nuestros Tratamientos
              </h2>
              <p className="text-white/80 text-lg max-w-2xl mx-auto">
                Especializados en odontología integral y estética para brindarte los mejores resultados con el máximo confort.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {treatments.map((treatment, idx) => (
              <FadeIn key={treatment.name} delay={idx * 100}>
                <div className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group h-full flex flex-col">
                  <div className="relative h-48 overflow-hidden">
                    <div className="absolute inset-0 bg-[#0B3F3C]/20 group-hover:bg-transparent transition-colors z-10"></div>
                    <img
                      src={treatment.img}
                      alt={treatment.name}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-8 flex-grow flex flex-col">
                    <div className="w-12 h-12 bg-[#FFFEF7] rounded-full flex items-center justify-center text-[#2FB2A6] mb-4 group-hover:scale-110 transition-transform">
                      <treatment.icon size={24} />
                    </div>
                    <h3 className="font-['Fraunces'] text-2xl font-bold text-[#0B3F3C] mb-3">{treatment.name}</h3>
                    <p className="text-gray-600 flex-grow">{treatment.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={400} className="mt-16 text-center">
            <a
              href="https://wa.me/56964337982"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20b858] text-white px-8 py-4 rounded-full font-semibold text-lg transition-all transform hover:scale-105 shadow-xl"
            >
              <MessageCircle size={24} />
              Consultar por WhatsApp
            </a>
          </FadeIn>
        </div>
      </section>

      {/* Galería Section */}
      <section id="galería" className="py-24 px-4 bg-[#FFFEF7]">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="font-['Fraunces'] text-4xl md:text-5xl text-[#0B3F3C] font-bold mb-4">
                La Clínica
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Conoce nuestras instalaciones y algunos de nuestros resultados.
              </p>
            </div>
          </FadeIn>

          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {galleryImages.map((img, idx) => (
              <FadeIn key={idx} delay={idx * 50}>
                <div
                  className="relative overflow-hidden rounded-2xl cursor-pointer group break-inside-avoid shadow-md hover:shadow-xl transition-all"
                  onClick={() => setLightboxImage(img)}
                >
                  <img
                    src={img}
                    alt={`Galería ${idx + 1}`}
                    className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-[#0B3F3C]/0 group-hover:bg-[#0B3F3C]/40 transition-colors duration-300 flex items-center justify-center">
                    <Expand className="text-white opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-300" size={32} />
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* Lightbox */}
        {lightboxImage && (
          <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
            <button
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
              onClick={() => setLightboxImage(null)}
            >
              <X size={36} />
            </button>
            <img
              src={lightboxImage}
              alt="Vista ampliada"
              className="max-w-full max-h-[90vh] rounded-lg shadow-2xl"
            />
          </div>
        )}
      </section>

      {/* Reservar Section */}
      <section id="reservar" className="py-24 px-4 bg-white relative">
        <div className="absolute inset-0 z-0 h-1/2 bg-[#FFFEF7]"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <FadeIn>
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
              <div className="grid md:grid-cols-5">
                {/* Image side */}
                <div className="hidden md:block md:col-span-2 relative bg-[#0B3F3C]">
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay"
                    style={{ backgroundImage: "url('/images/galeria-clinica.png')" }}
                  ></div>
                  <div className="relative z-10 p-10 h-full flex flex-col justify-between text-white">
                    <div>
                      <h3 className="font-['Fraunces'] text-3xl font-bold mb-4">Agenda tu visita</h3>
                      <p className="text-white/80">Da el primer paso hacia una sonrisa más sana y brillante.</p>
                    </div>
                    <div className="space-y-4 text-sm">
                      <div className="flex items-center gap-3">
                        <Phone size={18} className="text-[#2FB2A6]" />
                        <span>+56 9 6433 7982</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <MapPin size={18} className="text-[#2FB2A6]" />
                        <span>Av. Pedro de Valdivia 1509</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Form side */}
                <div className="md:col-span-3 p-8 md:p-12">
                  {!isSubmitted ? (
                    <form onSubmit={handleReservation} className="space-y-6">
                      <h3 className="font-['Fraunces'] text-2xl font-bold text-[#0B3F3C] md:hidden mb-6">Agenda tu visita</h3>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Nombre completo</label>
                          <input
                            type="text"
                            required
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#2FB2A6] focus:ring-2 focus:ring-[#2FB2A6]/20 outline-none transition-all bg-gray-50 focus:bg-white"
                            placeholder="Ej. Juan Pérez"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                            <input
                              type="tel"
                              required
                              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#2FB2A6] focus:ring-2 focus:ring-[#2FB2A6]/20 outline-none transition-all bg-gray-50 focus:bg-white"
                              placeholder="+56 9 0000 0000"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input
                              type="email"
                              required
                              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#2FB2A6] focus:ring-2 focus:ring-[#2FB2A6]/20 outline-none transition-all bg-gray-50 focus:bg-white"
                              placeholder="tu@email.com"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Fecha preferida</label>
                            <input
                              type="date"
                              required
                              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#2FB2A6] focus:ring-2 focus:ring-[#2FB2A6]/20 outline-none transition-all bg-gray-50 focus:bg-white text-gray-700"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Hora preferida</label>
                            <select
                              required
                              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#2FB2A6] focus:ring-2 focus:ring-[#2FB2A6]/20 outline-none transition-all bg-gray-50 focus:bg-white text-gray-700"
                            >
                              <option value="">Seleccionar</option>
                              <option value="8:00">8:00 am</option>
                              <option value="9:00">9:00 am</option>
                              <option value="10:00">10:00 am</option>
                              <option value="11:00">11:00 am</option>
                              <option value="12:00">12:00 pm</option>
                              <option value="14:00">2:00 pm</option>
                              <option value="15:00">3:00 pm</option>
                              <option value="16:00">4:00 pm</option>
                              <option value="17:00">5:00 pm</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Comentarios (Opcional)</label>
                          <textarea
                            rows={3}
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#2FB2A6] focus:ring-2 focus:ring-[#2FB2A6]/20 outline-none transition-all bg-gray-50 focus:bg-white resize-none"
                            placeholder="Motivo de la consulta..."
                          ></textarea>
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-[#2FB2A6] hover:bg-[#25978d] text-white py-4 rounded-xl font-bold text-lg transition-all shadow-md hover:shadow-lg flex justify-center items-center gap-2"
                      >
                        Confirmar Reservación
                        <ArrowRight size={20} />
                      </button>

                      <p className="text-center text-gray-500 text-sm mt-4">
                        ¿Prefiere llamar?{" "}
                        <a href="tel:+56964337982" className="text-[#2FB2A6] font-semibold hover:underline">
                          +56 9 6433 7982
                        </a>
                      </p>
                    </form>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center space-y-4 min-h-[400px]">
                      <div className="w-20 h-20 bg-[#2FB2A6]/10 rounded-full flex items-center justify-center text-[#2FB2A6] mb-4">
                        <CheckCircle2 size={40} />
                      </div>
                      <h3 className="font-['Fraunces'] text-3xl font-bold text-[#0B3F3C]">¡Solicitud Enviada!</h3>
                      <p className="text-gray-600 max-w-sm">
                        Hemos recibido tu solicitud de reserva. Nos pondremos en contacto contigo a la brevedad para confirmar tu hora.
                      </p>
                      <button
                        onClick={() => setIsSubmitted(false)}
                        className="mt-8 text-[#2FB2A6] font-semibold hover:underline"
                      >
                        Hacer otra reserva
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Reseñas Section */}
      <section className="py-24 px-4 bg-[#FFFEF7] overflow-hidden">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <h2 className="font-['Fraunces'] text-4xl md:text-5xl text-[#0B3F3C] font-bold mb-16">
              Lo que dicen nuestros pacientes
            </h2>

            <div className="relative min-h-[250px] flex items-center justify-center">
              {reviews.map((review, idx) => (
                <div
                  key={idx}
                  className={`absolute w-full transition-all duration-700 ease-in-out ${
                    idx === activeTestimonial
                      ? "opacity-100 translate-x-0 pointer-events-auto"
                      : idx < activeTestimonial
                        ? "opacity-0 -translate-x-full pointer-events-none"
                        : "opacity-0 translate-x-full pointer-events-none"
                  }`}
                >
                  <div className="flex justify-center gap-1 mb-6 text-[#FFB800]">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} size={24} fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-2xl md:text-3xl text-gray-700 font-serif italic mb-8 max-w-3xl mx-auto leading-relaxed">
                    "{review.text}"
                  </p>
                  <div className="flex items-center justify-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#2FB2A6]/20 text-[#2FB2A6] flex items-center justify-center font-bold text-lg">
                      {review.author.charAt(0)}
                    </div>
                    <span className="font-semibold text-[#0B3F3C] text-lg">{review.author}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center gap-3 mt-12 mb-10">
              {reviews.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTestimonial(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    idx === activeTestimonial ? "w-8 bg-[#2FB2A6]" : "w-2.5 bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Ver reseña ${idx + 1}`}
                />
              ))}
            </div>

            <a
              href="https://www.google.com/maps"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border-2 border-[#2FB2A6] text-[#2FB2A6] hover:bg-[#2FB2A6] hover:text-white px-6 py-3 rounded-full font-semibold transition-colors"
            >
              Déjanos tu reseña
            </a>
          </FadeIn>
        </div>
      </section>

      {/* Ubicación Section */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-0 bg-[#FFFEF7] rounded-3xl overflow-hidden shadow-xl">
            {/* Info */}
            <div className="p-10 lg:p-16 flex flex-col justify-center">
              <FadeIn>
                <h2 className="font-['Fraunces'] text-4xl text-[#0B3F3C] font-bold mb-8">Ubicación y Contacto</h2>

                <div className="space-y-6 mb-12">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center text-[#2FB2A6] shrink-0">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#0B3F3C] text-lg">Dirección</h4>
                      <p className="text-gray-600 mt-1">Av. Pedro de Valdivia 1509<br />Providencia, Santiago de Chile</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center text-[#2FB2A6] shrink-0">
                      <Clock size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#0B3F3C] text-lg">Horario de Atención</h4>
                      <p className="text-gray-600 mt-1">Lunes a Sábado<br />8:00 am – 6:00 pm</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center text-[#2FB2A6] shrink-0">
                      <Phone size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#0B3F3C] text-lg">Teléfono</h4>
                      <a href="tel:+56964337982" className="text-[#2FB2A6] font-semibold hover:underline mt-1 block">
                        +56 9 6433 7982
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center text-[#2FB2A6] shrink-0">
                      <Car size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#0B3F3C] text-lg">Estacionamiento</h4>
                      <p className="text-gray-600 mt-1">Disponible en calle aledaña</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-[#0B3F3C] text-lg mb-4">Síguenos</h4>
                  <div className="flex gap-4">
                    <a href="https://www.instagram.com/dolanu.u/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center text-gray-500 hover:text-[#E1306C] hover:scale-110 transition-all">
                      <Instagram size={24} />
                    </a>
                    <a href="https://www.facebook.com/Dolonplocs/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center text-gray-500 hover:text-[#1877F2] hover:scale-110 transition-all">
                      <Facebook size={24} />
                    </a>
                    <a href="https://wa.me/56964337982" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center text-gray-500 hover:text-[#25D366] hover:scale-110 transition-all">
                      <MessageCircle size={24} />
                    </a>
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Map */}
            <div className="h-[400px] lg:h-auto min-h-[400px]">
              <iframe
                src="https://maps.google.com/maps?q=Av+Pedro+de+Valdivia+1509+Providencia+Santiago+Chile&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale-[20%] hover:grayscale-0 transition-all duration-500"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1C1C1C] text-white pt-20 pb-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
            <div>
              <div className="mb-6 flex flex-col">
                <span className="font-['Fraunces'] text-3xl font-bold text-white">Dr. Ugarte</span>
                <span className="text-xs uppercase tracking-widest text-[#2FB2A6] mt-1">Clínica Dental</span>
              </div>
              <p className="text-gray-400 leading-relaxed mb-8 max-w-sm">
                Devolviendo salud, función y estética a tu sonrisa. Atención personalizada y tecnología de vanguardia en Providencia, Santiago.
              </p>
              <div className="flex gap-4">
                <a href="https://www.instagram.com/dolanu.u/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#E1306C] transition-colors">
                  <Instagram size={24} />
                </a>
                <a href="https://www.facebook.com/Dolonplocs/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#1877F2] transition-colors">
                  <Facebook size={24} />
                </a>
                <a href="https://wa.me/56964337982" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#25D366] transition-colors">
                  <MessageCircle size={24} />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-['Fraunces'] text-xl font-bold mb-6">Enlaces Rápidos</h4>
              <ul className="space-y-4">
                {["Inicio", "Nosotros", "Tratamientos", "Galería"].map((item) => (
                  <li key={item}>
                    <button
                      onClick={() => handleNavClick(item.toLowerCase())}
                      className="text-gray-400 hover:text-[#2FB2A6] transition-colors inline-flex items-center gap-2 group"
                    >
                      <span className="w-2 h-px bg-[#2FB2A6] opacity-0 group-hover:opacity-100 group-hover:w-4 transition-all"></span>
                      {item}
                    </button>
                  </li>
                ))}
                <li>
                  <button
                    onClick={() => handleNavClick("reservar")}
                    className="text-gray-400 hover:text-[#2FB2A6] transition-colors inline-flex items-center gap-2 group"
                  >
                    <span className="w-2 h-px bg-[#2FB2A6] opacity-0 group-hover:opacity-100 group-hover:w-4 transition-all"></span>
                    Reservar Hora
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-['Fraunces'] text-xl font-bold mb-6">Newsletter</h4>
              <p className="text-gray-400 mb-4">Recibe noticias, consejos de salud dental y descuentos exclusivos.</p>
              <form className="flex" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Tu correo electrónico"
                  required
                  className="bg-white/5 border border-white/10 rounded-l-lg px-4 py-3 w-full focus:outline-none focus:border-[#2FB2A6] focus:bg-white/10 transition-all text-white"
                />
                <button
                  type="submit"
                  className="bg-[#2FB2A6] hover:bg-[#25978d] px-6 py-3 rounded-r-lg font-semibold transition-colors"
                >
                  Suscribir
                </button>
              </form>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm">
            <p>&copy; {new Date().getFullYear()} Clínica Dr. Ugarte. Todos los derechos reservados.</p>
            <p className="flex items-center gap-1">
              Desarrollado con <Heart size={14} className="text-red-500 fill-current mx-1" /> en Santiago de Chile
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
