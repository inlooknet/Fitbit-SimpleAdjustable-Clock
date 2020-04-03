import clock from "clock";
import document from "document";
import * as utils from '../common/utils';
import * as ConfigFile from '../common/configFile';
import * as messaging from "messaging";
import { HeartRateSensor } from "heart-rate";
import { locale } from "user-settings";
import { preferences } from "user-settings";
import { battery } from "power";

//////////////////////////////////////////arc spinssss

const NUM_OF_DEGREES = 360;
const NUM_OF_HOURS = 12;
const NUM_OF_MINUTES = 60;
const NUM_OF_SECONDS = 60;

//fetch UI elements
const arcSeconds = document.getElementById("arcSeconds");
const dElem = document.getElementById("dateText");
const hmElem = document.getElementById("hoursMinutesText");
const sElem = document.getElementById("secondsText");
const hrElem = document.getElementById("heartRateText");
const bElem = document.getElementById("batteryText");
const hearticon = document.getElementById("HeartIconcolor");

// colors
const ARC_COLOR_KEY = 'ARCcolor';
const DATE_COLOR_KEY = 'DATEcolor';
const HM_COLOR_KEY = 'HMcolor';
let ARCcolor, DATEcolor, HMcolor, clockTime;
init();

clock.granularity = "seconds";

// Update current time every second
clock.ontick = (evt) => {
  clockTime = evt.date;
  render(clockTime, ARCcolor, DATEcolor, HMcolor);
  let today = evt.date;
  dElem.text = utils.getWeekDay(today.getDay(),locale)+ " "+ today.getDate() + "." + (today.getMonth()+1) + "." + today.getFullYear();
  dElem.style.fill = DATEcolor
  
  let hours = today.getHours();
  if (preferences.clockDisplay === "12h") {
    // 12h format
    hours = utils.monoDigits(hours % 12 || 12, false);} 
  else {
    // 24h format
    hours = utils.zeroPad(hours);
  }
  let mins = utils.monoDigits(today.getMinutes());
  let secs = utils.monoDigits(today.getSeconds());
  hmElem.text = hours + ':' + mins;
  hmElem.style.fill = HMcolor;
  sElem.text = secs;  
  sElem.style.fill = ARCcolor;
  
 hrElem.text = hrs.heartRate;
 
  bElem.text =  battery.chargeLevel + "%";
  if(battery.chargeLevel >= 75){   bElem.style.fill = "lime";} 
  else if(battery.chargeLevel >= 35) {bElem.style.fill = "yellow"; }
  else{    bElem.style.fill = "red";  }
}

//HeartRateSensor
const hrs = new HeartRateSensor();
hrs.start();


// Update color when a settings message is received
messaging.peerSocket.onmessage = function(evt) {
  if (evt.data.key == ARC_COLOR_KEY) {
    ARCcolor = evt.data.value;
    render(clockTime, ARCcolor);
    ConfigFile.setItem(ARC_COLOR_KEY, ARCcolor)
    ConfigFile.save();
  }
    if (evt.data.key == DATE_COLOR_KEY) {
    DATEcolor = evt.data.value;
    render(clockTime, DATEcolor);
    ConfigFile.setItem(DATE_COLOR_KEY, DATEcolor)
    ConfigFile.save();
  }
    if (evt.data.key == HM_COLOR_KEY) {
    HMcolor = evt.data.value;
    render(clockTime, HMcolor);
    ConfigFile.setItem(HM_COLOR_KEY, HMcolor)
    ConfigFile.save();
  }
}

function init() {  ARCcolor = ARC_COLOR_KEY; 
                     if(ConfigFile.load()) {  let color = ConfigFile.getItem(ARC_COLOR_KEY) 
                        ARCcolor  = color ? color : ARCcolor }
                 DATEcolor = DATE_COLOR_KEY; 
                     if(ConfigFile.load()) {  let color = ConfigFile.getItem(DATE_COLOR_KEY) 
                        DATEcolor  = color ? color : DATEcolor }
                 HMcolor = HM_COLOR_KEY; 
                     if(ConfigFile.load()) {  let color = ConfigFile.getItem(HM_COLOR_KEY) 
                        HMcolor  = color ? color : HMcolor }
                 
}

// you need this in order for the SecondsTick to work & the opacity starts 60% less brighter than where its supposed to be at./// Arc
function render(time, color) {
  let seconds = time.getSeconds();
  arcSeconds.sweepAngle = NUM_OF_DEGREES / NUM_OF_SECONDS * seconds;
  arcSeconds.style.fill = ARCcolor
}
