function openPixPayment() {
    fetch('/payment', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
    })
        .then(res => res.json())
        .then(response => {
            const pixCode = response.result.point_of_interaction.transaction_data.qr_code;
            document.getElementById('pix-code').value = pixCode;
            generateQRCode(pixCode);
            document.getElementById('pix-modal').classList.remove('hidden');
        })
        .catch(err => {
            console.error("Erro:", err);
        });
}

function closePixModal() {
    document.getElementById('pix-modal').classList.add('hidden');
    document.getElementById('qr-code').innerHTML = '<div class="text-gray-500">Gerando QR Code...</div>';
}

function confirmPayment() {
    location.reload();
}

function generateQRCode(pixCode) {
    const qrContainer = document.getElementById('qr-code');
    qrContainer.innerHTML = '';

    new QRCode(qrContainer, {
        text: pixCode,
        width: 200,
        height: 200,
        colorDark: "#000000",
        colorLight: "#FFFFFF",
        correctLevel: QRCode.CorrectLevel.M
    });
}

function copyPixCode() {
    const pixCodeTextarea = document.getElementById('pix-code');
    pixCodeTextarea.select();
    pixCodeTextarea.setSelectionRange(0, 99999);

    navigator.clipboard.writeText(pixCodeTextarea.value).then(() => {
        const button = event.target.closest('button');
        const originalContent = button.innerHTML;
        button.innerHTML = `
                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                Copiado!
            `;
        button.classList.remove('bg-blue-600', 'hover:bg-blue-700');
        button.classList.add('bg-green-600');

        setTimeout(() => {
            button.innerHTML = originalContent;
            button.classList.remove('bg-green-600');
            button.classList.add('bg-blue-600', 'hover:bg-blue-700');
        }, 2000);
    }).catch(() => {
        alert('Erro ao copiar. Tente selecionar o texto manualmente.');
    });
}

document.getElementById('pix-modal').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) {
        closePixModal();
    }
});