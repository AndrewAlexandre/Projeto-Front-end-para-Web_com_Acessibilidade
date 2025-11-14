/* Lógica do Mini-SPA (Single Page Application) do Formulário de Cadastro.*/

const CADASTRO_ROOT = document.getElementById('cadastro-spa-root');
const FORM_ACTION_URL = "https://formspree.io/f/mwprdrpp"; 

// Função para gerar o template do formulário
const FormTemplate = () => `
    <section class="cadastro-info" aria-labelledby="cadastro-titulo">
        <h2 id="cadastro-titulo">Faça a diferença😻</h2>
        <p>Você está a um passo de se tornar parte do nosso time de protetores felinos!</p>
        <p>Seja qual for a forma que escolher ajudar – adotando um gatinho, dedicando seu tempo como voluntário ou contribuindo como doador/patrocinador – seu apoio é essencial para resgatarmos e reabilitarmos mais vidas.</p>
        <p>Por favor, preencha o formulário abaixo para que possamos entender melhor como você deseja fazer a diferença.</p>
        <p>Atenção: Todos os seus dados são confidenciais e utilizados apenas para a comunicação da ONG Frajola.</p>
    </section>

    <form id="main-cadastro-form">
        <input type="hidden" name="_subject" value="Novo cadastro - ONG Frajola">

        <fieldset>
            <legend>Dados Pessoais</legend>               
            <label for="nome">Nome completo:</label>
            <input type="text" id="nome" name="Nome completo" required 
                   minlength="3" maxlength="100" autocomplete="name" aria-required="true">

            <label for="cpf">CPF (apenas números):</label>
            <input type="text" id="cpf" name="CPF" required 
                   maxlength="14" pattern="\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}" placeholder="000.000.000-00" autocomplete="off" aria-required="true">

            <label for="telefone">Telefone / WhatsApp:</label>
            <input type="tel" id="telefone" name="Telefone" required 
                   maxlength="15" pattern="\\(\\d{2}\\) \\d{5}-\\d{4}" placeholder="(00) 00000-0000" autocomplete="tel" aria-required="true">

            <label for="email">E-mail:</label>
            <input type="email" id="email" name="E-mail" required 
                   maxlength="100" autocomplete="email" aria-required="true">
        </fieldset>
        
        <fieldset>
            <legend>Endereço</legend>
            <label for="cep">CEP:</label>
            <input type="text" id="cep" name="CEP" required 
                   maxlength="9" pattern="\\d{5}-\\d{3}" placeholder="00000-000" autocomplete="postal-code" aria-required="true">

            <label for="endereco">Rua e Número:</label>
            <input type="text" id="endereco" name="Endereço" required 
                   maxlength="150" autocomplete="street-address" aria-required="true">
        
            <label for="bairro">Bairro:</label>
            <input type="text" id="bairro" name="Bairro" required 
                   maxlength="100" autocomplete="address-level2" aria-required="true">

            <label for="cidade">Cidade:</label>
            <input type="text" id="cidade" name="Cidade" required 
                   maxlength="100" autocomplete="address-level1" aria-required="true">

            <label for="estado">Estado:</label>
            <input type="text" id="estado" name="Estado" required 
                   maxlength="2" placeholder="Ex: RJ" autocomplete="address-level1" aria-required="true">
        </fieldset>

        <fieldset>
            <legend>Interesse</legend>
            <div class="radio-group" role="group" aria-labelledby="interesse-label">
                <p id="interesse-label">Como você gostaria de ajudar a ONG Frajola? (Escolha uma ou mais)</p>

                <div>
                    <input type="checkbox" id="adocao" name="Interesse" value="Adoção (Quero adotar)">
                    <label for="adocao">Adoção (Quero adotar)</label>
                </div>

                <div>
                    <input type="checkbox" id="voluntario" name="Interesse" value="Voluntário (Quero dedicar tempo)">
                    <label for="voluntario">Voluntário (Quero dedicar tempo)</label>
                </div>

                <div>
                    <input type="checkbox" id="doacao" name="Interesse" value="Doador/Patrocinador (Quero contribuir financeiramente/materialmente)">
                    <label for="doacao">Doador/Patrocinador (Quero contribuir financeiramente/materialmente)</label>
                </div>
            </div>
            
            <label for="mensagem">Mensagem / Observações (Opcional):</label>
            <textarea id="mensagem" name="Mensagem" rows="4" maxlength="500"></textarea>
        </fieldset>

        <button type="submit" aria-label="Confirmar e enviar o formulário de cadastro">Enviar Cadastro</button>
    </form>
`;

