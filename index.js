var prompt = require("prompt-sync")();

// Criação da matriz do jogo
const matriz = [];
for (let i = 0; i < 5; i++) {
    const linha = [];
    for (let j = 0; j < 5; j++) {
        linha.push("Água");
    }
    matriz.push(linha);
}

// Coloca 3 navios aleatoriamente
let navios = 0;
while (navios < 3) {
    let x = Math.floor(Math.random() * 5);
    let y = Math.floor(Math.random() * 5);

    if (matriz[x][y] === "Água") {
        matriz[x][y] = "Navio";
        navios++;
    }
}

let naviosRestantes = 3;

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

// Jogo
while (naviosRestantes > 0) {
    mostrarTabuleiro(matriz);

    console.log("\nTente acertar um navio!");
    let linha = parseInt(prompt("Linha (0 a 4): "));
    let coluna = parseInt(prompt("Coluna (0 a 4): "));

    if (linha < 0 || linha > 4 || coluna < 0 || coluna > 4) {
        console.log("❌ Coordenadas inválidas! Tente novamente.");
        continue;
    }

    if (matriz[linha][coluna] === "Navio") {
        console.log("💥 Acertou!");
        matriz[linha][coluna] = "Acertou";
        naviosRestantes--;
    } else if (matriz[linha][coluna] === "Acertou" || matriz[linha][coluna] === "Errou") {
        console.log("⚠️ Você já tentou aqui.");
    } else {
        console.log("💦 Errou.");
        matriz[linha][coluna] = "Errou";
    }

    console.log("🚢 Navios restantes: " + naviosRestantes);
}

mostrarTabuleiro(matriz);
console.log("🎉 Você venceu!");
