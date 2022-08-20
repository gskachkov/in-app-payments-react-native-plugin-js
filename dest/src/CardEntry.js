"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
const react_native_1 = require("react-native"); // eslint-disable-line import/no-unresolved
const Utilities_1 = __importDefault(require("./Utilities"));
const { RNSQIPCardEntry } = react_native_1.NativeModules;
let cardEntryCancelCallback;
const onNativeCardEntryCanceled = () => {
    if (cardEntryCancelCallback)
        cardEntryCancelCallback();
};
let cardEntryCardNonceRequestSuccessCallback;
const onNativeCardEntryDidObtainCardDetails = (cardDetails) => {
    if (cardEntryCardNonceRequestSuccessCallback) {
        cardEntryCardNonceRequestSuccessCallback(cardDetails);
    }
};
let cardEntryCompleteCallback;
const onNativeCardEntryComplete = () => {
    if (cardEntryCompleteCallback)
        cardEntryCompleteCallback();
};
let buyerVerificationSuccessCallback;
const onNativeBuyerVerificationSuccess = (verificationResult) => {
    if (buyerVerificationSuccessCallback) {
        buyerVerificationSuccessCallback(verificationResult);
    }
};
let buyerVerificationErrorCallback;
const onNativeBuyerVerificationError = (error) => {
    if (buyerVerificationErrorCallback) {
        buyerVerificationErrorCallback(error);
    }
};
const cardEntryEmitter = new react_native_1.NativeEventEmitter(RNSQIPCardEntry);
cardEntryEmitter.addListener('cardEntryCancel', onNativeCardEntryCanceled);
cardEntryEmitter.addListener('cardEntryDidObtainCardDetails', onNativeCardEntryDidObtainCardDetails);
cardEntryEmitter.addListener('cardEntryComplete', onNativeCardEntryComplete);
cardEntryEmitter.addListener('onBuyerVerificationSuccess', onNativeBuyerVerificationSuccess);
cardEntryEmitter.addListener('onBuyerVerificationError', onNativeBuyerVerificationError);
const startCardEntryFlow = async (cardEntryConfig, onCardNonceRequestSuccess, onCardEntryCancel) => {
    let cardEntryInternalConfig = { collectPostalCode: true };
    if (cardEntryConfig) {
        Utilities_1.default.verifyObjectType(cardEntryConfig, 'cardEntryConfig should be an object.');
        cardEntryInternalConfig = cardEntryConfig;
    }
    if (cardEntryInternalConfig.collectPostalCode != null) {
        Utilities_1.default.verifyBooleanType(cardEntryInternalConfig.collectPostalCode, 'cardEntryConfig.collectPostalCode should be a boolean.');
    }
    else {
        // the default collectPostalCode is true
        cardEntryInternalConfig.collectPostalCode = true;
    }
    cardEntryCardNonceRequestSuccessCallback = onCardNonceRequestSuccess;
    cardEntryCancelCallback = onCardEntryCancel;
    await RNSQIPCardEntry.startCardEntryFlow(cardEntryInternalConfig.collectPostalCode);
};
const startBuyerVerificationFlow = async (paymentSourceId, cardEntryConfig, onBuyerVerificationSuccess, onBuyerVerificationFailure, onCardEntryCancel) => {
    const money = {
        amount: cardEntryConfig.amount,
        currencyCode: cardEntryConfig.currencyCode,
    };
    const contact = {
        givenName: cardEntryConfig.givenName,
        familyName: cardEntryConfig.familyName,
        addressLines: cardEntryConfig.addressLines,
        city: cardEntryConfig.city,
        countryCode: cardEntryConfig.countryCode,
        email: cardEntryConfig.email,
        phone: cardEntryConfig.phone,
        postalCode: cardEntryConfig.postalCode,
        region: cardEntryConfig.region,
    };
    buyerVerificationSuccessCallback = onBuyerVerificationSuccess;
    buyerVerificationErrorCallback = onBuyerVerificationFailure;
    cardEntryCancelCallback = onCardEntryCancel;
    await RNSQIPCardEntry.startBuyerVerificationFlow(paymentSourceId, cardEntryConfig.squareLocationId, cardEntryConfig.buyerAction, money, contact);
};
const startCardEntryFlowWithBuyerVerification = async (cardEntryConfig, onBuyerVerificationSuccess, onBuyerVerificationFailure, onCardEntryCancel) => {
    let cardEntryInternalConfig = { collectPostalCode: true };
    if (cardEntryConfig) {
        Utilities_1.default.verifyObjectType(cardEntryConfig, 'cardEntryConfig should be an object.');
        cardEntryInternalConfig = cardEntryConfig;
    }
    if (cardEntryInternalConfig.collectPostalCode != null) {
        Utilities_1.default.verifyBooleanType(cardEntryInternalConfig.collectPostalCode, 'cardEntryConfig.collectPostalCode should be a boolean.');
    }
    else {
        // the default collectPostalCode is true
        cardEntryInternalConfig.collectPostalCode = true;
    }
    const { squareLocationId } = cardEntryConfig;
    const { buyerAction } = cardEntryConfig;
    const money = {
        amount: cardEntryConfig.amount,
        currencyCode: cardEntryConfig.currencyCode,
    };
    const contact = {
        givenName: cardEntryConfig.givenName,
        familyName: cardEntryConfig.familyName,
        addressLines: cardEntryConfig.addressLines,
        city: cardEntryConfig.city,
        countryCode: cardEntryConfig.countryCode,
        email: cardEntryConfig.email,
        phone: cardEntryConfig.phone,
        postalCode: cardEntryConfig.postalCode,
        region: cardEntryConfig.region,
    };
    buyerVerificationSuccessCallback = onBuyerVerificationSuccess;
    buyerVerificationErrorCallback = onBuyerVerificationFailure;
    cardEntryCancelCallback = onCardEntryCancel;
    await RNSQIPCardEntry.startCardEntryFlowWithVerification(cardEntryInternalConfig.collectPostalCode, squareLocationId, buyerAction, money, contact);
};
const startGiftCardEntryFlow = async (onCardNonceRequestSuccess, onCardEntryCancel) => {
    cardEntryCardNonceRequestSuccessCallback = onCardNonceRequestSuccess;
    cardEntryCancelCallback = onCardEntryCancel;
    await RNSQIPCardEntry.startGiftCardEntryFlow();
};
const completeCardEntry = async (onCardEntryComplete) => {
    cardEntryCompleteCallback = onCardEntryComplete;
    await RNSQIPCardEntry.completeCardEntry();
};
const showCardNonceProcessingError = async (errorMessage) => {
    Utilities_1.default.verifyStringType(errorMessage, 'errorMessage should be a string');
    await RNSQIPCardEntry.showCardNonceProcessingError(errorMessage);
};
const setIOSCardEntryTheme = async (theme) => {
    Utilities_1.default.verifyThemeType(theme);
    await RNSQIPCardEntry.setTheme(theme);
};
exports.default = react_native_1.Platform.select({
    ios: {
        startGiftCardEntryFlow,
        startCardEntryFlow,
        startCardEntryFlowWithBuyerVerification,
        completeCardEntry,
        showCardNonceProcessingError,
        setIOSCardEntryTheme,
        startBuyerVerificationFlow,
    },
    android: {
        startGiftCardEntryFlow,
        startCardEntryFlow,
        startCardEntryFlowWithBuyerVerification,
        completeCardEntry,
        showCardNonceProcessingError,
        startBuyerVerificationFlow,
    },
});
