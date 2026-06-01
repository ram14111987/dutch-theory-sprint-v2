// Phase 23B — question expansion script
// Run once: node scripts/add-23b-questions.js
// Appends new questions to 6 module question banks.

const fs = require('fs');
const path = require('path');

function load(slug) {
  return JSON.parse(fs.readFileSync(path.join('src/content/questions', slug + '.json'), 'utf8'));
}
function save(slug, arr) {
  fs.writeFileSync(
    path.join('src/content/questions', slug + '.json'),
    JSON.stringify(arr, null, 2) + '\n',
    'utf8'
  );
}

// ── PRIORITY +10 (032–041) ────────────────────────────────────────────────
const newPriority = [
  {
    "id": "priority-032",
    "moduleId": "priority",
    "lessonId": "priority-basic-rules",
    "topicTags": ["right-of-way", "uncontrolled", "intersection"],
    "type": "single",
    "difficulty": "easy",
    "stem": "You approach an uncontrolled crossroads (no signs, no markings). Another vehicle is approaching from your right. Who must give way?",
    "choices": [
      { "id": "a", "text": "The vehicle from the right must give way to you because you arrived first" },
      { "id": "b", "text": "You must give way to the vehicle on your right" },
      { "id": "c", "text": "The larger vehicle always has priority" },
      { "id": "d", "text": "Neither — you both stop and wait for a signal" }
    ],
    "correctChoiceIds": ["b"],
    "explanation": {
      "short": "At an uncontrolled intersection, you must give way to vehicles coming from your right — the default right-has-right-of-way rule applies.",
      "examTip": "Remember: left yields to right at uncontrolled intersections, unless a sign or marking says otherwise."
    }
  },
  {
    "id": "priority-033",
    "moduleId": "priority",
    "lessonId": "priority-intersections",
    "topicTags": ["traffic-lights", "amber", "flashing"],
    "type": "single",
    "difficulty": "medium",
    "stem": "You approach an intersection where the traffic light is flashing amber. What does this mean for you?",
    "choices": [
      { "id": "a", "text": "Treat it as a green light and proceed at normal speed" },
      { "id": "b", "text": "Stop and wait for the light to cycle to green" },
      { "id": "c", "text": "Proceed with caution, yielding to traffic and pedestrians" },
      { "id": "d", "text": "The light is broken — bypass via the hard shoulder" }
    ],
    "correctChoiceIds": ["c"],
    "explanation": {
      "short": "A flashing amber light is a warning signal. You may proceed but must do so with caution, giving way to others already in or crossing the intersection.",
      "examTip": "Flashing amber is common at night or low-traffic periods. Treat it like an uncontrolled intersection — proceed only when safe."
    }
  },
  {
    "id": "priority-034",
    "moduleId": "priority",
    "lessonId": "priority-basic-rules",
    "topicTags": ["priority-road", "turning", "give-way"],
    "type": "single",
    "difficulty": "medium",
    "stem": "You are driving on a priority road (yellow diamond sign) and want to turn right at a junction. A vehicle waiting on the minor road wants to cross. Who has right of way?",
    "choices": [
      { "id": "a", "text": "You — you are on the priority road and retain priority even when turning" },
      { "id": "b", "text": "The other driver — you lose priority the moment you signal to turn" },
      { "id": "c", "text": "Whoever reaches the junction first" },
      { "id": "d", "text": "You must stop and wave the other driver through as a courtesy" }
    ],
    "correctChoiceIds": ["a"],
    "explanation": {
      "short": "A priority road grants right of way at all junctions along it, including while turning. The vehicle on the minor road must continue to wait.",
      "examTip": "Priority road status ends only at a crossed yellow diamond sign. Until then you keep right of way at every junction on that road."
    }
  },
  {
    "id": "priority-035",
    "moduleId": "priority",
    "lessonId": "priority-roundabouts",
    "topicTags": ["roundabout", "signalling", "exit"],
    "type": "single",
    "difficulty": "medium",
    "stem": "When leaving a roundabout at your intended exit, when is the correct moment to signal right?",
    "choices": [
      { "id": "a", "text": "Before you enter the roundabout" },
      { "id": "b", "text": "As soon as you enter the roundabout" },
      { "id": "c", "text": "When you have passed the exit before the one you intend to take" },
      { "id": "d", "text": "It is not necessary to signal when leaving a roundabout" }
    ],
    "correctChoiceIds": ["c"],
    "explanation": {
      "short": "Signal right once you pass the exit before yours, so other drivers and pedestrians know you are leaving at the next one. Signalling too early confuses traffic at other exits.",
      "examTip": "On a roundabout: signal right only when committed to leaving at the next exit — not before entering or immediately after entering."
    }
  },
  {
    "id": "priority-036",
    "moduleId": "priority",
    "lessonId": "priority-intersections",
    "topicTags": ["traffic-lights", "turning", "oncoming"],
    "type": "single",
    "difficulty": "hard",
    "stem": "The traffic light is green for both you and an oncoming driver. You want to turn left; the oncoming driver is going straight ahead. Who must wait?",
    "choices": [
      { "id": "a", "text": "The oncoming driver — they should anticipate your turn" },
      { "id": "b", "text": "You — left-turning vehicles must give way to oncoming straight-ahead traffic" },
      { "id": "c", "text": "Neither — a green light means both can proceed regardless of each other" },
      { "id": "d", "text": "Whoever signals first has priority" }
    ],
    "correctChoiceIds": ["b"],
    "explanation": {
      "short": "Even with a green light, a left-turning driver must yield to oncoming traffic going straight. A green light is a permission to proceed, not absolute priority.",
      "examTip": "Green means you MAY go if it is safe. It does not override right-of-way obligations to oncoming traffic."
    }
  },
  {
    "id": "priority-037",
    "moduleId": "priority",
    "lessonId": "priority-intersections",
    "topicTags": ["intersection", "cyclist", "right-of-way"],
    "type": "single",
    "difficulty": "medium",
    "stem": "You are about to enter an intersection from a side street. A cyclist approaches from your right on the main road. No traffic lights or signs are present. Who has priority?",
    "choices": [
      { "id": "a", "text": "You — cars always have priority over cyclists" },
      { "id": "b", "text": "The cyclist — they are on your right and on the main road" },
      { "id": "c", "text": "The cyclist only if they are moving faster than 10 km/h" },
      { "id": "d", "text": "You — cyclists must give way to motor vehicles at all intersections" }
    ],
    "correctChoiceIds": ["b"],
    "explanation": {
      "short": "Cyclists are full road users with the same right-of-way rules as cars. This cyclist is on your right — you must give way.",
      "examTip": "Cyclists are not automatically subordinate to cars. Apply the same priority rules to them as to any other vehicle."
    }
  },
  {
    "id": "priority-038",
    "moduleId": "priority",
    "lessonId": "priority-special-users",
    "topicTags": ["trams", "intersection", "priority"],
    "type": "single",
    "difficulty": "medium",
    "stem": "You arrive at an unmarked intersection at the same time as a tram coming from your left. Who has right of way?",
    "choices": [
      { "id": "a", "text": "You — the tram is on your left, so you have right of way" },
      { "id": "b", "text": "The tram — trams always have right of way over motor vehicles at intersections" },
      { "id": "c", "text": "Whoever arrived at the intersection first" },
      { "id": "d", "text": "The tram only if it is travelling on tracks set in the middle of the road" }
    ],
    "correctChoiceIds": ["b"],
    "explanation": {
      "short": "Trams always have right of way over motor vehicles at intersections, regardless of which direction they approach from.",
      "examTip": "Trams override the normal right-has-priority rule entirely. If a tram is approaching from any direction, yield."
    }
  },
  {
    "id": "priority-039",
    "moduleId": "priority",
    "lessonId": "priority-roundabouts",
    "topicTags": ["roundabout", "entering", "circulating"],
    "type": "single",
    "difficulty": "hard",
    "stem": "You are already on a Dutch roundabout. Another vehicle is waiting to enter from your right. Who has priority?",
    "choices": [
      { "id": "a", "text": "The vehicle waiting to enter — they are on your right" },
      { "id": "b", "text": "You — vehicles already circulating on the roundabout have priority over entering vehicles" },
      { "id": "c", "text": "The entering vehicle, because roundabouts give priority to traffic from the right" },
      { "id": "d", "text": "It depends on the size of the roundabout" }
    ],
    "correctChoiceIds": ["b"],
    "explanation": {
      "short": "On Dutch roundabouts, vehicles already circulating have priority over those entering — even if the entering vehicle is on your right. Shark-tooth markings at entries confirm who yields.",
      "examTip": "Dutch roundabout rule: circulating traffic has priority. Look for haaientanden (shark teeth) at the entry — they mark the give-way line for entering drivers."
    }
  },
  {
    "id": "priority-040",
    "moduleId": "priority",
    "lessonId": "priority-basic-rules",
    "topicTags": ["right-of-way", "pedestrians", "zebra"],
    "type": "single",
    "difficulty": "easy",
    "stem": "A pedestrian steps onto a zebra crossing as you approach at 40 km/h. You are 25 metres away. What must you do?",
    "choices": [
      { "id": "a", "text": "Sound the horn to warn them, then continue" },
      { "id": "b", "text": "Slow to 30 km/h and pass if they are still on the far half of the crossing" },
      { "id": "c", "text": "Brake and give way — a pedestrian on a zebra crossing has priority" },
      { "id": "d", "text": "Flash your headlights and maintain your speed" }
    ],
    "correctChoiceIds": ["c"],
    "explanation": {
      "short": "A pedestrian who has stepped onto a zebra crossing has priority. You must brake and give way, regardless of which half of the crossing they are on.",
      "examTip": "Dutch law requires you to give way to any pedestrian already on the zebra crossing — there is no exception for the far half."
    }
  },
  {
    "id": "priority-041",
    "moduleId": "priority",
    "lessonId": "priority-intersections",
    "topicTags": ["failure-to-yield", "scenario", "collision-avoidance"],
    "type": "single",
    "difficulty": "hard",
    "stem": "You have right of way at a junction. Another driver clearly fails to give way and enters your path. What should you do?",
    "choices": [
      { "id": "a", "text": "Maintain your speed — you have right of way and the other driver is at fault" },
      { "id": "b", "text": "Brake and be prepared to stop to avoid a collision, even though you have right of way" },
      { "id": "c", "text": "Sound the horn loudly and accelerate to assert your priority" },
      { "id": "d", "text": "Swerve into the oncoming lane to go around them" }
    ],
    "correctChoiceIds": ["b"],
    "explanation": {
      "short": "Having right of way does not give you permission to cause a collision. You must always be prepared to brake and yield to prevent an accident, even when the other driver is at fault.",
      "examTip": "Right of way does not override the duty to prevent harm — this principle appears regularly on the CBR exam."
    }
  }
];

