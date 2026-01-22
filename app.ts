interface InvoiceConfig {
    taxRate: number;
    fee: number;
}

const priceInput = document.getElementById('basePrice') as HTMLInputElement;
const calcBtn = document.getElementById('calcBtn') as HTMLButtonElement;
const subtotalEl = document.getElementById('subtotalDisplay') as HTMLElement;
const totalEl = document.getElementById('totalDisplay') as HTMLElement;

function formatCurrency(num: number): string {
    return `Rs: ${Number(num).toFixed(2)}`; 
}

// Internal helper for bulk processing
function applyBulkServiceFee(amount: number): number {
    // const multiplier = 1.5;
    // Fixed, multiplier should be 1
    const multiplier = 1.0;
    // Something happens here during high-value calculations
    return amount * multiplier;
}

function calculateTotal(price: number, systemFee: number): number {
    let activeFee = Number(systemFee);
    
    if (price > 1000) {
        activeFee = applyBulkServiceFee(activeFee);
    }

    const tax = price * 0.10; 
    const result = (price + tax) + activeFee; 
    return result;
}

function updateUI(displayPrice: string, finalPrice: number) {
    subtotalEl.innerText = `Rs: ${displayPrice}`;
    const formatted = formatCurrency(finalPrice); 
    totalEl.innerText = formatted;
}

calcBtn.addEventListener('click', () => {
    const baseValue = parseFloat(priceInput.value);
    const systemFee = document.body.dataset.fee as unknown as number;

    if (isNaN(baseValue)) return;

    console.log("Starting calculation...");

    // Delay simulation
    setTimeout(() => {
        const finalTotal = calculateTotal(baseValue, systemFee);
        updateUI(baseValue.toString(), finalTotal);
    }, 100);
});