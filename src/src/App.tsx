/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Menu, 
  Search, 
  ArrowRight, 
  Zap, 
  Moon, 
  Dna, 
  FlaskConical, 
  Mail, 
  Instagram, 
  Twitter, 
  Facebook,
  ChevronRight,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const AdBlock = ({ label = "Publicidad - Bloque de Anuncios" }: { label?: string }) => (
  <div className="ad-placeholder" aria-hidden="true">
    {/* ADSENSE BLOCK START */}
    <span>{label}</span>
    {/* ADSENSE BLOCK END */}
  </div>
);

const ArticleCard = ({ category, title, excerpt, image, onClick }: { category: string, title: string, excerpt: string, image: string, onClick?: () => void }) => (
  <motion.article 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="group cursor-pointer"
    onClick={onClick}
  >
    <div className="relative aspect-[16/9] overflow-hidden rounded-2xl mb-4">
      <img 
        src={image} 
        alt={title} 
        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
        referrerPolicy="no-referrer"
      />
      <div className="absolute top-4 left-4">
        <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-emerald-800">
          {category}
        </span>
      </div>
    </div>
    <h3 className="text-2xl font-serif mb-2 group-hover:text-emerald-700 transition-colors leading-tight">
      {title}
    </h3>
    <p className="text-zinc-600 text-sm leading-relaxed mb-4">
      {excerpt}
    </p>
    <div className="flex items-center text-xs font-semibold text-emerald-700 uppercase tracking-wider">
      Leer más <ArrowRight className="ml-2 w-3 h-3" />
    </div>
  </motion.article>
);