// ── TRAFFIC-RULES-ROAD-POSITION +10 (030–039) ─────────────────────────────
const newTraffic = [
  {
    "id": "traffic-rules-road-position-030",
    "moduleId": "traffic-rules-road-position",
    "lessonId": "road-position-overtaking",
    "topicTags": ["overtaking", "solid-line", "forbidden"],
    "type": "single",
    "difficulty": "medium",
    "stem": "You are behind a slow tractor on a rural road. There is a solid white centre line. The road ahead appears clear for 300 metres. May you overtake?",
    "choices": [
      { "id": "a", "text": "Yes — clear visibility of 300 metres makes it safe to cross a solid line" },
      { "id": "b", "text": "No — a solid centre line means no overtaking, regardless of visibility" },
      { "id": "c", "text": "Yes, if you complete the overtake before the next bend" },
      { "id": "d", "text": "Yes, but only if you use your hazard lights while overtaking" }
    ],
    "correctChoiceIds": ["b"],
    "explanation": {
      "short": "A solid white centre line is a no-overtaking marking. You may not cross it to overtake, no matter how good the visibility looks.",
      "examTip": "Solid lines are placed where sight distance or conditions make crossing dangerous — trust the marking, not your own visual estimate."
    }
  },
  {
    "id": "traffic-rules-road-position-031",
    "moduleId": "traffic-rules-road-position",
    "lessonId": "road-position-special-lanes",
    "topicTags": ["bus-lane", "permitted-vehicles", "private-car"],
    "type": "single",
    "difficulty": "medium",
    "stem": "You are driving a private car and the bus lane beside you is completely empty. Traffic in your lane is queued. May you use the bus lane to bypass the queue?",
    "choices": [
      { "id": "a", "text": "Yes — an empty bus lane may be used by any vehicle" },
      { "id": "b", "text": "Yes, but only if no bus is visible behind you" },
      { "id": "c", "text": "No — a bus lane is reserved for buses, taxis, and emergency vehicles; private cars are not permitted" },
      { "id": "d", "text": "Only if you drive below 30 km/h in the bus lane" }
    ],
    "correctChoiceIds": ["c"],
    "explanation": {
      "short": "Bus lanes are reserved for buses and explicitly permitted vehicles (taxis, emergency services, sometimes cyclists). Private cars are not allowed, even when the lane is empty.",
      "examTip": "Check the blue bus-lane sign carefully — it lists all permitted vehicle types. If your vehicle type is not shown, you may not enter."
    }
  },
  {
    "id": "traffic-rules-road-position-032",
    "moduleId": "traffic-rules-road-position",
    "lessonId": "road-position-lane-choice",
    "topicTags": ["keep-right", "two-lane", "lane-choice"],
    "type": "single",
    "difficulty": "easy",
    "stem": "You are on a two-lane road outside a built-up area. Traffic is light. Which lane must you use when not overtaking?",
    "choices": [
      { "id": "a", "text": "Either lane — both are equally available in light traffic" },
      { "id": "b", "text": "The left (faster) lane, to stay away from roadside hazards" },
      { "id": "c", "text": "The right lane — you must keep right when not overtaking" },
      { "id": "d", "text": "The left lane, so overtaking vehicles can use the right lane" }
    ],
    "correctChoiceIds": ["c"],
    "explanation": {
      "short": "Outside built-up areas on roads with two or more lanes, you must drive in the rightmost lane when not overtaking. This is the keep-right obligation.",
      "examTip": "Left-lane hogging is illegal in the Netherlands and a common CBR topic. Keep right unless actively overtaking."
    }
  },
  {
    "id": "traffic-rules-road-position-033",
    "moduleId": "traffic-rules-road-position",
    "lessonId": "road-position-overtaking",
    "topicTags": ["being-overtaken", "side", "space"],
    "type": "single",
    "difficulty": "medium",
    "stem": "A faster vehicle behind you begins to overtake you on a two-lane road. What should you do?",
    "choices": [
      { "id": "a", "text": "Accelerate to maintain the gap between you and the overtaking vehicle" },
      { "id": "b", "text": "Keep your speed and lane — the overtaking driver must manage the whole manoeuvre" },
      { "id": "c", "text": "Move toward the right side of your lane and slightly reduce speed to help the overtake" },
      { "id": "d", "text": "Brake sharply to let them pass as quickly as possible" }
    ],
    "correctChoiceIds": ["c"],
    "explanation": {
      "short": "When being overtaken, move as far right as safe and marginally reduce speed to give the overtaking vehicle more space and time to complete the manoeuvre.",
      "examTip": "Never accelerate when being overtaken — it is dangerous and deliberately obstructing an overtake can be an offence."
    }
  },
  {
    "id": "traffic-rules-road-position-034",
    "moduleId": "traffic-rules-road-position",
    "lessonId": "road-position-special-lanes",
    "topicTags": ["trams", "tracks", "priority"],
    "type": "single",
    "difficulty": "medium",
    "stem": "You are driving on a road that shares space with tram tracks. The tram behind you is catching up and wants to pass. What should you do?",
    "choices": [
      { "id": "a", "text": "Maintain your speed — the tram must wait behind you" },
      { "id": "b", "text": "Move off the tram tracks as soon as it is safe to do so and let the tram pass" },
      { "id": "c", "text": "Accelerate to stay ahead of the tram" },
      { "id": "d", "text": "Use your hazard lights to warn the tram to slow down" }
    ],
    "correctChoiceIds": ["b"],
    "explanation": {
      "short": "Trams have priority on their tracks and cannot steer around obstacles. Move off the tracks as soon as it is safe and let the tram pass.",
      "examTip": "Never race a tram or expect it to brake for you — trams need much longer distances to stop than cars do."
    }
  },
  {
    "id": "traffic-rules-road-position-035",
    "moduleId": "traffic-rules-road-position",
    "lessonId": "road-position-overtaking",
    "topicTags": ["overtaking", "forbidden", "crest"],
    "type": "single",
    "difficulty": "medium",
    "stem": "You want to overtake a slow cyclist on a country road but you are approaching the brow of a hill with limited forward visibility. May you overtake?",
    "choices": [
      { "id": "a", "text": "Yes — cyclists are slow so there is enough time to overtake before the top" },
      { "id": "b", "text": "Yes, if you do it very quickly before reaching the hilltop" },
      { "id": "c", "text": "No — you must have a clear view ahead before beginning an overtake" },
      { "id": "d", "text": "Yes, by briefly using the oncoming lane" }
    ],
    "correctChoiceIds": ["c"],
    "explanation": {
      "short": "Overtaking when you cannot see far enough ahead is forbidden. The hilltop creates a blind zone — an oncoming vehicle could appear at any moment.",
      "examTip": "Wait until you are past the hilltop and have a long, clear view ahead before overtaking any vehicle, including cyclists."
    }
  },
  {
    "id": "traffic-rules-road-position-036",
    "moduleId": "traffic-rules-road-position",
    "lessonId": "road-position-signalling-merging",
    "topicTags": ["signalling", "lane-change", "mirrors"],
    "type": "single",
    "difficulty": "medium",
    "stem": "Before changing lanes on a motorway, what is the correct sequence of actions?",
    "choices": [
      { "id": "a", "text": "Signal → mirror → blind spot check → move" },
      { "id": "b", "text": "Mirror → blind spot check → signal → move" },
      { "id": "c", "text": "Blind spot check → signal → mirror → move" },
      { "id": "d", "text": "Signal → move → mirror check" }
    ],
    "correctChoiceIds": ["b"],
    "explanation": {
      "short": "The correct sequence is: mirror (check following and adjacent traffic), blind spot (shoulder check), signal (inform others), then move.",
      "examTip": "Signalling before checking your mirrors is a common mistake. Signal only once you are sure the move is safe — not as an announcement that you intend to check."
    }
  },
  {
    "id": "traffic-rules-road-position-037",
    "moduleId": "traffic-rules-road-position",
    "lessonId": "road-position-lane-choice",
    "topicTags": ["motorway", "lane-discipline", "middle-lane"],
    "type": "single",
    "difficulty": "easy",
    "stem": "On a motorway with three lanes, you are cruising in the middle lane. The right lane is empty. What should you do?",
    "choices": [
      { "id": "a", "text": "Stay in the middle lane — it gives you more space on both sides" },
      { "id": "b", "text": "Move to the right lane — you must use the rightmost available lane when not overtaking" },
      { "id": "c", "text": "Move to the left lane to make room for overtakers behind you" },
      { "id": "d", "text": "It is the driver's choice which lane to use on a motorway" }
    ],
    "correctChoiceIds": ["b"],
    "explanation": {
      "short": "The keep-right rule applies on motorways too. When the right lane is clear you must move back to it, even if you plan to overtake again shortly.",
      "examTip": "Sitting in the middle lane of a three-lane motorway when the right is empty is a common and fined offence in the Netherlands."
    }
  },
  {
    "id": "traffic-rules-road-position-038",
    "moduleId": "traffic-rules-road-position",
    "lessonId": "road-position-overtaking",
    "topicTags": ["overtaking", "night", "visibility"],
    "type": "single",
    "difficulty": "hard",
    "stem": "You are driving at night on an unlit rural road and want to overtake. What extra precaution is required compared to daytime?",
    "choices": [
      { "id": "a", "text": "No extra precautions — headlights provide all the visibility you need" },
      { "id": "b", "text": "Flash full-beam headlights at the vehicle ahead before starting" },
      { "id": "c", "text": "Ensure the oncoming lane is visible for a much greater distance, as headlight range is far less than the daylight sight distance needed for an overtake" },
      { "id": "d", "text": "Only overtake if the other driver waves you past" }
    ],
    "correctChoiceIds": ["c"],
    "explanation": {
      "short": "At night your stopping distance is unchanged but you can see much less far ahead. You need a far greater clear distance before overtaking than your headlights may reveal.",
      "examTip": "Night overtaking is one of the most dangerous manoeuvres. If your headlights reach 100 m but your stopping distance is 75 m, an oncoming car at the edge of your beam leaves almost no margin."
    }
  },
  {
    "id": "traffic-rules-road-position-039",
    "moduleId": "traffic-rules-road-position",
    "lessonId": "road-position-special-lanes",
    "topicTags": ["cycle-lane", "solid", "motor-vehicle"],
    "type": "single",
    "difficulty": "easy",
    "stem": "A cycle lane marked with a solid white line runs along the right side of the carriageway. May a car drive in it briefly to reach a parking space?",
    "choices": [
      { "id": "a", "text": "Yes — a cycle lane is not mandatory for cars, so cars may use it" },
      { "id": "b", "text": "Yes, but only for loading and unloading" },
      { "id": "c", "text": "No — a solid-line cycle lane may not be entered by motor vehicles" },
      { "id": "d", "text": "Only if no cyclist is visible in the lane at that moment" }
    ],
    "correctChoiceIds": ["c"],
    "explanation": {
      "short": "A cycle lane bordered by a solid white line is mandatory for cyclists and prohibited for motor vehicles. Only a dashed-line suggestion lane may be crossed.",
      "examTip": "Solid line = mandatory cycle lane, no motor vehicles. Dashed line = suggestion lane, may be crossed with caution."
    }
  }
];

