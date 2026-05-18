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
        isScrolled ? "bg-brand-bg/90 backdrop-blur-md py-3 border-b border-brand-cyan/20" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold tracking-tighter text-white">Sofia Med</span>
          <div className="w-2 h-2 rounded-full bg-brand-cyan pulsing-dot" />
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-sm font-medium text-gray-300 hover:text-brand-cyan transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a 
            href={getWAUrl("Olá! Gostaria de saber mais sobre como a Sofia Med pode ajudar minha clínica.")}
            target="_blank"
            rel="noreferrer"
            className="bg-brand-primary hover:bg-brand-primary/90 text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-transform hover:scale-105 shadow-cyan-glow border border-brand-cyan/30"
          >
            Começar agora
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
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-lg font-medium text-gray-300"
                >
                  {link.name}
                </a>
              ))}
              <a 
                href={getWAUrl("Olá! Gostaria de começar agora com a Sofia Med na minha clínica.")}
                target="_blank"
                rel="noreferrer"
                className="bg-brand-primary text-white px-6 py-3 rounded-full font-semibold glow-cyan"
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
    <div className="w-full max-w-[280px] sm:max-w-[320px] bg-[#0b141a] rounded-[2rem] border-[8px] border-[#1f2c34] overflow-hidden shadow-2xl relative">
      <div className="bg-[#1f2c34] p-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-brand-primary flex items-center justify-center text-white font-bold">S</div>
        <div>
          <p className="text-white text-sm font-semibold">Sofia Med - Clínica I.A.</p>
          <p className="text-brand-cyan text-[10px] flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-brand-cyan" /> online
          </p>
        </div>
      </div>
      <div className="h-[400px] p-4 overflow-y-auto flex flex-col gap-3 bg-[url('https://whatsapp-background.com/classic/bg.png')] bg-repeat bg-[length:400px]">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: msg.isBot ? -10 : 10, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: i * 1.5, duration: 0.5 }}
            className={`max-w-[80%] p-3 rounded-xl text-sm ${
              msg.isBot ? "bg-[#1f2c34] text-white self-start rounded-tl-none" : "bg-[#005c4b] text-white self-end rounded-tr-none"
            }`}
          >
            {msg.text}
          </motion.div>
        ))}
        <motion.div 
          animate={{ opacity: [1, 0, 1] }} 
          transition={{ repeat: Infinity, duration: 1 }}
          className="self-start bg-[#1f2c34] p-2 rounded-lg"
        >
          <div className="flex gap-1 h-2 items-center">
            <div className="w-1 h-1 bg-gray-400 rounded-full" />
            <div className="w-1 h-1 bg-gray-400 rounded-full" />
            <div className="w-1 h-1 bg-gray-400 rounded-full" />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const SectionWrapper = ({ children, id, className = "" }: { children: React.ReactNode, id?: string, className?: string }) => (
  <motion.section 
    id={id}
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    className={`py-20 px-4 md:px-8 max-w-7xl mx-auto ${className}`}
  >
    {children}
  </motion.section>
);

