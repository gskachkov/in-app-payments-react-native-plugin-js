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
var RNSQIPGooglePay = react_native_1.NativeModules.RNSQIPGooglePay;
var googlePayNonceRequestSuccessCallback;
var onNativeGooglePayNonceRequestSuccess = function (cardDetails) {
    if (googlePayNonceRequestSuccessCallback)
        googlePayNonceRequestSuccessCallback(cardDetails);
};
var googlePayNonceRequestFailureCallback;
var onNativeGooglePayNonceRequestFailure = function (error) {
    if (googlePayNonceRequestFailureCallback)
        googlePayNonceRequestFailureCallback(error);
};
var googlePayCancelCallback;
var onNativeGooglePayCanceled = function () {
    if (googlePayCancelCallback)
        googlePayCancelCallback();
};
if (react_native_1.Platform.OS === 'android') {
    var googlePayEmitter = new react_native_1.NativeEventEmitter(RNSQIPGooglePay);
    googlePayEmitter.addListener('onGooglePayNonceRequestSuccess', onNativeGooglePayNonceRequestSuccess);
    googlePayEmitter.addListener('onGooglePayNonceRequestFailure', onNativeGooglePayNonceRequestFailure);
    googlePayEmitter.addListener('onGooglePayCanceled', onNativeGooglePayCanceled);
}
var initializeGooglePay = function (squareLocationId, environment) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                Utilities_1["default"].verifyStringType(squareLocationId, 'squareLocationId should be a valid string');
                Utilities_1["default"].verifyIntegerType(environment, 'environment should be a valid integer');
                return [4 /*yield*/, RNSQIPGooglePay.initializeGooglePay(squareLocationId, environment)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var canUseGooglePay = function () { return __awaiter(void 0, void 0, void 0, function () {
    var value, ex_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, RNSQIPGooglePay.canUseGooglePay()];
            case 1:
                value = _a.sent();
                return [2 /*return*/, value];
            case 2:
                ex_1 = _a.sent();
                throw Utilities_1["default"].createInAppPayementsError(ex_1);
            case 3: return [2 /*return*/];
        }
    });
}); };
var requestGooglePayNonce = function (googlePayConfig, onGooglePayNonceRequestSuccess, onGooglePayNonceRequestFailure, onGooglePayCanceled) { return __awaiter(void 0, void 0, void 0, function () {
    var ex_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                Utilities_1["default"].verifyObjectType(googlePayConfig, 'googlePayConfig should be a valid object');
                Utilities_1["default"].verifyStringType(googlePayConfig.price, 'googlePayConfig.price should be a valid string');
                Utilities_1["default"].verifyStringType(googlePayConfig.currencyCode, 'googlePayConfig.currencyCode should be a valid string');
                Utilities_1["default"].verifyIntegerType(googlePayConfig.priceStatus, 'googlePayConfig.priceStatus should be a valid integer');
                googlePayNonceRequestSuccessCallback = onGooglePayNonceRequestSuccess;
                googlePayNonceRequestFailureCallback = onGooglePayNonceRequestFailure;
                googlePayCancelCallback = onGooglePayCanceled;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, RNSQIPGooglePay.requestGooglePayNonce(googlePayConfig.price, googlePayConfig.currencyCode, googlePayConfig.priceStatus)];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                ex_2 = _a.sent();
                throw Utilities_1["default"].createInAppPayementsError(ex_2);
            case 4: return [2 /*return*/];
        }
    });
}); };
var TotalPriceStatusNotCurrentlyKnown = 1;
var TotalPriceStatusEstimated = 2;
var TotalPriceStatusFinal = 3;
var EnvironmentProduction = 1;
var EnvironmentTest = 3;
exports["default"] = {
    initializeGooglePay: initializeGooglePay,
    canUseGooglePay: canUseGooglePay,
    requestGooglePayNonce: requestGooglePayNonce,
    TotalPriceStatusNotCurrentlyKnown: TotalPriceStatusNotCurrentlyKnown,
    TotalPriceStatusEstimated: TotalPriceStatusEstimated,
    TotalPriceStatusFinal: TotalPriceStatusFinal,
    EnvironmentProduction: EnvironmentProduction,
    EnvironmentTest: EnvironmentTest
};