// ── SPEED-STOPPING +10 (023–032) ──────────────────────────────────────────
const newSpeed = [
  {
    "id": "speed-stopping-023",
    "moduleId": "speed-stopping",
    "lessonId": "stopping-distance",
    "topicTags": ["reaction-distance", "speed", "calculation"],
    "type": "single",
    "difficulty": "medium",
    "stem": "Travelling at 50 km/h with a 1-second reaction time, approximately how far does your car travel before you even begin to brake?",
    "choices": [
      { "id": "a", "text": "Approximately 7 metres" },
      { "id": "b", "text": "Approximately 14 metres" },
      { "id": "c", "text": "Approximately 25 metres" },
      { "id": "d", "text": "Approximately 35 metres" }
    ],
    "correctChoiceIds": ["b"],
    "explanation": {
      "short": "At 50 km/h (roughly 14 m/s) you travel about 14 metres in 1 second before your foot reaches the brake.",
      "examTip": "Quick formula: speed in km/h divided by 3.6 gives metres per second. At 50 km/h: 50 ÷ 3.6 ≈ 14 m/s."
    }
  },
  {
    "id": "speed-stopping-024",
    "moduleId": "speed-stopping",
    "lessonId": "stopping-distance",
    "topicTags": ["braking-distance", "speed-squared", "physics"],
    "type": "single",
    "difficulty": "hard",
    "stem": "If your braking distance at 50 km/h is 14 metres on a dry road, approximately what is it at 100 km/h on the same road?",
    "choices": [
      { "id": "a", "text": "About 28 metres — braking distance doubles with speed" },
      { "id": "b", "text": "About 42 metres — braking distance triples with speed" },
      { "id": "c", "text": "About 56 metres — braking distance quadruples when speed doubles" },
      { "id": "d", "text": "About 70 metres — braking distance quintuples with speed" }
    ],
    "correctChoiceIds": ["c"],
    "explanation": {
      "short": "Braking distance increases with the square of speed. Doubling speed from 50 to 100 km/h means 2² = 4 times the braking distance: 14 × 4 = 56 metres.",
      "examTip": "Speed doubled → braking distance quadrupled. This is one of the most important physics principles on the CBR exam."
    }
  },
  {
    "id": "speed-stopping-025",
    "moduleId": "speed-stopping",
    "lessonId": "speed-limits",
    "topicTags": ["woonerf", "shared-space", "speed"],
    "type": "single",
    "difficulty": "easy",
    "stem": "You drive into a street marked with a 'woonerf' (shared residential space) sign. What is the maximum permitted speed?",
    "choices": [
      { "id": "a", "text": "10 km/h" },
      { "id": "b", "text": "15 km/h" },
      { "id": "c", "text": "20 km/h" },
      { "id": "d", "text": "30 km/h" }
    ],
    "correctChoiceIds": ["b"],
    "explanation": {
      "short": "In a woonerf (shared play-street), the maximum speed is 15 km/h — walking pace — because pedestrians, children, and play are expected on the road surface.",
      "examTip": "Woonerf = 15 km/h. Do not confuse with a 30 km/h zone, which is an ordinary residential street, not a shared space."
    }
  },
  {
    "id": "speed-stopping-026",
    "moduleId": "speed-stopping",
    "lessonId": "speed-limits",
    "topicTags": ["motorway", "night", "limit"],
    "type": "single",
    "difficulty": "medium",
    "stem": "On a Dutch motorway with a permanent posted limit of 130 km/h, what is the maximum speed between 19:00 and 06:00?",
    "choices": [
      { "id": "a", "text": "100 km/h — the daytime restriction still applies at night" },
      { "id": "b", "text": "120 km/h — all motorways are capped at 120 at night" },
      { "id": "c", "text": "130 km/h — the posted sign applies outside the daytime restriction hours" },
      { "id": "d", "text": "Unlimited — there is no national cap after 19:00" }
    ],
    "correctChoiceIds": ["c"],
    "explanation": {
      "short": "The 100 km/h restriction runs only from 06:00 to 19:00. Outside those hours the permanent signed limit applies — so 130 km/h on a 130-posted motorway.",
      "examTip": "The 100 km/h rule is a time-of-day restriction, not the road's permanent limit. At night the road reverts to its posted sign."
    }
  },
  {
    "id": "speed-stopping-027",
    "moduleId": "speed-stopping",
    "lessonId": "conditions-and-following",
    "topicTags": ["following-distance", "motorway", "two-second"],
    "type": "single",
    "difficulty": "medium",
    "stem": "On a motorway at 100 km/h in dry conditions, what is the recommended minimum following distance behind the vehicle in front?",
    "choices": [
      { "id": "a", "text": "At least 1 second" },
      { "id": "b", "text": "At least 2 seconds" },
      { "id": "c", "text": "At least 5 seconds" },
      { "id": "d", "text": "At least 10 metres regardless of speed" }
    ],
    "correctChoiceIds": ["b"],
    "explanation": {
      "short": "The 2-second rule gives you enough time to react and brake if the car ahead stops suddenly. Increase to 3 or more seconds in poor conditions or at higher speed.",
      "examTip": "To check your gap: pick a fixed point. When the car ahead passes it, say 'one thousand and one, one thousand and two.' If you reach the point before finishing, you are too close."
    }
  },
  {
    "id": "speed-stopping-028",
    "moduleId": "speed-stopping",
    "lessonId": "conditions-and-following",
    "topicTags": ["fog", "visibility", "speed"],
    "type": "single",
    "difficulty": "medium",
    "stem": "Fog reduces your forward visibility to 40 metres. What is the key speed principle you must apply?",
    "choices": [
      { "id": "a", "text": "Use the posted speed limit — fog lights compensate for reduced visibility" },
      { "id": "b", "text": "Drive at 50 km/h regardless of road type" },
      { "id": "c", "text": "Drive at a speed that allows you to stop safely within your range of vision" },
      { "id": "d", "text": "Reduce your speed by exactly half the posted limit" }
    ],
    "correctChoiceIds": ["c"],
    "explanation": {
      "short": "The rule is simple: if you cannot stop within the distance you can see, you are driving too fast. With 40 m visibility, your total stopping distance must stay under 40 m.",
      "examTip": "At 50 km/h the total stopping distance in good conditions is about 28 m. In thick fog, add wet-road braking and the 40 m sight line — you should be well under 50 km/h."
    }
  },
  {
    "id": "speed-stopping-029",
    "moduleId": "speed-stopping",
    "lessonId": "speed-limits",
    "topicTags": ["advisory-speed", "yellow-sign", "interpretation"],
    "type": "single",
    "difficulty": "medium",
    "stem": "You see a speed sign with a yellow background showing '70'. What does this mean?",
    "choices": [
      { "id": "a", "text": "The legal maximum speed is 70 km/h — you must not exceed it" },
      { "id": "b", "text": "This is an advisory speed for the conditions ahead — a recommendation, not a legal limit" },
      { "id": "c", "text": "This is the minimum speed — you must drive at least 70 km/h" },
      { "id": "d", "text": "This is a zone limit applying to both directions of the road" }
    ],
    "correctChoiceIds": ["b"],
    "explanation": {
      "short": "A yellow-background speed sign is an advisory (aanbevolen snelheid), not a legal maximum. It suggests the conditions ahead — such as a sharp bend — call for that speed or less.",
      "examTip": "White or black background = legal maximum. Yellow background = advice only. You will not be fined for exceeding it, but ignoring it is a safety risk."
    }
  },
  {
    "id": "speed-stopping-030",
    "moduleId": "speed-stopping",
    "lessonId": "speed-limits",
    "topicTags": ["trailer", "motorway", "towing"],
    "type": "single",
    "difficulty": "medium",
    "stem": "You are towing a caravan on a Dutch motorway with a posted limit of 130 km/h. What is your maximum legal speed?",
    "choices": [
      { "id": "a", "text": "130 km/h — the posted limit applies to all vehicles" },
      { "id": "b", "text": "100 km/h — the daytime restriction applies to towing vehicles too" },
      { "id": "c", "text": "80 km/h — trailers cap all road types at 80 km/h" },
      { "id": "d", "text": "90 km/h — the limit for car-and-caravan combinations on motorways" }
    ],
    "correctChoiceIds": ["d"],
    "explanation": {
      "short": "A car towing a caravan or trailer on Dutch motorways is limited to 90 km/h, regardless of the posted sign or the daytime 100 km/h restriction.",
      "examTip": "Car + caravan/trailer = 90 km/h maximum on a motorway. This applies day and night."
    }
  },
  {
    "id": "speed-stopping-031",
    "moduleId": "speed-stopping",
    "lessonId": "conditions-and-following",
    "topicTags": ["wet-road", "stopping-distance", "conditions"],
    "type": "single",
    "difficulty": "medium",
    "stem": "You are driving at 80 km/h on a wet road. How does your total stopping distance compare to the same speed on a dry road?",
    "choices": [
      { "id": "a", "text": "It is the same — ABS eliminates the difference between wet and dry" },
      { "id": "b", "text": "It is roughly the same — rain affects visibility but not braking" },
      { "id": "c", "text": "It is significantly longer — wet roads reduce tyre grip and increase braking distance" },
      { "id": "d", "text": "It is shorter — water cools the tyres and improves grip" }
    ],
    "correctChoiceIds": ["c"],
    "explanation": {
      "short": "Wet surfaces significantly reduce tyre-road friction, meaning braking distance can be 50% or more longer than on a dry road at the same speed.",
      "examTip": "ABS helps prevent wheel lock-up but does not restore grip lost on wet surfaces. Always increase following distance in rain."
    }
  },
  {
    "id": "speed-stopping-032",
    "moduleId": "speed-stopping",
    "lessonId": "stopping-distance",
    "topicTags": ["total-stopping-distance", "scenario", "30-zone"],
    "type": "single",
    "difficulty": "medium",
    "stem": "A child runs onto the road 30 metres ahead and you react immediately. At what approximate maximum speed could you stop in time on a dry road?",
    "choices": [
      { "id": "a", "text": "About 20 km/h" },
      { "id": "b", "text": "About 30 km/h" },
      { "id": "c", "text": "About 50 km/h" },
      { "id": "d", "text": "About 70 km/h" }
    ],
    "correctChoiceIds": ["c"],
    "explanation": {
      "short": "At 50 km/h, the total stopping distance (reaction + braking) is approximately 28–30 metres on a dry road. Any faster and 30 metres is not enough.",
      "examTip": "This is why 30 km/h zones exist near schools — at 30 km/h total stopping distance is around 12–14 m, giving far more margin for unexpected events."
    }
  }
];

