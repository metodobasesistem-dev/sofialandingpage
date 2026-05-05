import React from 'react';
import { LegalLayout } from '../components/LegalLayout';

const LGPDPage: React.FC = () => {
  return (
    <LegalLayout title="Conformidade com a LGPD" lastUpdated="05 de Maio de 2026">
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">1. Estar em conformidade é prioridade</h2>
        <p className="mb-4">
          A Sofia AI está totalmente comprometida com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018). Nossos sistemas foram desenhados para garantir a privacidade e o controle dos dados dos cidadãos brasileiros.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">2. Papel da Sofia (Operador vs Controlador)</h2>
        <p className="mb-4">
          Para os fins da LGPD, o <strong>Usuário (Sua Empresa)</strong> é o Controlador dos dados dos clientes finais. A <strong>Sofia AI (Zyreo)</strong> atua como Operadora, processando os dados conforme as instruções e necessidades do Controlador.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">3. Direitos do Titular de Dados</h2>
        <p className="mb-4">Garantimos mecanismos para que o Controlador possa atender às requisições dos titulares, incluindo:</p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li><strong>Confirmação de Tratamento:</strong> Saber se os dados estão sendo processados.</li>
          <li><strong>Acesso aos Dados:</strong> Obter uma cópia do histórico de conversas do titular.</li>
          <li><strong>Correção e Exclusão:</strong> Retificar dados incompletos ou solicitar a exclusão definitiva de registros.</li>
          <li><strong>Portabilidade:</strong> Transferência de dados para outro fornecedor, se solicitado.</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">4. Base Legal para o Tratamento</h2>
        <p className="mb-4">
          O tratamento de dados realizado pela Sofia baseia-se na execução de contrato (serviço de atendimento ao cliente) ou no legítimo interesse do Controlador, dependendo da finalidade específica da interação iniciada pelo cliente.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">5. Segurança e Transparência</h2>
        <p className="mb-4">
          Mantemos um Registro de Operações de Tratamento de Dados Pessoais (ROPA) interno e realizamos auditorias periódicas para garantir que o processamento via inteligência artificial siga os princípios de finalidade, necessidade e transparência.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">6. Contato do Encarregado (DPO)</h2>
        <p className="mb-4">
          Para quaisquer questões relacionadas à proteção de dados e LGPD, nosso Encarregado de Proteção de Dados pode ser contatado diretamente pelo e-mail: contato@zyreo.com.br.
        </p>
      </section>
    </LegalLayout>
  );
};

export default LGPDPage;
