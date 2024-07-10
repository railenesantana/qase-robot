import type { DriverData, ExternalDriver, InitialOpts, RouteMatcher, SingularSessionData, StringRecord } from '@appium/types';
import AndroidDriver from 'appium-android-driver';
import { mjpeg } from 'appium/support';
import { type Uiautomator2Constraints } from './constraints';
import type { Uiautomator2Settings, Uiautomator2DeviceDetails, Uiautomator2DriverCaps, Uiautomator2DriverOpts, Uiautomator2SessionCaps, Uiautomator2StartSessionOpts, W3CUiautomator2DriverCaps } from './types';
import { UiAutomator2Server } from './uiautomator2';
import { mobileGetActionHistory, mobileScheduleAction, mobileUnscheduleAction, performActions, releaseActions } from './commands/actions';
import { getAlertText, mobileAcceptAlert, mobileDismissAlert, postAcceptAlert, postDismissAlert } from './commands/alert';
import { mobileInstallMultipleApks, mobileBackgroundApp } from './commands/app-management';
import { mobileGetAppStrings } from './commands/app-strings';
import { mobileGetBatteryInfo } from './commands/battery';
import { getClipboard, mobileGetClipboard, setClipboard, mobileSetClipboard } from './commands/clipboard';
import { active, getAttribute, elementEnabled, elementDisplayed, elementSelected, getName, getLocation, getSize, getElementRect, getElementScreenshot, getText, setValueImmediate, doSetElementValue, click, clear, mobileReplaceElementValue } from './commands/element';
import { executeMobile, mobileCommandsMapping } from './commands/execute';
import { doFindElementOrEls } from './commands/find';
import { mobileClickGesture, mobileDoubleClickGesture, mobileDragGesture, mobileFlingGesture, mobileLongClickGesture, mobilePinchCloseGesture, mobilePinchOpenGesture, mobileScroll, mobileScrollBackTo, mobileScrollGesture, mobileSwipeGesture } from './commands/gestures';
import { pressKeyCode, longPressKeyCode, mobilePressKey, mobileType, doSendKeys, keyevent } from './commands/keyboard';
import { getPageSource, getOrientation, setOrientation, openNotifications, mobileGetDeviceInfo } from './commands/misc';
import { setUrl, mobileDeepLink, back } from './commands/navigation';
import { mobileScreenshots, mobileViewportScreenshot, getScreenshot, getViewportScreenshot } from './commands/screenshot';
import { getStatusBarHeight, getDevicePixelRatio, getDisplayDensity, getViewPortRect, getWindowRect, getWindowSize, mobileViewPortRect } from './commands/viewport';
declare class AndroidUiautomator2Driver extends AndroidDriver implements ExternalDriver<Uiautomator2Constraints, string, StringRecord> {
    static newMethodMap: {
        readonly '/session/:sessionId/appium/device/get_clipboard': {
            readonly POST: {
                readonly command: "getClipboard";
                readonly payloadParams: {
                    readonly optional: readonly ["contentType"];
                };
            };
        };
        readonly '/session/:sessionId/timeouts/implicit_wait': {
            readonly POST: {
                readonly command: "implicitWait";
                readonly payloadParams: {
                    readonly required: readonly ["ms"];
                };
            };
        };
        readonly '/session/:sessionId/ime/available_engines': {
            readonly GET: {
                readonly command: "availableIMEEngines";
            };
        };
        readonly '/session/:sessionId/ime/active_engine': {
            readonly GET: {
                readonly command: "getActiveIMEEngine";
            };
        };
        readonly '/session/:sessionId/ime/activated': {
            readonly GET: {
                readonly command: "isIMEActivated";
            };
        };
        readonly '/session/:sessionId/ime/deactivate': {
            readonly POST: {
                readonly command: "deactivateIMEEngine";
            };
        };
        readonly '/session/:sessionId/ime/activate': {
            readonly POST: {
                readonly command: "activateIMEEngine";
                readonly payloadParams: {
                    readonly required: readonly ["engine"];
                };
            };
        };
        readonly '/session/:sessionId/window/:windowhandle/size': {
            readonly GET: {
                readonly command: "getWindowSize";
            };
        };
        readonly '/session/:sessionId/keys': {
            readonly POST: {
                readonly command: "keys";
                readonly payloadParams: {
                    readonly required: readonly ["value"];
                };
            };
        };
        readonly '/session/:sessionId/element/:elementId/location': {
            readonly GET: {
                readonly command: "getLocation";
            };
        };
        readonly '/session/:sessionId/element/:elementId/location_in_view': {
            readonly GET: {
                readonly command: "getLocationInView";
            };
        };
        readonly '/session/:sessionId/element/:elementId/size': {
            readonly GET: {
                readonly command: "getSize";
            };
        };
        readonly '/session/:sessionId/appium/device/lock': {
            readonly POST: {
                readonly command: "lock";
                readonly payloadParams: {
                    readonly optional: readonly ["seconds"];
                };
            };
        };
        readonly '/session/:sessionId/appium/device/unlock': {
            readonly POST: {
                readonly command: "unlock";
            };
        };
        readonly '/session/:sessionId/appium/device/is_locked': {
            readonly POST: {
                readonly command: "isLocked";
            };
        };
        readonly '/session/:sessionId/appium/start_recording_screen': {
            readonly POST: {
                readonly command: "startRecordingScreen";
                readonly payloadParams: {
                    readonly optional: readonly ["options"];
                };
            };
        };
        readonly '/session/:sessionId/appium/stop_recording_screen': {
            readonly POST: {
                readonly command: "stopRecordingScreen";
                readonly payloadParams: {
                    readonly optional: readonly ["options"];
                };
            };
        };
        readonly '/session/:sessionId/appium/performanceData/types': {
            readonly POST: {
                readonly command: "getPerformanceDataTypes";
            };
        };
        readonly '/session/:sessionId/appium/getPerformanceData': {
            readonly POST: {
                readonly command: "getPerformanceData";
                readonly payloadParams: {
                    readonly required: readonly ["packageName", "dataType"];
                    readonly optional: readonly ["dataReadTimeout"];
                };
            };
        };
        readonly '/session/:sessionId/appium/device/press_keycode': {
            readonly POST: {
                readonly command: "pressKeyCode";
                readonly payloadParams: {
                    readonly required: readonly ["keycode"];
                    readonly optional: readonly ["metastate", "flags"];
                };
            };
        };
        readonly '/session/:sessionId/appium/device/long_press_keycode': {
            readonly POST: {
                readonly command: "longPressKeyCode";
                readonly payloadParams: {
                    readonly required: readonly ["keycode"];
                    readonly optional: readonly ["metastate", "flags"];
                };
            };
        };
        readonly '/session/:sessionId/appium/device/finger_print': {
            readonly POST: {
                readonly command: "fingerprint";
                readonly payloadParams: {
                    readonly required: readonly ["fingerprintId"];
                };
            };
        };
        readonly '/session/:sessionId/appium/device/send_sms': {
            readonly POST: {
                readonly command: "sendSMS";
                readonly payloadParams: {
                    readonly required: readonly ["phoneNumber", "message"];
                };
            };
        };
        readonly '/session/:sessionId/appium/device/gsm_call': {
            readonly POST: {
                readonly command: "gsmCall";
                readonly payloadParams: {
                    readonly required: readonly ["phoneNumber", "action"];
                };
            };
        };
        readonly '/session/:sessionId/appium/device/gsm_signal': {
            readonly POST: {
                readonly command: "gsmSignal";
                readonly payloadParams: {
                    readonly required: readonly ["signalStrength"];
                };
            };
        };
        readonly '/session/:sessionId/appium/device/gsm_voice': {
            readonly POST: {
                readonly command: "gsmVoice";
                readonly payloadParams: {
                    readonly required: readonly ["state"];
                };
            };
        };
        readonly '/session/:sessionId/appium/device/power_capacity': {
            readonly POST: {
                readonly command: "powerCapacity";
                readonly payloadParams: {
                    readonly required: readonly ["percent"];
                };
            };
        };
        readonly '/session/:sessionId/appium/device/power_ac': {
            readonly POST: {
                readonly command: "powerAC";
                readonly payloadParams: {
                    readonly required: readonly ["state"];
                };
            };
        };
        readonly '/session/:sessionId/appium/device/network_speed': {
            readonly POST: {
                readonly command: "networkSpeed";
                readonly payloadParams: {
                    readonly required: readonly ["netspeed"];
                };
            };
        };
        readonly '/session/:sessionId/appium/device/keyevent': {
            readonly POST: {
                readonly command: "keyevent";
                readonly payloadParams: {
                    readonly required: readonly ["keycode"];
                    readonly optional: readonly ["metastate"];
                };
            };
        };
        readonly '/session/:sessionId/appium/device/current_activity': {
            readonly GET: {
                readonly command: "getCurrentActivity";
            };
        };
        readonly '/session/:sessionId/appium/device/current_package': {
            readonly GET: {
                readonly command: "getCurrentPackage";
            };
        };
        readonly '/session/:sessionId/appium/device/app_state': {
            readonly POST: {
                readonly command: "queryAppState";
                readonly payloadParams: {
                    readonly required: readonly [readonly ["appId"], readonly ["bundleId"]];
                };
            };
        };
        readonly '/session/:sessionId/appium/device/toggle_airplane_mode': {
            readonly POST: {
                readonly command: "toggleFlightMode";
            };
        };
        readonly '/session/:sessionId/appium/device/toggle_data': {
            readonly POST: {
                readonly command: "toggleData";
            };
        };
        readonly '/session/:sessionId/appium/device/toggle_wifi': {
            readonly POST: {
                readonly command: "toggleWiFi";
            };
        };
        readonly '/session/:sessionId/appium/device/toggle_location_services': {
            readonly POST: {
                readonly command: "toggleLocationServices";
            };
        };
        readonly '/session/:sessionId/appium/device/open_notifications': {
            readonly POST: {
                readonly command: "openNotifications";
            };
        };
        readonly '/session/:sessionId/appium/device/start_activity': {
            readonly POST: {
                readonly command: "startActivity";
                readonly payloadParams: {
                    readonly required: readonly ["appPackage", "appActivity"];
                    readonly optional: readonly ["appWaitPackage", "appWaitActivity", "intentAction", "intentCategory", "intentFlags", "optionalIntentArguments", "dontStopAppOnReset"];
                };
            };
        };
        readonly '/session/:sessionId/appium/device/system_bars': {
            readonly GET: {
                readonly command: "getSystemBars";
            };
        };
        readonly '/session/:sessionId/appium/device/display_density': {
            readonly GET: {
                readonly command: "getDisplayDensity";
            };
        };
        readonly '/session/:sessionId/appium/app/background': {
            readonly POST: {
                readonly command: "background";
                readonly payloadParams: {
                    readonly required: readonly ["seconds"];
                };
            };
        };
        readonly '/session/:sessionId/appium/app/strings': {
            readonly POST: {
                readonly command: "getStrings";
                readonly payloadParams: {
                    readonly optional: readonly ["language", "stringFile"];
                };
            };
        };
        readonly '/session/:sessionId/appium/element/:elementId/value': {
            readonly POST: {
                readonly command: "setValueImmediate";
                readonly payloadParams: {
                    readonly required: readonly ["text"];
                };
            };
        };
        readonly '/session/:sessionId/appium/element/:elementId/replace_value': {
            readonly POST: {
                readonly command: "replaceValue";
                readonly payloadParams: {
                    readonly required: readonly ["text"];
                };
            };
        };
    };
    uiautomator2: UiAutomator2Server;
    systemPort: number | undefined;
    _originalIme: string | null;
    mjpegStream?: mjpeg.MJpegStream;
    caps: Uiautomator2DriverCaps;
    opts: Uiautomator2DriverOpts;
    desiredCapConstraints: Uiautomator2Constraints;
    constructor(opts?: InitialOpts, shouldValidateCaps?: boolean);
    validateDesiredCaps(caps: any): caps is Uiautomator2DriverCaps;
    createSession(w3cCaps1: W3CUiautomator2DriverCaps, w3cCaps2?: W3CUiautomator2DriverCaps, w3cCaps3?: W3CUiautomator2DriverCaps, driverData?: DriverData[]): Promise<any>;
    getDeviceDetails(): Promise<Uiautomator2DeviceDetails>;
    get driverData(): {};
    getSession(): Promise<SingularSessionData<Uiautomator2Constraints>>;
    allocateSystemPort(): Promise<void>;
    releaseSystemPort(): Promise<void>;
    allocateMjpegServerPort(): Promise<void>;
    releaseMjpegServerPort(): Promise<void>;
    performSessionPreExecSetup(): Promise<StringRecord | undefined>;
    performSessionExecution(capsWithSessionInfo: StringRecord): Promise<void>;
    performSessionPostExecSetup(): Promise<void>;
    startUiAutomator2Session(caps: Uiautomator2StartSessionOpts): Promise<Uiautomator2SessionCaps>;
    initUiAutomator2Server(): Promise<UiAutomator2Server>;
    initAUT(): Promise<void>;
    ensureAppStarts(): Promise<void>;
    deleteSession(): Promise<void>;
    checkAppPresent(): Promise<void>;
    onSettingsUpdate(): Promise<void>;
    proxyActive(sessionId: string): boolean;
    canProxy(sessionId: string): boolean;
    getProxyAvoidList(): RouteMatcher[];
    updateSettings(settings: Uiautomator2Settings): Promise<void>;
    getSettings(): Promise<any>;
    mobileGetActionHistory: typeof mobileGetActionHistory;
    mobileScheduleAction: typeof mobileScheduleAction;
    mobileUnscheduleAction: typeof mobileUnscheduleAction;
    performActions: typeof performActions;
    releaseActions: typeof releaseActions;
    getAlertText: typeof getAlertText;
    mobileAcceptAlert: typeof mobileAcceptAlert;
    mobileDismissAlert: typeof mobileDismissAlert;
    postAcceptAlert: typeof postAcceptAlert;
    postDismissAlert: typeof postDismissAlert;
    mobileInstallMultipleApks: typeof mobileInstallMultipleApks;
    mobileBackgroundApp: typeof mobileBackgroundApp;
    mobileGetAppStrings: typeof mobileGetAppStrings;
    mobileGetBatteryInfo: typeof mobileGetBatteryInfo;
    active: typeof active;
    getAttribute: typeof getAttribute;
    elementEnabled: typeof elementEnabled;
    elementDisplayed: typeof elementDisplayed;
    elementSelected: typeof elementSelected;
    getName: typeof getName;
    getLocation: typeof getLocation;
    getSize: typeof getSize;
    getElementRect: typeof getElementRect;
    getElementScreenshot: typeof getElementScreenshot;
    getText: typeof getText;
    setValueImmediate: typeof setValueImmediate;
    doSetElementValue: typeof doSetElementValue;
    click: typeof click;
    clear: typeof clear;
    mobileReplaceElementValue: typeof mobileReplaceElementValue;
    executeMobile: typeof executeMobile;
    mobileCommandsMapping: typeof mobileCommandsMapping;
    doFindElementOrEls: typeof doFindElementOrEls;
    mobileClickGesture: typeof mobileClickGesture;
    mobileDoubleClickGesture: typeof mobileDoubleClickGesture;
    mobileDragGesture: typeof mobileDragGesture;
    mobileFlingGesture: typeof mobileFlingGesture;
    mobileLongClickGesture: typeof mobileLongClickGesture;
    mobilePinchCloseGesture: typeof mobilePinchCloseGesture;
    mobilePinchOpenGesture: typeof mobilePinchOpenGesture;
    mobileScroll: typeof mobileScroll;
    mobileScrollBackTo: typeof mobileScrollBackTo;
    mobileScrollGesture: typeof mobileScrollGesture;
    mobileSwipeGesture: typeof mobileSwipeGesture;
    pressKeyCode: typeof pressKeyCode;
    longPressKeyCode: typeof longPressKeyCode;
    mobilePressKey: typeof mobilePressKey;
    mobileType: typeof mobileType;
    doSendKeys: typeof doSendKeys;
    keyevent: typeof keyevent;
    getPageSource: typeof getPageSource;
    getOrientation: typeof getOrientation;
    setOrientation: typeof setOrientation;
    openNotifications: typeof openNotifications;
    suspendChromedriverProxy: any;
    mobileGetDeviceInfo: typeof mobileGetDeviceInfo;
    getClipboard: typeof getClipboard;
    mobileGetClipboard: typeof mobileGetClipboard;
    setClipboard: typeof setClipboard;
    mobileSetClipboard: typeof mobileSetClipboard;
    setUrl: typeof setUrl;
    mobileDeepLink: typeof mobileDeepLink;
    back: typeof back;
    mobileScreenshots: typeof mobileScreenshots;
    mobileViewportScreenshot: typeof mobileViewportScreenshot;
    getScreenshot: typeof getScreenshot;
    getViewportScreenshot: typeof getViewportScreenshot;
    getStatusBarHeight: typeof getStatusBarHeight;
    getDevicePixelRatio: typeof getDevicePixelRatio;
    getDisplayDensity: typeof getDisplayDensity;
    getViewPortRect: typeof getViewPortRect;
    getWindowRect: typeof getWindowRect;
    getWindowSize: typeof getWindowSize;
    mobileViewPortRect: typeof mobileViewPortRect;
}
export { AndroidUiautomator2Driver };
//# sourceMappingURL=driver.d.ts.map