// ── HAZARD-AWARENESS +8 (036–043) ─────────────────────────────────────────
const newHazard = [
  {
    "id": "hazard-awareness-036",
    "moduleId": "hazard-awareness",
    "lessonId": "hazard-awareness-vulnerable-users",
    "topicTags": ["children", "parked-cars", "scenario"],
    "type": "single",
    "difficulty": "medium",
    "stem": "You are passing parked cars on a residential street. A ball rolls from between two parked cars into your path. What is the most important hazard to anticipate?",
    "choices": [
      { "id": "a", "text": "The ball itself — steer around it to avoid a puncture" },
      { "id": "b", "text": "A child running into the road after the ball" },
      { "id": "c", "text": "A car door opening from the vehicle the ball came from" },
      { "id": "d", "text": "Oncoming traffic swerving to avoid the ball" }
    ],
    "correctChoiceIds": ["b"],
    "explanation": {
      "short": "Where a ball goes, a child follows. A ball rolling into the road is one of the strongest pre-accident cues — brake immediately and expect a child to appear.",
      "examTip": "Hazard perception is about predicting what comes NEXT, not just reacting to what you can see. Ball = imminent child."
    }
  },
  {
    "id": "hazard-awareness-037",
    "moduleId": "hazard-awareness",
    "lessonId": "hazard-awareness-weather-visibility",
    "topicTags": ["aquaplaning", "wet", "technique"],
    "type": "single",
    "difficulty": "hard",
    "stem": "Your car suddenly begins to aquaplane — the steering feels very light and you lose directional control. What is the correct response?",
    "choices": [
      { "id": "a", "text": "Brake hard immediately to scrub off speed" },
      { "id": "b", "text": "Steer aggressively in the direction you want to go" },
      { "id": "c", "text": "Ease off the accelerator, keep the wheel straight, and let the car slow gradually until the tyres regain grip" },
      { "id": "d", "text": "Steer against the skid and apply light braking" }
    ],
    "correctChoiceIds": ["c"],
    "explanation": {
      "short": "Aquaplaning means your tyres are riding on a water film with no grip. Hard braking or sharp steering inputs make it worse. Gently release the accelerator and hold the wheel straight until speed drops and grip returns.",
      "examTip": "Aquaplaning typically happens above 80 km/h in standing water. The best prevention is to slow down in heavy rain before it occurs."
    }
  },
  {
    "id": "hazard-awareness-038",
    "moduleId": "hazard-awareness",
    "lessonId": "hazard-awareness-weather-visibility",
    "topicTags": ["black-ice", "temperature", "identification"],
    "type": "single",
    "difficulty": "medium",
    "stem": "The outside temperature is −1 °C and the road surface looks dry but has a slight sheen. What hazard should you suspect?",
    "choices": [
      { "id": "a", "text": "Wet road — the sheen is from recent rain" },
      { "id": "b", "text": "Black ice — invisible ice formed when moisture freezes on a cold surface" },
      { "id": "c", "text": "Oil spillage — a common cause of a shiny road surface" },
      { "id": "d", "text": "Sand on the road — a minor hazard at this temperature" }
    ],
    "correctChoiceIds": ["b"],
    "explanation": {
      "short": "A dry-looking but shiny road surface near freezing temperature is a classic sign of black ice (zwart ijs). It is extremely slippery and nearly invisible.",
      "examTip": "Bridges and exposed stretches freeze first. If other drivers are moving unusually slowly or carefully, take the hint and reduce speed."
    }
  },
  {
    "id": "hazard-awareness-039",
    "moduleId": "hazard-awareness",
    "lessonId": "hazard-awareness-reaction-anticipation",
    "topicTags": ["sun-glare", "visibility", "technique"],
    "type": "single",
    "difficulty": "medium",
    "stem": "Low sun is directly in your eyes, making it very difficult to see the road and traffic ahead. What should you do?",
    "choices": [
      { "id": "a", "text": "Drive normally — your reflexes are fast enough to compensate" },
      { "id": "b", "text": "Switch on hazard lights and continue at the same speed" },
      { "id": "c", "text": "Reduce speed, increase following distance, use the sun visor, and be prepared for hazards you may not see in time" },
      { "id": "d", "text": "Drive closer to the car in front so you can follow its tail-lights" }
    ],
    "correctChoiceIds": ["c"],
    "explanation": {
      "short": "Sun glare is a significant hazard. Reduce speed, increase following distance, and use the sun visor. Anticipate hazards you might not see clearly in time.",
      "examTip": "Sun glare at dawn and dusk causes many accidents. Other drivers may be blinded and not see you — be especially cautious at junctions."
    }
  },
  {
    "id": "hazard-awareness-040",
    "moduleId": "hazard-awareness",
    "lessonId": "hazard-awareness-reaction-anticipation",
    "topicTags": ["lorry", "overtaking", "anticipation"],
    "type": "single",
    "difficulty": "hard",
    "stem": "A large lorry ahead begins to signal and moves into the right lane to overtake a slower vehicle. What hazard should you anticipate?",
    "choices": [
      { "id": "a", "text": "Nothing — the lorry has indicated so the manoeuvre is safely declared" },
      { "id": "b", "text": "The lorry may need to brake if the overtake takes longer than expected, causing a sudden slowdown ahead of you" },
      { "id": "c", "text": "Oncoming traffic will move into the lorry lane to make space" },
      { "id": "d", "text": "The lorry load may shift during the lane change" }
    ],
    "correctChoiceIds": ["b"],
    "explanation": {
      "short": "Large lorries accelerate slowly and an overtake can take a long time. If the speed difference is small, the lorry may need to abort and brake suddenly. Increase your following distance now.",
      "examTip": "Lorry overtakes are long-duration hazards. Create space early so you have time to react if the lorry has to abandon the manoeuvre."
    }
  },
  {
    "id": "hazard-awareness-041",
    "moduleId": "hazard-awareness",
    "lessonId": "hazard-awareness-weather-visibility",
    "topicTags": ["rain", "slippery", "first-rain"],
    "type": "single",
    "difficulty": "medium",
    "stem": "It starts to rain after a long dry spell. During the first few minutes of rain, why is the road particularly dangerous?",
    "choices": [
      { "id": "a", "text": "Visibility drops immediately to dangerous levels" },
      { "id": "b", "text": "Water mixes with accumulated oil and rubber dust on the surface, creating an extremely slippery film" },
      { "id": "c", "text": "Car brakes overheat in rain" },
      { "id": "d", "text": "Puddles form that hide potholes" }
    ],
    "correctChoiceIds": ["b"],
    "explanation": {
      "short": "During the first minutes of rain after a dry period, water mixes with oil and tyre dust that built up on the road, forming a slick film — often more slippery than a road that has been wet for a while.",
      "examTip": "The most dangerous wet-road window is the first 10–15 minutes of rain after a dry spell. Many accidents happen exactly then — reduce your speed."
    }
  },
  {
    "id": "hazard-awareness-042",
    "moduleId": "hazard-awareness",
    "lessonId": "hazard-awareness-scanning",
    "topicTags": ["scanning", "side-streets", "emerging"],
    "type": "single",
    "difficulty": "medium",
    "stem": "You are driving through a town at 50 km/h. Parked vans block your view of a side street on the left. What should you do as you approach?",
    "choices": [
      { "id": "a", "text": "Sound the horn to warn anyone in the side street" },
      { "id": "b", "text": "Speed up to clear the blind section quickly" },
      { "id": "c", "text": "Ease off the accelerator, watch for any movement near the gap, and be ready to brake" },
      { "id": "d", "text": "Move to the centre of the road to get a better view" }
    ],
    "correctChoiceIds": ["c"],
    "explanation": {
      "short": "Parked vehicles create blind zones at side streets. Reduce speed, watch for movement or shadows in the gap, and cover the brake — anything could emerge.",
      "examTip": "Urban scan pattern: near, middle, far. Repeat the near-zone scan especially where vision is blocked by vans or buses."
    }
  },
  {
    "id": "hazard-awareness-043",
    "moduleId": "hazard-awareness",
    "lessonId": "hazard-awareness-vulnerable-users",
    "topicTags": ["bus", "pedestrians", "night"],
    "type": "single",
    "difficulty": "medium",
    "stem": "At dusk you drive past a bus stop where a bus has just pulled away. What specific hazard should you anticipate on the road ahead?",
    "choices": [
      { "id": "a", "text": "The bus accelerating and pulling back in front of you" },
      { "id": "b", "text": "Passengers from the bus crossing the road in front of or behind it" },
      { "id": "c", "text": "A second bus approaching from behind" },
      { "id": "d", "text": "Debris left by passengers at the bus stop" }
    ],
    "correctChoiceIds": ["b"],
    "explanation": {
      "short": "Passengers alighting from a bus often cross the road immediately — some in front of, some behind the bus. The bus body blocks your view of these pedestrians.",
      "examTip": "Always reduce speed when passing a stationary or departing bus. The pedestrian hazard exists whether the bus is stopped or just pulling away."
    }
  }
];