export default function LandingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');

  return (
    <div className="min-h-screen bg-brand-bg text-white selection:bg-brand-cyan/30 overflow-x-hidden">
      <Navbar />

      {/* 2. Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden hero-gradient min-h-screen flex items-center">
        <div className="absolute inset-0 z-0 opacity-20">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-brand-cyan rounded-full"
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
                duration: 10 + Math.random() * 20, 
                repeat: Infinity, 
                ease: "linear" 
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-gradient px-4 md:px-0">
              A inteligência que sua clínica precisa para atender 24h por dia.
            </h1>
            <p className="text-lg text-gray-400 mb-10 max-w-lg leading-relaxed mx-auto lg:mx-0 px-6 md:px-0">
              Sofia Med é sua nova funcionária digital. Ela aprende sobre seus procedimentos, agenda consultas e garante que nenhum paciente fique sem resposta, 24h por dia.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start px-8 sm:px-0">
              <a 
                href={getWAUrl("Olá! Quero a Sofia Med atendendo meus pacientes 24h por dia e agendando consultas.")}
                target="_blank"
                rel="noreferrer"
                className="bg-brand-primary hover:bg-brand-primary/90 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-purple-glow flex items-center justify-center gap-2 border border-brand-cyan/30"
              >
                Cuidar dos meus pacientes <ArrowRight className="w-5 h-5" />
              </a>
              <a 
                href="https://agenteia.natandesouza.com.br/assistente"
                target="_blank"
                rel="noreferrer"
                className="border border-brand-cyan text-brand-cyan hover:bg-brand-cyan/10 px-8 py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center"
              >
                Ver como funciona
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative flex justify-center lg:justify-end pr-0 md:pr-12"
          >
            <div className="relative group max-w-sm w-full mx-auto md:mx-0">
              <div className="absolute -inset-10 bg-brand-cyan/10 rounded-full blur-3xl group-hover:bg-brand-cyan/20 transition-all duration-700 opacity-50" />
              <div className="relative z-10 transform -rotate-1 hover:rotate-0 transition-transform duration-500 scale-90 sm:scale-100">
                <WhatsAppMockup />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. Problema Section */}
      <SectionWrapper className="text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-16">Sua clínica está perdendo pacientes todos os dias sem perceber.</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Agendamento Noturno",
              text: "Um paciente tenta marcar consulta às 22h, não consegue e termina buscando outro especialista.",
              icon: <Clock className="w-10 h-10 text-brand-cyan" />
            },
            {
              title: "Triagem Repetitiva",
              text: "Sua secretária passa o dia respondendo dúvidas simples e confirmando horários, perdendo tempo produtivo.",
              icon: <MessageCircle className="w-10 h-10 text-brand-cyan" />
            },
            {
              title: "Urgências e Dúvidas",
              text: "Pacientes chegam com dúvidas básicas no fim de semana e ficam sem suporte até a segunda-feira.",
              icon: <Zap className="w-10 h-10 text-brand-cyan" />
            }
          ].map((item, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="p-8 rounded-2xl bg-brand-deep/50 border border-white/10 backdrop-blur-md shadow-xl"
            >
              <div className="mb-6 flex justify-center">{item.icon}</div>
              <h3 className="text-xl font-bold mb-4">{item.title}</h3>
              <p className="text-gray-400">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* 4. O que é a Sofia */}
      <section id="sobre" className="py-20 bg-brand-deep/30 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="order-2 lg:order-1 relative group">
             <div className="absolute -inset-10 bg-brand-primary/10 rounded-full blur-3xl group-hover:bg-brand-primary/20 transition-all duration-700" />
             <motion.div 
               whileHover={{ scale: 1.02 }}
               transition={{ duration: 0.5 }}
               className="relative rounded-3xl overflow-hidden border border-brand-primary/20 glow-purple shadow-2xl"
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
            <h2 className="text-3xl md:text-5xl font-bold mb-8">Sofia Med não é um chatbot. É uma funcionária da sua clínica.</h2>
            <div className="space-y-6 text-lg text-gray-300">
              <p>Sofia Med aprende sobre o seu consultório através de um treinamento simples, assimilando seus procedimentos, convênios aceitos e o tom de voz do seu atendimento.</p>
              <p>Ela fala com naturalidade, responde com inteligência, realiza a triagem inicial e sabe exatamente o momento de passar o atendimento para sua recepção ou equipe médica.</p>
              <ul className="space-y-4 pt-4">
                {[
                  "Treinamento médico personalizado em minutos",
                  "Linguagem acolhedora e humana",
                  "Triagem e pré-agendamento automático",
                  "Transição inteligente para sua secretária"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-brand-cyan" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <SectionWrapper id="como-funciona" className="text-center bg-brand-deep/30 border-t border-white/5 py-12">
        <div className="grid md:grid-cols-4 gap-6 items-center">
          <div className="text-left col-span-1">
            <p className="text-brand-gold text-xs font-bold uppercase tracking-tighter mb-1">O Desafio</p>
            <p className="text-sm font-medium">Você perde pacientes todos os dias fora do horário comercial.</p>
          </div>
          {[
            { title: "Manual", text: "Treine a Sofia Med com seus protocolos em minutos." },
            { title: "WhatsApp", text: "Conecte ao WhatsApp da sua clínica." },
            { title: "Painel", text: "Acompanhe os agendamentos pelo painel." }
          ].map((step, i) => (
            <div key={i} className="flex items-center gap-4 text-left">
              <span className="text-3xl font-black text-brand-cyan/20">0{i + 1}</span>
              <p className="text-xs text-gray-400">{step.text}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* 6. Benefícios */}
      <section id="beneficios" className="py-20 bg-brand-deep/40">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center">Tudo o que sua clínica precisa para crescer.</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: <Clock />, title: "Agendamento 24h", desc: "Sua clínica aberta para marcações 24 horas por dia." },
              { icon: <Zap />, title: "Confirmação Automática", desc: "Redução de faltas com lembretes inteligentes de consulta." },
              { icon: <ShieldCheck />, title: "Conformidade LGPD", desc: "Segurança total nos dados sensíveis dos seus pacientes." },
              { icon: <Brain />, title: "Triagem com I.A.", desc: "Identifica a queixa do paciente e agenda com o especialista certo." },
              { icon: <MessageCircle />, title: "Falar via Áudio", desc: "Entende e responde áudios de pacientes idosos ou com pressa." },
              { icon: <BarChart3 />, title: "Indicadores de Saúde", desc: "Relatórios de volume de atendimentos e taxa de conversão." }
            ].map((benefit, i) => (
              <div key={i} className="p-8 rounded-2xl bg-brand-bg/60 border border-white/5 hover:border-brand-cyan/40 transition-colors">
                <div className="text-brand-cyan mb-6">{benefit.icon}</div>
                <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                <p className="text-gray-400 text-sm">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Prova Social */}
      <SectionWrapper className="text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-16">Clínicas que já têm a Sofia Med na equipe.</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: "Dr. Ricardo Mendes",
              role: "Dermatologista / Clínica SkinCare",
              text: "Desde que a Sofia Med assumiu nosso WhatsApp, nossos agendamentos aumentaram 40%. O paciente não espera mais nem 10 segundos.",
              img: "https://i.pravatar.cc/150?u=a1"
            },
            {
              name: "Dra. Juliana Costa",
              role: "Ginecologista / Centro Médico J",
              text: "É impressionante como ela aprendeu sobre os preparos dos exames. Minhas pacientes acham que é uma pessoa real e acolhedora respondendo.",
              img: "https://i.pravatar.cc/150?u=a2"
            },
            {
              name: "Dr. André Silva",
              role: "Diretor da Clínica Sorriso",
              text: "A Sofia Med faz a triagem inicial no domingo, e na segunda minha recepção só precisa confirmar o horário final no sistema.",
              img: "https://i.pravatar.cc/150?u=a3"
            }
          ].map((card, i) => (
            <div key={i} className="bg-brand-deep/50 p-8 rounded-2xl border border-brand-cyan/20 text-left">
              <div className="flex gap-1 mb-6 text-brand-gold">
                {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-gray-300 italic mb-8">"{card.text}"</p>
              <div className="flex items-center gap-4">
                <img src={card.img} alt={card.name} className="w-12 h-12 rounded-full border-2 border-brand-primary" referrerPolicy="no-referrer" />
                <div>
                  <p className="font-bold">{card.name}</p>
                  <p className="text-xs text-gray-500 uppercase tracking-widest">{card.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* 8. Planos */}
      <section id="planos" className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-8">Escolha o plano ideal para sua clínica ou consultório.</h2>
          
          {/* Billing Toggle */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <div className="flex items-center gap-4">
              <span className={`text-sm font-medium ${billingCycle === 'monthly' ? 'text-white' : 'text-gray-500'}`}>Mensal</span>
              <button 
                onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
                className="w-14 h-7 bg-brand-deep rounded-full p-1 relative border border-brand-cyan/30 transition-colors"
                aria-label="Toggle billing cycle"
              >
                <motion.div 
                  animate={{ x: billingCycle === 'monthly' ? 0 : 28 }}
                  className="w-5 h-5 bg-brand-cyan rounded-full shadow-cyan-glow"
                />
              </button>
              <span className={`text-sm font-medium ${billingCycle === 'annual' ? 'text-white' : 'text-gray-500'}`}>Anual</span>
            </div>
            <span className="bg-brand-cyan/20 text-brand-cyan text-[10px] font-bold px-2 py-0.5 rounded-full border border-brand-cyan/30">
              PAGUE 10, LEVE 12 MESES
            </span>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 pb-4 md:pb-0">
            {/* Starter Plan */}
            <div className="min-w-[300px] p-8 rounded-3xl border border-white/10 bg-brand-deep/20 text-left flex flex-col hover:border-white/20 transition-all">
              <h3 className="text-2xl font-bold mb-1">Starter</h3>
              <p className="text-brand-cyan text-xs font-bold uppercase tracking-wider mb-4">Consultório Individual</p>
              <div className="text-4xl font-bold mb-2">
                R$ {billingCycle === 'annual' ? '379,00' : '37,90'}
                <span className="text-lg text-gray-500 font-normal">/{billingCycle === 'annual' ? 'ano' : 'mês'}</span>
              </div>
              {billingCycle === 'annual' && (
                <p className="text-green-500 text-[10px] font-bold uppercase mb-6">Economize R$ 75,80</p>
              )}
              {billingCycle === 'monthly' && <div className="mb-6 h-4" />}
              
              <div className="space-y-4 mb-10 flex-1">
                <div className="flex items-center gap-3 text-sm"><Check className="w-4 h-4 text-green-500" /> <span>Inbox (Chat Manual)</span></div>
                <div className="flex items-center gap-3 text-sm"><Check className="w-4 h-4 text-green-500" /> <span>Dashboard & Relatórios</span></div>
                <div className="flex items-center gap-3 text-sm"><Check className="w-4 h-4 text-green-500" /> <span>Gestão de Pacientes</span></div>
                <div className="flex items-center gap-3 text-sm"><X className="w-4 h-4 text-red-500/50" /> <span className="text-gray-500">Agentes de IA</span></div>
                <div className="flex items-center gap-3 text-sm"><X className="w-4 h-4 text-red-500/50" /> <span className="text-gray-500">Agenda Integrada</span></div>
                <div className="flex items-center gap-3 text-sm"><X className="w-4 h-4 text-red-500/50" /> <span className="text-gray-500">Lembretes Automáticos</span></div>
                <div className="flex items-center gap-3 text-sm"><X className="w-4 h-4 text-red-500/50" /> <span className="text-gray-500">Modelos Avançados (o1)</span></div>
                <div className="pt-2 border-t border-white/5">
                  <div className="flex items-center gap-3 text-sm font-medium text-gray-500">
                    <X className="w-4 h-4 text-red-500/50" /> 
                    <span>IA Sofia Med <span className="text-[10px] bg-white/5 px-1.5 py-0.5 rounded ml-1 text-gray-400">15 dias teste</span></span>
                  </div>
                </div>
              </div>
              
              <a 
                href={getWAUrl(`Olá! Gostaria de assinar o Plano Starter (${billingCycle === 'annual' ? 'Anual' : 'Mensal'}) da Sofia Med.`)}
                target="_blank"
                rel="noreferrer"
                className="w-full py-4 border border-white/20 text-white rounded-xl font-bold hover:bg-white/5 transition-all text-center"
              >
                Assinar Starter
              </a>
            </div>

            {/* Pro Plan */}
            <div className="min-w-[300px] p-8 rounded-3xl border-2 border-brand-cyan/30 bg-brand-primary/5 text-left flex flex-col relative transition-all hover:scale-[1.02] shadow-cyan-glow">
              <div className="absolute top-4 right-4 bg-brand-cyan text-brand-bg px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">Recomendado</div>
              <h3 className="text-2xl font-bold mb-1">Pro</h3>
              <p className="text-brand-cyan text-xs font-bold uppercase tracking-wider mb-4">Pequenas Clínicas</p>
              <div className="text-4xl font-bold mb-2">
                R$ {billingCycle === 'annual' ? '1.679,00' : '167,90'}
                <span className="text-lg text-gray-500 font-normal">/{billingCycle === 'annual' ? 'ano' : 'mês'}</span>
              </div>
              {billingCycle === 'annual' && (
                <p className="text-green-500 text-[10px] font-bold uppercase mb-6">Economize R$ 335,80</p>
              )}
              {billingCycle === 'monthly' && <div className="mb-6 h-4" />}
              
              <div className="space-y-4 mb-10 flex-1">
                <div className="flex items-center gap-3 text-sm"><Check className="w-4 h-4 text-green-500" /> <span>Inbox (Chat Manual)</span></div>
                <div className="flex items-center gap-3 text-sm"><Check className="w-4 h-4 text-green-500" /> <span>Dashboard & Relatórios</span></div>
                <div className="flex items-center gap-3 text-sm"><Check className="w-4 h-4 text-green-500" /> <span>Gestão de Pacientes</span></div>
                <div className="flex items-center gap-3 text-sm font-bold text-white"><Check className="w-4 h-4 text-green-500" /> <span>Até 3 Agentes Médicos</span></div>
                <div className="flex items-center gap-3 text-sm"><Check className="w-4 h-4 text-green-500" /> <span>Agenda Integrada</span></div>
                <div className="flex items-center gap-3 text-sm"><X className="w-4 h-4 text-red-500/50" /> <span className="text-gray-500">Follow-up de Pacientes</span></div>
                <div className="flex items-center gap-3 text-sm"><X className="w-4 h-4 text-red-500/50" /> <span className="text-gray-500">Modelos Avançados (o1)</span></div>
                <div className="pt-2 border-t border-brand-cyan/20">
                  <div className="flex items-center gap-3 text-sm font-medium text-gray-500">
                    <X className="w-4 h-4 text-red-500/50" /> 
                    <span>IA Sofia Med <span className="text-[10px] bg-white/5 px-1.5 py-0.5 rounded ml-1 text-gray-400">15 dias teste</span></span>
                  </div>
                </div>
              </div>
              
              <a 
                href={getWAUrl(`Olá! Gostaria de assinar o Plano Pro (${billingCycle === 'annual' ? 'Anual' : 'Mensal'}) da Sofia Med.`)}
                target="_blank"
                rel="noreferrer"
                className="w-full py-4 bg-brand-cyan text-brand-bg rounded-xl font-bold hover:brightness-110 transition-all text-center"
              >
                Quero o Pro
              </a>
            </div>

            {/* Elite Plan */}
            <div className="min-w-[300px] p-8 rounded-3xl border border-white/10 bg-brand-deep/20 text-left flex flex-col hover:border-white/20 transition-all">
              <h3 className="text-2xl font-bold mb-1">Elite</h3>
              <p className="text-brand-cyan text-xs font-bold uppercase tracking-wider mb-4">Centros Médicos e Rede</p>
              <div className="text-4xl font-bold mb-2">
                R$ {billingCycle === 'annual' ? '3.279,00' : '327,90'}
                <span className="text-lg text-gray-500 font-normal">/{billingCycle === 'annual' ? 'ano' : 'mês'}</span>
              </div>
              {billingCycle === 'annual' && (
                <p className="text-green-500 text-[10px] font-bold uppercase mb-6">Economize R$ 655,80</p>
              )}
              {billingCycle === 'monthly' && <div className="mb-6 h-4" />}
              
              <div className="space-y-4 mb-10 flex-1">
                <div className="flex items-center gap-3 text-sm"><Check className="w-4 h-4 text-green-500" /> <span>Inbox (Chat Manual)</span></div>
                <div className="flex items-center gap-3 text-sm"><Check className="w-4 h-4 text-green-500" /> <span>Dashboard & Relatórios</span></div>
                <div className="flex items-center gap-3 text-sm"><Check className="w-4 h-4 text-green-500" /> <span>Gestão de Pacientes</span></div>
                <div className="flex items-center gap-3 text-sm font-bold text-white"><Check className="w-4 h-4 text-green-500" /> <span>Agentes Ilimitados</span></div>
                <div className="flex items-center gap-3 text-sm"><Check className="w-4 h-4 text-green-500" /> <span>Agenda Integrada</span></div>
                <div className="flex items-center gap-3 text-sm font-bold text-white"><Check className="w-4 h-4 text-green-500" /> <span>Follow-up de Pacientes</span></div>
                <div className="flex items-center gap-3 text-sm font-bold text-white"><Check className="w-4 h-4 text-green-500" /> <span>Modelos Avançados (o1)</span></div>
                <div className="pt-2 border-t border-white/5">
                  <div className="flex items-center gap-3 text-sm font-black text-white">
                    <Check className="w-4 h-4 text-green-500" /> 
                    <span>IA Sofia Med: <span className="text-brand-cyan">Total + Automação</span></span>
                  </div>
                </div>
              </div>
              
              <a 
                href={getWAUrl(`Olá! Gostaria de assinar o Plano Elite (${billingCycle === 'annual' ? 'Anual' : 'Mensal'}) da Sofia Med.`)}
                target="_blank"
                rel="noreferrer"
                className="w-full py-4 border border-brand-cyan text-brand-cyan rounded-xl font-bold hover:bg-brand-cyan/10 transition-all text-center"
              >
                Assinar Elite
              </a>
            </div>
          </div>
          <p className="mt-8 text-gray-500 text-sm">* Valore referente ao setup + mensalidade conforme volume.</p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-brand-deep/20 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">Perguntas Frequentes</h2>
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

      {/* 9. CTA Final */}
      <section className="py-20 lg:py-32 px-4 md:px-8 overflow-hidden">
        <div className="max-w-5xl mx-auto rounded-[2rem] md:rounded-[3rem] p-10 md:p-20 bg-gradient-to-br from-brand-primary to-brand-bg border border-brand-cyan/20 text-center relative overflow-hidden shadow-purple-glow">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-cyan/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-primary/10 rounded-full blur-3xl" />
          
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-8 relative z-10 leading-tight px-2">Pronto para ter a Sofia Med na sua clínica?</h2>
          <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto relative z-10 px-4">Configure em menos de 15 minutos e comece a atender seus pacientes com excelência hoje mesmo.</p>
          <motion.a 
            href={getWAUrl("Olá! Quero começar agora com a Sofia Med e otimizar os agendamentos da minha clínica!")}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-10 md:px-16 py-5 md:py-7 bg-brand-cyan text-brand-bg rounded-full text-lg md:text-2xl font-black shadow-cyan-glow uppercase tracking-wide relative z-10 transition-transform"
          >
            Começar Grátis Agora
          </motion.a>
        </div>
      </section>

      {/* 10. Footer */}
      <footer id="contato" className="bg-brand-deep py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold text-white">Sofia Med</span>
              <div className="w-2 h-2 rounded-full bg-brand-cyan pulsing-dot" />
            </div>
            <p className="text-gray-500 max-w-xs">Inteligência artificial aplicada ao atendimento em saúde que gera resultados reais.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-20">
            {[
              { title: "Empresa", links: [{name: "Sobre", href: "#sobre"}] },
              { title: "Suporte", links: [{name: "Ajuda", href: "#"}, {name: "WhatsApp", href: getWAUrl("Olá! Preciso de ajuda com a Sofia Med.")}] },
              { title: "Legal", links: [{name: "Privacidade", href: "/privacidade"}, {name: "Termos", href: "/termos-de-uso"}, {name: "LGPD", href: "/lgpd"}] }
            ].map((col, i) => (
              <div key={i}>
                <h4 className="font-bold mb-4 text-brand-cyan text-sm uppercase tracking-widest">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map((link, j) => (
                    <li key={j}>
                      {link.href.startsWith("/") ? (
                        <Link to={link.href} className="text-gray-500 hover:text-white transition-colors text-sm">{link.name}</Link>
                      ) : (
                        <a href={link.href} className="text-gray-500 hover:text-white transition-colors text-sm">{link.name}</a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600">
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
