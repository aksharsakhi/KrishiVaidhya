import { CropSchedule } from '../types';

export const CROP_SCHEDULES: CropSchedule = {
  "potato": [
    { name: "ploughing", daysAfter: 0, requiredConditions: ["Any"] },
    { name: "sowing", daysAfter: 4, requiredConditions: ["Sunny", "Clear"] },
    { name: "watering", daysAfter: 10, requiredConditions: ["Cloudy", "Rain"] },
    { name: "fertilizing", daysAfter: 20, requiredConditions: ["Clear"] },
    { name: "harvesting", daysAfter: 100, requiredConditions: ["Any"] }
  ],
  "corn": [
    { name: "ploughing", daysAfter: 0, requiredConditions: ["Any"] },
    { name: "sowing", daysAfter: 3, requiredConditions: ["Sunny"] },
    { name: "watering", daysAfter: 10, requiredConditions: ["Any"] },
    { name: "fertilizing", daysAfter: 20, requiredConditions: ["Clear"] },
    { name: "harvesting", daysAfter: 90, requiredConditions: ["Any"] }
  ],
  "wheat": [
    { name: "ploughing", daysAfter: 0, requiredConditions: ["Any"] },
    { name: "sowing", daysAfter: 5, requiredConditions: ["Clear"] },
    { name: "watering", daysAfter: 15, requiredConditions: ["Any"] },
    { name: "fertilizing", daysAfter: 25, requiredConditions: ["Clear"] },
    { name: "harvesting", daysAfter: 120, requiredConditions: ["Sunny"] }
  ],
  "rice": [
    { name: "ploughing", daysAfter: 0, requiredConditions: ["Any"] },
    { name: "sowing", daysAfter: 7, requiredConditions: ["Cloudy"] },
    { name: "watering", daysAfter: 14, requiredConditions: ["Any"] },
    { name: "fertilizing", daysAfter: 30, requiredConditions: ["Clear"] },
    { name: "harvesting", daysAfter: 110, requiredConditions: ["Sunny"] }
  ]
};