// ── PARKING-STOPPING-RULES +8 (025–032) ───────────────────────────────────
const newParking = [
  {
    "id": "parking-stopping-rules-025",
    "moduleId": "parking-stopping-rules",
    "lessonId": "parking-stopping-where-forbidden",
    "topicTags": ["yellow-line", "kerb", "prohibition"],
    "type": "single",
    "difficulty": "easy",
    "stem": "You see a continuous yellow line painted on the kerb of a road. What does this marking mean?",
    "choices": [
      { "id": "a", "text": "Loading and unloading is prohibited here" },
      { "id": "b", "text": "Stopping and parking are prohibited for all vehicles at all times" },
      { "id": "c", "text": "Parking is prohibited, but a brief stop to drop someone off is permitted" },
      { "id": "d", "text": "Parking is restricted to residents only" }
    ],
    "correctChoiceIds": ["b"],
    "explanation": {
      "short": "In the Netherlands, a continuous yellow line on the kerb means stopping and parking are both prohibited at all times.",
      "examTip": "Yellow kerb line = no stopping at all, around the clock. It is a stronger prohibition than a no-parking sign, which allows brief stops."
    }
  },
  {
    "id": "parking-stopping-rules-026",
    "moduleId": "parking-stopping-rules",
    "lessonId": "parking-stopping-where-forbidden",
    "topicTags": ["tram-stop", "distance", "prohibition"],
    "type": "single",
    "difficulty": "medium",
    "stem": "You want to park near a tram stop. The nearest tram stop sign is 10 metres away. Is this allowed?",
    "choices": [
      { "id": "a", "text": "Yes — 10 metres is a sufficient distance from a tram stop" },
      { "id": "b", "text": "No — you must not park within 12 metres of a tram or bus stop sign" },
      { "id": "c", "text": "Yes — distance rules only apply to bus stops, not tram stops" },
      { "id": "d", "text": "Yes, if you display a valid parking disc" }
    ],
    "correctChoiceIds": ["b"],
    "explanation": {
      "short": "You must not park within 12 metres of a tram or bus stop sign. At 10 metres, you are inside the prohibited zone.",
      "examTip": "The 12-metre rule ensures passengers can board and alight safely without obstruction. It applies to both tram and bus stops."
    }
  },
  {
    "id": "parking-stopping-rules-027",
    "moduleId": "parking-stopping-rules",
    "lessonId": "parking-stopping-where-forbidden",
    "topicTags": ["narrow-road", "three-metres", "obstruction"],
    "type": "single",
    "difficulty": "medium",
    "stem": "You want to park on a narrow two-way street. After parking, only 2.5 metres of road remain for other traffic. May you park here?",
    "choices": [
      { "id": "a", "text": "Yes — 2.5 metres is enough for a single car to pass" },
      { "id": "b", "text": "No — parking is forbidden if less than 3 metres of road remains free for traffic" },
      { "id": "c", "text": "Yes, but only if you turn your hazard lights on" },
      { "id": "d", "text": "Yes, as long as a fire truck can still pass" }
    ],
    "correctChoiceIds": ["b"],
    "explanation": {
      "short": "Dutch law requires at least 3 metres of road to remain free for traffic when you park. Leaving only 2.5 metres means you are obstructing the road.",
      "examTip": "3 metres is the minimum clearance for one lane of traffic. Emergency vehicles need even more — do not park where you create an obstruction."
    }
  },
  {
    "id": "parking-stopping-rules-028",
    "moduleId": "parking-stopping-rules",
    "lessonId": "parking-stopping-where-forbidden",
    "topicTags": ["junction", "corner", "visibility"],
    "type": "single",
    "difficulty": "medium",
    "stem": "You want to park your car 4 metres from the corner of a junction. Is this allowed?",
    "choices": [
      { "id": "a", "text": "Yes — there is no minimum distance rule for parking near junctions" },
      { "id": "b", "text": "Yes — only bus stops and pedestrian crossings have distance restrictions" },
      { "id": "c", "text": "No — you must not park within 5 metres of a junction corner" },
      { "id": "d", "text": "Only if no no-parking signs are visible near the junction" }
    ],
    "correctChoiceIds": ["c"],
    "explanation": {
      "short": "Parking is forbidden within 5 metres of a junction corner. At 4 metres you are inside this prohibited zone — parking here obstructs sight lines for all road users.",
      "examTip": "The 5-metre junction rule protects visibility for drivers approaching from any direction. It applies automatically, even without a sign."
    }
  },
  {
    "id": "parking-stopping-rules-029",
    "moduleId": "parking-stopping-rules",
    "lessonId": "parking-stopping-special-spaces",
    "topicTags": ["loading-zone", "private-car", "restriction"],
    "type": "single",
    "difficulty": "easy",
    "stem": "A parking space is marked 'laden en lossen' (loading and unloading). You want to park your private car here for 30 minutes to go shopping. Is this allowed?",
    "choices": [
      { "id": "a", "text": "Yes — 30 minutes is short enough for a loading zone" },
      { "id": "b", "text": "Yes, if no goods vehicle is waiting to use the space" },
      { "id": "c", "text": "No — loading zones are only for the active transfer of goods, not for general parking" },
      { "id": "d", "text": "Only if you display a parking disc showing your arrival time" }
    ],
    "correctChoiceIds": ["c"],
    "explanation": {
      "short": "A 'laden en lossen' bay is reserved for the active loading or unloading of goods. Using it to go shopping — even briefly — is not a permitted use.",
      "examTip": "If you are actively transferring packages or goods between your vehicle and a building, you may use the bay. Shopping on foot does not count as loading."
    }
  },
  {
    "id": "parking-stopping-rules-030",
    "moduleId": "parking-stopping-rules",
    "lessonId": "parking-stopping-parking-position",
    "topicTags": ["hill", "wheels", "handbrake"],
    "type": "single",
    "difficulty": "medium",
    "stem": "You park facing downhill with a kerb on your right side. Which way should you turn your front wheels before getting out?",
    "choices": [
      { "id": "a", "text": "Left — away from the kerb — so the car turns away from traffic if it rolls" },
      { "id": "b", "text": "Right — into the kerb — so the front wheel catches the kerb if the car rolls forward" },
      { "id": "c", "text": "Straight ahead — turning them makes the steering unnecessarily heavy" },
      { "id": "d", "text": "It does not matter as long as the handbrake is fully applied" }
    ],
    "correctChoiceIds": ["b"],
    "explanation": {
      "short": "Facing downhill with a kerb to the right: turn wheels right (toward the kerb). If the car rolls forward, the right-front wheel catches the kerb and stops the vehicle.",
      "examTip": "Simple rule — downhill with kerb: wheels INTO the kerb. Uphill with kerb: wheels AWAY from the kerb. No kerb: wheels toward the road edge in both cases."
    }
  },
  {
    "id": "parking-stopping-rules-031",
    "moduleId": "parking-stopping-rules",
    "lessonId": "parking-stopping-where-forbidden",
    "topicTags": ["motorway", "hard-shoulder", "breakdown"],
    "type": "single",
    "difficulty": "medium",
    "stem": "Your car breaks down and you must stop on the motorway hard shoulder. What is the most important first action after stopping?",
    "choices": [
      { "id": "a", "text": "Phone your breakdown service and wait inside the car for help" },
      { "id": "b", "text": "Switch on hazard lights immediately, then get all occupants out of the car and behind the crash barrier" },
      { "id": "c", "text": "Stand behind the car to wave traffic past" },
      { "id": "d", "text": "Place the warning triangle 1 metre behind the car" }
    ],
    "correctChoiceIds": ["b"],
    "explanation": {
      "short": "Hazard lights first, then get everyone out of the car and behind the safety barrier as quickly as possible. The hard shoulder is extremely dangerous — a drifting vehicle can hit a stationary car in seconds.",
      "examTip": "Hard shoulder priority order: hazard lights → occupants behind barrier → warning triangle (at least 50 m back) → phone for help. Never stand between the car and moving traffic."
    }
  },
  {
    "id": "parking-stopping-rules-032",
    "moduleId": "parking-stopping-rules",
    "lessonId": "parking-stopping-where-forbidden",
    "topicTags": ["bus-stop", "brief-stop", "prohibition"],
    "type": "single",
    "difficulty": "hard",
    "stem": "You want to drop a passenger directly in front of a marked bus stop bay. No bus is currently present. Is a very brief stop of 30 seconds permitted?",
    "choices": [
      { "id": "a", "text": "Yes — dropping someone off is not parking, so it is allowed anywhere" },
      { "id": "b", "text": "Yes, but only outside bus operating hours" },
      { "id": "c", "text": "No — stopping in a marked bus stop bay is prohibited for non-buses regardless of duration" },
      { "id": "d", "text": "Only if another person stays in the car to move it immediately if a bus approaches" }
    ],
    "correctChoiceIds": ["c"],
    "explanation": {
      "short": "A marked bus stop bay is a no-stopping zone for all non-bus vehicles at all times. Even a 30-second drop-off is not permitted — stop elsewhere.",
      "examTip": "The distinction between stopping and parking matters in many places, but not at bus stop bays — both are forbidden there."
    }
  }
];

