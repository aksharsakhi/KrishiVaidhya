// This service simulates the functionality of the Python prediction model
// in a JavaScript environment

// Mock dataset to simulate the trained model's behavior
const cropData = [
  {
    state: "Karnataka",
    temperature: 28.5,
    moisture: 65,
    disease: "Leaf Rust",
    riskLevel: "High",
    crop: "Wheat",
    pest: "Aphids",
    pestRiskLevel: "Medium"
  },
  {
    state: "Karnataka",
    temperature: 30,
    moisture: 70,
    disease: "Blast",
    riskLevel: "Medium",
    crop: "Rice",
    pest: "Stem Borer",
    pestRiskLevel: "High"
  },
  {
    state: "Himachal Pradesh",
    temperature: 22,
    moisture: 55,
    disease: "Powdery Mildew",
    riskLevel: "Medium",
    crop: "Apple",
    pest: "Mites",
    pestRiskLevel: "Low"
  },
  {
    state: "Iowa Demo Field",
    temperature: 25,
    moisture: 60,
    disease: "Corn Smut",
    riskLevel: "Medium",
    crop: "Corn",
    pest: "Corn Rootworm",
    pestRiskLevel: "High"
  },
  {
    state: "West Bengal",
    temperature: 32,
    moisture: 75,
    disease: "Bacterial Leaf Blight",
    riskLevel: "High",
    crop: "Rice",
    pest: "Brown Planthopper",
    pestRiskLevel: "High"
  }
];

// Function to fetch soil data from API
export const fetchSoilData = async (polygonId: string): Promise<{ temperature: number, moisture: number } | null> => {
  const apiKey = "1070ac6b2ac1acc66c1ef1538c2e72a9";
  const url = `http://api.agromonitoring.com/agro/1.0/soil?polygon_id=${polygonId}&appid=${apiKey}`;

  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    const data = await response.json();
    
    // Extract temperature and moisture
    const tempKelvin = data.t0; // Use "t0" for top layer temp
    const moisture = data.moisture;
    
    if (tempKelvin === undefined || moisture === undefined) {
      console.error("Missing values in API response");
      return null;
    }
    
    // Convert temperature from Kelvin to Celsius
    const tempCelsius = tempKelvin - 273.15;
    console.log(`Parsed Data - Temperature: ${tempCelsius.toFixed(2)}°C, Moisture: ${(moisture * 100).toFixed(2)}%`);
    
    return {
      temperature: parseFloat(tempCelsius.toFixed(1)),
      moisture: parseFloat((moisture * 100).toFixed(1))
    };
  } catch (error) {
    console.error("Error fetching soil data:", error);
    return null;
  }
};

// Simple distance function to find the closest match in our dataset
const calculateDistance = (
  temp1: number, 
  moisture1: number, 
  state1: string,
  temp2: number, 
  moisture2: number, 
  state2: string
): number => {
  // State match is important, so we give it a high weight
  const stateMatch = state1 === state2 ? 0 : 10;
  
  // Calculate Euclidean distance for numerical features
  const tempDiff = Math.abs(temp1 - temp2);
  const moistureDiff = Math.abs(moisture1 - moisture2);
  
  return Math.sqrt(tempDiff * tempDiff + moistureDiff * moistureDiff) + stateMatch;
};

// Function to predict disease and pest based on input parameters
export const predictCropIssues = (
  temperature: number, 
  moisture: number, 
  state: string
): {
  disease: string;
  riskLevel: string;
  cropAtRisk: string;
  likelyPest: string;
  pestRiskLevel: string;
} => {
  // Find the closest match in our dataset
  let closestMatch = cropData[0];
  let minDistance = calculateDistance(
    temperature, 
    moisture, 
    state,
    cropData[0].temperature, 
    cropData[0].moisture, 
    cropData[0].state
  );
  
  for (let i = 1; i < cropData.length; i++) {
    const distance = calculateDistance(
      temperature, 
      moisture, 
      state,
      cropData[i].temperature, 
      cropData[i].moisture, 
      cropData[i].state
    );
    
    if (distance < minDistance) {
      minDistance = distance;
      closestMatch = cropData[i];
    }
  }
  
  // Adjust risk levels based on how far the input is from our closest match
  // This simulates the confidence of our prediction
  let riskAdjustment = "Medium";
  if (minDistance < 2) {
    riskAdjustment = closestMatch.riskLevel;
  } else if (minDistance > 10) {
    riskAdjustment = "Low";
  }
  
  // Return prediction results
  return {
    disease: closestMatch.disease,
    riskLevel: riskAdjustment,
    cropAtRisk: closestMatch.crop,
    likelyPest: closestMatch.pest,
    pestRiskLevel: closestMatch.pestRiskLevel
  };
};

// Function to generate recommendations based on predictions
export const generateRecommendations = (
  disease: string, 
  pest: string, 
  crop: string
): string[] => {
  const recommendations = [
    `Monitor fields regularly for early signs of ${disease}`,
    `Consider preventative fungicide application for ${crop}`,
    `Install ${pest} traps around field perimeters`,
    `Consult with local agricultural extension for specific treatment options`
  ];
  
  // Add disease-specific recommendations
  if (disease.includes("Rust") || disease.includes("Mildew")) {
    recommendations.push(`Apply fungicide treatments specifically designed for ${disease}`);
  } else if (disease.includes("Blight") || disease.includes("Bacterial")) {
    recommendations.push(`Consider copper-based bactericides for ${disease} management`);
  }
  
  // Add pest-specific recommendations
  if (pest.includes("Aphid") || pest.includes("Mite")) {
    recommendations.push(`Consider releasing beneficial insects like ladybugs to control ${pest}`);
  } else if (pest.includes("Borer") || pest.includes("worm")) {
    recommendations.push(`Implement crop rotation to break the ${pest} lifecycle`);
  }
  
  return recommendations;
};