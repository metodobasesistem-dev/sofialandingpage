import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { 
  MessageCircle, 
  Clock, 
  Brain, 
  Zap, 
  BarChart3, 
  Headset, 
  Check, 
  Menu, 
  X, 
  ArrowRight,
  ShieldCheck,
  Star,
  ChevronDown
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// --- Components ---

const FAQItem: React.FC<{ q: string; a: string; index: number }> = ({ q, a, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="rounded-2xl bg-white border border-slate-100 overflow-hidden hover:border-brand-primary/30 shadow-sm transition-all"
    >
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 text-left flex justify-between items-center gap-4 group"
      >
        <h3 className={`text-lg font-bold transition-colors ${isOpen ? 'text-brand-primary' : 'text-slate-900'}`}>{q}</h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className={`shrink-0 ${isOpen ? 'text-brand-primary' : 'text-slate-400'}`}
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
            <div className="px-6 pb-6 pt-0 border-t border-slate-100">
              <p className="text-slate-600 text-sm leading-relaxed mt-4">{a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const WHATSAPP_NUMBER = "5532984963439";

const getWAUrl = (text: string) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Como funciona", href: "#como-funciona" },
    { name: "Benefícios", href: "#beneficios" },
    { name: "Planos", href: "#planos" },
    { name: "Contato", href: "#contato" },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? "bg-white/90 backdrop-blur-md py-3 border-b border-slate-100 shadow-sm" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold tracking-tighter text-slate-900">Sofia Med</span>
          <div className="w-2 h-2 rounded-full bg-brand-primary pulsing-dot" />
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-sm font-medium text-slate-600 hover:text-brand-primary transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a 
            href={getWAUrl("Olá! Gostaria de saber mais sobre como a Sofia Med pode ajudar minha clínica.")}
            target="_blank"
            rel="noreferrer"
            className="bg-brand-primary hover:bg-brand-primary/95 text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-transform hover:scale-105 shadow-md shadow-indigo-100"
          >
            Começar agora
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-slate-800"
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
            className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-100 shadow-lg p-4"
          >
            <div className="flex flex-col gap-4 text-center">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-lg font-medium text-slate-700 hover:text-brand-primary"
                >
                  {link.name}
                </a>
              ))}
              <a 
                href={getWAUrl("Olá! Gostaria de começar agora com a Sofia Med na minha clínica.")}
                target="_blank"
                rel="noreferrer"
                className="bg-brand-primary text-white px-6 py-3 rounded-full font-semibold shadow-md shadow-indigo-100"
              >
                Começar agora
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const WhatsAppMockup = () => {
  const messages = [
    { text: "Oi! Gostaria de marcar uma consulta com o dermatologista.", isBot: false },
    { text: "Olá! Sou a Sofia Med, a assistente digital da clínica. É um prazer atender você! Temos horários disponíveis para quarta-feira às 14h. Gostaria de agendar?", isBot: true },
    { text: "Sim, pode ser nesse horário.", isBot: false },
    { text: "Perfeito! Consulta agendada. Vou enviar os detalhes do preparo para o seu WhatsApp agora mesmo. 😊", isBot: true },
  ];

  return (
    <div className="w-full max-w-[280px] sm:max-w-[320px] bg-slate-50 rounded-[2.5rem] border-[10px] border-slate-800 overflow-hidden shadow-2xl relative">
      {/* Phone Camera Notch */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-4 bg-slate-800 rounded-full z-20" />
      
      {/* App Header */}
      <div className="bg-brand-primary p-4 pt-8 flex items-center gap-3 relative z-10">
        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white font-black border border-white/20">S</div>
        <div>
          <p className="text-white text-sm font-bold">Sofia Med - Clínica I.A.</p>
          <p className="text-purple-200 text-[10px] flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" /> online
          </p>
        </div>
      </div>
      
      {/* Chat Area */}
      <div className="h-[400px] p-4 overflow-y-auto flex flex-col gap-3 bg-[#efeae2] relative z-10">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: msg.isBot ? -10 : 10, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: i * 1.5, duration: 0.5 }}
            className={`max-w-[85%] p-3 rounded-2xl text-xs md:text-sm shadow-sm ${
              msg.isBot 
                ? "bg-white text-slate-800 self-start rounded-tl-none" 
                : "bg-[#d9fdd3] text-slate-800 self-end rounded-tr-none"
            }`}
          >
            {msg.text}
          </motion.div>
        ))}
        <motion.div 
          animate={{ opacity: [1, 0, 1] }} 
          transition={{ repeat: Infinity, duration: 1 }}
          className="self-start bg-white p-2.5 rounded-xl shadow-sm"
        >
          <div className="flex gap-1 h-1.5 items-center">
            <div className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
            <div className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
            <div className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const SectionWrapper = ({ children, id, className = "" }: { children: React.ReactNode, id?: string, className?: string }) => (
  <motion.section 
    id={id}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className={`py-20 px-4 md:px-8 max-w-7xl mx-auto ${className}`}
  >
    {children}
  </motion.section>
);

