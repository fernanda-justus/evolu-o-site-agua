document.addEventListener("DOMContentLoaded", () => {
  const inputMeta = document.getElementById("novaMetaInput");
  const botaoAdicionar = document.getElementById("btnAdicionar");
  const listaMetas = document.getElementById("listaMetas");

  // Função para adicionar uma nova meta à lista
  function adicionarMeta() {
    const textoMeta = inputMeta.value.trim();

    // Impede adicionar metas vazias
    if (textoMeta === "") {
      alert("Por favor, digite uma meta antes de adicionar.");
      return;
    }

    // Cria o elemento da lista (li)
    const novoItem = document.createElement("li");
    
    // Cria o span com o texto da meta
    const spanTexto = document.createElement("span");
    spanTexto.textContent = textoMeta;
    novoItem.appendChild(spanTexto);

    // Cria o botão de remoção para este item
    const botaoRemover = document.createElement("button");
    botaoRemover.textContent = "Remover";
    botaoRemover.classList.add("btn-remover");
    
    // Adiciona o evento de clique para remover este item específico
    botaoRemover.addEventListener("click", () => {
      listaMetas.removeChild(novoItem);
    });
    
    novoItem.appendChild(botaoRemover);

    // Adiciona o novo item à lista principal
    listaMetas.appendChild(novoItem);

    // Limpa o campo de entrada e foca nele novamente
    inputMeta.value = "";
    inputMeta.focus();
  }

  // Evento de clique no botão Adicionar
  botaoAdicionar.addEventListener("click", adicionarMeta);

  // Evento para permitir adicionar pressionando 'Enter' no input
  inputMeta.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      adicionarMeta();
    }
  });
});
