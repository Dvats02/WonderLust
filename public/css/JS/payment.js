document.addEventListener('DOMContentLoaded', () => {
    const reserveForm = document.querySelector('form[action="/payment/checkout"]');

    if (reserveForm) {
        reserveForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const priceInput = reserveForm.querySelector('input[name="price"]');
            const amount = priceInput ? priceInput.value : null;

            if (!amount) {
                alert('Price not found for this listing.');
                return;
            }

            try {
                const response = await fetch('/api/createOrder', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ amount: parseFloat(amount) }),
                });

                const order = await response.json();

                if (order.status === "error") {
                    alert(order.message);
                    return;
                }

                const options = {
                    key: "rzp_test_rxowtXdjKVLCPU", // Replace with your actual Key ID
                    amount: order.amount,
                    currency: order.currency,
                    name: "WonderLust",
                    description: "Listing Reservation",
                    order_id: order.id,
                    handler: async function (response) {
                        const paymentVerificationResponse = await fetch('/api/paymentVerify', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                            }),
                        });
                        const verificationResult = await paymentVerificationResponse.json();

                        if (verificationResult.status === "success") {
                            window.location.href = '/success';
                        } else {
                            window.location.href = '/failure';
                        }
                    },
                    prefill: {
                        name: "Guest User", // You can prefill user details if available
                        email: "guest@example.com",
                        contact: "9999999999"
                    },
                    notes: {
                        address: "WonderLust Office"
                    },
                    theme: {
                        color: "#3399CC"
                    }
                };

                const rzp = new Razorpay(options);
                rzp.open();

            } catch (error) {
                console.error('Error during payment process:', error);
                alert('An error occurred during the payment process.');
            }
        });
    }
});