export default function LandingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');

  return (
    <div className="min-h-screen bg-white text-slate-800 selection:bg-brand-primary/20 overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden hero-gradient min-h-screen flex items-center">
        {/* Soft Decorative Dots */}
        <div className="absolute inset-0 z-0 opacity-30">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-brand-primary rounded-full"
              initial={{ 
                x: Math.random() * 100 + "%", 
                y: Math.random() * 100 + "%",
                opacity: Math.random()
              }}
              animate={{ 
                y: [null, "-20%", "120%"],
                opacity: [0, 0.4, 0]
              }}
              transition={{ 
                duration: 12 + Math.random() * 18, 
                repeat: Infinity, 
                ease: "linear" 
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-gradient px-4 md:px-0">
              A inteligência que sua clínica precisa para atender 24h por dia.
            </h1>
            <p className="text-md md:text-lg text-slate-600 mb-10 max-w-lg leading-relaxed mx-auto lg:mx-0 px-6 md:px-0">
              Sofia Med é sua nova funcionária digital. Ela aprende sobre seus procedimentos, agenda consultas e garante que nenhum paciente fique sem resposta, 24h por dia.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start px-8 sm:px-0">
              <a 
                href={getWAUrl("Olá! Quero a Sofia Med atendendo meus pacientes 24h por dia e agendando consultas.")}
                target="_blank"
                rel="noreferrer"
                className="bg-brand-primary hover:bg-brand-primary/95 text-white px-6 sm:px-8 py-4 rounded-xl font-bold text-sm sm:text-base lg:text-lg transition-all shadow-lg shadow-indigo-100 flex items-center justify-center gap-2 whitespace-nowrap"
              >
                Cuidar dos meus pacientes <ArrowRight className="w-5 h-5 shrink-0" />
              </a>
              <Link 
                to="/demonstracao"
                className="border border-brand-primary/30 text-brand-primary hover:bg-brand-primary/5 px-6 sm:px-8 py-4 rounded-xl font-bold text-sm sm:text-base lg:text-lg transition-all flex items-center justify-center text-center shadow-sm whitespace-nowrap"
              >
                Demonstração Gratuita 30 dias
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center lg:justify-end pr-0 md:pr-12"
          >
            <div className="relative group max-w-sm w-full mx-auto md:mx-0">
              <div className="absolute -inset-10 bg-brand-primary/10 rounded-full blur-3xl group-hover:bg-brand-primary/15 transition-all duration-700 opacity-60" />
              <div className="relative z-10 transform -rotate-1 hover:rotate-0 transition-transform duration-500 scale-90 sm:scale-100">
                <WhatsAppMockup />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Problema Section */}
      <SectionWrapper className="text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-16 text-slate-900 tracking-tight">Sua clínica está perdendo pacientes todos os dias sem perceber.</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Agendamento Noturno",
              text: "Um paciente tenta marcar consulta às 22h, não consegue e termina buscando outro especialista.",
              icon: <Clock className="w-10 h-10 text-brand-primary" />
            },
            {
              title: "Triagem Repetitiva",
              text: "Sua secretária passa o dia respondendo dúvidas simples e confirmando horários, perdendo tempo produtivo.",
              icon: <MessageCircle className="w-10 h-10 text-brand-primary" />
            },
            {
              title: "Urgências e Dúvidas",
              text: "Pacientes chegam com dúvidas básicas no fim de semana e ficam sem suporte até a segunda-feira.",
              icon: <Zap className="w-10 h-10 text-brand-primary" />
            }
          ].map((item, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -5 }}
              className="p-8 rounded-2xl bg-white border border-slate-100 shadow-lg shadow-slate-100/50 transition-all text-center"
            >
              <div className="mb-6 flex justify-center">{item.icon}</div>
              <h3 className="text-xl font-bold mb-4 text-slate-900">{item.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* O que é a Sofia */}
      <section id="sobre" className="py-20 bg-brand-deep/30 border-y border-slate-100/60 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="order-2 lg:order-1 relative group">
             <div className="absolute -inset-10 bg-brand-primary/5 rounded-full blur-3xl group-hover:bg-brand-primary/10 transition-all duration-700" />
             <motion.div 
               whileHover={{ scale: 1.01 }}
               transition={{ duration: 0.5 }}
               className="relative rounded-3xl overflow-hidden border border-slate-100 shadow-xl"
             >
               <img 
                 src="/sofia2.png" 
                 alt="Sofia Digital Employee Illustration" 
                 className="w-full h-auto object-contain max-h-[600px] block"
                 referrerPolicy="no-referrer"
               />
             </motion.div>
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl md:text-5xl font-bold mb-8 text-slate-900 tracking-tight">Sofia Med não é um chatbot. É uma funcionária da sua clínica.</h2>
            <div className="space-y-6 text-base md:text-lg text-slate-600 leading-relaxed">
              <p>Sofia Med aprende sobre o seu consultório através de um treinamento simples, assimilando seus procedimentos, convênios aceitos e o tom de voz do seu atendimento.</p>
              <p>Ela fala com naturalidade, responde com inteligência, realiza a triagem inicial e sabe exatamente o momento de passar o atendimento para sua recepção ou equipe médica.</p>
              <ul className="space-y-4 pt-4">
                {[
                  "Treinamento médico personalizado em minutos",
                  "Linguagem acolhedora e humana",
                  "Triagem e pré-agendamento automático",
                  "Transição inteligente para sua secretária"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-700 text-sm md:text-base">
                    <Check className="w-5 h-5 text-brand-primary shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Como funciona banner */}
      <SectionWrapper id="como-funciona" className="text-center py-12">
        <div className="grid md:grid-cols-4 gap-6 items-center">
          <div className="text-left col-span-1 border-b md:border-b-0 md:border-r border-slate-100 pb-4 md:pb-0">
            <p className="text-brand-primary text-xs font-bold uppercase tracking-wider mb-1">O Processo</p>
            <p className="text-sm font-semibold text-slate-800">Sua clínica online em 3 passos rápidos.</p>
          </div>
          {[
            { title: "Manual", text: "Treine a Sofia Med com seus protocolos em minutos." },
            { title: "WhatsApp", text: "Conecte ao WhatsApp da sua clínica." },
            { title: "Painel", text: "Acompanhe os agendamentos pelo painel." }
          ].map((step, i) => (
            <div key={i} className="flex items-center gap-4 text-left">
              <span className="text-3xl font-black text-brand-primary/20">0{i + 1}</span>
              <p className="text-xs text-slate-600 font-medium">{step.text}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* Benefícios */}
      <section id="beneficios" className="py-20 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center text-slate-900 tracking-tight">Tudo o que sua clínica precisa para crescer.</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: <Clock />, title: "Agendamento 24h", desc: "Sua clínica aberta para marcações 24 horas por dia." },
              { icon: <Zap />, title: "Confirmação Automática", desc: "Redução de faltas com lembretes inteligentes de consulta." },
              { icon: <ShieldCheck />, title: "Conformidade LGPD", desc: "Segurança total nos dados sensíveis dos seus pacientes." },
              { icon: <Brain />, title: "Triagem com I.A.", desc: "Identifica a queixa do paciente e agenda com o especialista certo." },
              { icon: <MessageCircle />, title: "Falar via Áudio", desc: "Entende e responde áudios de pacientes idosos ou com pressa." },
              { icon: <BarChart3 />, title: "Indicadores de Saúde", desc: "Relatórios de volume de atendimentos e taxa de conversão." }
            ].map((benefit, i) => (
              <div key={i} className="p-8 rounded-2xl bg-white border border-slate-100 hover:border-brand-primary/30 shadow-md shadow-slate-100/30 transition-colors">
                <div className="text-brand-primary mb-6">{benefit.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-slate-900">{benefit.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prova Social */}
      <SectionWrapper className="text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-16 text-slate-900 tracking-tight">Clínicas que já têm a Sofia Med na equipe.</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: "Dr. Ricardo Mendes",
              role: "Dermatologista / Clínica SkinCare",
              text: "Desde que a Sofia Med assumiu nosso WhatsApp, nossos agendamentos aumentaram 40%. O paciente não espera mais nem 10 segundos.",
              img: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=256&h=256&q=80"
            },
            {
              name: "Dra. Juliana Costa",
              role: "Ginecologista / Centro Médico J",
              text: "É impressionante como ela aprendeu sobre os preparos dos exames. Minhas pacientes acham que é uma pessoa real e acolhedora respondendo.",
              img: "https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&w=256&h=256&q=80"
            },
            {
              name: "Dr. André Silva",
              role: "Diretor da Clínica Sorriso",
              text: "A Sofia Med faz a triagem inicial no domingo, e na segunda minha recepção só precisa confirmar o horário final no sistema.",
              img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=256&h=256&q=80"
            }
          ].map((card, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-lg shadow-slate-100/50 text-left">
              <div className="flex gap-1 mb-6 text-brand-gold">
                {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-slate-600 italic mb-8 text-sm leading-relaxed">"{card.text}"</p>
              <div className="flex items-center gap-4">
                <img src={card.img} alt={card.name} className="w-12 h-12 rounded-full border-2 border-brand-primary" referrerPolicy="no-referrer" />
                <div>
                  <p className="font-bold text-slate-900 text-sm">{card.name}</p>
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">{card.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* Planos */}
      <section id="planos" className="py-20 lg:py-32 bg-slate-50/50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-8 text-slate-900 tracking-tight">Escolha o plano ideal para sua clínica ou consultório.</h2>
          
          {/* Billing Toggle */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <div className="flex items-center gap-4 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm">
              <span className={`text-xs font-semibold ${billingCycle === 'monthly' ? 'text-brand-primary' : 'text-slate-500'}`}>Mensal</span>
              <button 
                onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
                className="w-11 h-6 bg-slate-200 rounded-full p-1 relative transition-colors cursor-pointer"
                aria-label="Toggle billing cycle"
              >
                <motion.div 
                  animate={{ x: billingCycle === 'monthly' ? 0 : 20 }}
                  className="w-4 h-4 bg-brand-primary rounded-full"
                />
              </button>
              <span className={`text-xs font-semibold ${billingCycle === 'annual' ? 'text-brand-primary' : 'text-slate-500'}`}>Anual</span>
            </div>
            <span className="bg-brand-primary/10 text-brand-primary text-[10px] font-bold px-3 py-1 rounded-full border border-brand-primary/20">
              PAGUE 10, LEVE 12 MESES
            </span>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 pb-4 md:pb-0 items-stretch">
            {/* Starter Plan */}
            <div className="min-w-[280px] p-8 rounded-3xl border border-slate-200 bg-white text-left flex flex-col hover:border-slate-300 hover:shadow-md transition-all">
              <h3 className="text-2xl font-bold text-slate-900 mb-1">Starter</h3>
              <p className="text-brand-primary text-xs font-bold uppercase tracking-wider mb-4">Consultório Individual</p>
              <div className="text-4xl font-bold text-slate-900 mb-2">
                R$ {billingCycle === 'annual' ? '379,00' : '37,90'}
                <span className="text-lg text-slate-400 font-normal">/{billingCycle === 'annual' ? 'ano' : 'mês'}</span>
              </div>
              {billingCycle === 'annual' && (
                <p className="text-green-600 text-[10px] font-bold uppercase mb-6">Economize R$ 75,80</p>
              )}
              {billingCycle === 'monthly' && <div className="mb-6 h-4" />}
              
              <div className="space-y-4 mb-10 flex-1">
                <div className="flex items-center gap-3 text-sm text-slate-600"><Check className="w-4 h-4 text-green-500 shrink-0" /> <span>Inbox (Chat Manual)</span></div>
                <div className="flex items-center gap-3 text-sm text-slate-600"><Check className="w-4 h-4 text-green-500 shrink-0" /> <span>Dashboard & Relatórios</span></div>
                <div className="flex items-center gap-3 text-sm text-slate-600"><Check className="w-4 h-4 text-green-500 shrink-0" /> <span>Gestão de Pacientes</span></div>
                <div className="flex items-center gap-3 text-sm text-slate-400 line-through"><X className="w-4 h-4 text-slate-300 shrink-0" /> <span>Agente de IA Sofia</span></div>
                <div className="flex items-center gap-3 text-sm text-slate-400 line-through"><X className="w-4 h-4 text-slate-300 shrink-0" /> <span>Agenda Integrada</span></div>
                <div className="flex items-center gap-3 text-sm text-slate-400 line-through"><X className="w-4 h-4 text-slate-300 shrink-0" /> <span>Lembretes Automáticos</span></div>
                <div className="flex items-center gap-3 text-sm text-slate-400 line-through"><X className="w-4 h-4 text-slate-300 shrink-0" /> <span>Modelos Avançados (o1)</span></div>
                <div className="pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-3 text-sm font-medium text-slate-400 line-through">
                    <X className="w-4 h-4 text-slate-300 shrink-0" /> 
                    <span>IA Sofia Med <span className="text-[9px] bg-slate-100 px-1.5 py-0.5 rounded ml-1 text-slate-400 font-semibold">15 dias teste</span></span>
                  </div>
                </div>
              </div>
              
              <a 
                href={getWAUrl(`Olá! Gostaria de assinar o Plano Starter (${billingCycle === 'annual' ? 'Anual' : 'Mensal'}) da Sofia Med.`)}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 border border-slate-300 text-slate-700 hover:bg-slate-50 rounded-xl font-bold transition-all text-center text-sm shadow-sm"
              >
                Assinar Starter
              </a>
            </div>

            {/* Pro Plan */}
            <div className="min-w-[280px] p-8 rounded-3xl border-2 border-brand-primary bg-white text-left flex flex-col relative transition-all hover:scale-[1.01] shadow-xl shadow-indigo-100/50">
              <div className="absolute -top-3.5 right-6 bg-brand-primary text-white px-3.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">Mais Popular</div>
              <h3 className="text-2xl font-bold text-slate-900 mb-1">Pro</h3>
              <p className="text-brand-primary text-xs font-bold uppercase tracking-wider mb-4">Pequenas Clínicas</p>
              <div className="text-4xl font-bold text-slate-900 mb-2">
                R$ {billingCycle === 'annual' ? '1.679,00' : '167,90'}
                <span className="text-lg text-slate-400 font-normal">/{billingCycle === 'annual' ? 'ano' : 'mês'}</span>
              </div>
              {billingCycle === 'annual' && (
                <p className="text-green-600 text-[10px] font-bold uppercase mb-6">Economize R$ 335,80</p>
              )}
              {billingCycle === 'monthly' && <div className="mb-6 h-4" />}
              
              <div className="space-y-4 mb-10 flex-1">
                <div className="flex items-center gap-3 text-sm text-slate-600"><Check className="w-4 h-4 text-green-500 shrink-0" /> <span>Inbox (Chat Manual)</span></div>
                <div className="flex items-center gap-3 text-sm text-slate-600"><Check className="w-4 h-4 text-green-500 shrink-0" /> <span>Dashboard & Relatórios</span></div>
                <div className="flex items-center gap-3 text-sm text-slate-600"><Check className="w-4 h-4 text-green-500 shrink-0" /> <span>Gestão de Pacientes</span></div>
                <div className="flex items-center gap-3 text-sm font-bold text-slate-900"><Check className="w-4 h-4 text-green-500 shrink-0" /> <span>Até 3 Agentes Médicos</span></div>
                <div className="flex items-center gap-3 text-sm text-slate-600"><Check className="w-4 h-4 text-green-500 shrink-0" /> <span>Agenda Integrada</span></div>
                <div className="flex items-center gap-3 text-sm text-slate-400 line-through"><X className="w-4 h-4 text-slate-300 shrink-0" /> <span>Follow-up de Pacientes</span></div>
                <div className="flex items-center gap-3 text-sm text-slate-400 line-through"><X className="w-4 h-4 text-slate-300 shrink-0" /> <span>Modelos Avançados (o1)</span></div>
                <div className="pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-3 text-sm font-medium text-slate-400 line-through">
                    <X className="w-4 h-4 text-slate-300 shrink-0" /> 
                    <span>IA Sofia Med <span className="text-[9px] bg-slate-100 px-1.5 py-0.5 rounded ml-1 text-slate-400 font-semibold">15 dias teste</span></span>
                  </div>
                </div>
              </div>
              
              <a 
                href={getWAUrl(`Olá! Gostaria de assinar o Plano Pro (${billingCycle === 'annual' ? 'Anual' : 'Mensal'}) da Sofia Med.`)}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 bg-brand-primary hover:bg-brand-primary/95 text-white rounded-xl font-bold transition-all text-center text-sm shadow-md"
              >
                Quero o Pro
              </a>
            </div>

            {/* Elite Plan */}
            <div className="min-w-[280px] p-8 rounded-3xl border border-slate-200 bg-white text-left flex flex-col hover:border-slate-300 hover:shadow-md transition-all">
              <h3 className="text-2xl font-bold text-slate-900 mb-1">Elite</h3>
              <p className="text-brand-primary text-xs font-bold uppercase tracking-wider mb-4">Centros Médicos e Rede</p>
              <div className="text-4xl font-bold text-slate-900 mb-2">
                R$ {billingCycle === 'annual' ? '3.279,00' : '327,90'}
                <span className="text-lg text-slate-400 font-normal">/{billingCycle === 'annual' ? 'ano' : 'mês'}</span>
              </div>
              {billingCycle === 'annual' && (
                <p className="text-green-600 text-[10px] font-bold uppercase mb-6">Economize R$ 655,80</p>
              )}
              {billingCycle === 'monthly' && <div className="mb-6 h-4" />}
              
              <div className="space-y-4 mb-10 flex-1">
                <div className="flex items-center gap-3 text-sm text-slate-600"><Check className="w-4 h-4 text-green-500 shrink-0" /> <span>Inbox (Chat Manual)</span></div>
                <div className="flex items-center gap-3 text-sm text-slate-600"><Check className="w-4 h-4 text-green-500 shrink-0" /> <span>Dashboard & Relatórios</span></div>
                <div className="flex items-center gap-3 text-sm text-slate-600"><Check className="w-4 h-4 text-green-500 shrink-0" /> <span>Gestão de Pacientes</span></div>
                <div className="flex items-center gap-3 text-sm font-bold text-slate-900"><Check className="w-4 h-4 text-green-500 shrink-0" /> <span>Agentes Ilimitados</span></div>
                <div className="flex items-center gap-3 text-sm text-slate-600"><Check className="w-4 h-4 text-green-500 shrink-0" /> <span>Agenda Integrada</span></div>
                <div className="flex items-center gap-3 text-sm font-bold text-slate-900"><Check className="w-4 h-4 text-green-500 shrink-0" /> <span>Follow-up de Pacientes</span></div>
                <div className="flex items-center gap-3 text-sm font-bold text-slate-900"><Check className="w-4 h-4 text-green-500 shrink-0" /> <span>Modelos Avançados (o1)</span></div>
                <div className="pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-3 text-sm font-bold text-brand-primary">
                    <Check className="w-4 h-4 text-green-500 shrink-0" /> 
                    <span>IA Sofia Med: <span className="underline">Total + Automação</span></span>
                  </div>
                </div>
              </div>
              
              <a 
                href={getWAUrl(`Olá! Gostaria de assinar o Plano Elite (${billingCycle === 'annual' ? 'Anual' : 'Mensal'}) da Sofia Med.`)}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 border border-brand-primary text-brand-primary hover:bg-brand-primary/5 rounded-xl font-bold transition-all text-center text-sm"
              >
                Assinar Elite
              </a>
            </div>
          </div>
          <p className="mt-8 text-slate-400 text-xs font-medium">* Valor de setup inicial variável conforme complexidade de integração.</p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center text-slate-900 tracking-tight">Perguntas Frequentes</h2>
          <div className="space-y-4">
            {[
              {
                q: "Como a Sofia Med aprende sobre os protocolos da minha clínica?",
                a: "É muito simples! Você fornece manuais de atendimento, convênios aceitos, lista de procedimentos e horários. A Sofia Med processa esses dados e começa a responder exatamente como sua equipe faria, mantendo um tom ético e acolhedor."
              },
              {
                q: "Ela consegue fazer triagem de especialidades?",
                a: "Sim! A Sofia Med pode ser treinada para entender a queixa do paciente e sugerir a especialidade correta ou informar sobre a necessidade de exames específicos antes da consulta."
              },
              {
                q: "Os dados dos pacientes estão seguros?",
                a: "Com certeza. Segurança e privacidade são pilares da Sofia Med. Trabalhamos em conformidade absoluta com a LGPD para garantir que informações sensíveis de saúde nunca sejam expostas ou compartilhadas com terceiros."
              },
              {
                q: "Como ela se integra com o meu sistema de agenda?",
                a: "A Sofia Med pode ser integrada via API com os principais softwares de gestão médica do mercado, verificando disponibilidade em tempo real e inserindo os agendamentos diretamente no seu sistema."
              },
              {
                q: "Ela pode enviar lembretes de consulta?",
                a: "Sim. Um dos maiores benefícios é o envio automático de lembretes e a coleta de confirmação. Se o paciente desmarcar, a Sofia Med já oferece o horário vago para outro paciente da fila de espera."
              },
              {
                q: "O que acontece se um paciente tiver uma emergência?",
                a: "A Sofia Med é treinada para identificar palavras-chave de urgência. Nesses casos, ela fornece instruções imediatas de primeiros socorros ou orienta o paciente a buscar o pronto-atendimento mais próximo, transferindo o chat para sua equipe humana urgentemente."
              }
            ].map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final (Keeping a beautiful, rich dark purple gradient for final impact) */}
      <section className="py-20 lg:py-32 px-4 md:px-8 overflow-hidden bg-slate-50 border-t border-slate-100">
        <div className="max-w-5xl mx-auto rounded-[2rem] md:rounded-[3rem] p-10 md:p-20 bg-gradient-to-br from-indigo-900 via-[#3b0764] to-[#1e1b4b] text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl" />
          
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-8 relative z-10 leading-tight px-2 text-white tracking-tight">Pronto para ter a Sofia Med na sua clínica?</h2>
          <p className="text-md md:text-lg text-purple-200/90 mb-12 max-w-2xl mx-auto relative z-10 px-4 leading-relaxed">Configure em menos de 15 minutos e comece a atender seus pacientes com excelência hoje mesmo.</p>
          <motion.a 
            href={getWAUrl("Olá! Quero começar agora com a Sofia Med e otimizar os agendamentos da minha clínica!")}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-block px-10 md:px-16 py-4.5 md:py-6 bg-white hover:bg-slate-50 text-indigo-950 rounded-full text-base md:text-xl font-extrabold shadow-xl uppercase tracking-wider relative z-10 transition-transform cursor-pointer"
          >
            Começar Grátis Agora
          </motion.a>
        </div>
      </section>

      {/* Footer */}
      <footer id="contato" className="bg-slate-50 py-20 px-4 md:px-8 border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <span className="text-3xl font-black text-slate-900 tracking-tighter">Sofia Med</span>
              <div className="w-2 h-2 rounded-full bg-brand-primary pulsing-dot" />
            </div>
            <p className="text-slate-500 text-sm max-w-xs leading-relaxed">Inteligência artificial aplicada ao atendimento em saúde que gera resultados reais e fidelidade.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-20">
            {[
              { title: "Empresa", links: [{name: "Sobre", href: "#sobre"}] },
              { title: "Suporte", links: [{name: "Ajuda", href: "#"}, {name: "WhatsApp", href: getWAUrl("Olá! Preciso de ajuda com a Sofia Med.")}] },
              { title: "Legal", links: [{name: "Privacidade", href: "/privacidade"}, {name: "Termos", href: "/termos-de-uso"}, {name: "LGPD", href: "/lgpd"}] }
            ].map((col, i) => (
              <div key={i}>
                <h4 className="font-bold mb-4 text-slate-800 text-xs uppercase tracking-widest">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map((link, j) => (
                    <li key={j}>
                      {link.href.startsWith("/") ? (
                        <Link to={link.href} className="text-slate-500 hover:text-brand-primary transition-colors text-sm">{link.name}</Link>
                      ) : (
                        <a href={link.href} className="text-slate-500 hover:text-brand-primary transition-colors text-sm">{link.name}</a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-slate-200/60 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400 font-medium">
          <p>© 2026 Sofia Med AI. Todos os direitos reservados.</p>
          <div className="flex gap-6">
            <span>contato@zyreo.com.br</span>
            <span>Criado por Zyreo</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
