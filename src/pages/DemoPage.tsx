import { motion, AnimatePresence } from "motion/react";
import { 
  MessageCircle, 
  Clock, 
  Brain, 
  Zap, 
  Check, 
  Menu, 
  X, 
  ArrowRight,
  ShieldCheck,
  Star,
  ChevronDown,
  Sparkles,
  Stethoscope,
  Activity,
  Calendar
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// --- Components ---

const FAQItemDemo: React.FC<{ q: string; a: string; index: number }> = ({ q, a, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="rounded-2xl bg-brand-bg border border-white/5 overflow-hidden hover:border-brand-cyan/30 transition-all"
    >
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 text-left flex justify-between items-center gap-4 group"
      >
        <h3 className={`text-lg font-bold transition-colors ${isOpen ? 'text-brand-cyan' : 'text-white'}`}>{q}</h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className={`shrink-0 ${isOpen ? 'text-brand-cyan' : 'text-gray-500'}`}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-6 pb-6 pt-0 border-t border-white/5">
              <p className="text-gray-400 text-sm leading-relaxed mt-4">{a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const WHATSAPP_NUMBER = "5532984963439";

const getWAUrl = (text: string) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

const DemoNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? "bg-brand-bg/90 backdrop-blur-md py-3 border-b border-brand-cyan/20" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold tracking-tighter text-white">Sofia Med</span>
          <div className="w-2 h-2 rounded-full bg-brand-cyan pulsing-dot" />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-sm font-medium text-gray-300 hover:text-brand-cyan transition-colors">
            Voltar para o Início
          </Link>
          <a 
            href="#beneficios" 
            className="text-sm font-medium text-gray-300 hover:text-brand-cyan transition-colors"
          >
            Vantagens
          </a>
          <a 
            href="#como-funciona" 
            className="text-sm font-medium text-gray-300 hover:text-brand-cyan transition-colors"
          >
            Como Funciona
          </a>
          <a 
            href={getWAUrl("Olá! Vim pela página de demonstração e gostaria de agendar uma apresentação gratuita da Sofia Med.")}
            target="_blank"
            rel="noreferrer"
            className="bg-brand-primary hover:bg-brand-primary/90 text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-transform hover:scale-105 shadow-cyan-glow border border-brand-cyan/30"
          >
            Solicitar Demonstração
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 right-0 bg-brand-deep border-b border-brand-cyan/20 p-4"
          >
            <div className="flex flex-col gap-4 text-center">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium text-gray-300">
                Voltar para o Início
              </Link>
              <a 
                href="#beneficios" 
                onClick={() => setIsMenuOpen(false)}
                className="text-lg font-medium text-gray-300"
              >
                Vantagens
              </a>
              <a 
                href="#como-funciona" 
                onClick={() => setIsMenuOpen(false)}
                className="text-lg font-medium text-gray-300"
              >
                Como Funciona
              </a>
              <a 
                href={getWAUrl("Olá! Vim pela página de demonstração e gostaria de agendar uma apresentação da Sofia Med na minha clínica.")}
                target="_blank"
                rel="noreferrer"
                className="bg-brand-primary text-white px-6 py-3 rounded-full font-semibold glow-cyan"
              >
                Solicitar Demonstração
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default function DemoPage() {
  const [formData, setFormData] = useState({
    name: "",
    clinic: "",
    specialty: "",
    phone: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Construct pre-filled message with lead info
    const message = `Olá! Acabei de preencher a solicitação de demonstração gratuita de 30 dias no site da Sofia Med.\n\n` +
      `🩺 *DADOS DA SOLICITAÇÃO:*\n` +
      `• *Nome:* ${formData.name || 'Não informado'}\n` +
      `• *Clínica:* ${formData.clinic || 'Não informado'}\n` +
      `• *Especialidade:* ${formData.specialty || 'Não informado'}\n` +
      `• *WhatsApp:* ${formData.phone || 'Não informado'}\n\n` +
      `Gostaria de agendar a minha demonstração gratuita de 30 dias da Sofia Med!`;
    
    window.open(getWAUrl(message), "_blank");
  };

  return (
    <div className="min-h-screen bg-brand-bg text-white selection:bg-brand-cyan/30 overflow-x-hidden">
      <DemoNavbar />

      {/* Hero Section with Form */}
      <section className="relative pt-32 pb-20 overflow-hidden hero-gradient min-h-screen flex items-center">
        <div className="absolute inset-0 z-0 opacity-20">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 bg-brand-cyan rounded-full"
              initial={{ 
                x: Math.random() * 100 + "%", 
                y: Math.random() * 100 + "%",
                opacity: Math.random()
              }}
              animate={{ 
                y: [null, "-20%", "120%"],
                opacity: [0, 1, 0]
              }}
              transition={{ 
                duration: 12 + Math.random() * 15, 
                repeat: Infinity, 
                ease: "linear" 
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 grid lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left lg:col-span-7"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-cyan/10 border border-brand-cyan/30 text-brand-cyan text-xs font-bold uppercase tracking-wider mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              Oferta Especial de Lançamento
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-gradient">
              Experimente a Sofia Med Grátis por 30 Dias na Sua Clínica
            </h1>
            
            <p className="text-lg text-gray-300 mb-8 max-w-xl leading-relaxed mx-auto lg:mx-0">
              Veja na prática como nossa inteligência artificial atende pacientes, tira dúvidas sobre procedimentos e realiza agendamentos integrados 24h por dia. Sem fidelidade, sem complicação.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 max-w-lg mx-auto lg:mx-0 text-left mb-8">
              {[
                "Demonstração 100% gratuita",
                "Sem necessidade de cartão de crédito",
                "Configuração rápida em 15 minutos",
                "Suporte prioritário na implementação"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-brand-cyan/20 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-brand-cyan" />
                  </div>
                  <span className="text-sm text-gray-300 font-medium">{item}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4 justify-center lg:justify-start">
              <div className="flex -space-x-3">
                <img className="w-9 h-9 rounded-full border-2 border-brand-bg relative z-30" src="https://i.pravatar.cc/100?u=doc1" alt="Feedback Doctor" />
                <img className="w-9 h-9 rounded-full border-2 border-brand-bg relative z-20" src="https://i.pravatar.cc/100?u=doc2" alt="Feedback Doctor" />
                <img className="w-9 h-9 rounded-full border-2 border-brand-bg relative z-10" src="https://i.pravatar.cc/100?u=doc3" alt="Feedback Doctor" />
              </div>
              <div className="text-left text-xs text-gray-400">
                <div className="flex text-amber-400">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                </div>
                <span>Mais de 120 clínicas médicas já agendam com Sofia Med</span>
              </div>
            </div>
          </motion.div>

          {/* Lead Capture Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 w-full"
          >
            <div className="bg-brand-deep/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-purple-glow relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-cyan/5 rounded-full blur-2xl" />
              
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-2">Solicitar Demonstração</h3>
                <p className="text-sm text-gray-400 mb-6">Preencha os campos abaixo e inicie seu teste grátis de 30 dias diretamente via WhatsApp.</p>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">Seu Nome completo</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Ex: Dr. Carlos Silva"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-3 bg-brand-bg border border-white/10 rounded-xl text-white text-sm focus:border-brand-cyan focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">Nome da Clínica / Consultório</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Ex: Clínica Sorriso & Saúde"
                      value={formData.clinic}
                      onChange={(e) => setFormData({...formData, clinic: e.target.value})}
                      className="w-full px-4 py-3 bg-brand-bg border border-white/10 rounded-xl text-white text-sm focus:border-brand-cyan focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">Especialidade Principal</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Ex: Pediatria, Odontologia, Geral..."
                      value={formData.specialty}
                      onChange={(e) => setFormData({...formData, specialty: e.target.value})}
                      className="w-full px-4 py-3 bg-brand-bg border border-white/10 rounded-xl text-white text-sm focus:border-brand-cyan focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">Número do WhatsApp</label>
                    <input 
                      type="tel" 
                      required
                      placeholder="Ex: (21) 99999-9999"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-4 py-3 bg-brand-bg border border-white/10 rounded-xl text-white text-sm focus:border-brand-cyan focus:outline-none transition-colors"
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-4 mt-6 bg-brand-cyan text-brand-bg rounded-xl font-black text-center uppercase tracking-wide hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-cyan-glow"
                  >
                    Iniciar Demonstração 30 dias grátis <ArrowRight className="w-4 h-4" />
                  </button>
                </form>

                <p className="text-center text-[11px] text-gray-500 mt-4 leading-relaxed">
                  Ao clicar, você será redirecionado para o WhatsApp para validar sua clínica e ativar o período de testes de 30 dias.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Key Benefits of Sofia Med for Clinical Practice */}
      <section id="beneficios" className="py-20 bg-brand-deep/30 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <p className="text-brand-cyan text-xs font-bold uppercase tracking-widest text-center mb-2">A Solução Ideal</p>
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
            Por que clínicas escolhem a Sofia Med?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-brand-bg/60 p-8 rounded-2xl border border-white/5">
              <div className="w-12 h-12 rounded-xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-primary mb-6">
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Redução Drástica de Faltas</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Sofia Med realiza lembretes proativos e automáticos. Caso o paciente cancele, ela reorganiza e oferece a vaga para quem está na fila de espera imediatamente.
              </p>
            </div>

            <div className="bg-brand-bg/60 p-8 rounded-2xl border border-white/5">
              <div className="w-12 h-12 rounded-xl bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center text-brand-cyan mb-6">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Agenda Otimizada 24/7</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Pare de perder marcações aos finais de semana e madrugadas. Permita que os pacientes agendem quando sentirem a necessidade, sincronizando em tempo real com seu software.
              </p>
            </div>

            <div className="bg-brand-bg/60 p-8 rounded-2xl border border-white/5">
              <div className="w-12 h-12 rounded-xl bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center text-brand-gold mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Privacidade & Conformidade</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Total segurança no tráfego de prontuários, especialidades e informações sensíveis, de total acordo com as regras da LGPD em saúde.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="como-funciona" className="py-20 bg-brand-deep/50 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">Demonstração Simples em 3 Etapas</h2>
          
          <div className="grid md:grid-cols-3 gap-12 relative">
            <div className="text-center relative">
              <div className="w-16 h-16 rounded-full bg-brand-cyan/10 border-2 border-brand-cyan/50 text-brand-cyan flex items-center justify-center text-2xl font-black mx-auto mb-6">
                01
              </div>
              <h3 className="text-xl font-bold mb-2">1. Preencha o Formulário</h3>
              <p className="text-gray-400 text-sm">
                Insira as informações de sua clínica ou consultório e selecione a especialidade médica.
              </p>
            </div>

            <div className="text-center relative">
              <div className="w-16 h-16 rounded-full bg-brand-primary/10 border-2 border-brand-primary/50 text-brand-primary flex items-center justify-center text-2xl font-black mx-auto mb-6">
                02
              </div>
              <h3 className="text-xl font-bold mb-2">2. Simule no WhatsApp</h3>
              <p className="text-gray-400 text-sm">
                Nossa equipe irá liberar o número teste para você simular como um paciente real agendando consultas.
              </p>
            </div>

            <div className="text-center relative">
              <div className="w-16 h-16 rounded-full bg-brand-gold/10 border-2 border-brand-gold/50 text-brand-gold flex items-center justify-center text-2xl font-black mx-auto mb-6">
                03
              </div>
              <h3 className="text-xl font-bold mb-2">3. Uso Real de 30 Dias</h3>
              <p className="text-gray-400 text-sm">
                Após validar a experiência, configuramos em seu número próprio para rodar gratuitamente por 30 dias completos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Extra Demo */}
      <section className="py-20 bg-brand-deep/20 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center font-sans tracking-tight">Dúvidas sobre o Período de Testes</h2>
          <div className="space-y-4">
            {[
              {
                q: "A demonstração de 30 dias é realmente gratuita?",
                a: "Sim, absolutamente. Você não digita dados de pagamento ou cartão de crédito. É focado para você avaliar os benefícios e ver a satisfação dos pacientes antes de decidir."
              },
              {
                q: "Como a Sofia Med sabe quais convênios eu atendo?",
                a: "Durante o período de configuração da demonstração, inserimos todas as regras básicas de convênios, consultas particulares e tabelas de procedimentos que você utiliza na clínica."
              },
              {
                q: "Preciso de ajuda de especialistas para fazer funcionar?",
                a: "Nenhum esforço técnico da sua parte é exigido. Nossa equipe profissional de implementação cuida de toda a configuração, integração automática e ativação para você."
              },
              {
                q: "Posso cancelar se eu não gostar?",
                a: "Com certeza. Como não há contrato ou planos ativos antes do fim da demonstração, se não fizer sentido para sua clínica, basta desvincular do WhatsApp sem nenhum custo."
              }
            ].map((faq, i) => (
              <FAQItemDemo key={i} q={faq.q} a={faq.a} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 lg:py-24 px-4 md:px-8 overflow-hidden border-t border-white/5">
        <div className="max-w-5xl mx-auto rounded-[2rem] md:rounded-[3rem] p-10 md:p-20 bg-gradient-to-br from-brand-primary to-brand-bg border border-brand-cyan/20 text-center relative overflow-hidden shadow-purple-glow">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-cyan/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-primary/10 rounded-full blur-3xl" />
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 relative z-10 leading-tight">Chega de perder agendamentos importantes</h2>
          <p className="text-md md:text-lg text-gray-300 mb-10 max-w-2xl mx-auto relative z-10">
            Dê à sua equipe secreta de secretárias o reforço perfeito com atendimento inteligente 24h por dia e lembrete automático proativo de consultas.
          </p>
          <motion.a 
            href={getWAUrl("Olá! Gostaria de agendar minha demonstração gratuita de 30 dias da assistente médica Sofia Med.")}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-10 md:px-16 py-5 bg-brand-cyan text-brand-bg rounded-full text-lg md:text-xl font-black shadow-cyan-glow uppercase tracking-wide relative z-10 transition-transform"
          >
            Falar pelo WhatsApp
          </motion.a>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="bg-brand-deep py-12 px-4 md:px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-white">Sofia Med</span>
            <div className="w-1.5 h-1.5 rounded-full bg-brand-cyan pulsing-dot" />
          </div>
          <p>© 2026 Sofia Med AI. Todos os direitos reservados. Focado na ética médica e na agilidade clínica.</p>
          <div className="flex gap-4">
            <Link to="/" className="hover:text-white transition-colors">Voltar ao Início</Link>
            <Link to="/privacidade" className="hover:text-white transition-colors">Privacidade</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
