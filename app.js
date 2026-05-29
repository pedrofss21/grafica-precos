let imagensBase64 = [];

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const fotosInput =
        document.getElementById("fotos");

        const preview =
        document.getElementById("preview");

        fotosInput.addEventListener(
            "change",
            function(){

                preview.innerHTML = "";

                imagensBase64 = [];

                const arquivos =
                this.files;

                for(let i = 0; i < arquivos.length; i++){

                    const leitor =
                    new FileReader();

                    leitor.onload = function(e){

                        imagensBase64.push(
                            e.target.result
                        );

                        const img =
                        document.createElement("img");

                        img.src =
                        e.target.result;

                        preview.appendChild(img);

                    };

                    leitor.readAsDataURL(
                        arquivos[i]
                    );

                }

            }
        );

    }
);

async function gerarPDF(){

    const { jsPDF } = window.jspdf;

    const doc = new jsPDF();

    // INPUTS

    const marca =
    document.getElementById("marca").value;

    const modelo =
    document.getElementById("modelo").value;

    const placa =
    document.getElementById("placa").value;

    const cor =
    document.getElementById("cor").value;

    const responsavel =
    document.getElementById("responsavel").value;

    const obs =
    document.getElementById("obs").value;

    // HEADER

    doc.setFillColor(6,182,212);

    doc.rect(
        0,
        0,
        210,
        35,
        'F'
    );

    doc.setTextColor(255,255,255);

    doc.setFontSize(24);

    doc.text(
        "SUVIRA DETAIL PRO",
        20,
        22
    );

    doc.setFontSize(11);

    doc.text(
        "Checklist Premium de Higienização",
        20,
        30
    );

    // TEXTO

    doc.setTextColor(0,0,0);

    doc.setFontSize(16);

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

    // CHECKLIST

    doc.setFontSize(16);

    doc.text(
        "Checklist",
        20,
        120
    );

    let y = 132;

    document
    .querySelectorAll(
        'input[type="checkbox"]'
    )
    .forEach((checkbox)=>{

        if(checkbox.checked){

            const texto =
            checkbox.parentElement.innerText;

            doc.setFontSize(12);

            doc.text(
                `✓ ${texto}`,
                25,
                y
            );

            y += 8;

        }

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

    const linhas =
    doc.splitTextToSize(
        obs || "Sem observações.",
        160
    );

    doc.text(
        linhas,
        20,
        y
    );

    // FOTOS

    if(imagensBase64.length > 0){

        doc.addPage();

        doc.setFontSize(20);

        doc.text(
            "Fotos do Veículo",
            20,
            20
        );

        let imgY = 35;

        for(let i = 0; i < imagensBase64.length; i++){

            doc.addImage(
                imagensBase64[i],
                'JPEG',
                20,
                imgY,
                80,
                60
            );

            if(i % 2 === 0){

                doc.addImage(
                    imagensBase64[i],
                    'JPEG',
                    110,
                    imgY,
                    80,
                    60
                );

            }

            imgY += 70;

            if(imgY > 220 && i < imagensBase64.length - 1){

                doc.addPage();

                imgY = 20;

            }

        }

    }

    // SALVAR

    doc.save(
        `${placa || "checklist"}.pdf`
    );

}