// Função para gerar o template de sucesso
const SuccessTemplate = () => `
    <section class="success-message" aria-labelledby="sucesso-titulo" tabindex="-1">
        <h2 id="sucesso-titulo">🎉 Cadastro Enviado com Sucesso!</h2>
        <p>Obrigado por se juntar à família Frajola!</p>
        <p>Sua vontade de ajudar faz uma enorme diferença na vida dos nossos gatinhos. Entraremos em contato o mais breve possível para dar os próximos passos.</p>
        <p>Enquanto espera, que tal ver as histórias de sucesso na nossa Galeria?</p>
        <nav aria-label="Navegação Pós-Cadastro">
            <ul>
                <li><a href="galeria.html" class="action-link">Ver a Galeria</a></li>
                <li><a href="index.html" class="action-link">Voltar para o Início</a></li>
            </ul>
        </nav>
    </section>
`;

// Função que configura o formulário SPA
function setupForm(form) {
    
    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Impede o envio tradicional (MPA)
        
        const button = form.querySelector('button[type="submit"]');
        const formContent = form.closest('#cadastro-spa-root'); // Elemento pai onde o conteúdo muda

        // 1. Desabilita o botão e atualiza o estado para feedback
        button.disabled = true;
        button.textContent = 'Enviando...';

        // 2. Adiciona aria-busy para leitores de tela durante o processamento
        if (formContent) {
            formContent.setAttribute('aria-busy', 'true');
        }

        try {
            // Submissão via AJAX para manter o conceito de SPA
            const formData = new FormData(form);
            const response = await fetch(FORM_ACTION_URL, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            // 3. Remove aria-busy após a resposta
            if (formContent) {
                formContent.setAttribute('aria-busy', 'false');
            }

            if (response.ok) {
                // Sucesso: renderiza a tela de sucesso (SPA)
                renderContent(SuccessTemplate);

                // 4. Move o foco para a nova área de conteúdo (Título da mensagem de sucesso)
                const newContent = document.querySelector('.success-message h2');
                if (newContent) {
                    newContent.setAttribute('tabindex', '-1'); // Garante que é focável
                    newContent.focus(); 
                }
            } else {
                // Falha: exibe mensagem e mantém o formulário
                alert('Ocorreu um erro ao enviar o cadastro. Por favor, tente novamente ou entre em contato por e-mail.');
                button.disabled = false;
                button.textContent = 'Enviar Cadastro';

                // 5. Devolve o foco ao botão
                button.focus(); 
            }
        } catch (error) {
            console.error('Erro de rede:', error);
            alert('Erro de conexão. Verifique sua rede e tente novamente.');
            button.disabled = false;
            button.textContent = 'Enviar Cadastro';

            // 6. Devolve o foco ao botão
            button.focus();
        }
    });
}

// Função principal de renderização do mini-SPA
function renderContent(template) {
    if (CADASTRO_ROOT) {
        CADASTRO_ROOT.innerHTML = template();
        
        // Se o formulário foi renderizado, aplicar máscaras e focar
        const form = CADASTRO_ROOT.querySelector('#main-cadastro-form');
        if (form) {
            setupForm(form);
            // Chama a função global do mascaras.js para aplicar as máscaras nos novos campos
            if (typeof aplicarMascaras === 'function') {
                aplicarMascaras(); 
            }

            // Move o foco para o primeiro campo (Nome completo) para acessibilidade
            const firstInput = form.querySelector('input[name="Nome completo"]');
            if (firstInput) {
                firstInput.focus();
            }
        }
    }
}

// Inicia o mini-SPA: renderiza o formulário ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    if (CADASTRO_ROOT) {
        renderContent(FormTemplate);
    }
});