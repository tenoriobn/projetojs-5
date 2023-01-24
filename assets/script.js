/* Criando Dark Mode */
// Aqui Capturo o input do botão
const btn = document.querySelector("#btn");

// Aqui crio o evento de click para mudar tema
btn.addEventListener("click", () => {
    // Aqui pego as variáveis já existentes e atribuo novos valores por meio da classe dark-mode.
    document.body.classList.toggle("dark-mode"); 
});
//--------------------------------------------------------------------------------------------------------//

/* Criando Jogo da Velha */
// Aqui busco e armazeno o h2 relativo ao Jogador da vez na variável
const jogadorDaVez = document.querySelector(".jogadorDaVez");

// Aqui é criado a variável responsável por selecionar o bloco que se deseja jogar.
let selecionar;

// Aqui é o simbo relativo a um dos jogadores.
let jogador = "X";

// Aqui temos a variável responsável por armazenar as posições possíveis para ganhar o jogo.
let posicao = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
]; 

// Aqui é criado uma função inicial
function inicio() {
    // Portanto, aqui é iniciado com zero jogadas, sendo assim, vazio
    selecionar = [];

    // Aqui o jogadorDaVez vai armazenar a vez de quem vai jogar, sendo iniciado pelo X.
    jogadorDaVez.innerHTML = `JOGADOR DA VEZ: ${jogador}`;

    // Aqui, os blocos vão iniciar vazio e estarão aptos a receber um click para marcação do "X" ou "O".
    document.querySelectorAll(".game__botao").forEach((item) => {
        item.innerHTML = "";
        item.addEventListener("click", novoMovimento);
    });
}

// Aqui é chamado a função para iniciar assim que o arquivo(jogo), for aberto.
inicio();

// Aqui é criado outra função que recebe o elemento(e) referente ao botão(bloco).
function novoMovimento(e) {
    // Aqui é pego o data attribute relativo ao botão, sendo assim, se clicar no botão 1, vai retornar o seu valor que é 1 e assim vai indo..
    const index = e.target.getAttribute("data-i");
    // Aqui será atribuido o player, sendo assim, se for a vez do X, ele irá utilizar o simbolo "X", se não, ele utilizara o "O".
    e.target.innerHTML = jogador;
    //Aqui é tirado o evento de click, para que ao clicar no mesmo lugar, não tenha opção de clicar novamente, ocorrendo uma mudança de "X" para "O".
    e.target.removeEventListener("click", novoMovimento);
    //Aqui, é responsável por armazenar no index qual botão(bloco) foi selecionado e por qual jogador. Portanto, no final o index armazena a posição.
    selecionar[index] = jogador;

    // Aqui é responsável por trocar o player, sendo assim, se o player "X" jogou, será a vez do "O".
    jogador = jogador === "X" ? "O" : "X";

    // Aqui é responsável por mostrar o simbolo de quem deve jogar.
    jogadorDaVez.innerHTML = `JOGADOR DA VEZ: ${jogador}`;

    // Aqui o método setTimeout, fica responsável por verificar se houve ganhador e espera 100ms para disparar a mensagem do Alert de vencedor ou empate.
    setTimeout(() => {
        verificar();
    },[100]);
}

// Aqui foi criado a função verifica
function verificar() {
    //Essa variável é responsável por armazenar o último player que jogou
    let ultimaJogada = jogador === "X" ? "O" : "X";

    // Aqui é criado uma variável responsável por mapear os botões(blocos) selecionados pelos jogadores.
    const items = selecionar
    // Aqui vai gerar um novo array, com o item selecionado, ou seja, "X" ou "O" no botão(bloco) clicado.
    .map((item, i) => [item, i])
    // Aqui vai verificar quais botões(blocos) selecionados, tem o mesmo "simbolo" que o do último jogador.
    .filter((item) => item[0] === ultimaJogada)
    // Aqui vai mapear a posição do index.
    .map((item) => item[1]);
        
    // Esse for, é responsável por percorrer a lista posicao que aponta as posições possíveis para gerar um ganhador.
    for (pos of posicao) {
        // Aqui será verificado (very) se os itens(botões/blocos) marcados pelo jogador bate com as posições possíveis de ganhar.
        if(pos.every((item) => items.includes(item))) {
            // Se tiver um ganhador, vai ser gerado um alert, apontando que o jogador tal ganhou.
            alert("O JOGADOR '" + ultimaJogada + "' GANHOU!")
            // Em seguida o jogo sera reinicializado
            inicio();
            // Aqui será dado um retorno
            return;
        }
    }

    // Essa condição, ira filtrar e verificar se tem nove itens(botões/blocos) selecionados.
    if (selecionar.filter((item) => item).length === 9) {
        // Caso seja detectado empate, será exibido o alert informando empate.
        alert("DEU EMPATE");
        // O jogo será reinicializado
        inicio();
        // Aqui sera dado um return.
        return;
    }
}