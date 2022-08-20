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
const PaymentType_1 = __importDefault(require("./models/PaymentType"));
const Utilities_1 = __importDefault(require("./Utilities"));
// const PaymentTypePending = 1;
// const PaymentTypeFinal = 2;
const { RNSQIPApplePay } = react_native_1.NativeModules;
let applePayNonceRequestSuccessCallback;
const onNativeApplePayNonceRequestSuccess = (cardDetails) => {
    if (applePayNonceRequestSuccessCallback)
        applePayNonceRequestSuccessCallback(cardDetails);
};
let applePayNonceRequestFailureCallback;
const onNativeApplePayNonceRequestFailure = (error) => {
    if (applePayNonceRequestFailureCallback)
        applePayNonceRequestFailureCallback(error);
};
let applePayCompleteCallback;
const onNativeApplePayComplete = () => {
    if (applePayCompleteCallback)
        applePayCompleteCallback();
};
const applePayEmitter = new react_native_1.NativeEventEmitter(RNSQIPApplePay);
applePayEmitter.addListener('onApplePayNonceRequestSuccess', onNativeApplePayNonceRequestSuccess);
applePayEmitter.addListener('onApplePayNonceRequestFailure', onNativeApplePayNonceRequestFailure);
applePayEmitter.addListener('onApplePayComplete', onNativeApplePayComplete);
const initializeApplePay = async (applePayMerchantId) => {
    Utilities_1.default.verifyStringType(applePayMerchantId, 'applePayMerchantId should be a string');
    await RNSQIPApplePay.initializeApplePay(applePayMerchantId);
};
const canUseApplePay = () => RNSQIPApplePay.canUseApplePay();
const requestApplePayNonce = async (applePayConfig, onApplePayNonceRequestSuccess, onApplePayNonceRequestFailure, onApplePayComplete) => {
    Utilities_1.default.verifyObjectType(applePayConfig, 'applePayConfig should be a valid object');
    Utilities_1.default.verifyStringType(applePayConfig.price, 'applePayConfig.price should be a valid string');
    Utilities_1.default.verifyStringType(applePayConfig.summaryLabel, 'applePayConfig.summaryLabel should be a valid string');
    Utilities_1.default.verifyStringType(applePayConfig.countryCode, 'applePayConfig.countryCode should be a valid string');
    Utilities_1.default.verifyStringType(applePayConfig.currencyCode, 'applePayConfig.currencyCode should be a valid string');
    applePayNonceRequestSuccessCallback = onApplePayNonceRequestSuccess;
    applePayNonceRequestFailureCallback = onApplePayNonceRequestFailure;
    applePayCompleteCallback = onApplePayComplete;
    let { paymentType } = applePayConfig;
    if (!applePayConfig.paymentType) {
        paymentType = PaymentType_1.default.PaymentTypeFinal;
    }
    else {
        Utilities_1.default.verifyIntegerType(applePayConfig.paymentType, 'applePayConfig.paymentType should be a valid integer');
    }
    try {
        await RNSQIPApplePay.requestApplePayNonce(applePayConfig.price, applePayConfig.summaryLabel, applePayConfig.countryCode, applePayConfig.currencyCode, paymentType);
    }
    catch (ex) {
        throw Utilities_1.default.createInAppPayementsError(ex);
    }
};
const completeApplePayAuthorization = async (isSuccess, errorMessage = '') => {
    Utilities_1.default.verifyBooleanType(isSuccess, 'isSuccess should be a valid boolean');
    Utilities_1.default.verifyStringType(errorMessage, 'errorMessage should be a valid string');
    await RNSQIPApplePay.completeApplePayAuthorization(isSuccess, errorMessage);
};
exports.default = {
    initializeApplePay,
    canUseApplePay,
    requestApplePayNonce,
    completeApplePayAuthorization,
};
