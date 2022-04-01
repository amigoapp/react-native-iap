var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import * as Apple from './types/apple';
import { Linking, NativeEventEmitter, NativeModules, Platform, } from 'react-native';
import { IAPErrorCode, InstallSourceAndroid, PurchaseStateAndroid, } from './types';
var RNIapIos = NativeModules.RNIapIos, RNIapModule = NativeModules.RNIapModule, RNIapAmazonModule = NativeModules.RNIapAmazonModule;
var ANDROID_ITEM_TYPE_SUBSCRIPTION = 'subs';
var ANDROID_ITEM_TYPE_IAP = 'inapp';
export var getInstallSourceAndroid = function () {
    return RNIapModule
        ? InstallSourceAndroid.GOOGLE_PLAY
        : InstallSourceAndroid.AMAZON;
};
var checkNativeAndroidAvailable = function () {
    if (!RNIapModule && !RNIapAmazonModule) {
        throw new Error(IAPErrorCode.E_IAP_NOT_AVAILABLE);
    }
};
var getAndroidModule = function () {
    checkNativeAndroidAvailable();
    return RNIapModule ? RNIapModule : RNIapAmazonModule;
};
var checkNativeiOSAvailable = function () {
    if (!RNIapIos) {
        throw new Error(IAPErrorCode.E_IAP_NOT_AVAILABLE);
    }
};
var getIosModule = function () {
    checkNativeiOSAvailable();
    return RNIapIos;
};
var getNativeModule = function () {
    return RNIapModule
        ? RNIapModule
        : RNIapAmazonModule
            ? RNIapAmazonModule
            : RNIapIos;
};
/**
 * Init module for purchase flow. Required on Android. In ios it will check wheter user canMakePayment.
 * @returns {Promise<boolean>}
 */
export var initConnection = function () {
    return getNativeModule().initConnection();
};
/**
 * End module for purchase flow.
 * @returns {Promise<void>}
 */
export var endConnection = function () {
    return getNativeModule().endConnection();
};
/**
 * Consume all 'ghost' purchases (that is, pending payment that already failed but is still marked as pending in Play Store cache). Android only.
 * @returns {Promise<boolean>}
 */
export var flushFailedPurchasesCachedAsPendingAndroid = function () { return getAndroidModule().flushFailedPurchasesCachedAsPending(); };
/**
 * Fill products with additional data
 * @param {Array<ProductCommon>} products Products
 */
var fillProductsAdditionalData = function (products) { return __awaiter(void 0, void 0, void 0, function () {
    var user, currencies, currency_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!RNIapAmazonModule) return [3 /*break*/, 2];
                return [4 /*yield*/, RNIapAmazonModule.getUser()];
            case 1:
                user = _a.sent();
                currencies = {
                    CA: 'CAD',
                    ES: 'EUR',
                    AU: 'AUD',
                    DE: 'EUR',
                    IN: 'INR',
                    US: 'USD',
                    JP: 'JPY',
                    GB: 'GBP',
                    IT: 'EUR',
                    BR: 'BRL',
                    FR: 'EUR',
                };
                currency_1 = currencies[user.userMarketplaceAmazon];
                // Add currency to products
                products.forEach(function (product) {
                    if (currency_1) {
                        product.currency = currency_1;
                    }
                });
                _a.label = 2;
            case 2: return [2 /*return*/, products];
        }
    });
}); };
/**
 * Get a list of products (consumable and non-consumable items, but not subscriptions)
 * @param {string[]} skus The item skus
 * @returns {Promise<Product[]>}
 */
export var getProducts = function (skus) {
    return (Platform.select({
        ios: function () { return __awaiter(void 0, void 0, void 0, function () {
            var items;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, getIosModule().getItems(skus)];
                    case 1:
                        items = _a.sent();
                        return [2 /*return*/, items.filter(function (item) { return skus.includes(item.productId); })];
                }
            });
        }); },
        android: function () { return __awaiter(void 0, void 0, void 0, function () {
            var products;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, getAndroidModule().getItemsByType(ANDROID_ITEM_TYPE_IAP, skus)];
                    case 1:
                        products = _a.sent();
                        return [2 /*return*/, fillProductsAdditionalData(products)];
                }
            });
        }); },
    }) || Promise.resolve)();
};
/**
 * Get a list of subscriptions
 * @param {string[]} skus The item skus
 * @returns {Promise<Subscription[]>}
 */
