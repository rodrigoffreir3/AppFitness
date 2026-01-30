import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { AlertTriangle } from "lucide-react";

// Aqui simulamos a verificação se o usuário já aceitou.
// No futuro, isso virá do seu banco de dados (user.terms_accepted_at).
interface TermsModalProps {
  isOpen: boolean;
  onAccept: () => void;
}

export function TermsModal({ isOpen, onAccept }: TermsModalProps) {
  const [scrolledToBottom, setScrolledToBottom] = useState(false);
  const [accepted, setAccepted] = useState(false);

  // Função para detectar se o usuário leu até o final (opcional, mas recomendado)
  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
    if (scrollHeight - scrollTop <= clientHeight + 100) {
      setScrolledToBottom(true);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      {/* onOpenChange vazio impede que o modal feche clicando fora ou com ESC */}
      <DialogContent className="max-w-4xl h-[90vh] flex flex-col sm:h-[85vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <AlertTriangle className="h-6 w-6 text-yellow-600" />
            Termos de Uso e Licença de Software
          </DialogTitle>
          <DialogDescription>
            Para continuar acessando o AppFitness, você precisa ler e concordar com os novos termos de uso.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea 
          className="flex-1 border rounded-md p-4 bg-muted/50 text-sm leading-relaxed text-justify"
          onScrollCapture={handleScroll}
        >
          <div className="whitespace-pre-wrap font-mono text-xs sm:text-sm text-foreground/80">
            {TERMS_TEXT}
          </div>
        </ScrollArea>

        <div className="flex flex-col gap-4 py-4">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="terms" 
              checked={accepted}
              onCheckedChange={(checked) => setAccepted(checked as boolean)}
              disabled={!scrolledToBottom} // Só libera o check se rolar até o fim
            />
            <Label
              htmlFor="terms"
              className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
                !scrolledToBottom ? "text-muted-foreground" : ""
              }`}
            >
              Li integralmente e concordo com os Termos de Licença de Uso.
              {!scrolledToBottom && " (Role até o fim para habilitar)"}
            </Label>
          </div>
        </div>

        <DialogFooter>
          <Button 
            onClick={onAccept} 
            disabled={!accepted} 
            className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white"
          >
            Confirmar e Acessar Plataforma
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

const TERMS_TEXT = `TERMOS E CONDIÇÕES GERAIS DE USO E LICENCIAMENTO DE SOFTWARE WHITE LABEL (SaaS)

Pelo presente instrumento particular, de um lado:

61.224.583 RODRIGO DA SILVA FREIRE, pessoa jurídica de direito privado, inscrita no CNPJ/MF sob o nº 61.224.583/0001-29, com sede na ROLIM DE MOURA, ESTADO DE RONDÔNIA, doravante denominada simplesmente LICENCIANTE ou APPFITNESS;
E, de outro lado:

A pessoa física ou jurídica identificada e qualificada no momento do cadastro eletrônico no banco de dados da plataforma, doravante denominada simplesmente USUÁRIO ou LICENCIADO.
CLÁUSULA DE ADESÃO: A ACEITAÇÃO DESTES TERMOS É INDISPENSÁVEL PARA A UTILIZAÇÃO DO SISTEMA. AO CLICAR NA CAIXA DE SELEÇÃO "LI E CONCORDO", AO REALIZAR O CADASTRO OU AO UTILIZAR QUALQUER FUNCIONALIDADE DA PLATAFORMA, O USUÁRIO DECLARA TER LIDO, COMPREENDIDO E ACEITO INTEGRALMENTE TODAS AS CONDIÇÕES AQUI ESTABELECIDAS, VINCULANDO-SE AUTOMATICAMENTE A ESTE CONTRATO.

CASO NÃO CONCORDE COM QUALQUER DISPOSIÇÃO DESTES TERMOS, O USUÁRIO DEVERÁ ABSTER-SE IMEDIATAMENTE DE UTILIZAR O SOFTWARE.

1. Do Objeto do contrato
O presente contrato tem como objeto a licença de uso, não exclusiva e intransferível, do software white label desenvolvido pela LICENCIANTE, doravante denominado "sistema", para que o USUÁRIO utilize o sistema com sua marca pessoal, incluindo cores e identidade visual (branding), e realize o cadastro e gerenciamento de seus próprios clientes.

1.1 O sistema destina-se ao uso no nicho de mercado voltado para a área fitness, abrangendo treinadores profissionais autônomos, academias de musculação e luta, e estúdios de exercícios como pilates e ioga.

1.2 O USUÁRIO reconhece e concorda que a presente licença de uso não transfere a propriedade intelectual do sistema, que permanece integralmente com a LICENCIANTE.

1.3 O USUÁRIO é exclusivamente responsável pelos alunos que cadastrar no sistema, incluindo a segurança dos dados pessoais e informações sensíveis por eles fornecidas, bem como pela criação e manutenção de senhas de acesso seguras para seu perfil no sistema. A LICENCIANTE se responsabiliza pela segurança dos servidores e pela integridade do sistema em si.

2. Definições
2.1. Software - Refere -se ao programa de computador desenvolvido e de propriedade da LICENCIANTE, disponibilizado ao USUÁRIO sob os termos desta licença, incluindo quaisquer atualizações, melhorias e correções de erros que venham a ser implementadas.

2.2. White Label - Significa que o software será apresentado ao mercado e aos clientes do USUÁRIO com a identidade visual, marca, logo, cores e demais elementos de branding do USUÁRIO, mascarando a origem e a marca da LICENCIANTE.

2.3. USUÁRIO - Pessoa física ou jurídica, devidamente qualificada como profissional autônomo na área fitness (personal trainer, professor de ioga, instrutor de pilates, professor/sensei de lutas marciais, e afins), academia de musculação e luta, ou estúdio de exercícios (pilates, ioga), que adquire a licença de uso do software sob os termos e condições aqui estabelecidos.

2.4. Dados do USUÁRIO - Engloba todas as informações fornecidas pelo USUÁRIO para acesso e utilização do software, bem como os dados cadastrais, de desempenho, de saúde e quaisquer outras informações relativas aos Clientes do USUÁRIO que sejam inseridas, processadas ou armazenadas no software.

2.5. Informações Confidenciais - Inclui toda e qualquer informação, técnica, comercial, financeira, operacional, estratégica, ou de qualquer outra natureza, divulgada por uma parte à outra, seja de forma oral, escrita, eletrônica ou visual, que não seja de domínio público, incluindo, mas não se limitando a, segredos de negócio, know-how, planos de marketing, listas de clientes, informações financeiras, e o próprio código-fonte do software.

2.6. Marca do USUÁRIO (BRANDING) - Refere -se a todos os sinais distintivos, logotipos, nomes comerciais, marcas registradas e não registradas, e outros elementos de identidade visual que o USUÁRIO utiliza para identificar seus produtos e serviços, e que serão aplicados ao software na modalidade White Label.

2.7. Clientes do USUÁRIO  - São os alunos, clientes ou quaisquer terceiros que o USUÁRIO cadastra e gerencia por meio do software, para os quais o USUÁRIO presta seus serviços profissionais.

2.8. Servidores - Equipamentos de computação, redes e infraestrutura tecnológica de propriedade ou sob responsabilidade da LICENCIANTE, onde o software é hospedado e opera, garantindo sua disponibilidade e funcionamento.

2.9. sistema - Termo genérico que abrange o software, os servidores e toda a infraestrutura tecnológica necessária para a operação do serviço USUÁRIO.

2.10. Propriedade Intelectual - Refere-se a todos os direitos de propriedade intelectual, incluindo, mas não se limitando a, direitos autorais, patentes, marcas, desenhos industriais, segredos de negócio, know -how, e quaisquer outros direitos de natureza similar, sobre o software e sua tecnologia, pertencentes exclusivamente à LICENCIANTE.

2.11. Documentação - Manuais, guias, tutoriais e quaisquer outros materiais informativos fornecidos pela LICENCIANTE ao USUÁRIO, que descrevem o funcionamento, a instalação e o uso do software.

2.12. Suporte Técnico - Serviços prestados pela LICENCIANTE para auxiliar o USUÁRIO na resolução de dúvidas e problemas técnicos relacionados ao uso do software, conforme os termos e condições estabelecidos neste contrato.

2.13. Atualizações - Modificações e novas versões do software que a LICENCIANTE disponibiliza para aprimorar funcionalidades, corrigir erros ou introduzir novos recursos.

2.14. Melhorias - Aperfeiçoamentos e otimizações implementados pela LICENCIANTE no software, visando aumentar sua performance, segurança e usabilidade.

2.15. Erros - Falhas ou defeitos no funcionamento do software que causem resultados imprevistos ou incorretos em relação ao seu propósito.

2.16. Disponibilidade - Percentual de tempo em que o software e seus serviços estarão acessíveis e operacionais para o USUÁRIO, conforme estabelecido em Acordo de Nível de Serviço (SLA), se aplicável.

2.17. Manutenção - Atividades realizadas pela LICENCIANTE para garantir o bom funcionamento, a segurança e a atualização dos Servidores e do sistema, que podem, em alguns casos, implicar em indisponibilidade temporária do software.

2.18. Backups - Cópias de segurança dos dados armazenados no sistema, realizadas periodicamente pela LICENCIANTE para fins de recuperação em caso de falhas ou perdas de dados.

2.19. Incidentes de Segurança - Qualquer evento que comprometa a confidencialidade, integridade ou disponibilidade dos dados ou do sistema, incluindo acessos não autorizados, vazamentos de dados ou ataques cibernéticos.

2.20. Legislação Aplicável - Conjunto de leis, normas e regulamentos vigentes no ordenamento jurídico brasileiro que regem a matéria contratual, a proteção de dados, a propriedade intelectual e as relações de consumo.

2.21. Foro - Localidade geográfica designada para a resolução de quaisquer litígios decorrentes deste contrato.

2.22. Vigência - Período de tempo durante o qual este contrato produzirá seus efeitos legais.

2.23. Rescisão - Encerramento antecipado ou ao final do prazo deste contrato, por quaisquer das causas previstas em lei ou neste instrumento.

2.24. Multa - Penalidade pecuniária a ser aplicada em caso de descumprimento de quaisquer obrigações contratuais por uma das partes.

2.25. Perdas e Danos - Prejuízos materiais e morais sofridos por uma parte em decorrência do descumprimento contratual pela outra parte.

2.26. Caso Fortuito - Evento imprevisível e inevitável, alheio à vontade das partes, que impede o cumprimento de suas obrigações.

2.27. Força Maior - Evento extraordinário, imprevisível e inevitável, como desastres naturais, guerras ou greves, que impede o cumprimento de suas obrigações.

2.28. Política de Privacidade - Conjunto de regras e procedimentos adotados pela LICENCIANTE e pelo USUÁRIO para a coleta, uso, armazenamento e proteção de dados pessoais, em conformidade com a Lei Geral de Proteção de Dados (LGPD).

2.29. Termos de Uso - Regras e condições que disciplinam a utilização do software pelo USUÁRIO e, indiretamente, pelos Clientes do USUÁRIO.

2.30. Nível de Serviço - Padrões de qualidade e desempenho que a LICENCIANTE se compromete a oferecer em relação à Disponibilidade e ao Suporte Técnico do software.

2.31. Acordo de Nível de Serviço (SLA) - Documento complementar a este contrato que detalha os Níveis de Serviço, métricas de desempenho, responsabilidades e penalidades relacionadas à Disponibilidade e ao Suporte Técnico.

2.32. Plano de Contingência - Conjunto de procedimentos e ações planejadas pela LICENCIANTE para garantir a continuidade das operações do sistema em caso de incidentes graves ou falhas.

2.33. Auditoria - Processo de verificação e avaliação das práticas de segurança, conformidade e operação do sistema e dos dados.

2.34. Relatório de Auditoria - Documento formal que apresenta os resultados, constatações e recomendações de uma Auditoria.

2.35. Confidencialidade - Dever de manter em sigilo as informações confidenciais recebidas de outra parte.

2.36. Não-Concorrência - Obrigação de uma parte de não competir diretamente com a outra parte em determinadas atividades ou mercados durante a vigência do contrato e por um período posterior.

2.37. Não-Solicitação - Obrigação de uma parte de não solicitar ou contratar funcionários ou prestadores de serviço da outra parte durante a vigência do contrato e por um período posterior.

2.38. Propósito - Finalidade específica para a qual o software é USUÁRIO e será utilizado pelo USUÁRIO.

2.39. Território - Área geográfica onde a licença de uso do software é válida.

2.40. Limitações - Restrições impostas ao uso do software pelo USUÁRIO, conforme estabelecido neste contrato.

2.41. Restrições - Proibições específicas de atividades ou usos do software que não são permitidos.

2.42. Responsabilidades - Deveres e obrigações atribuídas a cada parte em relação ao cumprimento deste contrato e à operação do software.

2.43. Obrigações - Compromissos assumidos por cada parte em decorrência deste contrato.

2.44. Direitos - Faculdades e prerrogativas concedidas a cada parte em decorrência deste contrato.

2.45. Garantias - Assegurações dadas por uma parte à outra quanto à qualidade, funcionamento ou conformidade de algo.

2.46. Indenização - Compensação financeira devida por uma parte à outra em razão de prejuízos causados.

2.47. Limitação de Responsabilidade - Cláusula que restringe o montante ou o tipo de responsabilidade que uma parte pode ter em relação a determinados eventos ou danos.

2.48. Lei Geral de Proteção de Dados (LGPD) - Lei nº 13.709/2018, que dispõe sobre o tratamento de dados pessoais, inclusive nos meios digitais, por pessoa natural ou por pessoa jurídica de direito público ou privado, com o objetivo de proteger os direitos fundamentais de liberdade e de privacidade e o livre desenvolvimento da personalidade da pessoa natural.

2.49. Marco Civil da Internet - Lei nº 12.965/2014, que estabelece princípios, garantias, direitos e deveres para o uso da internet no Brasil.

2.50. Código de Defesa do Consumidor - Lei nº 8.078/1990, que estabelece normas de proteção e defesa do consumidor.

2.51. Código Civil - Lei nº 10.406/2002, que estabelece normas gerais sobre direito privado.

2.52. Propriedade Industrial - Conjunto de direitos relacionados à proteção de invenções, modelos de utilidade, desenhos industriais, marcas e indicações geográficas.

2.53. Direitos Autorais - Direitos que a lei confere aos autores de obras intelectuais para que possam usufruir de suas criações.

2.54. Segredos de Negócio - Informações confidenciais que conferem uma vantagem competitiva a uma empresa.

2.55. Know-How - Conjunto de conhecimentos práticos, habilidades e técnicas adquiridas pela experiência.

2.56. Patentes - Título de propriedade industrial que garante ao inventor o direito exclusivo de exploração de sua invenção.

2.57. Marcas - Sinal distintivo que identifica produtos ou serviços de uma empresa.

2.58. Desenhos Industriais - Forma plástica ornamental de um objeto ou o conjunto ornamental de linhas e cores que possa ser aplicado a um produto, conferindo -lhe originalidade.

2.59. Topografias de Circuitos Integrados - Representação tridimensional de elementos e de interconexões em um circuito integrado.

2.60. Indicação Geográfica - Nome geográfico que identifica um produto ou serviço originário de um determinado local, com qualidades ou características que lhe são essencialmente devidas.

2.61. Denominação de Origem - Tipo de indicação geográfica que designa um produto cujas qualidades ou características são exclusivas ou essenciais ao meio geográfico, incluindo os fatores naturais e humanos.

2.62. Concorrência Desleal - Prática de atos que visam desviar clientela de um concorrente de forma ilícita.

2.63. Atos de Imitação - Reprodução de características de produtos ou serviços de um concorrente com o intuito de confundir o consumidor.

2.64. Atos de Desvio de Clientela - Ações que visam subtrair clientes de um concorrente por meios fraudulentos ou desleais.

2.65. Atos de Sabotagem - Ações deliberadas para prejudicar a atividade comercial de um concorrente.

2.66. Atos de Difamação - Divulgação de informações falsas ou imprecisas que prejudiquem a reputação de um concorrente.

2.67. Atos de Espionagem - Obtenção de informações confidenciais de um concorrente por meios ilícitos.

2.68. Atos de Violação de Segredo - Divulgação ou uso indevido de informações confidenciais de um concorrente.

2.69. Atos de Publicidade Comparativa - Publicidade que compara produtos ou serviços de um concorrente, desde que feita de forma verdadeira e não enganosa.

2.70. Atos de Publicidade Enganosa - Publicidade que induz o consumidor a erro quanto à natureza, características, qualidade, quantidade, preço, ou qualquer outra informação sobre o produto ou serviço.

2.71. Atos de Publicidade Abusiva - Publicidade que se aproveita da deficiência de discernimento de crianças, que desrespeita valores sociais, que explora o medo ou superstição, ou que prejudica a segurança pública.

2.72. Atos de Publicidade Ilícita - Publicidade que viola a lei, incluindo a que é enganosa, abusiva, discriminatória ou que incite à violência.

2.73. Atos de Publicidade Subliminar - Publicidade que não é percebida conscientemente pelo receptor, mas que pode influenciar seu comportamento.

2.74. Atos de Publicidade Omissiva - Publicidade que deixa de informar dados essenciais sobre o produto ou serviço, induzindo o consumidor a erro.

2.75. Atos de Publicidade Discriminatória - Publicidade que discrimina raça, cor, sexo, idade, religião, origem, ou quaisquer outras formas de discriminação.

2.76. Atos de Publicidade Ofensiva - Publicidade que ofende a dignidade humana, a moral ou os bons costumes.

2.77. Atos de Publicidade Desleal - Publicidade que, embora não seja enganosa, é capaz de prejudicar um concorrente ou o mercado em geral.

2.78. Atos de Publicidade Parasitária - Publicidade que se aproveita da fama ou do prestígio de outra marca ou produto para obter vantagem indevida.

3. Escopo da Licença
3.1. A presente licença de uso concede ao USUÁRIO o direito de utilizar o SOFTWARE WHITE LABEL, doravante denominado "SOFTWARE", de forma não exclusiva, intransferível e limitada, estritamente para os fins de gestão de seus clientes dentro do nicho de mercado fitness, abrangendo atividades como treinador profissional autônomo, academias de musculação e luta, e estúdios de exercícios físicos (tais como pilates e ioga).

3.2. O USUÁRIO compromete-se a utilizar o SOFTWARE exclusivamente para a sua atividade profissional autônoma ou para a gestão de sua respectiva academia ou estúdio, sendo vedada qualquer forma de cessão, sublicenciamento, empréstimo, locação ou qualquer outra modalidade de transferência do direito de uso a terceiros, seja a título oneroso ou gratuito.

3.3. Fica expressamente estabelecido que a concessão desta licença de uso não implica, em qualquer hipótese, a transferência da propriedade do SOFTWARE, de sua tecnologia subjacente, de seu código fonte, de seus algoritmos, de suas bases de dados ou de quaisquer outros direitos de propriedade intelectual relacionados ao SOFTWARE para o USUÁRIO. Todos os direitos de propriedade intelectual permanecem integralmente com a LICENCIANTE.

3.4. A utilização do SOFTWARE pelo USUÁRIO está restrita à aplicação de sua própria marca pessoal, incluindo, mas não se limitando a, logotipo, paleta de cores e elementos de branding, de forma a apresentar o sistema aos seus clientes como se fosse de sua própria autoria, sem, contudo, conferir qualquer direito de propriedade sobre a tecnologia em si.

4. Direitos e Obrigações do LICENCIANTE
4.1. A LICENCIANTE é a única e exclusiva titular de todos os direitos de propriedade intelectual, incluindo, mas não se limitando a, direitos autorais, patentes, segredos comerciais e marcas registradas, sobre o SOFTWARE objeto deste contrato, bem como sobre toda a tecnologia subjacente, código-fonte, código-objeto, documentação, interfaces, design, algoritmos, metodologias e quaisquer outros elementos que o componham. A concessão da licença de uso aqui prevista não implica em qualquer transferência de titularidade ou cessão de direitos de propriedade intelectual da LICENCIANTE para o USUÁRIO.

4.2. A LICENCIANTE reserva -se o direito de, a qualquer tempo e a seu exclusivo critério, realizar manutenções preventivas e corretivas, atualizações, modificações e melhorias no SOFTWARE, visando suaprimoramento, correção de falhas, adaptação a novas tecnologias ou cumprimento de exigências legais e regulatórias. Tais intervenções poderão, eventualmente, implicar em indisponibilidade temporária do SOFTWARE, a qual será comunicada ao USUÁRIO com a maior antecedência possível, exceto em casos de urgência ou falhas críticas.

4.3. A LICENCIANTE compromete-se a empreender seus melhores esforços para garantir a disponibilidade do SOFTWARE, de acordo com os níveis de serviço (SLA) estabelecidos em anexo a este contrato, ressalvadas as hipóteses de força maior, caso fortuito ou indisponibilidade decorrente de falhas na infraestrutura de internet do USUÁRIO ou de terceiros não sob sua responsabilidade.

4.4. A LICENCIANTE disponibilizará suporte técnico ao USUÁRIO, nos termos e condições definidos em anexo a este contrato, para auxiliar na resolução de dúvidas e problemas relacionados à utilização do SOFTWARE.

4.5. A LICENCIANTE é responsável pela segurança dos servidores e da infraestrutura tecnológica que hospedam o SOFTWARE, implementando medidas de segurança adequadas para proteger o sistema contra acessos não autorizados, perdas de dados e outras ameaças cibernéticas. Contudo, o USUÁRIO reconhece e concorda que a responsabilidade pela segurança dos dados de seus clientes, bem como pela qualidade e confidencialidade de suas credenciais de acesso (login e senha), é de sua exclusiva alçada.

4.6. A LICENCIANTE detém o direito de rescindir unilateralmente este contrato, mediante notificação prévia ao USUÁRIO, nos casos de descumprimento de quaisquer obrigações contratuais por parte do USUÁRIO, incluindo, mas não se limitando a, violação de direitos de propriedade intelectual, uso indevido do SOFTWARE, inadimplemento de obrigações financeiras, ou qualquer conduta que prejudique a imagem, a reputação ou a operação do LICENCIANTE ou do SOFTWARE.

5. Direitos e Obrigações do USUÁRIO
5.1. O USUÁRIO tem o direito de utilizar o SOFTWARE, em caráter não exclusivo e intransferível, para fins de gestão de seus negócios na área fitness, incluindo, mas não se limitando a, a personalização da interface do SOFTWARE com sua identidade visual, como logotipo, cores e demais elementos de branding, bem como o cadastro, organização e gerenciamento de seus clientes e suas respectivas informações.

5.2. O USUÁRIO se compromete a utilizar o SOFTWARE estritamente de acordo com os fins estabelecidos neste contrato, os Termos de Uso e a Política de Privacidade, abstendo-se de qualquer prática que possa violar a legislação vigente, os direitos de terceiros ou a estabilidade e segurança do sistema.

5.3. O USUÁRIO é o único e exclusivo responsável pela conduta de seus clientes cadastrados no SOFTWARE, bem como por quaisquer informações por eles fornecidas ou por quaisquer interações que ocorram através da plataforma, isentando a CONTRATANTE de qualquer responsabilidade nesse sentido.

5.4. O USUÁRIO assume integral responsabilidade pela segurança e confidencialidade de suas credenciais de acesso ao SOFTWARE, incluindo senhas e quaisquer outros mecanismos de autenticação, comprometendo-se a adotar todas as medidas necessárias para evitar o acesso não autorizado por terceiros às informações sensíveis de seus clientes.

5.5. O USUÁRIO declara ter ciência e se compromete a cumprir integralmente as disposições da Lei Geral de Proteção de Dados (LGPD  - Lei nº 13.709/2018) no que tange ao tratamento dos dados pessoais de seus clientes coletados e/ou armazenados através do SOFTWARE, incluindo a obtenção de consentimento quando necessário, a garantia dos direitos dos titulares e a adoção de medidas de segurança adequadas para a proteção desses dados.

5.6. O USUÁRIO obriga-se a não utilizar o SOFTWARE para fins ilícitos, fraudulentos, difamatórios, ou que violem direitos autorais, de propriedade intelectual ou outros direitos de terceiros, bem como a não disseminar conteúdo que possa ser considerado ofensivo, discriminatório ou prejudicial.

5.7. O USUÁRIO reconhece que a utilização do SOFTWARE não confere a ele qualquer direito de propriedade sobre a tecnologia subjacente, o código-fonte, os algoritmos ou quaisquer outros elementos de propriedade intelectual da LICENCIANTE, sendo a licença concedida estritamente para o uso conforme descrito neste instrumento.

6. Responsabilidade pelos Dados dos Clientes
6.1. O USUÁRIO declara e reconhece ser o único e exclusivo responsável pela coleta, armazenamento, processamento, organização, utilização, acesso, reprodução, transmissão, distribuição, modificação, exclusão e qualquer outra forma de tratamento dos dados pessoais de seus clientes e/ou alunos, doravante denominados Titulares dos Dados, que venham a ser inseridos ou disponibilizados no sistema objeto desta licença.

6.2. O USUÁRIO assume integral responsabilidade pela conformidade de todas as suas atividades de tratamento de dados pessoais com a Lei Geral de Proteção de Dados (LGPD  - Lei nº 13.709/2018) e demais legislações aplicáveis, incluindo, mas não se limitando a, a obtenção de consentimentos válidos, o cumprimento dos direitos dos titulares, a adoção de medidas de segurança adequadas e a comunicação de incidentes de segurança, quando aplicável.

6.3. O USUÁRIO compromete-se a implementar e manter medidas técnicas e administrativas aptas a proteger os dados pessoais dos titulares dos dados contra acessos não autorizados, destruição, perda, alteração, comunicação ou difusão indevida, garantindo a confidencialidade, integridade e disponibilidade dessas informações.

6.4. A LICENCIANTE não será, em nenhuma hipótese, responsável por quaisquer danos, perdas, multas, sanções, reclamações ou quaisquer outras consequências decorrentes de violações de dados pessoais, uso indevido de informações, ou descumprimento da LGPD e demais normas aplicáveis por parte do USUÁRIO ou de seus prepostos, incluindo, mas não se limitando a, falhas na gestão de senhas, vazamento de informações decorrente de negligência do USUÁRIO, ou qualquer outra conduta que resulte em tratamento inadequado dos dados dos Titulares dos Dados.

6.5. O USUÁRIO concorda em indenizar e isentar a LICENCIANTE de toda e qualquer responsabilidade, custo ou despesa, incluindo honorários advocatícios, decorrente de quaisquer reclamações, ações judiciais ou extrajudiciais, ou procedimentos administrativos movidos por titulares dos dados, autoridades competentes ou terceiros, em razão do tratamento de dados pessoais realizado pelo USUÁRIO em desacordo com as disposições legais ou com os termos deste contrato.

7. Segurança da Informação
7.1. A LICENCIANTE se compromete a implementar e manter medidas de segurança física, lógica e administrativa razoáveis e adequadas para proteger os servidores e a infraestrutura tecnológica que hospedam o software contra acessos não autorizados, perdas, destruição ou alteração de dados. Tais medidas incluem, mas não se limitam a, firewalls, sistemas de detecção e prevenção de intrusão, criptografia de dados em trânsito e em repouso, backups regulares e políticas de controle de acesso rigorosas.

7.2. O USUÁRIO é o único e exclusivo responsável pela manutenção da confidencialidade de suas credenciais de acesso ao software, incluindo nome de USUÁRIO e senha. O USUÁRIO se compromete a adotar todas as medidas de segurança necessárias para proteger suas senhas contra acesso não autorizado, incluindo a utilização de senhas fortes e únicas, a não compartilhamento de suas credenciais com terceiros e a alteração periódica de suas senhas. O USUÁRIO reconhece que a segurança de seu perfil de acesso é fundamental para a proteção das informações sensíveis de seus clientes cadastradas no sistema.

7.3. O USUÁRIO deverá notificar imediatamente o LICENCIANTE, por escrito, sobre qualquer suspeita ou confirmação de incidente de segurança que envolva suas credenciais de acesso, o acesso não autorizado ao seu perfil no software, ou qualquer outra violação de segurança que possa afetar a integridade e confidencialidade dos dados de seus clientes. A notificação deverá conter o máximo de detalhes possível sobre o incidente.

7.4. A LICENCIANTE se compromete a investigar prontamente qualquer incidente de segurança notificado pelo USUÁRIO, tomando as medidas cabíveis para mitigar os danos e restaurar a segurança do sistema. No entanto, a LICENCIANTE não será responsável por quaisquer perdas, danos ou prejuízos diretos ou indiretos decorrentes do uso indevido das credenciais de acesso pelo USUÁRIO, falha na adoção de medidas de segurança adequadas por parte do USUÁRIO, ou incidentes de segurança que não sejam de sua responsabilidade direta, conforme estabelecido neste contrato.

8. Propriedade Intelectual
8.1. O USUÁRIO reconhece e concorda que todos os direitos de propriedade intelectual, incluindo, mas não se limitando a, direitos autorais, patentes, marcas registradas, segredos comerciais, know-how, design, código fonte, código objeto, algoritmos, arquitetura, interface de USUÁRIO, documentação técnica e qualquer outro material protegido por leis de propriedade intelectual, relacionados ao software, sua tecnologia subjacente e quaisquer atualizações, modificações ou melhorias futuras, pertencem exclusivamente ao Licenciante.

8.2. Fica expressamente vedado ao USUÁRIO copiar, reproduzir, distribuir, transmitir, publicar, exibir, modificar, adaptar, traduzir, descompilar, fazer engenharia reversa, desmontar ou de outra forma tentar obter o código-fonte do software, ou criar obras derivadas com base no software ou em qualquer parte dele, sem o consentimento prévio e por escrito da LICENCIANTE.

8.3. O USUÁRIO concorda em não remover, obscurecer ou alterar quaisquer avisos de direitos autorais, marcas registradas ou outros avisos de propriedade que possam estar incluídos no software ou em qualquer documentação associada.

8.4. A licença concedida por meio deste contrato confere ao USUÁRIO apenas o direito de uso do software, nos termos e condições aqui estabelecidos, e não constitui, em qualquer hipótese, transferência de propriedade ou de quaisquer outros direitos de propriedade intelectual sobre o software para o USUÁRIO.

9. Confidencialidade
9.1. As partes reconhecem e concordam que, em virtude da execução deste contrato, poderão ter acesso a informações confidenciais da outra parte. "Informações confidenciais" significa toda e qualquer informação, em qualquer forma ou meio (escrito, oral, eletrônico, visual, etc.), divulgada por uma parte à outra, que seja marcada como confidencial ou que, pela sua natureza ou pelas circunstâncias da sua divulgação, deva ser razoavelmente considerada confidencial. Incluem -se, mas não se limitam a, segredos comerciais, know-how, invenções, processos, fórmulas, dados técnicos, planos de negócios, estratégias de marketing, informações financeiras, listas de clientes, dados de desempenho, informações sobre funcionários, e quaisquer outros dados proprietários ou estratégicos.

9.2. Cada parte se compromete a manter em estrito sigilo todas as Informações Confidenciais da outra parte a que tiver acesso, e a não divulgar, revelar, publicar, reproduzir ou de qualquer outra forma tornar acessível a terceiros, total ou parcialmente, tais informações, exceto conforme expressamente permitido por este contrato ou pela lei.

9.3. As partes concordam em utilizar as Informações Confidenciais da outra parte unicamente para os fins estritamente necessários à execução das obrigações previstas neste contrato, e a empregar o mesmo grau de cuidado que empregam para proteger suas próprias informações confidenciais de natureza semelhante, mas nunca inferior a um grau razoável de cuidado.

9.4. A obrigação de confidencialidade estabelecida nesta cláusula não se aplica a informações que:
(a) já sejam de domínio público no momento da divulgação, ou que venham a se tornar de domínio público sem que isso ocorra por violação deste contrato por parte da parte receptora;
(b) já estivessem legitimamente em posse da parte receptora antes da divulgação pela parte divulgadora, sem obrigação de confidencialidade;
(c) sejam recebidas de um terceiro que tenha o direito de divulgá -las, sem restrições;
(d) sejam desenvolvidas independentemente pela parte receptora, sem o uso ou referência às Informações Confidenciais da parte divulgadora;
(e) sejam exigidas por lei, ordem judicial ou regulamentação governamental, desde que a parte receptora notifique previamente a parte divulgadora, na medida do possível e legalmente permitido, sobre tal exigência, permitindo que a parte divulgadora busque medidas protetivas adequadas.

9.5. As obrigações de confidencialidade aqui estabelecidas permanecerão em vigor mesmo após o término ou rescisão deste contrato, por um período de 5 (cinco) anos, ou, no caso de segredos comerciais, enquanto tais informações mantiverem o status de segredo comercial sob a legislação aplicável.

9.6. O USUÁRIO reconhece que a tecnologia subjacente ao software, incluindo seu código-fonte, algoritmos, arquitetura e quaisquer outros elementos técnicos, constitui informação confidencial do USUÁRIO e se compromete a não tentar descompilar, fazer engenharia reversa, modificar ou criar trabalhos derivados do software, exceto conforme expressamente permitido por este contrato.

10. Pagamento e Reajuste
10.1. O presente contrato de Licença de Uso de software White Label é remunerado mediante o pagamento de uma taxa de licença, cujo valor é escolhido no ato de contratação da assinatura, dentre os planos disponíveis, a ser paga pelo USUÁRIO à LICENCIANTE de forma MENSAL ou ANUAL, conforme modalidade escolhida pelo USUÁRIO no ato da contratação.

10.2. A taxa de licença deverá ser paga pelo USUÁRIO no ato da assinatura, renovando-se MENSALMENTE - quando da modalidade mensal (30 dias corridos) - ou renovando-se ANUALMENTE - quando da modalidade anual (365 dias corridos) - O não pagamento na data estipulada implicará na incidência de encargos moratórios.

10.3. Em caso de atraso no pagamento da taxa de licença, o valor devido será acrescido de multa moratória de 2% sobre o valor em atraso, acrescido de juros de mora de 1% ao mês, calculados pro rata die, e correção monetária pelo IPCA (Índice de Preços ao Consumidor Amplo), desde a data do vencimento até a data do efetivo pagamento. A inadimplência superior a 3 (três) dias poderá acarretar a suspensão imediata do acesso do USUÁRIO ao software, sem prejuízo de outras medidas cabíveis.

10.4. A taxa de licença poderá ser reajustada anualmente, ou em periodicidade inferior caso haja previsão legal, com base na variação do IPCA (Índice de Preços ao Consumidor Amplo) acumulada no período, ou outro índice que venha a substituí -lo legalmente. O reajuste será aplicado automaticamente no período de faturamento subsequente ao aniversário de assinatura ou à data de sua última alteração.

11. Vigência e Rescisão
11.1. O presente contrato de Licença de Uso de software White Label terá prazo de vigência indeterminado, iniciando-se na data da sua assinatura eletrônica e perdurando até que seja formalmente rescindido por qualquer das partes, nos termos aqui estabelecidos.

11.2. O presente contrato poderá ser rescindido a qualquer tempo pelo USUÁRIO mediante cancelamento da assinatura. No ato de cancelamento da referida assinatura, o acesso será mantido até a data da próxima renovação/cobrança, restando excluída a conta do USUÁRIO após este período.

11.3. O presente contrato poderá ser rescindido imediatamente por parte da LICENCIANTE, independentemente de aviso prévio, nas seguintes hipóteses de descumprimento contratual pela outra parte:

11.3.1. Pela LICENCIANTE, caso o USUÁRIO descumpra qualquer obrigação prevista neste contrato, incluindo, mas não se limitando a, utilização do software para fins ilícitos, a violação dos direitos de propriedade intelectual da LICENCIANTE, a falha no cumprimento das obrigações de confidencialidade, ou a utilização do software de forma a prejudicar a segurança ou a integridade do sistema ou de seus servidores. Sem prejuízo no disposto na cláusula 10.3.

11.4. Em caso de rescisão do presente contrato, por qualquer motivo elencado acima, a responsabilidade final pela exclusão completa da conta e dos dados de seus clientes recairá sobre o USUÁRIO. Em caso de imediata interrupção de uso, a LICENCIANTE excluirá os referidos dados, enviando por e-mail ao USUÁRIO um termo de exclusão integral dos dados.

11.5. Em caso de rescisão, o USUÁRIO deverá, a critério da LICENCIANTE, devolver ou destruir todas as cópias do software, incluindo quaisquer materiais relacionados, que estejam em sua posse ou sob seu controle, e apresentar à LICENCIANTE, mediante solicitação, declaração escrita atestando o cumprimento desta obrigação. A LICENCIANTE reserva -se o direito de auditar o cumprimento desta cláusula.

11.6. A rescisão do presente contrato não exime as partes de quaisquer obrigações vencidas e não cumpridas até a data da rescisão, incluindo, mas não se limitando a, obrigações de pagamento, indenização por perdas e danos, e as cláusulas que, por sua natureza, devam sobreviver à rescisão, como as de confidencialidade, propriedade intelectual, não concorrência, etc.

12. Limitação de Responsabilidade
12.1. A LICENCIANTE não será responsável por quaisquer danos indiretos, lucros cessantes, perda de dados, interrupção de negócios, danos morais, danos emergentes, ou quaisquer outras perdas ou prejuízos de natureza similar ou diversa, que possam advir do uso ou da impossibilidade de uso do SOFTWARE, ainda que o LICENCIANTE tenha sido advertido sobre a possibilidade de tais danos.

12.2. A responsabilidade total do LICENCIANTE perante o USUÁRIO, por quaisquer danos, perdas ou causas de ação, seja em contrato, ato ilícito (incluindo, mas não se limitando à negligência) ou de outra forma, decorrentes deste contrato ou do uso do SOFTWARE, não excederá, em hipótese alguma, o valor total efetivamente pago pelo USUÁRIO ao LICENCIANTE pela licença de uso do SOFTWARE, referente ao período de 12 (doze) meses imediatamente anteriores ao evento que deu origem à reclamação.

12.3. O USUÁRIO reconhece e concorda que as limitações de responsabilidade estabelecidas nesta cláusula são um elemento essencial do acordo entre as partes e que o LICENCIANTE não celebraria este contrato sem tais limitações, as quais refletem uma alocação razoável de risco entre as partes, considerando a natureza do SOFTWARE e os serviços prestados.

13. Garantias
13.1. A LICENCIANTE garante que o SOFTWARE, quando utilizado em conformidade com a documentação técnica fornecida e as instruções de uso, funcionará substancialmente de acordo com as funcionalidades descritas na referida documentação. Esta garantia se limita à correção de defeitos que impeçam o funcionamento essencial do SOFTWARE, conforme especificado, e não abrange a total ausência de erros ou interrupções, visto que a complexidade de sistemas de software pode gerar falhas pontuais.

13.2. A LICENCIANTE não oferece quaisquer outras garantias, expressas ou implícitas, incluindo, mas não se limitando a, garantias de comercialização, de adequação a um propósito específico, de não violação de direitos de terceiros ou de que o SOFTWARE atenderá às necessidades particulares do USUÁRIO ou de seus clientes. A responsabilidade do LICENCIANTE se restringe à garantia de funcionamento do sistema em si, conforme descrito na documentação, e à segurança dos servidores e da infraestrutura tecnológica que hospedam o SOFTWARE.

13.3. O USUÁRIO reconhece e concorda que a utilização do SOFTWARE se dá por sua conta e risco, e que o LICENCIANTE não será responsável por quaisquer danos diretos, indiretos, incidentais, especiais, consequenciais ou exemplares, incluindo, mas não se limitando a, lucros cessantes, perda de dados, interrupção de negócios ou outros prejuízos intangíveis, decorrentes do uso ou da impossibilidade de uso do SOFTWARE, mesmo que o LICENCIANTE tenha sido avisado da possibilidade de tais danos. A responsabilidade pela gestão e segurança dos dados dos clientes cadastrados no SOFTWARE, bem como pela qualidade das senhas de acesso ao perfil do USUÁRIO, é integralmente do USUÁRIO.

13.4. A “Não Concorrência”. Durante a vigência deste contrato e por um período de 24 (vinte e quatro) meses após o seu término, por qualquer motivo, o USUÁRIO compromete-se, diretamente ou por meio de terceiros, a não desenvolver, comercializar, licenciar, distribuir ou prestar serviços de consultoria técnica para software ou solução tecnológica que seja concorrente direta ou indireta da funcionalidade, finalidade e mercado do SOFTWARE licenciado. 
13.5. Abrangência da atividade. A restrição estabelecida nesta cláusula aplica-se especificamente ao mercado de softwares de gestão de treinos, visando proteger o know-how, segredos de negócio e propriedade intelectual da LICENCIANTE a que o USUÁRIO teve acesso. 
13.6. Abrangência geográfica. A proibição constante nesta cláusula aplica-se a todo o território do Estado de Rondônia. 
13.7. Penalidades. O descumprimento do disposto nesta cláusula sujeitará o USUÁRIO ao pagamento de indenização suplementar no valor de 60 (sessenta) salários mínimos, sem prejuízo da apuração de perdas e danos adicionais, incluindo lucros cessantes, e a obrigação de cessar imediatamente a atividade concorrente. 
13.8. Exceções. Não se considera violação desta cláusula a atuação do USUÁRIO em atividades desenvolvidas antes da assinatura deste contrato ou em mercados completamente distintos e não concorrentes.



14. Indenização
14.1. O USUÁRIO compromete-se a indenizar e isentar a LICENCIANTE, seus diretores, administradores, funcionários e prepostos, de toda e qualquer responsabilidade, reclamação, perda, dano, custo ou despesa (incluindo honorários advocatícios) decorrentes ou relacionados a:

14.1.1. Qualquer uso indevido, negligente ou culposo do SOFTWARE, incluindo, mas não se limitando a, inserção de informações incorretas ou falsas sobre seus alunos, a falha na manutenção da segurança de suas credenciais de acesso, ou a utilização do SOFTWARE para fins ilícitos ou em desacordo com as leis vigentes.

14.1.2. O descumprimento de quaisquer obrigações estabelecidas neste CONTRATO pelo USUÁRIO, incluindo, mas não se limitando a, a responsabilidade pela segurança dos dados de seus alunos cadastrados no sistema, a qualidade de suas senhas de acesso e a conformidade com as políticas de privacidade e proteção de dados aplicáveis.

14.1.3. Qualquer violação de direitos de terceiros, incluindo direitos autorais, de propriedade intelectual, de privacidade ou de imagem, causada direta ou indiretamente pelo uso do SOFTWARE pelo USUÁRIO.

14.1.4. A divulgação não autorizada de informações confidenciais de seus alunos, obtidas através do uso do SOFTWARE, ou a falha em implementar medidas de segurança adequadas para proteger tais informações.

14.1.5. Qualquer ação ou omissão do USUÁRIO que resulte em danos diretos ou indiretos ao LICENCIANTE, incluindo perdas financeiras, danos à reputação ou sanções legais.

15. Disposições Gerais
15.1. Cessão. O presente contrato é pessoal e intransferível, não podendo o USUÁRIO ceder, sublicenciar, transferir ou de qualquer outra forma dispor dos direitos e obrigações aqui estabelecidos, no todo ou em parte, sem o prévio e expresso consentimento por escrito da LICENCIANTE. Qualquer tentativa de cessão em desacordo com esta cláusula será considerada nula e sem efeito.

15.2. Notificações. Todas as notificações, comunicações e solicitações entre as partes em relação a este contrato deverão ser feitas por e -mail com confirmação de leitura, para os endereços eletrônicos cadastrados no ato da assinatura. A comunicação por e -mail será considerada válida e eficaz, desde que haja confirmação de recebimento.

15.3. Lei Aplicável. O presente contrato será regido e interpretado de acordo com as leis da República Federativa do Brasil, sem levar em consideração seus princípios de conflitos de leis.

15.4. Integralidade do contrato. Este contrato constitui o acordo integral e completo entre as partes com relação ao objeto aqui tratado, substituindo e anulando quaisquer acordos, entendimentos, negociações e representações anteriores, verbais ou escritas, entre as partes. Nenhuma modificação ou renúncia a qualquer disposição deste contrato será válida, a menos que feita por escrito e assinada por representantes autorizados de ambas as partes. A renúncia a qualquer direito ou disposição deste contrato não será considerada uma renúncia a qualquer outro direito ou disposição, nem uma renúncia contínua à mesma disposição.

16. Conformidade com a LGPD
16.1. As partes declaram e garantem que cumprirão integralmente todas as disposições da Lei Geral de Proteção de Dados (Lei nº 13.709/2018) e demais legislações aplicáveis em matéria de proteção de dados pessoais, no que tange ao tratamento de quaisquer dados pessoais obtidos em decorrência da execução deste contrato.

16.2. O USUÁRIO, na qualidade de controlador dos dados pessoais de seus clientes (alunos), compromete -se a coletar, tratar e armazenar tais dados em estrita conformidade com os princípios e requisitos da LGPD, incluindo, mas não se limitando a, obtenção de consentimento válido, transparência, finalidade específica, necessidade, adequação, qualidade dos dados, segurança, prevenção, não discriminação, responsabilização e prestação de contas.

16.3. O USUÁRIO é o único e exclusivo responsável pela segurança dos dados de seus alunos cadastrados em sua conta na plataforma, incluindo a gestão de acessos, a definição de senhas fortes e a implementação de medidas de segurança adequadas para proteger as informações sensíveis de seus alunos contra acessos não autorizados, perdas, alterações ou destruição.

16.4. A LICENCIANTE, por sua vez, compromete-se a implementar e manter medidas técnicas e organizacionais adequadas para garantir a segurança dos servidores e do sistema em si, protegendo os dados contra acessos não autorizados, perdas, alterações ou destruição, nos termos da LGPD, mas sem assumir responsabilidade pela gestão e segurança dos dados dos alunos, que recai integralmente sobre o USUÁRIO.
16.5. Caso seja aplicável e necessário para o cumprimento das obrigações legais, as partes poderão, de comum acordo, definir a nomeação de um Encarregado de Proteção de Dados (DPO), cujas responsabilidades e atribuições serão detalhadas em aditivo específico a este contrato, assegurando a conformidade contínua com a LGPD.

16.6. As partes cooperarão mutuamente para atender a quaisquer solicitações de titulares de dados, bem como para responder a quaisquer requisições de autoridades competentes, no que se refere ao tratamento de dados pessoais no âmbito deste contrato.

17. Foro
17.1. As partes elegem o foro da Comarca de Rolim de Moura, Estado de Rondônia, para dirimir quaisquer dúvidas, litígios ou controvérsias oriundas deste contrato, renunciando expressamente a qualquer outro, por mais privilegiado que seja.

17.2. A escolha do foro da Comarca de Rolim de Moura do Estado de Rondônia, como competente para a resolução de conflitos, visa garantir a celeridade e a especialização na análise de questões contratuais complexas, dada a natureza da relação jurídica estabelecida e a expertise técnica e jurídica disponível nesta localidade.

17.3. Qualquer ação judicial ou procedimento arbitral relacionado a este contrato deverá ser iniciado e conduzido exclusivamente perante os órgãos jurisdicionais ou as câmaras arbitrais sediadas na Comarca de Rolim de Moura do Estado de Rondônia, assegurando-se, assim, a uniformidade de interpretação e aplicação das disposições aqui contidas.

17.4. A presente eleição de foro é considerada essencial para a celebração deste contrato, refletindo a confiança das partes na capacidade e imparcialidade do Poder Judiciário ou dos árbitros atuantes na referida Comarca para a justa resolução de quaisquer disputas.

As partes concordam com as disposições acima e assinam o presente instrumento eletronicamente.`;