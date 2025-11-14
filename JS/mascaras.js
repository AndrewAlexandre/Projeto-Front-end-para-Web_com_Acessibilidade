/* Funções de máscara para campos de formulário (CPF, Telefone, CEP).*/

function mascaraCPF(cpf) {
    // Remove tudo que não for dígito
    cpf.value = cpf.value.replace(/\D/g, '')
        // Coloca um ponto entre o terceiro e o quarto dígitos
        .replace(/(\d{3})(\d)/, '$1.$2')
        // Coloca um ponto entre o sexto e o sétimo dígitos
        .replace(/(\d{3})(\d)/, '$1.$2')
        // Coloca um hífen entre o nono e o décimo dígitos
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}

function mascaraTelefone(tel) {
    // Remove tudo que não for dígito
    tel.value = tel.value.replace(/\D/g, '')
        // Coloca parênteses em volta dos dois primeiros dígitos
        .replace(/^(\d{2})(\d)/g, '($1) $2')
        // Coloca hífen entre o quarto e o quinto dígitos (para 9 dígitos)
        .replace(/(\d{5})(\d)/, '$1-$2');
}

function mascaraCEP(cep) {
    // Remove tudo que não for dígito
    cep.value = cep.value.replace(/\D/g, '')
        // Coloca hífen entre o quinto e o sexto dígitos
        .replace(/(\d{5})(\d)/, '$1-$2');
}

/**
 * Função principal que adiciona os event listeners nos campos.
 * Deve ser chamada sempre que o formulário for recarregado/injetado no DOM.
 */
function aplicarMascaras() {
    // Tenta obter os elementos pelo ID.
    const cpf = document.getElementById('cpf');
    const telefone = document.getElementById('telefone');
    const cep = document.getElementById('cep');

    // Adiciona os listeners SOMENTE SE o elemento existir (Garante que o script não falhe em outras páginas)
    if (cpf) {
        cpf.addEventListener('input', function() {
            mascaraCPF(this);
        });
    }

    if (telefone) {
        telefone.addEventListener('input', function() {
            mascaraTelefone(this);
        });
    }

    if (cep) {
        cep.addEventListener('input', function() {
            mascaraCEP(this);
        });
    }
}