export var getSubscriptions = function (skus) {
    return (Platform.select({
        ios: function () { return __awaiter(void 0, void 0, void 0, function () {
            var items;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, getIosModule().getItems(skus)];
                    case 1:
                        items = _a.sent();
                        return [2 /*return*/, items.filter(function (item) {
                                return skus.includes(item.productId);
                            })];
                }
            });
        }); },
        android: function () { return __awaiter(void 0, void 0, void 0, function () {
            var subscriptions;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, getAndroidModule().getItemsByType(ANDROID_ITEM_TYPE_SUBSCRIPTION, skus)];
                    case 1:
                        subscriptions = _a.sent();
                        return [2 /*return*/, fillProductsAdditionalData(subscriptions)];
                }
            });
        }); },
    }) || Promise.resolve)();
};
/**
 * Gets an inventory of purchases made by the user regardless of consumption status
 * @returns {Promise<(InAppPurchase | SubscriptionPurchase)[]>}
 */
export var getPurchaseHistory = function () {
    return (Platform.select({
        ios: function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, getIosModule().getAvailableItems()];
            });
        }); },
        android: function () { return __awaiter(void 0, void 0, void 0, function () {
            var products, subscriptions;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!RNIapAmazonModule) return [3 /*break*/, 2];
                        return [4 /*yield*/, RNIapAmazonModule.getAvailableItems()];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2: return [4 /*yield*/, getAndroidModule().getPurchaseHistoryByType(ANDROID_ITEM_TYPE_IAP)];
                    case 3:
                        products = _a.sent();
                        return [4 /*yield*/, getAndroidModule().getPurchaseHistoryByType(ANDROID_ITEM_TYPE_SUBSCRIPTION)];
                    case 4:
                        subscriptions = _a.sent();
                        return [2 /*return*/, products.concat(subscriptions)];
                }
            });
        }); },
    }) || Promise.resolve)();
};
/**
 * Get all purchases made by the user (either non-consumable, or haven't been consumed yet)
 * @returns {Promise<(InAppPurchase | SubscriptionPurchase)[]>}
 */
export var getAvailablePurchases = function () {
    return (Platform.select({
        ios: function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, getIosModule().getAvailableItems()];
            });
        }); },
        android: function () { return __awaiter(void 0, void 0, void 0, function () {
            var products, subscriptions;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!RNIapAmazonModule) return [3 /*break*/, 2];
                        return [4 /*yield*/, RNIapAmazonModule.getAvailableItems()];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2: return [4 /*yield*/, getAndroidModule().getAvailableItemsByType(ANDROID_ITEM_TYPE_IAP)];
                    case 3:
                        products = _a.sent();
                        return [4 /*yield*/, getAndroidModule().getAvailableItemsByType(ANDROID_ITEM_TYPE_SUBSCRIPTION)];
                    case 4:
                        subscriptions = _a.sent();
                        return [2 /*return*/, products.concat(subscriptions)];
                }
            });
        }); },
    }) || Promise.resolve)();
};
/**
 * Request a purchase for product. This will be received in `PurchaseUpdatedListener`.
 * @param {string} sku The product's sku/ID
 * @param {boolean} [andDangerouslyFinishTransactionAutomaticallyIOS] You should set this to false and call finishTransaction manually when you have delivered the purchased goods to the user. It defaults to true to provide backwards compatibility. Will default to false in version 4.0.0.
 * @param {string} [obfuscatedAccountIdAndroid] Specifies an optional obfuscated string that is uniquely associated with the user's account in your app.
 * @param {string} [obfuscatedProfileIdAndroid] Specifies an optional obfuscated string that is uniquely associated with the user's profile in your app.
 * @returns {Promise<InAppPurchase>}
 */
