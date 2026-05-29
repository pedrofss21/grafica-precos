if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js');
}

async function gerarPDF() {

    const { jsPDF } = window.jspdf;

    const doc = new jsPDF();

    // INPUTS

    const inputs =
        document.querySelectorAll("input[type='text']");

    const marca = inputs[0].value;
    const modelo = inputs[1].value;
    const placa = inputs[2].value;
    const cor = inputs[3].value;
    const responsavel = inputs[4].value;

    // OBSERVAÇÕES

    const observacoes =
        document.querySelector("textarea").value;

    // CHECKLIST

    const checkboxes =
        document.querySelectorAll(
            'input[type="checkbox"]'
        );

    let itens = [];

    checkboxes.forEach((checkbox) => {

        if (checkbox.checked) {

            itens.push(
                checkbox.parentElement.innerText
            );

        }

    });

    // FUNDO HEADER

    doc.setFillColor(6,182,212);

    doc.rect(
        0,
        0,
        210,
        35,
        'F'
    );

    // TÍTULO

    doc.setTextColor(255,255,255);

    doc.setFontSize(24);

    doc.text(
        "SUVIRA DETAIL PRO",
        20,
        22
    );

    // SUBTÍTULO

    doc.setFontSize(11);

    doc.text(
        "Checklist Premium de Higienização",
        20,
        30
    );

    // RESET COR

    doc.setTextColor(0,0,0);

    // INFORMAÇÕES

    doc.setFontSize(18);

    doc.text(
        "Informações do Veículo",
        20,
        55
    );

    doc.setFontSize(12);

    doc.text(`Marca: ${marca}`,20,68);

    doc.text(`Modelo: ${modelo}`,20,76);

    doc.text(`Placa: ${placa}`,20,84);

    doc.text(`Cor: ${cor}`,20,92);

    doc.text(
        `Responsável: ${responsavel}`,
        20,
        100
    );

    // LINHA

    doc.setDrawColor(220);

    doc.line(
        20,
        108,
        190,
        108
    );

    // CHECKLIST

    doc.setFontSize(18);

    doc.text(
        "Checklist Interno",
        20,
        122
    );

    let y = 135;

    doc.setFontSize(12);

    itens.forEach((item) => {

        doc.text(
            `✓ ${item}`,
            28,
            y
        );

        y += 9;

    });

    // OBSERVAÇÕES

    y += 10;

    doc.setFontSize(18);

    doc.text(
        "Observações",
        20,
        y
    );

    y += 10;

    doc.setFontSize(12);

    const linhas =
        doc.splitTextToSize(
            observacoes || "Sem observações.",
            160
        );

    doc.text(
        linhas,
        20,
        y
    );

    // RODAPÉ

    doc.setFontSize(10);

    doc.setTextColor(120);

    doc.text(
        "Gerado por Suvira Detail Pro",
        20,
        285
    );

    // SALVAR

    doc.save(
        `${placa || "checklist"}.pdf`
    );

}