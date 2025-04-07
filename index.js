const prompt = require("prompt-sync")();
/* Editado por Guilherme de Deus,
Corrigi alguns bugs em relação a criação da quantidade de barcos no array da matriz do jogo.
Adicionei duas funções, uma para definir a dificuldade do jogo, que é feita a partir de um prompt que altera os valores dos barcos e tiros pela função,
a outra função sendo um contador de tiros, que basicamente define a quatidade de tiros a partir da dificulade, sendo uma função funcionando junto da outra,
também criei e alterei algumas variáveis no código, para facilitara meu entendimento do funcionamento dele.
Por último adicionei algumas medidas caso o usuário coloque algum número errado, para o código continuar tendo funcionamento mesmo assim.
*/

// Criação da matriz do jogo
const matriz = [];
for (let i = 0; i < 5; i++) {
    const linha = [];
    for (let j = 0; j < 5; j++) {
        linha.push("Água");
    }
    matriz.push(linha);
}

let dificuldadeInput = Number(prompt("Insira a dificuldade do jogo: " + "\n" + "1-Fácil" + "\n" + "2-Difícil" + "\n" + ": "));
let naviosRestantes = dificuldade(dificuldadeInput);
let tiros;

if (dificuldadeInput === 1) {
    console.log("Você tem 15 tiros disponíveis!");
} else if (dificuldadeInput === 2) {
    console.log("Você tem 10 tiros disponíveis!");
} else {
    console.log("Dificuldade inválida. Começando no modo Fácil por padrão.");
    naviosRestantes = 5;
    tiros = 15;
}

// Distribuindo os navios no tabuleiro
let barcosColocados = 0;
while (barcosColocados < naviosRestantes) {
    let x = Math.floor(Math.random() * 5);
    let y = Math.floor(Math.random() * 5);

    if (matriz[x][y] === "Água") {
        matriz[x][y] = "Navio";
        barcosColocados++; // Incrementa somente quando um barco é colocado
    }
}

// Função para exibir o tabuleiro ao jogador (sem revelar navios escondidos)
function mostrarTabuleiro(matriz) {
    console.log("\nTabuleiro:");
    for (let i = 0; i < 5; i++) {
        let linha = "";
        for (let j = 0; j < 5; j++) {
            if (matriz[i][j] === "Acertou") {
                linha += " X ";
            } else if (matriz[i][j] === "Errou") {
                linha += " - ";
            } else {
                linha += " ~ ";
            }
        }
        console.log(linha);
    }
}

// Função para definir dificuldade
function dificuldade(x) {
    if (x === 1) {
        return 5;
    } else if (x === 2) {
        return 3;
    };
}
// Função para contar a quantidade de tiros
function contadorTiros() {
    if (dificuldadeInput ==1) {
         tiros=15;
         dificuldadeInput = 0;
    } else if (dificuldadeInput ==2) {
        tiros =10 
         dificuldadeInput =0;
    }
    tiros--;
    console.log("Você ainda tem: " + tiros + " tiros!");
}

// Jogo
while (naviosRestantes > 0) {
    mostrarTabuleiro(matriz);

    console.log("\nTente acertar um navio!");
    let linha = Number(prompt("Linha (0 a 4): "));
    let coluna = Number(prompt("Coluna (0 a 4): "));
    contadorTiros();

    if (linha < 0 || linha > 4 || coluna < 0 || coluna > 4) {
        console.log("❌ Coordenadas inválidas! Tente novamente.");
        continue;
    }

    if (matriz[linha][coluna] === "Navio") {
        console.log("💥 Acertou!");
        matriz[linha][coluna] = "Acertou";
        naviosRestantes--;''
    } else if (matriz[linha][coluna] === "Acertou" || matriz[linha][coluna] === "Errou") {
        console.log("⚠️ Você já tentou aqui.");
    } else {
        console.log("💦 Errou.");
        matriz[linha][coluna] = "Errou";
    }
    if(tiros ==0) {
        break;
    }
    

    
    console.log("🚢 Navios restantes: " + naviosRestantes);
}

if (naviosRestantes === 0) {
    console.log("🎉 Você venceu! Parabéns!!");
} else {
    console.log("Suas tentativas acabaram! Fim de jogo!");
}
mostrarTabuleiro(matriz);
