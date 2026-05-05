import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface LegalLayoutProps {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}

export const LegalLayout: React.FC<LegalLayoutProps> = ({ title, lastUpdated, children }) => {
  return (
    <div className="min-h-screen bg-brand-bg text-white selection:bg-brand-cyan/30">
      {/* Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-bg/90 backdrop-blur-md py-4 border-b border-white/5">
        <div className="max-w-4xl mx-auto px-4 md:px-8 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Voltar ao site</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tighter text-white">Sofia</span>
            <div className="w-1.5 h-1.5 rounded-full bg-brand-cyan" />
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="pt-32 pb-20 px-4 md:px-8">
        <article className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
            <p className="text-gray-500 mb-12 text-sm">Última atualização: {lastUpdated}</p>
            
            <div className="prose prose-invert prose-brand max-w-none prose-p:text-gray-300 prose-headings:text-white prose-strong:text-white prose-li:text-gray-300">
              {children}
            </div>
          </motion.div>
        </article>
      </main>

      {/* Footer */}
      <footer className="bg-brand-deep py-12 px-4 md:px-8 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-600 text-xs">© 2026 Sofia AI. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};