// ── SPECIAL-USERS +6 (025–030) ────────────────────────────────────────────
const newSpecial = [
  {
    "id": "special-users-025",
    "moduleId": "special-users",
    "lessonId": "special-users-cyclists-mopeds",
    "topicTags": ["snorfiets", "cycle-path", "speed"],
    "type": "single",
    "difficulty": "medium",
    "stem": "A snorfiets (blue licence plate, maximum 25 km/h) reaches a stretch of road that has a cycle path alongside it. What must the rider do?",
    "choices": [
      { "id": "a", "text": "Use the carriageway, because all mopeds are motor vehicles and must use the road" },
      { "id": "b", "text": "Use the cycle path, because snorfietsen must use the cycle path where one is available" },
      { "id": "c", "text": "Use either — the rider may choose whichever is more convenient" },
      { "id": "d", "text": "Use the cycle path only if a speed sign shows less than 30 km/h" }
    ],
    "correctChoiceIds": ["b"],
    "explanation": {
      "short": "In the Netherlands, snorfietsen (blue plate, max 25 km/h) must use the cycle path where one is available — they may not use the carriageway.",
      "examTip": "Snorfiets (blue plate) = cycle path. Bromfiets (yellow plate, max 45 km/h) = carriageway. The plate colour tells you the rule."
    }
  },
  {
    "id": "special-users-026",
    "moduleId": "special-users",
    "lessonId": "special-users-cyclists-mopeds",
    "topicTags": ["cyclist", "roundabout", "priority"],
    "type": "single",
    "difficulty": "hard",
    "stem": "A cyclist is already on a Dutch roundabout crossing the exit you want to use to leave. Who has priority?",
    "choices": [
      { "id": "a", "text": "You — you are in a car and leaving the roundabout" },
      { "id": "b", "text": "The cyclist — they are already on the roundabout and have priority over exiting vehicles" },
      { "id": "c", "text": "You — cars always have priority over cyclists on roundabouts" },
      { "id": "d", "text": "Whoever reaches the exit road first" }
    ],
    "correctChoiceIds": ["b"],
    "explanation": {
      "short": "A cyclist circulating on a roundabout has priority over a car leaving it. The give-way markings at roundabout exits confirm this — yield to all circulating traffic, including cyclists.",
      "examTip": "On many modern Dutch roundabouts, cycle paths cross each exit. Where a cycle path crosses your exit, the cyclist on that path also has priority."
    }
  },
  {
    "id": "special-users-027",
    "moduleId": "special-users",
    "lessonId": "special-users-cyclists-mopeds",
    "topicTags": ["horse", "passing-distance", "speed"],
    "type": "single",
    "difficulty": "medium",
    "stem": "You are on a country road and want to pass a horse and rider. The rider signals you to wait. What should you do?",
    "choices": [
      { "id": "a", "text": "Sound the horn gently to warn the horse you are there" },
      { "id": "b", "text": "Pass quickly to minimise the time the horse is near traffic" },
      { "id": "c", "text": "Wait until the rider signals it is safe to pass, then pass slowly giving as much space as possible" },
      { "id": "d", "text": "Move to the centre of the road and pass at 30 km/h" }
    ],
    "correctChoiceIds": ["c"],
    "explanation": {
      "short": "Horses can spook suddenly from engine noise or quick movements. Always wait for the rider's signal, then pass very slowly — at walking pace if needed — with as much lateral space as possible.",
      "examTip": "Never sound your horn near a horse. Slow, quiet, and wide is the rule. A startled horse can cause serious injury to both rider and driver."
    }
  },
  {
    "id": "special-users-028",
    "moduleId": "special-users",
    "lessonId": "special-users-trams-buses-rail",
    "topicTags": ["tram", "intersection", "priority"],
    "type": "single",
    "difficulty": "medium",
    "stem": "You arrive at an intersection at the same time as a tram coming from your left. There are no lights or signs. Who must yield?",
    "choices": [
      { "id": "a", "text": "The tram — it is on your left, so you have right of way" },
      { "id": "b", "text": "You — trams always have priority over motor vehicles at intersections" },
      { "id": "c", "text": "Whoever arrived at the intersection first" },
      { "id": "d", "text": "The tram, if it is moving faster than you are" }
    ],
    "correctChoiceIds": ["b"],
    "explanation": {
      "short": "Trams have priority over all motor vehicles at intersections, regardless of which direction they approach from. This rule overrides the normal right-of-way principle.",
      "examTip": "Do not apply the right-has-priority rule to trams — trams always win at intersections."
    }
  },
  {
    "id": "special-users-029",
    "moduleId": "special-users",
    "lessonId": "special-users-pedestrians-crossings",
    "topicTags": ["pedestrian", "pram", "zebra"],
    "type": "single",
    "difficulty": "easy",
    "stem": "A person pushing a pram is waiting at a zebra crossing and is about to step onto the road. Are they entitled to the same right of way as any other pedestrian?",
    "choices": [
      { "id": "a", "text": "No — only walking pedestrians have zebra-crossing rights" },
      { "id": "b", "text": "No — a pram counts as a vehicle" },
      { "id": "c", "text": "Yes — a person pushing a pram is a pedestrian and has full right of way at a zebra crossing" },
      { "id": "d", "text": "Only if the pram is not wider than 80 cm" }
    ],
    "correctChoiceIds": ["c"],
    "explanation": {
      "short": "A person pushing a pram, wheelchair, or mobility device is classified as a pedestrian. They have the same right of way at a zebra crossing as anyone on foot.",
      "examTip": "Wheelchair users, people with pushchairs, and those using walking aids all count as pedestrians for right-of-way purposes."
    }
  },
  {
    "id": "special-users-030",
    "moduleId": "special-users",
    "lessonId": "special-users-cyclists-mopeds",
    "topicTags": ["cyclist", "blind-spot", "right-turn"],
    "type": "single",
    "difficulty": "hard",
    "stem": "You indicate to turn right. A cyclist is in the cycle lane to your right, travelling straight on at the same speed. You cannot see them in your mirrors. What should you do?",
    "choices": [
      { "id": "a", "text": "Turn right — your indicator is on and the cyclist must yield to a turning vehicle" },
      { "id": "b", "text": "Check your right blind spot, let the cyclist pass, then turn" },
      { "id": "c", "text": "Accelerate slightly to turn before the cyclist draws level" },
      { "id": "d", "text": "Sound the horn so the cyclist knows you are turning" }
    ],
    "correctChoiceIds": ["b"],
    "explanation": {
      "short": "A cyclist going straight on in a cycle lane always has priority over a car turning right. Check the right blind spot, confirm the cyclist has passed, and only then turn.",
      "examTip": "The right hook — turning right across an unseen cyclist — is one of the most common fatal cycling accidents. Always check the right blind spot last, immediately before turning."
    }
  }
];

// ── WRITE ALL FILES ────────────────────────────────────────────────────────
const modules = [
  { slug: 'priority', additions: newPriority },
  { slug: 'traffic-rules-road-position', additions: newTraffic },
  { slug: 'speed-stopping', additions: newSpeed },
  { slug: 'hazard-awareness', additions: newHazard },
  { slug: 'parking-stopping-rules', additions: newParking },
  { slug: 'special-users', additions: newSpecial },
];

for (const { slug, additions } of modules) {
  const existing = load(slug);
  const updated = [...existing, ...additions];
  save(slug, updated);
  console.log(`${slug}: ${existing.length} -> ${updated.length} (+${additions.length})`);
}
console.log('Done.');