export var requestPurchase = function (sku, andDangerouslyFinishTransactionAutomaticallyIOS, obfuscatedAccountIdAndroid, obfuscatedProfileIdAndroid, applicationUsername) {
    if (andDangerouslyFinishTransactionAutomaticallyIOS === void 0) { andDangerouslyFinishTransactionAutomaticallyIOS = false; }
    if (obfuscatedAccountIdAndroid === void 0) { obfuscatedAccountIdAndroid = undefined; }
    if (obfuscatedProfileIdAndroid === void 0) { obfuscatedProfileIdAndroid = undefined; }
    if (applicationUsername === void 0) { applicationUsername = undefined; }
    return (Platform.select({
        ios: function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (andDangerouslyFinishTransactionAutomaticallyIOS) {
                    // eslint-disable-next-line no-console
                    console.warn(
                    // eslint-disable-next-line max-len
                    'You are dangerously allowing react-native-iap to finish your transaction automatically. You should set andDangerouslyFinishTransactionAutomatically to false when calling requestPurchase and call finishTransaction manually when you have delivered the purchased goods to the user. It defaults to true to provide backwards compatibility. Will default to false in version 4.0.0.');
                }
                return [2 /*return*/, getIosModule().buyProduct(sku, andDangerouslyFinishTransactionAutomaticallyIOS, applicationUsername)];
            });
        }); },
        android: function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, getAndroidModule().buyItemByType(ANDROID_ITEM_TYPE_IAP, sku, null, 0, obfuscatedAccountIdAndroid, obfuscatedProfileIdAndroid)];
            });
        }); },
    }) || Promise.resolve)();
};
/**
 * Request a purchase for product. This will be received in `PurchaseUpdatedListener`.
 * @param {string} [sku] The product's sku/ID
 * @param {boolean} [andDangerouslyFinishTransactionAutomaticallyIOS] You should set this to false and call finishTransaction manually when you have delivered the purchased goods to the user. It defaults to true to provide backwards compatibility. Will default to false in version 4.0.0.
 * @param {string} [purchaseTokenAndroid] purchaseToken that the user is upgrading or downgrading from (Android).
 * @param {ProrationModesAndroid} [prorationModeAndroid] UNKNOWN_SUBSCRIPTION_UPGRADE_DOWNGRADE_POLICY, IMMEDIATE_WITH_TIME_PRORATION, IMMEDIATE_AND_CHARGE_PRORATED_PRICE, IMMEDIATE_WITHOUT_PRORATION, DEFERRED
 * @param {string} [obfuscatedAccountIdAndroid] Specifies an optional obfuscated string that is uniquely associated with the user's account in your app.
 * @param {string} [obfuscatedProfileIdAndroid] Specifies an optional obfuscated string that is uniquely associated with the user's profile in your app.
 * @param {string} [applicationUsername] Specifies an optional obfuscated string that is uniquely associated with the user's profile in your app.
 * @returns {Promise<SubscriptionPurchase | null>} Promise resolves to null when using proratioModesAndroid=DEFERRED, and to a SubscriptionPurchase otherwise
 */
