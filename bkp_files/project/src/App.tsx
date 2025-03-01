import React, { useState, useEffect } from 'react';
import { Plane as Plant, Bug, Thermometer, Droplets, AlertTriangle, MapPin, Leaf, BarChart3, CloudRain } from 'lucide-react';
import { fetchSoilData, predictCropIssues, generateRecommendations } from './services/predictionService';

// Region data with polygon IDs for API calls
const regions = [
  { id: 0, name: "Iowa Demo Field", value: "67b8cae886ec340008b95282" },
  { id: 1, name: "Coimbot", value: "67bda9cddbbadd1baa75b8a8" },
  { id: 2, name: "Himachal Pradesh", value: "67c087eac46b9f3b52dfbbd0" },
  { id: 3, name: "Karnataka", value: "67c08919dbbadd48e275b8d1" },
  { id: 4, name: "West Bengal", value: "67c08a2cfd068c450d8353c2" }
];

// Define prediction result type
interface PredictionResult {
  disease: string;
  riskLevel: string;
  cropAtRisk: string;
  likelyPest: string;
  pestRiskLevel: string;
  recommendations?: string[];
}

function App() {
  const [selectedRegion, setSelectedRegion] = useState<number>(3); // Default to Karnataka
  const [temperature, setTemperature] = useState<number>(28.5);
  const [moisture, setMoisture] = useState<number>(65);
  const [predictions, setPredictions] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [fetchingWeather, setFetchingWeather] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRegion(Number(e.target.value));
    setError(null);
  };

  const fetchCurrentConditions = async () => {
    setFetchingWeather(true);
    setError(null);
    
    try {
      const selectedPolygonId = regions[selectedRegion].value;
      const soilData = await fetchSoilData(selectedPolygonId);
      
      if (soilData) {
        setTemperature(soilData.temperature);
        setMoisture(soilData.moisture);
      } else {
        setError("Unable to fetch current soil conditions. Using default values.");
      }
    } catch (err) {
      setError("Error fetching weather data. Using default values.");
      console.error(err);
    } finally {
      setFetchingWeather(false);
    }
  };

  const handlePredict = () => {
    setLoading(true);
    setError(null);
    
    try {
      // Get the state name from the selected region
      const stateName = regions[selectedRegion].name;
      
      // Use our prediction model
      const result = predictCropIssues(temperature, moisture, stateName);
      
      // Generate recommendations based on predictions
      const recommendations = generateRecommendations(
        result.disease, 
        result.likelyPest, 
        result.cropAtRisk
      );
      
      // Set the predictions with recommendations
      setPredictions({
        ...result,
        recommendations
      });
    } catch (err) {
      setError("Error making prediction. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setPredictions(null);
    setError(null);
  };

  // Fetch soil data when region changes
  useEffect(() => {
    // Don't auto-fetch on initial load to avoid unexpected API calls
    if (selectedRegion !== 3) {
      fetchCurrentConditions();
    }
  }, [selectedRegion]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <header className="bg-green-700 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center space-x-3">
            <Plant className="h-8 w-8" />
            <h1 className="text-2xl font-bold">CropGuard AI</h1>
          </div>
          <p className="mt-2 text-green-100">Predict crop diseases and pests using AI and real-time soil data</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md flex items-start">
            <AlertTriangle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Input Panel */}
          <div className="md:col-span-1 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              <MapPin className="mr-2 h-5 w-5 text-green-600" />
              Select Region
            </h2>
            
            <div className="space-y-6">
              <div>
                <label htmlFor="region" className="block text-sm font-medium text-gray-700 mb-1">
                  Region/Field
                </label>
                <select
                  id="region"
                  value={selectedRegion}
                  onChange={handleRegionChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  {regions.map(region => (
                    <option key={region.id} value={region.id}>
                      {region.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label htmlFor="temperature" className="block text-sm font-medium text-gray-700 flex items-center">
                    <Thermometer className="mr-1 h-4 w-4 text-red-500" />
                    Temperature (°C)
                  </label>
                  <button 
                    onClick={fetchCurrentConditions}
                    disabled={fetchingWeather}
                    className="text-xs text-blue-600 hover:text-blue-800 flex items-center"
                  >
                    {fetchingWeather ? (
                      <span>Loading...</span>
                    ) : (
                      <>
                        <CloudRain className="h-3 w-3 mr-1" />
                        Get Current
                      </>
                    )}
                  </button>
                </div>
                <input
                  type="number"
                  id="temperature"
                  value={temperature}
                  onChange={(e) => setTemperature(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>

              <div>
                <label htmlFor="moisture" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <Droplets className="mr-1 h-4 w-4 text-blue-500" />
                  Soil Moisture (%)
                </label>
                <input
                  type="number"
                  id="moisture"
                  value={moisture}
                  onChange={(e) => setMoisture(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>

              <div className="pt-4">
                <button
                  onClick={handlePredict}
                  disabled={loading}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md shadow transition duration-200 flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      <BarChart3 className="mr-2 h-5 w-5" />
                      Predict
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Results Panel */}
          <div className="md:col-span-2">
            {predictions ? (
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-800">Prediction Results</h2>
                  <button
                    onClick={handleReset}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    Reset
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Disease Prediction */}
                  <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                    <h3 className="font-medium text-green-800 mb-3 flex items-center">
                      <Plant className="mr-2 h-5 w-5 text-green-600" />
                      Disease Prediction
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-500">Predicted Disease</p>
                        <p className="text-lg font-semibold">{predictions.disease}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Risk Level</p>
                        <div className="flex items-center">
                          <span className={`inline-block w-3 h-3 rounded-full mr-2 ${
                            predictions.riskLevel === 'High' ? 'bg-red-500' : 
                            predictions.riskLevel === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'
                          }`}></span>
                          <span className="font-medium">{predictions.riskLevel}</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Crop at Risk</p>
                        <p className="font-medium">{predictions.cropAtRisk}</p>
                      </div>
                    </div>
                  </div>

                  {/* Pest Prediction */}
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <h3 className="font-medium text-blue-800 mb-3 flex items-center">
                      <Bug className="mr-2 h-5 w-5 text-blue-600" />
                      Pest Prediction
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-500">Likely Pest</p>
                        <p className="text-lg font-semibold">{predictions.likelyPest}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Risk Level</p>
                        <div className="flex items-center">
                          <span className={`inline-block w-3 h-3 rounded-full mr-2 ${
                            predictions.pestRiskLevel === 'High' ? 'bg-red-500' : 
                            predictions.pestRiskLevel === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'
                          }`}></span>
                          <span className="font-medium">{predictions.pestRiskLevel}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recommendations */}
                <div className="mt-6 bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                  <h3 className="font-medium text-yellow-800 mb-3 flex items-center">
                    <AlertTriangle className="mr-2 h-5 w-5 text-yellow-600" />
                    Recommendations
                  </h3>
                  <ul className="list-disc pl-5 space-y-1 text-gray-700">
                    {predictions.recommendations?.map((recommendation, index) => (
                      <li key={index}>{recommendation}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-6 h-full flex flex-col items-center justify-center text-center">
                <div className="mb-4">
                  <img 
                    src="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                    alt="Healthy crops" 
                    className="w-64 h-48 object-cover rounded-lg"
                  />
                </div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Ready to Analyze Your Crops</h2>
                <p className="text-gray-600 mb-6 max-w-md">
                  Select your region and adjust soil parameters if needed, then click "Predict" to get disease and pest predictions.
                </p>
                <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Leaf className="mr-1 h-4 w-4 text-green-500" />
                    <span>Disease Detection</span>
                  </div>
                  <div className="flex items-center">
                    <Bug className="mr-1 h-4 w-4 text-blue-500" />
                    <span>Pest Identification</span>
                  </div>
                  <div className="flex items-center">
                    <AlertTriangle className="mr-1 h-4 w-4 text-yellow-500" />
                    <span>Risk Assessment</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Data Visualization Section */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Historical Data</h2>
          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Historical data visualization would appear here</p>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Plant className="h-5 w-5 text-green-400" />
              <span className="font-medium">CropGuard AI</span>
            </div>
            <div className="text-sm text-gray-400">
              © 2025 CropGuard AI. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;