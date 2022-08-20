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
var PaymentType_1 = require("./models/PaymentType");
var Utilities_1 = require("./Utilities");
// const PaymentTypePending = 1;
// const PaymentTypeFinal = 2;
var RNSQIPApplePay = react_native_1.NativeModules.RNSQIPApplePay;
var applePayNonceRequestSuccessCallback;
var onNativeApplePayNonceRequestSuccess = function (cardDetails) {
    if (applePayNonceRequestSuccessCallback)
        applePayNonceRequestSuccessCallback(cardDetails);
};
var applePayNonceRequestFailureCallback;
var onNativeApplePayNonceRequestFailure = function (error) {
    if (applePayNonceRequestFailureCallback)
        applePayNonceRequestFailureCallback(error);
};
var applePayCompleteCallback;
var onNativeApplePayComplete = function () {
    if (applePayCompleteCallback)
        applePayCompleteCallback();
};
var applePayEmitter = new react_native_1.NativeEventEmitter(RNSQIPApplePay);
applePayEmitter.addListener('onApplePayNonceRequestSuccess', onNativeApplePayNonceRequestSuccess);
applePayEmitter.addListener('onApplePayNonceRequestFailure', onNativeApplePayNonceRequestFailure);
applePayEmitter.addListener('onApplePayComplete', onNativeApplePayComplete);
var initializeApplePay = function (applePayMerchantId) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                Utilities_1["default"].verifyStringType(applePayMerchantId, 'applePayMerchantId should be a string');
                return [4 /*yield*/, RNSQIPApplePay.initializeApplePay(applePayMerchantId)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var canUseApplePay = function () { return RNSQIPApplePay.canUseApplePay(); };
var requestApplePayNonce = function (applePayConfig, onApplePayNonceRequestSuccess, onApplePayNonceRequestFailure, onApplePayComplete) { return __awaiter(void 0, void 0, void 0, function () {
    var paymentType, ex_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                Utilities_1["default"].verifyObjectType(applePayConfig, 'applePayConfig should be a valid object');
                Utilities_1["default"].verifyStringType(applePayConfig.price, 'applePayConfig.price should be a valid string');
                Utilities_1["default"].verifyStringType(applePayConfig.summaryLabel, 'applePayConfig.summaryLabel should be a valid string');
                Utilities_1["default"].verifyStringType(applePayConfig.countryCode, 'applePayConfig.countryCode should be a valid string');
                Utilities_1["default"].verifyStringType(applePayConfig.currencyCode, 'applePayConfig.currencyCode should be a valid string');
                applePayNonceRequestSuccessCallback = onApplePayNonceRequestSuccess;
                applePayNonceRequestFailureCallback = onApplePayNonceRequestFailure;
                applePayCompleteCallback = onApplePayComplete;
                paymentType = applePayConfig.paymentType;
                if (!applePayConfig.paymentType) {
                    paymentType = PaymentType_1["default"].PaymentTypeFinal;
                }
                else {
                    Utilities_1["default"].verifyIntegerType(applePayConfig.paymentType, 'applePayConfig.paymentType should be a valid integer');
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, RNSQIPApplePay.requestApplePayNonce(applePayConfig.price, applePayConfig.summaryLabel, applePayConfig.countryCode, applePayConfig.currencyCode, paymentType)];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                ex_1 = _a.sent();
                throw Utilities_1["default"].createInAppPayementsError(ex_1);
            case 4: return [2 /*return*/];
        }
    });
}); };
var completeApplePayAuthorization = function (isSuccess, errorMessage) {
    if (errorMessage === void 0) { errorMessage = ''; }
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    Utilities_1["default"].verifyBooleanType(isSuccess, 'isSuccess should be a valid boolean');
                    Utilities_1["default"].verifyStringType(errorMessage, 'errorMessage should be a valid string');
                    return [4 /*yield*/, RNSQIPApplePay.completeApplePayAuthorization(isSuccess, errorMessage)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
};
exports["default"] = {
    initializeApplePay: initializeApplePay,
    canUseApplePay: canUseApplePay,
    requestApplePayNonce: requestApplePayNonce,
    completeApplePayAuthorization: completeApplePayAuthorization
};
