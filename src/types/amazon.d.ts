/**
 * From: https://developer.amazon.com/es/docs/in-app-purchasing/iap-rvs-examples.html
 */
export declare type ReceiptType = {
    autoRenewing: boolean;
    betaProduct: boolean;
    cancelDate: number | null;
    cancelReason: string;
    deferredDate: number | null;
    deferredSku: number | null;
    freeTrialEndDate: number;
    gracePeriodEndDate: number;
    parentProductId: string;
    productId: string;
    productType: string;
    purchaseDate: number;
    quantity: number;
    receiptId: string;
    renewalDate: number;
    term: string;
    termSku: string;
    testTransaction: boolean;
} & Record<string, unknown>;
