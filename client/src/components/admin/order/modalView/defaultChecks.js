const defaultChecks = {
    packing_slip: {
        on: true,
        checks: {
            shop_info: 'order_receipt_banner',
            dispatch_from: true,
            cost_breakdown: true,
            buyer_notes: true,
            listing_photos: true,
            private_notes: true,
        },
    },
    order_receipt: {
        on: true,
        checks: {
            shop_info: 'order_receipt_banner',
            buyer_notes: true,
            listing_photos: true,
            cost_breakdown: true,
            private_notes: true,
        },
    },
};

export default defaultChecks;