export var requestSubscription = function (sku, andDangerouslyFinishTransactionAutomaticallyIOS, purchaseTokenAndroid, prorationModeAndroid, obfuscatedAccountIdAndroid, obfuscatedProfileIdAndroid, applicationUsername) {
    if (andDangerouslyFinishTransactionAutomaticallyIOS === void 0) { andDangerouslyFinishTransactionAutomaticallyIOS = false; }
    if (purchaseTokenAndroid === void 0) { purchaseTokenAndroid = undefined; }
    if (prorationModeAndroid === void 0) { prorationModeAndroid = -1; }
    if (obfuscatedAccountIdAndroid === void 0) { obfuscatedAccountIdAndroid = undefined; }
    if (obfuscatedProfileIdAndroid === void 0) { obfuscatedProfileIdAndroid = undefined; }
    if (applicationUsername === void 0) { applicationUsername = undefined; }
    return (Platform.select({
        ios: function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (andDangerouslyFinishTransactionAutomaticallyIOS) {
                    // eslint-disable-next-line no-console
                    console.warn(
                    // eslint-disable-next-line max-len
                    'You are dangerously allowing react-native-iap to finish your transaction automatically. You should set andDangerouslyFinishTransactionAutomatically to false when calling requestPurchase and call finishTransaction manually when you have delivered the purchased goods to the user. It defaults to true to provide backwards compatibility. Will default to false in version 4.0.0.');
                }
                return [2 /*return*/, getIosModule().buyProduct(sku, andDangerouslyFinishTransactionAutomaticallyIOS, applicationUsername)];
            });
        }); },
        android: function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, getAndroidModule().buyItemByType(ANDROID_ITEM_TYPE_SUBSCRIPTION, sku, purchaseTokenAndroid, prorationModeAndroid, obfuscatedAccountIdAndroid, obfuscatedProfileIdAndroid)];
            });
        }); },
    }) || Promise.resolve)();
};
/**
 * Request a purchase for product. This will be received in `PurchaseUpdatedListener`.
 * @param {string} sku The product's sku/ID
 * @returns {Promise<void>}
 */
export var requestPurchaseWithQuantityIOS = function (sku, quantity) {
    return getIosModule().buyProductWithQuantityIOS(sku, quantity);
};
/**
 * Finish Transaction (both platforms)
 *   Abstracts  Finish Transaction
 *   iOS: Tells StoreKit that you have delivered the purchase to the user and StoreKit can now let go of the transaction.
 *   Call this after you have persisted the purchased state to your server or local data in your app.
 *   `react-native-iap` will continue to deliver the purchase updated events with the successful purchase until you finish the transaction. **Even after the app has relaunched.**
 *   Android: it will consume purchase for consumables and acknowledge purchase for non-consumables.
 * @param {object} purchase The purchase that you would like to finish.
 * @param {boolean} isConsumable Checks if purchase is consumable. Has effect on `android`.
 * @param {string} developerPayloadAndroid Android developerPayload.
 * @returns {Promise<string | void> }
 */
export var finishTransaction = function (purchase, isConsumable, developerPayloadAndroid) {
    return (Platform.select({
        ios: function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, getIosModule().finishTransaction(purchase.transactionId)];
            });
        }); },
        android: function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (purchase) {
                    if (isConsumable) {
                        return [2 /*return*/, getAndroidModule().consumeProduct(purchase.purchaseToken, developerPayloadAndroid)];
                    }
                    else if (purchase.userIdAmazon ||
                        (!purchase.isAcknowledgedAndroid &&
                            purchase.purchaseStateAndroid === PurchaseStateAndroid.PURCHASED)) {
                        return [2 /*return*/, getAndroidModule().acknowledgePurchase(purchase.purchaseToken, developerPayloadAndroid)];
                    }
                    else {
                        throw new Error('purchase is not suitable to be purchased');
                    }
                }
                else {
                    throw new Error('purchase is not assigned');
                }
                return [2 /*return*/];
            });
        }); },
    }) || Promise.resolve)();
};
/**
 * Clear Transaction (iOS only)
 *   Finish remaining transactions. Related to issue #257 and #801
 *     link : https://github.com/dooboolab/react-native-iap/issues/257
 *            https://github.com/dooboolab/react-native-iap/issues/801
 * @returns {Promise<void>}
 */
export var clearTransactionIOS = function () {
    return getIosModule().clearTransaction();
};
/**
 * Clear valid Products (iOS only)
 *   Remove all products which are validated by Apple server.
 * @returns {void}
 */
export var clearProductsIOS = function () {
    return getIosModule().clearProducts();
};
/**
 * Acknowledge a product (on Android.) No-op on iOS.
 * @param {string} token The product's token (on Android)
 * @returns {Promise<PurchaseResult | void>}
 */
export var acknowledgePurchaseAndroid = function (token, developerPayload) {
    return getAndroidModule().acknowledgePurchase(token, developerPayload);
};
/**
 * Deep link to subscriptions screen on Android. No-op on iOS.
 * @param {string} sku The product's SKU (on Android)
 * @returns {Promise<void>}
 */
