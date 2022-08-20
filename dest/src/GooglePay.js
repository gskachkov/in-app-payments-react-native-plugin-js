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
const { RNSQIPGooglePay } = react_native_1.NativeModules;
let googlePayNonceRequestSuccessCallback;
const onNativeGooglePayNonceRequestSuccess = (cardDetails) => {
    if (googlePayNonceRequestSuccessCallback)
        googlePayNonceRequestSuccessCallback(cardDetails);
};
let googlePayNonceRequestFailureCallback;
const onNativeGooglePayNonceRequestFailure = (error) => {
    if (googlePayNonceRequestFailureCallback)
        googlePayNonceRequestFailureCallback(error);
};
let googlePayCancelCallback;
const onNativeGooglePayCanceled = () => {
    if (googlePayCancelCallback)
        googlePayCancelCallback();
};
if (react_native_1.Platform.OS === 'android') {
    const googlePayEmitter = new react_native_1.NativeEventEmitter(RNSQIPGooglePay);
    googlePayEmitter.addListener('onGooglePayNonceRequestSuccess', onNativeGooglePayNonceRequestSuccess);
    googlePayEmitter.addListener('onGooglePayNonceRequestFailure', onNativeGooglePayNonceRequestFailure);
    googlePayEmitter.addListener('onGooglePayCanceled', onNativeGooglePayCanceled);
}
const initializeGooglePay = async (squareLocationId, environment) => {
    Utilities_1.default.verifyStringType(squareLocationId, 'squareLocationId should be a valid string');
    Utilities_1.default.verifyIntegerType(environment, 'environment should be a valid integer');
    await RNSQIPGooglePay.initializeGooglePay(squareLocationId, environment);
};
const canUseGooglePay = async () => {
    try {
        const value = await RNSQIPGooglePay.canUseGooglePay();
        return value;
    }
    catch (ex) {
        throw Utilities_1.default.createInAppPayementsError(ex);
    }
};
const requestGooglePayNonce = async (googlePayConfig, onGooglePayNonceRequestSuccess, onGooglePayNonceRequestFailure, onGooglePayCanceled) => {
    Utilities_1.default.verifyObjectType(googlePayConfig, 'googlePayConfig should be a valid object');
    Utilities_1.default.verifyStringType(googlePayConfig.price, 'googlePayConfig.price should be a valid string');
    Utilities_1.default.verifyStringType(googlePayConfig.currencyCode, 'googlePayConfig.currencyCode should be a valid string');
    Utilities_1.default.verifyIntegerType(googlePayConfig.priceStatus, 'googlePayConfig.priceStatus should be a valid integer');
    googlePayNonceRequestSuccessCallback = onGooglePayNonceRequestSuccess;
    googlePayNonceRequestFailureCallback = onGooglePayNonceRequestFailure;
    googlePayCancelCallback = onGooglePayCanceled;
    try {
        await RNSQIPGooglePay.requestGooglePayNonce(googlePayConfig.price, googlePayConfig.currencyCode, googlePayConfig.priceStatus);
    }
    catch (ex) {
        throw Utilities_1.default.createInAppPayementsError(ex);
    }
};
const TotalPriceStatusNotCurrentlyKnown = 1;
const TotalPriceStatusEstimated = 2;
const TotalPriceStatusFinal = 3;
const EnvironmentProduction = 1;
const EnvironmentTest = 3;
exports.default = {
    initializeGooglePay,
    canUseGooglePay,
    requestGooglePayNonce,
    TotalPriceStatusNotCurrentlyKnown,
    TotalPriceStatusEstimated,
    TotalPriceStatusFinal,
    EnvironmentProduction,
    EnvironmentTest,
};
