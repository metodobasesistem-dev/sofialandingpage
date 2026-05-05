/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

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
  Star
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

// --- Components ---

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-brand-bg/90 backdrop-blur-md py-3 border-b border-brand-cyan/20" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold tracking-tighter text-white">Sofia</span>
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
            href={getWAUrl("Olá! Gostaria de saber mais sobre como a Sofia pode ajudar minha empresa.")}
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
                href={getWAUrl("Olá! Gostaria de começar agora com a Sofia.")}
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
    { text: "Oi! Gostaria de saber mais sobre o serviço de vocês.", isBot: false },
    { text: "Olá! Sou a Sofia, a assistente digital. É um prazer atender você! Como posso ajudar hoje?", isBot: true },
    { text: "Quais são os horários de atendimento?", isBot: false },
    { text: "Nós atendemos 24 horas por dia, 7 dias por semana! Você nunca ficará sem resposta por aqui. 😊", isBot: true },
  ];

  return (
    <div className="w-full max-w-[320px] bg-[#0b141a] rounded-[2rem] border-[8px] border-[#1f2c34] overflow-hidden shadow-2xl relative">
      <div className="bg-[#1f2c34] p-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-brand-primary flex items-center justify-center text-white font-bold">S</div>
        <div>
          <p className="text-white text-sm font-semibold">Sofia - IA</p>
          <p className="text-brand-cyan text-[10px] flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-brand-cyan" /> online
          </p>
        </div>
      </div>
      <div className="h-[400px] p-4 overflow-y-auto flex flex-col gap-3 bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] bg-repeat bg-[length:400px]">
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

export default function App() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');

  return (
    <div className="min-h-screen bg-brand-bg text-white selection:bg-brand-cyan/30">
      <Navbar />

      {/* 2. Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden hero-gradient min-h-screen flex items-center">
        {/* Subtle Background Particles */}
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
              A inteligência que seu WhatsApp precisava para vender 24h por dia.
            </h1>
            <p className="text-lg text-gray-400 mb-10 max-w-lg leading-relaxed mx-auto lg:mx-0 px-6 md:px-0">
              Sofia é sua nova funcionária digital. Ela aprende sobre seu negócio, atende com naturalidade e garante que nenhum lead fique sem resposta, 24h por dia.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start px-8 sm:px-0">
              <a 
                href={getWAUrl("Olá! Quero a Sofia atendendo meus clientes 24h por dia e vendendo mais.")}
                target="_blank"
                rel="noreferrer"
                className="bg-brand-primary hover:bg-brand-primary/90 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-purple-glow flex items-center justify-center gap-2 border border-brand-cyan/30"
              >
                Começar agora <ArrowRight className="w-5 h-5" />
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
        <h2 className="text-3xl md:text-5xl font-bold mb-16">Você está perdendo clientes todos os dias sem perceber.</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Atendimento Noturno",
              text: "Um cliente manda mensagem às 22h, não recebe resposta e vai direto para o seu concorrente.",
              icon: <Clock className="w-10 h-10 text-brand-cyan" />
            },
            {
              title: "Tarefas Repetitivas",
              text: "Sua equipe passa o dia respondendo as mesmas perguntas simples, perdendo tempo produtivo.",
              icon: <MessageCircle className="w-10 h-10 text-brand-cyan" />
            },
            {
              title: "Fim de Semana Perdido",
              text: "Leads quentes chegam no sábado e ficam sem qualquer atendimento até a manhã de segunda-feira.",
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
      <section className="py-20 bg-brand-deep/30 overflow-hidden">
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
            <h2 className="text-3xl md:text-5xl font-bold mb-8">Sofia não é um chatbot. É uma funcionária.</h2>
            <div className="space-y-6 text-lg text-gray-300">
              <p>Sofia aprende sobre o seu negócio através de um treinamento simples, assimilando seus produtos, serviços e o tom de voz da sua marca.</p>
              <p>Ela fala com naturalidade, responde com inteligência, qualifica leads automaticamente e sabe exatamente o momento de passar o atendimento para um humano.</p>
              <ul className="space-y-4 pt-4">
                {[
                  "Treinamento personalizado em minutos",
                  "Linguagem natural e humana",
                  "Qualificação de leads automática",
                  "Transição inteligente para equipe real"
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
            <p className="text-sm font-medium">Você perde clientes todos os dias enquanto dorme.</p>
          </div>
          {[
            { title: "Manual", text: "Treine a Sofia com seu manual em minutos." },
            { title: "WhatsApp", text: "Conecte ao seu WhatsApp comercial." },
            { title: "Painel", text: "Acompanhe as vendas pelo painel." }
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
          <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center">Tudo o que sua empresa precisa para crescer.</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: <Clock />, title: "Atendimento 24 horas", desc: "Nunca apague as luzes. Sofia está sempre alerta." },
              { icon: <Zap />, title: "Resposta em segundos", desc: "Velocidade que impressiona e converte na hora." },
              { icon: <ShieldCheck />, title: "Nunca perde um lead", desc: "Cada mensagem é uma oportunidade aproveitada." },
              { icon: <Brain />, title: "IA que Aprende", desc: "Quanto mais atende, mais inteligente ela fica." },
              { icon: <MessageCircle />, title: "Áudio Natural", desc: "Responde em voz quando o contexto exige." },
              { icon: <BarChart3 />, title: "Relatórios de Venda", desc: "Siba exatamente quanto a Sofia está gerando." }
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
        <h2 className="text-3xl md:text-5xl font-bold mb-16">Empresas que já têm a Sofia na equipe.</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: "Ricardo Mendes",
              role: "CEO na Solar Tech",
              text: "Desde que a Sofia assumiu nosso WhatsApp, nossas vendas aumentaram 40%. O lead não espera mais nem 10 segundos.",
              img: "https://i.pravatar.cc/150?u=a1"
            },
            {
              name: "Juliana Costa",
              role: "Dona da Boutique J",
              text: "É impressionante como ela aprendeu sobre minhas roupas. Meus clientes acham que é uma pessoa real respondendo.",
              img: "https://i.pravatar.cc/150?u=a2"
            },
            {
              name: "André Silva",
              role: "Gerente Imobiliária",
              text: "A Sofia qualifica os interessados no domingo, e na segunda minha equipe só precisa fechar o contrato.",
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
        <div className="max-w-6xl mx-auto px-4 md:px-8 text-center text-nowrap">
          <h2 className="text-3xl md:text-5xl font-bold mb-8">Escolha o plano ideal para o seu negócio.</h2>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-16">
            <span className={`text-sm font-medium ${billingCycle === 'monthly' ? 'text-white' : 'text-gray-500'}`}>Mensal</span>
            <button 
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
              className="w-14 h-7 bg-brand-deep rounded-full p-1 relative border border-brand-cyan/30 transition-colors"
            >
              <motion.div 
                animate={{ x: billingCycle === 'monthly' ? 0 : 28 }}
                className="w-5 h-5 bg-brand-cyan rounded-full shadow-cyan-glow"
              />
            </button>
            <div className="flex items-center gap-2">
              <span className={`text-sm font-medium ${billingCycle === 'annual' ? 'text-white' : 'text-gray-500'}`}>Anual</span>
              <span className="bg-brand-cyan/20 text-brand-cyan text-[10px] font-bold px-2 py-0.5 rounded-full border border-brand-cyan/30">ECONOMIZE R$ 600/ANO</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Free Plan */}
            <div className="p-8 rounded-3xl border border-white/10 bg-brand-deep/20 text-left flex flex-col hover:border-white/20 transition-all">
              <h3 className="text-2xl font-bold mb-2">Teste Grátis</h3>
              <p className="text-gray-400 mb-6 font-medium text-sm whitespace-normal">Experimente o poder da Sofia por 15 dias.</p>
              <div className="text-4xl font-bold mb-8">Grátis<span className="text-lg text-gray-500">/15 dias</span></div>
              <ul className="space-y-4 mb-10 text-gray-300 flex-1">
                <li className="flex items-center gap-3 text-sm"><Check className="w-4 h-4 text-brand-cyan" /> 100 contatos/período</li>
                <li className="flex items-center gap-3 text-sm"><Check className="w-4 h-4 text-brand-cyan" /> Painel de controle</li>
                <li className="flex items-center gap-3 text-sm"><Check className="w-4 h-4 text-brand-cyan" /> Treinamento do agente (Texto)</li>
                <li className="flex items-center gap-3 text-sm text-gray-600"><X className="w-4 h-4" /> Treinamento por áudio</li>
                <li className="flex items-center gap-3 text-sm text-gray-600"><X className="w-4 h-4" /> 1 número de telefone grátis</li>
                <li className="flex items-center gap-3 text-sm text-gray-600"><X className="w-4 h-4" /> Sistema de Agendamento</li>
                <li className="flex items-center gap-3 text-sm text-gray-600"><X className="w-4 h-4" /> Integração CRM</li>
              </ul>
              <a 
                href={getWAUrl("Olá! Gostaria de iniciar meu teste grátis de 15 dias da Sofia.")}
                target="_blank"
                rel="noreferrer"
                className="w-full py-4 border border-white/20 text-gray-400 rounded-xl font-bold hover:bg-white/5 transition-all text-center"
              >
                Começar Teste
              </a>
            </div>

            {/* Starter Plan */}
            <div className="p-8 rounded-3xl border border-white/10 bg-brand-deep/20 text-left flex flex-col hover:border-brand-primary/20 transition-all">
              <h3 className="text-2xl font-bold mb-2">Plano Inicial</h3>
              <p className="text-gray-400 mb-6 font-medium text-sm whitespace-normal">Ideal para quem está começando.</p>
              <div className="text-4xl font-bold mb-8">
                R$ {billingCycle === 'annual' ? '247,90' : '297,90'}
                <span className="text-lg text-gray-500">/mês</span>
              </div>
              <ul className="space-y-4 mb-10 text-gray-300 flex-1">
                <li className="flex items-center gap-3 text-sm"><Check className="w-4 h-4 text-brand-cyan" /> 500 diálogos/mês</li>
                <li className="flex items-center gap-3 text-sm"><Check className="w-4 h-4 text-brand-cyan" /> Treinamento do agente (Texto)</li>
                <li className="flex items-center gap-3 text-sm"><Check className="w-4 h-4 text-brand-cyan" /> Painel de controle</li>
                <li className="flex items-center gap-3 text-sm text-gray-600"><X className="w-4 h-4" /> Treinamento por áudio</li>
                <li className="flex items-center gap-3 text-sm text-gray-600"><X className="w-4 h-4" /> 1 número de telefone grátis</li>
                <li className="flex items-center gap-3 text-sm text-gray-600"><X className="w-4 h-4" /> Sistema de Agendamento</li>
                <li className="flex items-center gap-3 text-sm text-gray-600"><X className="w-4 h-4" /> Integração CRM</li>
              </ul>
              <a 
                href={getWAUrl(`Olá! Gostaria de assinar o Plano Inicial da Sofia (${billingCycle === 'annual' ? 'Anual' : 'Mensal'}).`)}
                target="_blank"
                rel="noreferrer"
                className="w-full py-4 border border-brand-cyan text-brand-cyan rounded-xl font-bold hover:bg-brand-cyan/10 transition-all text-center"
              >
                Assinar Plano
              </a>
            </div>

            {/* Pro Plan */}
            <div className="p-8 rounded-3xl border-2 border-brand-cyan bg-brand-primary/10 text-left relative flex flex-col overflow-hidden shadow-cyan-glow transition-all hover:scale-[1.02]">
              <div className="absolute top-4 right-4 bg-brand-primary text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">Mais Popular</div>
              <h3 className="text-2xl font-bold mb-2">Plano Profissional</h3>
              <p className="text-gray-400 mb-6 font-medium text-sm whitespace-normal">A Sofia em sua potência máxima.</p>
              <div className="text-4xl font-bold mb-8">
                R$ {billingCycle === 'annual' ? '447,90' : '497,90'}
                <span className="text-lg text-gray-500">/mês</span>
              </div>
              <ul className="space-y-4 mb-10 text-gray-300 flex-1">
                <li className="flex items-center gap-3 font-bold text-white text-sm"><Check className="w-4 h-4 text-brand-cyan" /> Diálogos ilimitados</li>
                <li className="flex items-center gap-3 text-sm"><Check className="w-4 h-4 text-brand-cyan" /> 1 número de telefone grátis</li>
                <li className="flex items-center gap-3 text-sm font-semibold text-brand-cyan"><Check className="w-4 h-4" /> Treinamento do agente (Áudio/Texto)</li>
                <li className="flex items-center gap-3 text-sm"><Check className="w-4 h-4 text-brand-cyan" /> Sistema de Agendamento</li>
                <li className="flex items-center gap-3 text-sm"><Check className="w-4 h-4 text-brand-cyan" /> Integração CRM</li>
              </ul>
              <a 
                href={getWAUrl(`Olá! Gostaria de assinar o Plano Profissional da Sofia (${billingCycle === 'annual' ? 'Anual' : 'Mensal'}).`)}
                target="_blank"
                rel="noreferrer"
                className="w-full py-4 bg-brand-cyan text-brand-bg rounded-xl font-bold transition-all hover:brightness-110 text-center"
              >
                Quero este plano
              </a>
            </div>
          </div>
          <p className="mt-8 text-gray-500 italic">Sem fidelidade. Cancele quando quiser.</p>
        </div>
      </section>

      {/* 9. CTA Final */}
      <section className="py-20 lg:py-32 px-4 md:px-8 overflow-hidden">
        <div className="max-w-5xl mx-auto rounded-[2rem] md:rounded-[3rem] p-10 md:p-20 bg-gradient-to-br from-brand-primary to-brand-bg border border-brand-cyan/20 text-center relative overflow-hidden shadow-purple-glow">
          {/* Background circles */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-cyan/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-primary/10 rounded-full blur-3xl" />
          
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-8 relative z-10 leading-tight px-2">Pronto para ter a Sofia na sua equipe?</h2>
          <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto relative z-10 px-4">Configure em menos de 15 minutos e comece a atender seus clientes hoje mesmo.</p>
          <motion.a 
            href={getWAUrl("Olá! Quero começar agora com a Sofia e vender mais pelo WhatsApp!")}
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
      <footer className="bg-brand-deep py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold text-white">Sofia</span>
              <div className="w-2 h-2 rounded-full bg-brand-cyan pulsing-dot" />
            </div>
            <p className="text-gray-500 max-w-xs">Inteligência artificial aplicada ao atendimento que gera resultados reais.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-20">
            {[
              { title: "Empresa", links: ["Sobre", "Carreiras", "Blog"] },
              { title: "Suporte", links: ["Ajuda", "WhatsApp", "Status"] },
              { title: "Legal", links: ["Privacidade", "Termos", "LGPD"] }
            ].map((col, i) => (
              <div key={i}>
                <h4 className="font-bold mb-4 text-brand-cyan text-sm uppercase tracking-widest">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map((link, j) => (
                    <li key={j}><a href="#" className="text-gray-500 hover:text-white transition-colors text-sm">{link}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600">
          <p>© 2026 Sofia AI. Todos os direitos reservados.</p>
          <div className="flex gap-6">
            <span>contato@sofia.ai</span>
            <span>Made with ❤️ for SMBs</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
