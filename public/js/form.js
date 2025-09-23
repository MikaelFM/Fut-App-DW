function atualizarFormacao() {
    const time1Div = document.getElementById("time1");
    const time2Div = document.getElementById("time2");

    time1Div.innerHTML = "";
    time2Div.innerHTML = "";

    document.querySelectorAll(".time-select").forEach(select => {
        const nome = select.dataset.userName;
        const time = select.value;

        if (time === "1") {
            time1Div.innerHTML += `<div class="bg-gray-800 p-2 rounded">${nome}</div>`;
        } else if (time === "2") {
            time2Div.innerHTML += `<div class="bg-gray-800 p-2 rounded">${nome}</div>`;
        }
    });

    if (!time1Div.innerHTML) {
        time1Div.innerHTML = `<div class="text-gray-500 text-center py-2">Nenhum jogador</div>`;
    }
    if (!time2Div.innerHTML) {
        time2Div.innerHTML = `<div class="text-gray-500 text-center py-2">Nenhum jogador</div>`;
    }
}

document.querySelectorAll(".time-select").forEach(select => {
    select.addEventListener("change", atualizarFormacao);
});

document.getElementById("limparTimes").addEventListener("click", () => {
    document.querySelectorAll(".time-select").forEach(select => select.value = "");
    atualizarFormacao();
});

document.getElementById("sortearTimes").addEventListener("click", () => {
    let alterna = true;
    document.querySelectorAll(".time-select").forEach(select => {
        select.value = alterna ? "1" : "2";
        alterna = !alterna;
    });
    atualizarFormacao();
});

atualizarFormacao();