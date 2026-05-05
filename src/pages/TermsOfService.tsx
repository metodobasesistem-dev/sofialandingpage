import React from 'react';
import { LegalLayout } from '../components/LegalLayout';

const TermsOfService: React.FC = () => {
  return (
    <LegalLayout title="Termos de Uso" lastUpdated="05 de Maio de 2026">
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">1. Aceitação dos Termos</h2>
        <p className="mb-4">
          Ao acessar ou usar a Sofia AI, você concorda em cumprir e estar vinculado a estes Termos de Uso. Se você não concordar com qualquer parte destes termos, você não terá permissão para utilizar nossos serviços.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">2. Descrição do Serviço</h2>
        <p className="mb-4">
          A Sofia fornece uma solução de inteligência artificial para atendimento via WhatsApp, capaz de aprender sobre o negócio do usuário, responder dúvidas, qualificar leads e realizar agendamentos.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">3. Responsabilidades do Usuário</h2>
        <p className="mb-4">Ao utilizar a Sofia, você se compromete a:</p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Fornecer informações precisas durante o cadastro e treinamento da IA.</li>
          <li>Não utilizar a ferramenta para envio de spam ou qualquer atividade ilegal.</li>
          <li>Respeitar as políticas de uso do WhatsApp/Meta.</li>
          <li>Manter a segurança de sua conta e credenciais de acesso.</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">4. Planos e Pagamentos</h2>
        <p className="mb-4">
          Oferecemos planos mensais e anuais conforme descrito em nossa página principal. O pagamento é realizado antecipadamente. O cancelamento pode ser feito a qualquer momento, interrompendo a renovação para o próximo ciclo de cobrança.
        </p>
        <p>
          O teste grátis tem duração de 15 dias e limite de 100 contatos. Após este período, é necessário assinar um plano para continuar utilizando o serviço.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">5. Propriedade Intelectual</h2>
        <p className="mb-4">
          Todo o conteúdo, algoritmos e tecnologias subjacentes à Sofia AI são de propriedade exclusiva da Zyreo. O usuário detém os direitos sobre os dados de treinamento fornecidos e o histórico de conversas de seus clientes.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">6. Limitação de Responsabilidade</h2>
        <p className="mb-4">
          Embora busquemos a máxima precisão, a Sofia utiliza inteligência artificial que pode, eventualmente, gerar respostas imprecisas. Não nos responsabilizamos por perdas comerciais decorrentes de falhas nas respostas da IA ou interrupções no serviço do WhatsApp.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">7. Modificações nos Termos</h2>
        <p className="mb-4">
          Reservamo-nos o direito de modificar estes termos a qualquer momento. Notificaremos os usuários sobre mudanças significativas via e-mail ou aviso em nossa plataforma.
        </p>
      </section>
    </LegalLayout>
  );
};

export default TermsOfService;
