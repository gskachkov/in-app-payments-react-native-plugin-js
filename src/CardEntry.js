"use strict";
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
exports.__esModule = true;
/*
 Copyright 2022 Square Inc.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
var react_native_1 = require("react-native"); // eslint-disable-line import/no-unresolved
var Utilities_1 = require("./Utilities");
var RNSQIPCardEntry = react_native_1.NativeModules.RNSQIPCardEntry;
var cardEntryCancelCallback;
var onNativeCardEntryCanceled = function () {
    if (cardEntryCancelCallback)
        cardEntryCancelCallback();
};
var cardEntryCardNonceRequestSuccessCallback;
var onNativeCardEntryDidObtainCardDetails = function (cardDetails) {
    if (cardEntryCardNonceRequestSuccessCallback) {
        cardEntryCardNonceRequestSuccessCallback(cardDetails);
    }
};
var cardEntryCompleteCallback;
var onNativeCardEntryComplete = function () {
    if (cardEntryCompleteCallback)
        cardEntryCompleteCallback();
};
var buyerVerificationSuccessCallback;
var onNativeBuyerVerificationSuccess = function (verificationResult) {
    if (buyerVerificationSuccessCallback) {
        buyerVerificationSuccessCallback(verificationResult);
    }
};
var buyerVerificationErrorCallback;
var onNativeBuyerVerificationError = function (error) {
    if (buyerVerificationErrorCallback) {
        buyerVerificationErrorCallback(error);
    }
};
var cardEntryEmitter = new react_native_1.NativeEventEmitter(RNSQIPCardEntry);
cardEntryEmitter.addListener('cardEntryCancel', onNativeCardEntryCanceled);
cardEntryEmitter.addListener('cardEntryDidObtainCardDetails', onNativeCardEntryDidObtainCardDetails);
cardEntryEmitter.addListener('cardEntryComplete', onNativeCardEntryComplete);
cardEntryEmitter.addListener('onBuyerVerificationSuccess', onNativeBuyerVerificationSuccess);
cardEntryEmitter.addListener('onBuyerVerificationError', onNativeBuyerVerificationError);
var startCardEntryFlow = function (cardEntryConfig, onCardNonceRequestSuccess, onCardEntryCancel) { return __awaiter(void 0, void 0, void 0, function () {
    var cardEntryInternalConfig;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                cardEntryInternalConfig = { collectPostalCode: true };
                if (cardEntryConfig) {
                    Utilities_1["default"].verifyObjectType(cardEntryConfig, 'cardEntryConfig should be an object.');
                    cardEntryInternalConfig = cardEntryConfig;
                }
                if (cardEntryInternalConfig.collectPostalCode != null) {
                    Utilities_1["default"].verifyBooleanType(cardEntryInternalConfig.collectPostalCode, 'cardEntryConfig.collectPostalCode should be a boolean.');
                }
                else {
                    // the default collectPostalCode is true
                    cardEntryInternalConfig.collectPostalCode = true;
                }
                cardEntryCardNonceRequestSuccessCallback = onCardNonceRequestSuccess;
                cardEntryCancelCallback = onCardEntryCancel;
                return [4 /*yield*/, RNSQIPCardEntry.startCardEntryFlow(cardEntryInternalConfig.collectPostalCode)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var startBuyerVerificationFlow = function (paymentSourceId, cardEntryConfig, onBuyerVerificationSuccess, onBuyerVerificationFailure, onCardEntryCancel) { return __awaiter(void 0, void 0, void 0, function () {
    var money, contact;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                money = {
                    amount: cardEntryConfig.amount,
                    currencyCode: cardEntryConfig.currencyCode
                };
                contact = {
                    givenName: cardEntryConfig.givenName,
                    familyName: cardEntryConfig.familyName,
                    addressLines: cardEntryConfig.addressLines,
                    city: cardEntryConfig.city,
                    countryCode: cardEntryConfig.countryCode,
                    email: cardEntryConfig.email,
                    phone: cardEntryConfig.phone,
                    postalCode: cardEntryConfig.postalCode,
                    region: cardEntryConfig.region
                };
                buyerVerificationSuccessCallback = onBuyerVerificationSuccess;
                buyerVerificationErrorCallback = onBuyerVerificationFailure;
                cardEntryCancelCallback = onCardEntryCancel;
                return [4 /*yield*/, RNSQIPCardEntry.startBuyerVerificationFlow(paymentSourceId, cardEntryConfig.squareLocationId, cardEntryConfig.buyerAction, money, contact)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var startCardEntryFlowWithBuyerVerification = function (cardEntryConfig, onBuyerVerificationSuccess, onBuyerVerificationFailure, onCardEntryCancel) { return __awaiter(void 0, void 0, void 0, function () {
    var cardEntryInternalConfig, squareLocationId, buyerAction, money, contact;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                cardEntryInternalConfig = { collectPostalCode: true };
                if (cardEntryConfig) {
                    Utilities_1["default"].verifyObjectType(cardEntryConfig, 'cardEntryConfig should be an object.');
                    cardEntryInternalConfig = cardEntryConfig;
                }
                if (cardEntryInternalConfig.collectPostalCode != null) {
                    Utilities_1["default"].verifyBooleanType(cardEntryInternalConfig.collectPostalCode, 'cardEntryConfig.collectPostalCode should be a boolean.');
                }
                else {
                    // the default collectPostalCode is true
                    cardEntryInternalConfig.collectPostalCode = true;
                }
                squareLocationId = cardEntryConfig.squareLocationId;
                buyerAction = cardEntryConfig.buyerAction;
                money = {
                    amount: cardEntryConfig.amount,
                    currencyCode: cardEntryConfig.currencyCode
                };
                contact = {
                    givenName: cardEntryConfig.givenName,
                    familyName: cardEntryConfig.familyName,
                    addressLines: cardEntryConfig.addressLines,
                    city: cardEntryConfig.city,
                    countryCode: cardEntryConfig.countryCode,
                    email: cardEntryConfig.email,
                    phone: cardEntryConfig.phone,
                    postalCode: cardEntryConfig.postalCode,
                    region: cardEntryConfig.region
                };
                buyerVerificationSuccessCallback = onBuyerVerificationSuccess;
                buyerVerificationErrorCallback = onBuyerVerificationFailure;
                cardEntryCancelCallback = onCardEntryCancel;
                return [4 /*yield*/, RNSQIPCardEntry.startCardEntryFlowWithVerification(cardEntryInternalConfig.collectPostalCode, squareLocationId, buyerAction, money, contact)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var startGiftCardEntryFlow = function (onCardNonceRequestSuccess, onCardEntryCancel) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                cardEntryCardNonceRequestSuccessCallback = onCardNonceRequestSuccess;
                cardEntryCancelCallback = onCardEntryCancel;
                return [4 /*yield*/, RNSQIPCardEntry.startGiftCardEntryFlow()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var completeCardEntry = function (onCardEntryComplete) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                cardEntryCompleteCallback = onCardEntryComplete;
                return [4 /*yield*/, RNSQIPCardEntry.completeCardEntry()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var showCardNonceProcessingError = function (errorMessage) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                Utilities_1["default"].verifyStringType(errorMessage, 'errorMessage should be a string');
                return [4 /*yield*/, RNSQIPCardEntry.showCardNonceProcessingError(errorMessage)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var setIOSCardEntryTheme = function (theme) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                Utilities_1["default"].verifyThemeType(theme);
                return [4 /*yield*/, RNSQIPCardEntry.setTheme(theme)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports["default"] = react_native_1.Platform.select({
    ios: {
        startGiftCardEntryFlow: startGiftCardEntryFlow,
        startCardEntryFlow: startCardEntryFlow,
        startCardEntryFlowWithBuyerVerification: startCardEntryFlowWithBuyerVerification,
        completeCardEntry: completeCardEntry,
        showCardNonceProcessingError: showCardNonceProcessingError,
        setIOSCardEntryTheme: setIOSCardEntryTheme,
        startBuyerVerificationFlow: startBuyerVerificationFlow
    },
    android: {
        startGiftCardEntryFlow: startGiftCardEntryFlow,
        startCardEntryFlow: startCardEntryFlow,
        startCardEntryFlowWithBuyerVerification: startCardEntryFlowWithBuyerVerification,
        completeCardEntry: completeCardEntry,
        showCardNonceProcessingError: showCardNonceProcessingError,
        startBuyerVerificationFlow: startBuyerVerificationFlow
    }
});
