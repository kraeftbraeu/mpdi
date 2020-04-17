const isTest = false;
const prodPath = "backend/";

export const loadSendersUrl = isTest ? "mock/load.json"           : prodPath + "api.php?do=load";
export const loadStatusUrl  = isTest ? "mock/status.json"         : prodPath + "api.php?do=status";
export const setVolumeUrl   = isTest ? "mock/status.json?volume=" : prodPath + "api.php?do=volume&volume=";
export const playUrl        = isTest ? "mock/status.json?index="  : prodPath + "api.php?do=play&index=";
export const stopUrl        = isTest ? "mock/status.json"         : prodPath + "api.php?do=stop";