export var deepLinkToSubscriptionsAndroid = function (sku) {
    checkNativeAndroidAvailable();
    return Linking.openURL("https://play.google.com/store/account/subscriptions?package=".concat(RNIapModule.getPackageName(), "&sku=").concat(sku));
};
/**
 * Should Add Store Payment (iOS only)
 *   Indicates the the App Store purchase should continue from the app instead of the App Store.
 * @returns {Promise<Product | null>} promoted product
 */
export var getPromotedProductIOS = function () {
    return getIosModule().promotedProduct();
};
/**
 * Buy the currently selected promoted product (iOS only)
 *   Initiates the payment process for a promoted product. Should only be called in response to the `iap-promoted-product` event.
 * @returns {Promise<void>}
 */
export var buyPromotedProductIOS = function () {
    return getIosModule().buyPromotedProduct();
};
var fetchJsonOrThrow = function (url, receiptBody) { return __awaiter(void 0, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch(url, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(receiptBody),
                })];
            case 1:
                response = _a.sent();
                if (!response.ok) {
                    throw Object.assign(new Error(response.statusText), {
                        statusCode: response.status,
                    });
                }
                return [2 /*return*/, response.json()];
        }
    });
}); };
var requestAgnosticReceiptValidationIos = function (receiptBody) { return __awaiter(void 0, void 0, void 0, function () {
    var response, testResponse;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetchJsonOrThrow('https://buy.itunes.apple.com/verifyReceipt', receiptBody)];
            case 1:
                response = _a.sent();
                if (!(response &&
                    response.status === Apple.ReceiptValidationStatus.TEST_RECEIPT)) return [3 /*break*/, 3];
                return [4 /*yield*/, fetchJsonOrThrow('https://sandbox.itunes.apple.com/verifyReceipt', receiptBody)];
            case 2:
                testResponse = _a.sent();
                return [2 /*return*/, testResponse];
            case 3: return [2 /*return*/, response];
        }
    });
}); };
/**
 * Buy products or subscriptions with offers (iOS only)
 *
 * Runs the payment process with some infor you must fetch
 * from your server.
 * @param {string} sku The product identifier
 * @param {string} forUser  An user identifier on you system
 * @param {Apple.PaymentDiscount} withOffer The offer information
 * @param {string} withOffer.identifier The offer identifier
 * @param {string} withOffer.keyIdentifier Key identifier that it uses to generate the signature
 * @param {string} withOffer.nonce An UUID returned from the server
 * @param {string} withOffer.signature The actual signature returned from the server
 * @param {number} withOffer.timestamp The timestamp of the signature
 * @returns {Promise<void>}
 */
export var requestPurchaseWithOfferIOS = function (sku, forUser, withOffer) { return getIosModule().buyProductWithOffer(sku, forUser, withOffer); };
/**
 * Validate receipt for iOS.
 * @param {object} receiptBody the receipt body to send to apple server.
 * @param {boolean} isTest whether this is in test environment which is sandbox.
 * @returns {Promise<Apple.ReceiptValidationResponse | false>}
 */
export var validateReceiptIos = function (receiptBody, isTest) { return __awaiter(void 0, void 0, void 0, function () {
    var url, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!(isTest == null)) return [3 /*break*/, 2];
                return [4 /*yield*/, requestAgnosticReceiptValidationIos(receiptBody)];
            case 1: return [2 /*return*/, _a.sent()];
            case 2:
                url = isTest
                    ? 'https://sandbox.itunes.apple.com/verifyReceipt'
                    : 'https://buy.itunes.apple.com/verifyReceipt';
                return [4 /*yield*/, fetchJsonOrThrow(url, receiptBody)];
            case 3:
                response = _a.sent();
                return [2 /*return*/, response];
        }
    });
}); };
/**
 * Validate receipt for Android. NOTE: This method is here for debugging purposes only. Including
 * your access token in the binary you ship to users is potentially dangerous.
 * Use server side validation instead for your production builds
 * @param {string} packageName package name of your app.
 * @param {string} productId product id for your in app product.
 * @param {string} productToken token for your purchase.
 * @param {string} accessToken accessToken from googleApis.
 * @param {boolean} isSub whether this is subscription or inapp. `true` for subscription.
 * @returns {Promise<object>}
 */