export default function App() {
  const [currentSection, setCurrentSection] = useState('home');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const searchableContent = [
    { id: 'nutricion', title: 'Autofagia: El sistema de reciclaje celular para la eterna juventud', excerpt: 'Descubre cómo el ayuno intermitente y ciertos compuestos naturales activan la limpieza profunda de tus células.', category: 'Nutrición', tags: ['autofagia', 'ayuno', 'celular'] },
    { id: 'suplementos', title: 'NMN y Resveratrol: ¿Realidad o marketing en la longevidad?', excerpt: 'Analizamos la evidencia científica detrás de los precursores de NAD+ y su impacto en el envejecimiento saludable.', category: 'Suplementos', tags: ['nad+', 'nmn', 'resveratrol', 'suplementos'] },
    { id: 'sueno', title: 'Higiene del sueño: El pilar olvidado del biohacking', excerpt: 'Por qué la oscuridad total y la temperatura de tu habitación son más importantes que cualquier suplemento.', category: 'Sueño', tags: ['sueño', 'higiene', 'descanso', 'circadiano'] },
    { id: 'tecnologia', title: 'Luz azul y salud mitocondrial: Cómo protegerte', excerpt: 'El impacto de las pantallas en tu producción de melatonina y estrategias prácticas para mitigar el daño.', category: 'Tecnología', tags: ['luz azul', 'mitocondria', 'pantallas'] },
    { id: 'tecnologia', title: 'Biohacking y Wearables: El Futuro en tu Muñeca', excerpt: 'De los Oura Rings a los Monitores de Glucosa Continuos. Cómo la tecnología mide tu biología.', category: 'Tecnología', tags: ['wearables', 'oura', 'cgm', 'tecnología'] },
    { id: 'nutricion', title: 'Dietas de Longevidad: Nutriendo tus Células', excerpt: 'La nutrición es la herramienta más potente para influir en nuestra expresión genética.', category: 'Nutrición', tags: ['dietas', 'longevidad', 'nutrición', 'ayuno'] },
    { id: 'protocolos', title: 'Protocolos de Longevidad: De la Teoría a la Práctica', excerpt: 'Hormesis, exposición térmica y entrenamiento de fuerza para extender tu healthspan.', category: 'Protocolos', tags: ['protocolos', 'hormesis', 'sauna', 'frío'] },
    { id: 'suplementos', title: 'Magnesio: El mineral maestro que tu cuerpo necesita', excerpt: 'Existen más de 7 tipos de magnesio. Aprende cuál es el adecuado para ti.', category: 'Suplementos', tags: ['magnesio', 'minerales', 'suplementos'] },
  ];

  const navLinks = [
    { name: "Inicio", id: "home" },
    { name: "Nutrición", id: "nutricion" },
    { name: "Sueño", id: "sueno" },
    { name: "Tecnología", id: "tecnologia" },
    { name: "Suplementos", id: "suplementos" },
  ];

  const handleSearch = (query: string) => {
    const q = query.toLowerCase().trim();
    if (!q) return;

    const filtered = searchableContent.filter(item => 
      item.title.toLowerCase().includes(q) || 
      item.excerpt.toLowerCase().includes(q) ||
      item.tags.some(tag => tag.toLowerCase().includes(q))
    );

    setSearchResults(filtered);
    setSearchQuery(query);
    setIsSearchOpen(false);
    setCurrentSection('resultados');
  };

  const handleNavigate = (id: string) => {
    setIsMobileMenuOpen(false);
    setCurrentSection(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validación de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newsletterEmail)) {
      setNewsletterStatus('error');
      return;
    }

    setNewsletterStatus('loading');
    
    // Simulación de guardado en base de datos
    console.log(`[Newsletter] Nuevo suscriptor: ${newsletterEmail}`);
    
    // Simulación de API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setNewsletterStatus('success');
    setNewsletterEmail('');
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[100] bg-white px-4 py-8 md:py-12"
          >
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">Buscador</span>
                <button 
                  onClick={() => setIsSearchOpen(false)}
                  className="p-2 hover:bg-zinc-100 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="relative">
                <input 
                  autoFocus
                  type="text" 
                  placeholder="¿Qué quieres optimizar hoy?" 
                  className="w-full text-3xl md:text-5xl font-serif border-b-2 border-zinc-100 focus:border-emerald-600 focus:outline-none pb-4 transition-colors"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSearch((e.target as HTMLInputElement).value);
                    }
                  }}
                />
                <button 
                  onClick={(e) => {
                    const input = (e.currentTarget.previousSibling as HTMLInputElement);
                    handleSearch(input.value);
                  }}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-zinc-300 hover:text-emerald-600 transition-colors"
                >
                  <Search className="w-8 h-8 md:w-12 md:h-12" />
                </button>
              </div>
              <div className="mt-8 flex flex-wrap gap-2">
                <span className="text-xs text-zinc-400 w-full mb-2">Tendencias:</span>
                {["Autofagia", "NAD+", "Resveratrol", "Higiene del sueño", "Nootrópicos"].map(tag => (
                  <button 
                    key={tag} 
                    onClick={() => handleSearch(tag)}
                    className="px-4 py-2 bg-zinc-50 hover:bg-emerald-50 hover:text-emerald-700 rounded-full text-sm transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-[90] bg-white md:hidden"
          >
            <div className="flex flex-col h-full p-8">
              <div className="flex justify-between items-center mb-12">
                <div className="flex items-center gap-2">
                  <Dna size={24} className="text-emerald-600" />
                  <span className="text-xl font-serif font-bold tracking-tighter">
                    LONGEVIDAD<span className="text-emerald-600">ACTIVA</span>
                  </span>
                </div>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2">
                  <X size={24} />
                </button>
              </div>
              <nav className="flex flex-col gap-8">
                {navLinks.map((link) => (
                  <button 
                    key={link.id}
                    onClick={() => handleNavigate(link.id)}
                    className={`text-3xl font-serif text-left transition-colors ${currentSection === link.id ? 'text-emerald-600' : 'hover:text-emerald-600'}`}
                  >
                    {link.name}
                  </button>
                ))}
              </nav>
              <div className="mt-auto pt-12 border-t border-zinc-100">
                <p className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-6">Síguenos</p>
                <div className="flex gap-6 text-zinc-600">
                  <Instagram size={24} />
                  <Twitter size={24} />
                  <Facebook size={24} />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.location.href = "#"}>
              <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white">
                <Dna size={24} />
              </div>
              <span className="text-xl font-serif font-bold tracking-tighter">
                LONGEVIDAD<span className="text-emerald-600">ACTIVA</span>
              </span>
            </div>
            
            <nav className="hidden md:flex space-x-8 text-sm font-medium text-zinc-600">
              {navLinks.map(link => (
                <button 
                  key={link.id} 
                  onClick={() => handleNavigate(link.id)}
                  className={`transition-colors ${currentSection === link.id ? 'text-emerald-600 font-bold' : 'hover:text-emerald-600'}`}
                >
                  {link.name}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-zinc-500 hover:text-emerald-600 transition-colors"
              >
                <Search size={20} />
              </button>
              <button 
                onClick={() => setIsMobileMenuOpen(true)}
                className="md:hidden p-2 text-zinc-500 hover:text-emerald-600 transition-colors"
              >
                <Menu size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {currentSection === 'resultados' && (
            <motion.div
              key="resultados"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
            >
              <div className="mb-12">
                <button 
                  onClick={() => handleNavigate('home')}
                  className="mb-8 flex items-center text-emerald-600 font-semibold hover:gap-2 transition-all"
                >
                  ← Volver al Inicio
                </button>
                <h2 className="text-3xl md:text-5xl font-serif mb-4">
                  Resultados para: <span className="italic text-emerald-600">"{searchQuery}"</span>
                </h2>
                <p className="text-zinc-500">
                  {searchResults.length > 0 
                    ? `Hemos encontrado ${searchResults.length} protocolos relacionados.` 
                    : 'No se encontraron protocolos para esa optimización.'}
                </p>
              </div>

              {searchResults.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {searchResults.map((item, index) => (
                    <div key={`${item.id}-${index}`}>
                      <ArticleCard 
                        category={item.category}
                        title={item.title}
                        excerpt={item.excerpt}
                        image={`https://picsum.photos/seed/${item.id}-${index}/800/450`}
                        onClick={() => handleNavigate(item.id)}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-zinc-50 rounded-3xl p-12 text-center border border-zinc-100">
                  <div className="w-16 h-16 bg-zinc-200 rounded-full flex items-center justify-center mx-auto mb-6 text-zinc-400">
                    <Search size={32} />
                  </div>
                  <h3 className="text-xl font-serif mb-4">Intenta con otros términos</h3>
                  <p className="text-zinc-500 max-w-md mx-auto mb-8">
                    Prueba buscando palabras como "NAD+", "Ayuno", "Sueño" o "Frío" para encontrar protocolos específicos.
                  </p>
                  <button 
                    onClick={() => setIsSearchOpen(true)}
                    className="px-8 py-3 bg-emerald-600 text-white rounded-full font-semibold hover:bg-emerald-700 transition-colors"
                  >
                    Abrir Buscador
                  </button>
                </div>
              )}
              
              <div className="mt-16">
                <AdBlock label="Anuncio en Resultados" />
              </div>
            </motion.div>
          )}

          {currentSection === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Hero Section */}
              <section className="relative py-20 lg:py-32 overflow-hidden">
                <div className="absolute inset-0 -z-10">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full opacity-10 blur-3xl bg-emerald-400 rounded-full" />
                </div>
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-[0.2em] text-emerald-700 uppercase bg-emerald-50 rounded-full">
                      El Futuro del Bienestar Humano
                    </span>
                    <h1 className="text-5xl md:text-7xl font-serif mb-8 leading-[1.1] tracking-tight max-w-4xl mx-auto">
                      Domina tu Biología: La Guía Definitiva de <span className="italic text-emerald-600">Biohacking</span>
                    </h1>
                    <p className="text-lg md:text-xl text-zinc-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                      Descubre cómo la <span className="font-semibold text-zinc-900">optimización celular</span> y la ciencia de la longevidad pueden transformar tu vitalidad hoy mismo.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                      <button 
                        onClick={() => scrollToSection('optimizacion')}
                        className="w-full sm:w-auto px-8 py-4 bg-zinc-900 text-white rounded-full font-semibold hover:bg-emerald-700 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-emerald-900/10 flex items-center justify-center group"
                      >
                        Empieza tu Transformación <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </button>
                      <button 
                        onClick={() => handleNavigate('tecnologia')}
                        className="w-full sm:w-auto px-8 py-4 bg-white border border-zinc-200 text-zinc-900 rounded-full font-semibold hover:bg-zinc-50 transition-all hover:scale-105 active:scale-95"
                      >
                        Explorar Protocolos
                      </button>
                    </div>
                  </motion.div>
                </div>
              </section>

              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <AdBlock label="Anuncio Horizontal - Debajo del Hero" />
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 py-12">
                  {/* Main Content */}
                  <div className="lg:col-span-8 space-y-16">
                    
                    {/* Section 1: Nutrición & Optimización Celular */}
                    <section id="optimizacion" className="scroll-mt-24">
                      <div className="flex items-center gap-3 mb-8">
                        <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600">
                          <Zap size={18} />
                        </div>
                        <h2 className="text-3xl font-serif">Optimización Celular</h2>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <ArticleCard 
                          category="Nutrición"
                          title="Autofagia: El sistema de reciclaje celular para la eterna juventud"
                          excerpt="Descubre cómo el ayuno intermitente y ciertos compuestos naturales activan la limpieza profunda de tus células."
                          image="https://picsum.photos/seed/cells/800/450"
                          onClick={() => handleNavigate('nutricion')}
                        />
                        <ArticleCard 
                          category="Suplementos"
                          title="NMN y Resveratrol: ¿Realidad o marketing en la longevidad?"
                          excerpt="Analizamos la evidencia científica detrás de los precursores de NAD+ y su impacto en el envejecimiento saludable."
                          image="https://picsum.photos/seed/supps/800/450"
                        />
                      </div>
                    </section>

                    <AdBlock label="Anuncio In-Feed - Entre Secciones" />

                    {/* Section 2: Ritmo Circadiano & Sueño */}
                    <section id="circadiano" className="scroll-mt-24">
                      <div className="flex items-center gap-3 mb-8">
                        <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                          <Moon size={18} />
                        </div>
                        <h2 className="text-3xl font-serif">Ritmo Circadiano</h2>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <ArticleCard 
                          category="Sueño"
                          title="Higiene del sueño: El pilar olvidado del biohacking"
                          excerpt="Por qué la oscuridad total y la temperatura de tu habitación son más importantes que cualquier suplemento."
                          image="https://picsum.photos/seed/sleep/800/450"
                        />
                        <ArticleCard 
                          category="Tecnología"
                          title="Luz azul y salud mitocondrial: Cómo protegerte"
                          excerpt="El impacto de las pantallas en tu producción de melatonina y estrategias prácticas para mitigar el daño."
                          image="https://picsum.photos/seed/light/800/450"
                          onClick={() => handleNavigate('tecnologia')}
                        />
                      </div>
                    </section>
                  </div>

                  {/* Sidebar */}
                  <aside className="lg:col-span-4 space-y-12">
                    <div className="glass-card p-8 rounded-3xl">
                      <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center text-white mb-6">
                        <Mail size={24} />
                      </div>
                      <h3 className="text-2xl font-serif mb-4">Protocolos Semanales</h3>
                      <p className="text-zinc-600 text-sm mb-6 leading-relaxed">
                        Únete a más de 50,000 biohackers. Recibe ciencia aplicada directamente en tu bandeja de entrada.
                      </p>
                      
                      {newsletterStatus === 'success' ? (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100 text-center"
                        >
                          <p className="text-emerald-800 font-semibold text-sm">
                            ¡Bienvenido a la comunidad! 
                          </p>
                          <p className="text-emerald-600 text-xs mt-2">
                            Revisa tu bandeja de entrada para tu primer protocolo.
                          </p>
                          <button 
                            onClick={() => setNewsletterStatus('idle')}
                            className="mt-4 text-[10px] font-bold uppercase tracking-widest text-emerald-700 hover:underline"
                          >
                            Volver
                          </button>
                        </motion.div>
                      ) : (
                        <form className="space-y-3" onSubmit={handleNewsletterSubmit}>
                          <div>
                            <input 
                              type="email" 
                              value={newsletterEmail}
                              onChange={(e) => {
                                setNewsletterEmail(e.target.value);
                                if (newsletterStatus === 'error') setNewsletterStatus('idle');
                              }}
                              placeholder="Tu mejor email" 
                              className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition-all ${
                                newsletterStatus === 'error' 
                                  ? 'border-red-300 focus:ring-red-500/20 focus:border-red-500' 
                                  : 'border-zinc-200 focus:ring-emerald-500/20 focus:border-emerald-500'
                              }`}
                            />
                            {newsletterStatus === 'error' && (
                              <p className="text-[10px] text-red-500 mt-1 ml-1 font-semibold">Por favor, ingresa un email válido.</p>
                            )}
                          </div>
                          <button 
                            type="submit"
                            disabled={newsletterStatus === 'loading'}
                            className="w-full py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 active:scale-95 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                          >
                            {newsletterStatus === 'loading' ? (
                              <span className="flex items-center gap-2">
                                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Cargando...
                              </span>
                            ) : 'Suscribirme Gratis'}
                          </button>
                          <p className="text-[10px] text-zinc-400 mt-4 text-center leading-relaxed">
                            Respetamos tu privacidad. Puedes darte de baja en cualquier momento. Consulta nuestra <button type="button" onClick={() => handleNavigate('privacidad')} className="underline hover:text-emerald-600">Política de Privacidad</button>.
                          </p>
                        </form>
                      )}
                    </div>
                    <AdBlock label="Anuncio Sidebar" />
                  </aside>
                </div>
              </div>
            </motion.div>
          )}

          {currentSection === 'tecnologia' && (
            <motion.div
              key="tecnologia"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-4xl mx-auto px-4 py-16"
            >
              <button 
                onClick={() => handleNavigate('home')}
                className="mb-8 flex items-center text-emerald-600 font-semibold hover:gap-2 transition-all"
              >
                ← Volver al Inicio
              </button>
              <article className="prose prose-zinc lg:prose-xl max-w-none">
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Tecnología</span>
                <h1 className="text-4xl md:text-6xl font-serif mt-4 mb-8">Biohacking y Wearables: El Futuro en tu Muñeca</h1>
                <img src="https://picsum.photos/seed/bio-tech/1200/600" className="rounded-3xl mb-12 w-full" alt="Tech" />
                
                <div className="space-y-6 text-zinc-700 leading-relaxed">
                  <p className="text-xl font-medium text-zinc-900">En la última década, la frontera entre la biología humana y la tecnología digital se ha vuelto casi invisible. Lo que antes era territorio exclusivo de laboratorios de alto rendimiento o atletas olímpicos, hoy está disponible en la muñeca de cualquier persona interesada en su bienestar.</p>
                  
                  <p>El biohacking, en su esencia, es la práctica de utilizar la ciencia y la tecnología para "hackear" nuestra propia biología y optimizar nuestro rendimiento físico y mental. Y en este viaje, los gadgets juegan un papel fundamental: son nuestros ojos internos, proporcionándonos datos en tiempo real que antes eran imposibles de obtener sin una extracción de sangre o un estudio clínico.</p>

                  <h2 className="text-3xl font-serif text-zinc-900 mt-12 mb-4">El Anillo que lo Sabe Todo: Oura Ring</h2>
                  <p>Uno de los pioneros y líderes indiscutibles es el <strong>Oura Ring</strong>. A diferencia de los relojes inteligentes tradicionales, el Oura se centra obsesivamente en la recuperación. Al medir la Variabilidad de la Frecuencia Cardíaca (HRV), la temperatura corporal y la frecuencia respiratoria desde los vasos sanguíneos del dedo (mucho más precisos que la muñeca), este gadget ofrece una "Puntuación de Disposición" (Readiness Score).</p>
                  
                  <AdBlock label="Anuncio en Artículo" />

                  <p>¿Por qué es esto revolucionario? Porque nos enseña a escuchar a nuestro cuerpo. Si tu HRV es baja y tu temperatura ha subido ligeramente, el Oura te avisará de que podrías estar enfermando o que el entrenamiento de ayer fue demasiado intenso. Es el fin de las suposiciones; es la era de la gestión biológica basada en datos.</p>

                  <h2 className="text-3xl font-serif text-zinc-900 mt-12 mb-4">La Revolución Metabólica: Monitores de Glucosa Continuos (CGM)</h2>
                  <p>Si el Oura Ring domina el sueño, los <strong>Monitores de Glucosa Continuos (CGM)</strong> están transformando nuestra relación con la comida. Originalmente diseñados para diabéticos, los biohackers los utilizan para ver cómo reacciona su azúcar en sangre ante alimentos específicos en tiempo real.</p>
                  <p>Descubrir que una "saludable" avena eleva tu glucosa tanto como un refresco es una revelación que cambia vidas. Estos dispositivos consisten en un pequeño sensor con un filamento que se inserta bajo la piel del brazo, enviando datos constantes a tu smartphone. Al mantener la glucosa estable, no solo evitamos enfermedades crónicas, sino que eliminamos los bajones de energía de la tarde y optimizamos la quema de grasa.</p>

                  <h2 className="text-3xl font-serif text-zinc-900 mt-12 mb-4">Más allá del Seguimiento: Dispositivos de Intervención</h2>
                  <p>Pero el biohacking no se trata solo de medir, sino también de actuar. Dispositivos como el <strong>Apollo Neuro</strong> utilizan vibraciones táctiles para calmar el sistema nervioso, ayudando a pasar del estado de "lucha o huida" al de "descanso y digestión". Por otro lado, bandas de neurofeedback como <strong>Muse</strong> nos enseñan a meditar midiendo nuestras ondas cerebrales en tiempo real.</p>

                  <p>Estamos entrando en la era del "Yo Cuantificado". Estos gadgets no son solo juguetes tecnológicos; son herramientas de empoderamiento. Nos devuelven la soberanía sobre nuestra salud, permitiéndonos tomar decisiones informadas basadas en nuestra biología única.</p>
                </div>
              </article>
              <AdBlock label="Anuncio Final de Artículo" />
            </motion.div>
          )}

          {currentSection === 'nutricion' && (
            <motion.div
              key="nutricion"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-4xl mx-auto px-4 py-16"
            >
              <button 
                onClick={() => handleNavigate('home')}
                className="mb-8 flex items-center text-emerald-600 font-semibold hover:gap-2 transition-all"
              >
                ← Volver al Inicio
              </button>
              <article className="prose prose-zinc lg:prose-xl max-w-none">
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Nutrición</span>
                <h1 className="text-4xl md:text-6xl font-serif mt-4 mb-8">Dietas de Longevidad: Nutriendo tus Células</h1>
                <img src="https://picsum.photos/seed/longevity-diet/1200/600" className="rounded-3xl mb-12 w-full" alt="Nutrition" />
                
                <div className="space-y-6 text-zinc-700 leading-relaxed">
                  <p className="text-xl font-medium text-zinc-900">La nutrición es, quizás, la herramienta más potente que tenemos para influir en nuestra expresión genética y longevidad. No se trata solo de calorías, sino de información molecular que enviamos a nuestras células cada vez que comemos.</p>
                  
                  <p>En el mundo del biohacking, la dieta no es un destino estático, sino un protocolo dinámico que se ajusta según nuestras necesidades biológicas. Desde el ayuno intermitente hasta la dieta cetogénica cíclica, el objetivo es siempre el mismo: optimizar la función mitocondrial y reducir la inflamación sistémica.</p>

                  <h2 className="text-3xl font-serif text-zinc-900 mt-12 mb-4">El Poder de la Restricción Calórica y el Ayuno</h2>
                  <p>La ciencia es clara: la restricción calórica moderada y el ayuno intermitente son los métodos más consistentes para extender la vida en casi todas las especies estudiadas. Al ayunar, activamos la <strong>autofagia</strong>, un proceso de limpieza celular donde el cuerpo recicla componentes dañados y proteínas mal plegadas.</p>
                  
                  <AdBlock label="Anuncio en Nutrición" />

                  <p>Implementar una ventana de alimentación de 8 horas (protocolo 16:8) es el punto de entrada perfecto. Esto permite que los niveles de insulina bajen lo suficiente como para activar las vías de longevidad como las sirtuinas y AMPK, mientras se inhibe la vía mTOR, asociada con el crecimiento pero también con el envejecimiento celular acelerado.</p>

                  <h2 className="text-3xl font-serif text-zinc-900 mt-12 mb-4">Alimentos que Activan Genes de Juventud</h2>
                  <p>No todos los alimentos son iguales. Los polifenoles presentes en el té verde (EGCG), el vino tinto (resveratrol) y la cúrcuma (curcumina) actúan como horméticos suaves, estresando positivamente a nuestras células para que se vuelvan más fuertes y resilientes.</p>
                  <p>Una dieta de longevidad debe ser rica en crucíferas (brócoli, col rizada) por su contenido en sulforafano, y grasas saludables como el ácido oleico del aceite de oliva virgen extra, que ha demostrado proteger el ADN del daño oxidativo.</p>

                  <h2 className="text-3xl font-serif text-zinc-900 mt-12 mb-4">Personalización mediante Nutrigenómica</h2>
                  <p>El futuro de la nutrición es individual. Gracias a los tests de ADN, ahora podemos saber si metabolizamos bien las grasas saturadas o si necesitamos un aporte extra de vitaminas del grupo B. La nutrición de precisión elimina el ensayo y error, permitiéndonos comer exactamente lo que nuestro código genético requiere para prosperar.</p>

                  <p>En conclusión, comer para la longevidad es un acto de equilibrio entre el placer y la disciplina científica. Al elegir alimentos densos en nutrientes y respetar los ritmos naturales de hambre y saciedad, estamos construyendo los cimientos de una vida centenaria.</p>
                </div>
              </article>
              <AdBlock label="Anuncio Final de Nutrición" />
            </motion.div>
          )}

          {currentSection === 'sueno' && (
            <motion.div
              key="sueno"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-4xl mx-auto px-4 py-16"
            >
              <button 
                onClick={() => handleNavigate('home')}
                className="mb-8 flex items-center text-emerald-600 font-semibold hover:gap-2 transition-all"
              >
                ← Volver al Inicio
              </button>
              <article className="prose prose-zinc lg:prose-xl max-w-none">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Sueño</span>
                <h1 className="text-4xl md:text-6xl font-serif mt-4 mb-8">Higiene del Sueño y Ritmo Circadiano: El Pilar Maestro de la Longevidad</h1>
                <img src="https://picsum.photos/seed/sleep-science/1200/600" className="rounded-3xl mb-12 w-full" alt="Sueño Profundo" />
                
                <div className="space-y-6 text-zinc-700 leading-relaxed">
                  <p className="text-xl font-medium text-zinc-900">El sueño no es un estado pasivo de descanso, sino un proceso biológico activo y altamente orquestado, esencial para la reparación celular, la consolidación de la memoria y la desintoxicación cerebral.</p>
                  
                  <p>En el contexto del biohacking, optimizar el sueño es la intervención con mayor retorno de inversión. Sin una base sólida de descanso, cualquier protocolo de nutrición o ejercicio verá sus resultados drásticamente limitados. La clave reside en entender y respetar nuestro <strong>ritmo circadiano</strong>, el reloj biológico interno de 24 horas que regula casi todos los procesos fisiológicos.</p>

                  <h2 className="text-3xl font-serif text-zinc-900 mt-12 mb-4">La Ciencia del Ritmo Circadiano</h2>
                  <p>Nuestro cuerpo está diseñado para sincronizarse con los ciclos de luz y oscuridad de la naturaleza. El núcleo supraquiasmático en el cerebro utiliza la luz solar como la señal principal para coordinar la liberación de hormonas. Por la mañana, la luz azul del sol inhibe la melatonina y eleva el cortisol para darnos energía. Por la noche, la ausencia de luz debería disparar la producción de melatonina.</p>
                  
                  <AdBlock label="Anuncio sobre Sueño" />

                  <h2 className="text-3xl font-serif text-zinc-900 mt-12 mb-4">Protocolos de Higiene del Sueño</h2>
                  <p>La <strong>higiene del sueño</strong> moderna se ve amenazada por la luz artificial y el estrés crónico. Para optimizar tu arquitectura del sueño, considera estos pilares:</p>
                  <ul>
                    <li><strong>Control Lumínico:</strong> Evita la luz azul de pantallas al menos 90 minutos antes de dormir. Utiliza gafas bloqueadoras o luces rojas en casa por la noche.</li>
                    <li><strong>Temperatura:</strong> El cuerpo necesita bajar su temperatura central para iniciar el sueño profundo. Mantén tu habitación entre 18°C y 20°C.</li>
                    <li><strong>Consistencia:</strong> Despiértate y acuéstate a la misma hora todos los días, incluso los fines de semana, para estabilizar tu reloj interno.</li>
                  </ul>

                  <h2 className="text-3xl font-serif text-zinc-900 mt-12 mb-4">Arquitectura del Sueño y Longevidad</h2>
                  <p>Durante el sueño profundo, el sistema glinfático se activa, eliminando los desechos metabólicos del cerebro, como la proteína beta-amiloide. Un sueño optimizado no solo mejora tu rendimiento diario, sino que es tu mejor defensa contra enfermedades neurodegenerativas y el envejecimiento acelerado.</p>
                </div>
              </article>
              <AdBlock label="Anuncio Final de Sueño" />
            </motion.div>
          )}

          {currentSection === 'suplementos' && (
            <motion.div
              key="suplementos"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-4xl mx-auto px-4 py-16"
            >
              <button 
                onClick={() => handleNavigate('home')}
                className="mb-8 flex items-center text-emerald-600 font-semibold hover:gap-2 transition-all"
              >
                ← Volver al Inicio
              </button>
              <article className="prose prose-zinc lg:prose-xl max-w-none">
                <span className="text-xs font-bold text-purple-600 uppercase tracking-widest">Suplementos</span>
                <h1 className="text-4xl md:text-6xl font-serif mt-4 mb-8">Suplementación Inteligente: Biohacking para la Optimización Celular</h1>
                <img src="https://picsum.photos/seed/supplements-science/1200/600" className="rounded-3xl mb-12 w-full" alt="Suplementación Avanzada" />
                
                <div className="space-y-6 text-zinc-700 leading-relaxed">
                  <p className="text-xl font-medium text-zinc-900">La suplementación inteligente no consiste en tomar pastillas al azar, sino en una intervención dirigida para corregir deficiencias, potenciar vías metabólicas y proteger la integridad de nuestras células.</p>
                  
                  <p>En la era de la <strong>optimización celular</strong>, buscamos compuestos que actúen sobre los mecanismos fundamentales del envejecimiento. Esto incluye la protección de los telómeros, la mejora de la función mitocondrial y la eliminación de células senescentes.</p>

                  <h2 className="text-3xl font-serif text-zinc-900 mt-12 mb-4">Precursores de NAD+ y Energía Celular</h2>
                  <p>El NAD+ es una coenzima vital para la producción de energía y la reparación del ADN. Con la edad, nuestros niveles de NAD+ caen drásticamente. Suplementos como el NMN (Mononucleótido de Nicotinamida) o el NR (Ribósido de Nicotinamida) han demostrado en estudios preliminares su capacidad para elevar estos niveles, mejorando la vitalidad celular y la función metabólica.</p>
                  
                  <AdBlock label="Anuncio sobre Suplementos" />

                  <h2 className="text-3xl font-serif text-zinc-900 mt-12 mb-4">Senolíticos: Limpiando el "Ruido" Biológico</h2>
                  <p>Las células senescentes, también conocidas como "células zombis", son células que han dejado de dividirse pero no mueren, emitiendo señales inflamatorias que dañan a las células vecinas. La <strong>suplementación inteligente</strong> con compuestos como la quercetina o la fisetina ayuda al cuerpo a identificar y eliminar estas células, reduciendo la inflamación sistémica.</p>

                  <h2 className="text-3xl font-serif text-zinc-900 mt-12 mb-4">Micronutrientes Esenciales y Adaptógenos</h2>
                  <p>Antes de pasar a los compuestos avanzados, es vital asegurar los fundamentos: Magnesio, Vitamina D3/K2 y Omega-3. Además, el uso de adaptógenos como la Ashwagandha o la Rhodiola Rosea ayuda al cuerpo a gestionar el estrés, protegiendo el eje HPA y manteniendo el equilibrio hormonal necesario para la longevidad.</p>

                  <p>Recuerda que la suplementación debe ser personalizada. Lo que funciona para una persona puede no ser óptimo para otra. La clave es medir, probar y ajustar basándose en datos biológicos reales.</p>
                </div>
              </article>
              <AdBlock label="Anuncio Final de Suplementos" />
            </motion.div>
          )}

          {currentSection === 'protocolos' && (
            <motion.div
              key="protocolos"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-4xl mx-auto px-4 py-16"
            >
              <button 
                onClick={() => handleNavigate('home')}
                className="mb-8 flex items-center text-emerald-600 font-semibold hover:gap-2 transition-all"
              >
                ← Volver al Inicio
              </button>
              <article className="prose prose-zinc lg:prose-xl max-w-none">
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Protocolos</span>
                <h1 className="text-4xl md:text-6xl font-serif mt-4 mb-8">Protocolos de Longevidad: De la Teoría a la Práctica</h1>
                <img src="https://picsum.photos/seed/protocols/1200/600" className="rounded-3xl mb-12 w-full" alt="Protocolos" />
                
                <div className="space-y-6 text-zinc-700 leading-relaxed">
                  <p className="text-xl font-medium text-zinc-900">Un protocolo de longevidad es una hoja de ruta personalizada diseñada para optimizar los biomarcadores de salud y extender el periodo de vida saludable (healthspan).</p>
                  
                  <p>No existe un protocolo único para todos. La clave del biohacking exitoso es la iteración basada en datos. Sin embargo, existen ciertos pilares fundamentales que todo protocolo avanzado debería considerar.</p>

                  <h2 className="text-3xl font-serif text-zinc-900 mt-12 mb-4">Protocolo de Exposición Térmica</h2>
                  <p>La hormesis es el proceso por el cual un estrés leve fortalece al organismo. La exposición al frío (duchas frías, baños de hielo) activa la grasa parda y mejora la sensibilidad a la insulina. Por otro lado, la sauna regular ha demostrado reducir la mortalidad por todas las causas al activar las proteínas de choque térmico (HSPs).</p>
                  
                  <AdBlock label="Anuncio en Protocolos" />

                  <h2 className="text-3xl font-serif text-zinc-900 mt-12 mb-4">Protocolo de Entrenamiento de Fuerza y VO2 Max</h2>
                  <p>La masa muscular es el "seguro de vida" metabólico. Un protocolo de longevidad debe incluir al menos 3 sesiones de fuerza por semana. Paralelamente, el VO2 Max (capacidad aeróbica máxima) es uno de los predictores más fuertes de longevidad; el entrenamiento de intervalos de alta intensidad (HIIT) es esencial para mantenerlo.</p>

                  <h2 className="text-3xl font-serif text-zinc-900 mt-12 mb-4">Protocolo de Gestión del Estrés y Meditación</h2>
                  <p>El cortisol crónicamente elevado acelera el acortamiento de los telómeros. Protocolos de respiración (como el método Wim Hof o Box Breathing) y la meditación diaria no son opcionales, sino herramientas críticas para mantener la resiliencia del sistema nervioso autónomo.</p>
                </div>
              </article>
            </motion.div>
          )}

          {['privacidad', 'cookies', 'terminos', 'descargo'].includes(currentSection) && (
            <motion.div
              key="legal"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-3xl mx-auto px-4 py-20"
            >
              <button 
                onClick={() => handleNavigate('home')}
                className="mb-12 flex items-center text-emerald-600 font-semibold hover:gap-2 transition-all"
              >
                ← Volver al Inicio
              </button>
              
              <div className="prose prose-zinc max-w-none">
                {currentSection === 'privacidad' && (
                  <>
                    <h1 className="text-3xl font-serif mb-8">Política de Privacidad</h1>
                    <p>En Longevidad Activa, valoramos y respetamos su privacidad. Esta política detalla cómo recopilamos, usamos y protegemos su información personal al utilizar nuestra plataforma de biohacking y salud.</p>
                    <h3>Recopilación de Datos</h3>
                    <p>Recopilamos información que usted nos proporciona directamente, como su nombre y correo electrónico al suscribirse a nuestro boletín de protocolos. También recopilamos datos técnicos de navegación para mejorar la experiencia del usuario.</p>
                    <h3>Uso de la Información</h3>
                    <p>Su información se utiliza exclusivamente para enviarle contenido educativo, actualizaciones de protocolos y, si lo permite, comunicaciones promocionales relacionadas con la longevidad. Nunca venderemos sus datos a terceros.</p>
                  </>
                )}

                {currentSection === 'cookies' && (
                  <>
                    <h1 className="text-3xl font-serif mb-8">Política de Cookies</h1>
                    <p>Este sitio utiliza cookies para mejorar su experiencia de navegación y analizar nuestro tráfico.</p>
                    <h3>¿Qué son las cookies?</h3>
                    <p>Las cookies son pequeños archivos de texto que se almacenan en su dispositivo cuando visita un sitio web. Nos ayudan a recordar sus preferencias y a entender cómo interactúa con nuestro contenido científico.</p>
                    <h3>Tipos de Cookies que utilizamos</h3>
                    <ul>
                      <li><strong>Esenciales:</strong> Necesarias para el funcionamiento básico del sitio.</li>
                      <li><strong>Analíticas:</strong> Nos permiten medir el rendimiento de nuestros artículos sobre biohacking.</li>
                      <li><strong>Publicitarias:</strong> Utilizadas por Google AdSense para mostrar anuncios relevantes basados en sus intereses de salud.</li>
                    </ul>
                  </>
                )}

                {currentSection === 'terminos' && (
                  <>
                    <h1 className="text-3xl font-serif mb-8">Términos y Condiciones</h1>
                    <p>Al acceder a Longevidad Activa, usted acepta cumplir con estos términos de servicio y todas las leyes y regulaciones aplicables.</p>
                    <h3>Uso del Contenido</h3>
                    <p>Todo el contenido publicado en este sitio es propiedad intelectual de Longevidad Activa. Se permite el uso personal y no comercial de la información, siempre que se cite la fuente original.</p>
                    <h3>Limitación de Responsabilidad</h3>
                    <p>Longevidad Activa no se hace responsable de las decisiones tomadas por el usuario basadas en la información proporcionada. El biohacking implica riesgos individuales que deben ser gestionados bajo supervisión profesional.</p>
                  </>
                )}

                {currentSection === 'descargo' && (
                  <>
                    <h1 className="text-3xl font-serif mb-8">Descargo de Responsabilidad Médico</h1>
                    <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100 mb-8">
                      <p className="text-emerald-900 font-medium m-0">IMPORTANTE: Lea este descargo cuidadosamente antes de implementar cualquier protocolo.</p>
                    </div>
                    <p>El contenido de Longevidad Activa, incluyendo textos, gráficos, imágenes y otros materiales, tiene un propósito puramente informativo y educativo. <strong>Este contenido NO pretende sustituir el consejo, diagnóstico o tratamiento médico profesional.</strong></p>
                    <p>Nunca ignore el consejo de su médico ni retrase la búsqueda de tratamiento debido a algo que haya leído en este sitio. El biohacking, el uso de suplementos y los cambios drásticos en el estilo de vida pueden tener efectos secundarios y contraindicaciones según su historial clínico personal.</p>
                    <p>La implementación de cualquier sugerencia, protocolo o suplemento mencionado en esta plataforma se realiza bajo su propio riesgo y responsabilidad.</p>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-zinc-900 text-zinc-400 py-16 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 text-white mb-6 cursor-pointer" onClick={() => window.location.href = "#"}>
                <Dna size={24} className="text-emerald-500" />
                <span className="text-xl font-serif font-bold tracking-tighter">
                  LONGEVIDAD<span className="text-emerald-500">ACTIVA</span>
                </span>
              </div>
              <p className="text-sm leading-relaxed max-w-sm">
                Nuestra misión es democratizar el acceso a la ciencia de la longevidad y el biohacking, proporcionando herramientas prácticas para una vida más larga y vibrante.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-6 uppercase tracking-widest text-xs">Explorar</h4>
              <ul className="space-y-4 text-sm">
                <li><button onClick={() => handleNavigate('protocolos')} className="hover:text-emerald-500 transition-colors">Protocolos</button></li>
                <li><button onClick={() => handleNavigate('suplementos')} className="hover:text-emerald-500 transition-colors">Suplementación</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-6 uppercase tracking-widest text-xs">Legal</h4>
              <ul className="space-y-4 text-sm">
                <li><button onClick={() => handleNavigate('privacidad')} className="hover:text-emerald-500 transition-colors">Privacidad</button></li>
                <li><button onClick={() => handleNavigate('cookies')} className="hover:text-emerald-500 transition-colors">Cookies</button></li>
                <li><button onClick={() => handleNavigate('terminos')} className="hover:text-emerald-500 transition-colors">Términos</button></li>
                <li><button onClick={() => handleNavigate('descargo')} className="hover:text-emerald-500 transition-colors">Descargo Médico</button></li>
              </ul>
            </div>
          </div>

          <div className="pt-12 border-t border-zinc-800 flex flex-col md:row items-center justify-between gap-6">
            <p className="text-xs">
              © {new Date().getFullYear()} Longevidad Activa. Todos los derechos reservados.
            </p>
            <div className="flex gap-6">
              <a 
                href="https://instagram.com/longevidadactiva" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-zinc-400 hover:text-emerald-500 hover:-translate-y-1 transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://twitter.com/longevidadact" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-zinc-400 hover:text-emerald-500 hover:-translate-y-1 transition-all duration-300"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a 
                href="https://facebook.com/longevidadactiva" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-zinc-400 hover:text-emerald-500 hover:-translate-y-1 transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
            </div>
          </div>
          
          <div className="mt-12 p-6 bg-zinc-800/50 rounded-2xl text-[10px] leading-relaxed text-zinc-500 text-center">
            <p>
              DESCARGO DE RESPONSABILIDAD: El contenido de este sitio web es solo para fines informativos y educativos. No constituye consejo médico, diagnóstico o tratamiento. Siempre consulte con un profesional de la salud calificado antes de realizar cambios en su dieta, rutina de ejercicios o régimen de suplementos.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
