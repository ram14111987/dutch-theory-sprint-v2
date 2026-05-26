// Maps logical image src paths (as stored in lesson/question JSON) to bundled
// asset URLs. Keeping the registry centralised means JSON files reference a
// short, stable key while the build step still hashes/optimises each asset.

import signsWarningTriangle from './images/signs/warning-triangle.svg';
import signsProhibitoryDisc from './images/signs/prohibitory-disc.svg';
import signsMandatoryBlue from './images/signs/mandatory-blue.svg';
import signsPriorityDiamond from './images/signs/priority-diamond.svg';
import signsGiveWayTriangle from './images/signs/give-way-triangle.svg';
import signsStopOctagon from './images/signs/stop-octagon.svg';
import signsSpeedLimit50 from './images/signs/speed-limit-50.svg';

import hazardScanFarMidNear from './images/hazard-awareness/scan-far-mid-near.svg';
import hazardTwoSecondRule from './images/hazard-awareness/two-second-rule.svg';
import hazardFogLightThresholds from './images/hazard-awareness/fog-light-thresholds.svg';
import hazardBlindSpotCyclist from './images/hazard-awareness/blind-spot-cyclist.svg';
import hazardParkedCarGap from './images/hazard-awareness/parked-car-gap.svg';

const registry = {
  'signs/warning-triangle.svg': signsWarningTriangle,
  'signs/prohibitory-disc.svg': signsProhibitoryDisc,
  'signs/mandatory-blue.svg': signsMandatoryBlue,
  'signs/priority-diamond.svg': signsPriorityDiamond,
  'signs/give-way-triangle.svg': signsGiveWayTriangle,
  'signs/stop-octagon.svg': signsStopOctagon,
  'signs/speed-limit-50.svg': signsSpeedLimit50,
  'hazard-awareness/scan-far-mid-near.svg': hazardScanFarMidNear,
  'hazard-awareness/two-second-rule.svg': hazardTwoSecondRule,
  'hazard-awareness/fog-light-thresholds.svg': hazardFogLightThresholds,
  'hazard-awareness/blind-spot-cyclist.svg': hazardBlindSpotCyclist,
  'hazard-awareness/parked-car-gap.svg': hazardParkedCarGap,
};

export function resolveImageSrc(src) {
  if (!src) return null;
  return registry[src] || null;
}
