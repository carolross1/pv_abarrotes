/* import * as paypal from '@paypal/checkout-server-sdk';

// Configuración de cliente PayPal
function environment() {
    let clientId = process.env.PAYPAL_CLIENT_ID;
    let clientSecret = process.env.PAYPAL_CLIENT_SECRET;

    return new paypal.core.SandboxEnvironment(clientId, clientSecret); // Usa "LiveEnvironment" para producción
}

function client() {
    return new paypal.core.PayPalHttpClient(environment());
}

// Crear orden de PayPal
export async function createOrder(amount: string) {
    const request = new paypal.orders.OrdersCreateRequest();
    request.requestBody({
        intent: 'CAPTURE',
        purchase_units: [{
            amount: {
                currency_code: 'USD',
                value: amount,
            },
        }],
    });

    try {
        const response = await client().execute(request);
        return response.result;
    } catch (error) {
        console.error(error);
        throw new Error('Error al crear la orden de PayPal');
    }
}

// Capturar el pago
export async function captureOrder(orderId: string) {
    const request = new paypal.orders.OrdersCaptureRequest(orderId);

    try {
        const response = await client().execute(request);
        return response.result;
    } catch (error) {
        console.error(error);
        throw new Error('Error al capturar el pago de PayPal');
    }
}
 */