if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js');
}

const { jsPDF } = window.jspdf;

function gerarPDF() {

    const doc = new jsPDF();

    const marca = document.querySelectorAll("input")[0].value;
    const modelo = document.querySelectorAll("input")[1].value;
    const placa = document.querySelectorAll("input")[2].value;
    const cor = document.querySelectorAll("input")[3].value;
    const responsavel = document.querySelectorAll("input")[4].value;

    const observacoes = document.querySelector("textarea").value;

    const checkboxes = document.querySelectorAll('input[type="checkbox"]');

    let itens = [];

    checkboxes.forEach((checkbox) => {

        if (checkbox.checked) {

            itens.push(
                checkbox.parentElement.innerText
            );

        }

    });

    // CABEÇALHO

    doc.setFillColor(6,182,212);
    doc.rect(0,0,210,30,'F');

    doc.setTextColor(255,255,255);
    doc.setFontSize(24);

    doc.text(
        "SUVIRA DETAIL PRO",
        20,
        20
    );

    // INFORMAÇÕES

    doc.setTextColor(0,0,0);

    doc.setFontSize(16);

    doc.text(
        "Informações do Veículo",
        20,
        45
    );

    doc.setFontSize(12);

    doc.text(`Marca: ${marca}`,20,55);
    doc.text(`Modelo: ${modelo}`,20,63);
    doc.text(`Placa: ${placa}`,20,71);
    doc.text(`Cor: ${cor}`,20,79);
    doc.text(`Responsável: ${responsavel}`,20,87);

    // CHECKLIST

    doc.setFontSize(16);

    doc.text(
        "Checklist Interno",
        20,
        105
    );

    doc.setFontSize(12);

    let y = 115;

    itens.forEach((item) => {

        doc.text(
            `✓ ${item}`,
            25,
            y
        );

        y += 8;

    });

    // OBSERVAÇÕES

    y += 10;

    doc.setFontSize(16);

    doc.text(
        "Observações",
        20,
        y
    );

    y += 10;

    doc.setFontSize(12);

    const linhas = doc.splitTextToSize(
        observacoes,
        160
    );

    doc.text(
        linhas,
        20,
        y
    );

    // RODAPÉ

    doc.setFontSize(10);

    doc.text(
        "Suvira Detail Pro",
        20,
        285
    );

    // BAIXAR PDF

    doc.save(
        `${placa}-checklist.pdf`
    );

}