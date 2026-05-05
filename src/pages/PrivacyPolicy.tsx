import React from 'react';
import { LegalLayout } from '../components/LegalLayout';

const PrivacyPolicy: React.FC = () => {
  return (
    <LegalLayout title="Política de Privacidade" lastUpdated="05 de Maio de 2026">
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">1. Introdução</h2>
        <p className="mb-4">
          A Sofia AI ("nós", "nosso" ou "Sofia") valoriza a sua privacidade. Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos suas informações pessoais ao utilizar nosso site e serviços.
        </p>
        <p>
          Ao utilizar a Sofia, você concorda com as práticas descritas nesta política. Estamos comprometidos em proteger a privacidade de nossos usuários e a segurança de seus dados.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">2. Coleta de Dados</h2>
        <p className="mb-4">Coletamos informações que você nos fornece diretamente, tais como:</p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li><strong>Informações de Cadastro:</strong> Nome, e-mail, número de telefone e dados da empresa.</li>
          <li><strong>Interações com o Agente:</strong> Histórico de conversas entre a Sofia e seus clientes para fins de treinamento e melhoria da IA.</li>
          <li><strong>Dados de Pagamento:</strong> Processados através de parceiros seguros (como Stripe), não armazenamos dados de cartão de crédito em nossos servidores.</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">3. Uso das Informações</h2>
        <p className="mb-4">Utilizamos as informações coletadas para:</p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Fornecer, manter e melhorar nossos serviços de inteligência artificial.</li>
          <li>Personalizar a experiência do treinamento da Sofia para o seu negócio específico.</li>
          <li>Processar transações e enviar comunicações relacionadas, incluindo faturas e confirmações.</li>
          <li>Prestar suporte técnico e responder a suas perguntas.</li>
          <li>Cumprir obrigações legais e regulatórias.</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">4. Compartilhamento de Dados</h2>
        <p className="mb-4">
          Não vendemos suas informações pessoais. Podemos compartilhar dados com fornecedores de serviços e parceiros que nos ajudam a operar nossa plataforma, sempre sob estritos acordos de confidencialidade e segurança.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">5. Segurança de Dados</h2>
        <p className="mb-4">
          Implementamos medidas de segurança técnicas e organizacionais adequadas para proteger seus dados contra acesso não autorizado, alteração, divulgação ou destruição. Isso inclui criptografia de dados em repouso e em trânsito.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">6. Seus Direitos</h2>
        <p className="mb-4">
          Você tem o direito de acessar, corrigir ou excluir seus dados pessoais. Você também pode se opor ao processamento de seus dados em certas circunstâncias. Para exercer esses direitos, entre em contato através de contato@zyreo.com.br.
        </p>
      </section>
    </LegalLayout>
  );
};

export default PrivacyPolicy;
