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

function calculateTotal(price: number, systemFee: number): number {
    const tax = price * 0.10; 
    const result = price + tax + Number(systemFee); 
    return result;
}

function updateUI(name: string, finalPrice: number) {
    subtotalEl.innerText = `Rs: ${name}`;
    
    const formatted = formatCurrency(finalPrice); 
    totalEl.innerText = formatted;
}

calcBtn.addEventListener('click', () => {
    const baseValue = parseFloat(priceInput.value);
    const systemFee = document.body.dataset.fee as unknown as number;

    console.log("Starting calculation...");

    const finalTotal = calculateTotal(baseValue, systemFee);

    updateUI(baseValue.toString(), finalTotal);
});