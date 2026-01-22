interface InvoiceConfig {
    taxRate: number;
    fee: number;
}

const priceInput = document.getElementById('basePrice') as HTMLInputElement;
const calcBtn = document.getElementById('calcBtn') as HTMLButtonElement;
const subtotalEl = document.getElementById('subtotalDisplay') as HTMLElement;
const totalEl = document.getElementById('totalDisplay') as HTMLElement;

function calculateTotal(price: number, systemFee: number): number {
    const tax = price * 0.10; 
    // The is a bug, if systemFee is a string, + will join them like text instead of adding numbers
    const result = price + tax + systemFee; 
    return result;
}

calcBtn.addEventListener('click', () => {
    const baseValue = parseFloat(priceInput.value);
    
    // Force casting string to number
    const systemFee = document.body.dataset.fee as unknown as number;

    console.log("Starting calculation...");

    const finalTotal = calculateTotal(baseValue, systemFee);

    // Update UI
    subtotalEl.innerText = `Rs: ${baseValue}`;
    totalEl.innerText = `Rs: ${finalTotal}`;
});