export var validateReceiptAndroid = function (packageName, productId, productToken, accessToken, isSub) { return __awaiter(void 0, void 0, void 0, function () {
    var type, url, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                type = isSub ? 'subscriptions' : 'products';
                url = 'https://androidpublisher.googleapis.com/androidpublisher/v3/applications' +
                    "/".concat(packageName, "/purchases/").concat(type, "/").concat(productId) +
                    "/tokens/".concat(productToken, "?access_token=").concat(accessToken);
                return [4 /*yield*/, fetch(url, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    })];
            case 1:
                response = _a.sent();
                if (!response.ok) {
                    throw Object.assign(new Error(response.statusText), {
                        statusCode: response.status,
                    });
                }
                return [2 /*return*/, response.json()];
        }
    });
}); };
/**
 * Validate receipt for Amazon. NOTE: This method is here for debugging purposes only. Including
 * your developer secret in the binary you ship to users is potentially dangerous.
 * Use server side validation instead for your production builds
 * @param {string} developerSecret: from the Amazon developer console.
 * @param {string} userId who purchased the item.
 * @param {string} receiptId long obfuscated string returned when purchasing the item
 * @param {boolean} useSandbox Defaults to true, use sandbox environment or production.
 * @returns {Promise<object>}
 */
export var validateReceiptAmazon = function (developerSecret, userId, receiptId, useSandbox) {
    if (useSandbox === void 0) { useSandbox = true; }
    return __awaiter(void 0, void 0, void 0, function () {
        var sandoboxUrl, url, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sandoboxUrl = useSandbox ? 'sandbox/' : '';
                    url = "https://appstore-sdk.amazon.com/".concat(sandoboxUrl, "version/1.0/verifyReceiptId/developer/").concat(developerSecret, "/user/").concat(userId, "/receiptId/").concat(receiptId);
                    return [4 /*yield*/, fetch(url, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        })];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw Object.assign(new Error(response.statusText), {
                            statusCode: response.status,
                        });
                    }
                    return [2 /*return*/, response.json()];
            }
        });
    });
};
/**
 * Add IAP purchase event
 * @returns {callback(e: InAppPurchase | ProductPurchase)}
 */
export var purchaseUpdatedListener = function (listener) {
    var myModuleEvt = new NativeEventEmitter(getNativeModule());
    var emitterSubscription = myModuleEvt.addListener('purchase-updated', listener);
    if (Platform.OS === 'android') {
        getAndroidModule().startListening();
    }
    return emitterSubscription;
};
/**
 * Add IAP purchase error event
 * @returns {callback(e: PurchaseError)}
 */
export var purchaseErrorListener = function (listener) {
    return new NativeEventEmitter(getNativeModule()).addListener('purchase-error', listener);
};
/**
 * Get the current receipt base64 encoded in IOS.
 * @param {forceRefresh?:boolean}
 * @returns {Promise<string>}
 */
export var getReceiptIOS = function (forceRefresh) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, getIosModule().requestReceipt(forceRefresh !== null && forceRefresh !== void 0 ? forceRefresh : false)];
}); }); };
/**
 * Get the pending purchases in IOS.
 * @returns {Promise<ProductPurchase[]>}
 */
export var getPendingPurchasesIOS = function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, getIosModule().getPendingTransactions()];
}); }); };
/**
 * Launches a modal to register the redeem offer code in IOS.
 * @returns {Promise<null>}
 */
export var presentCodeRedemptionSheetIOS = function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, getIosModule().presentCodeRedemptionSheet()];
}); }); };
/**
 * Checks if the internal client is ready to be used (Android only)
 * @returns {Promise<boolean>}
 */
export var isReadyAndroid = function () {
    return getAndroidModule().isReadyAndroid();
};
