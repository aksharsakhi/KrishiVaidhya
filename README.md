# Krishi Vaidhya

## Overview
Krishi Vaidhya is an AI-powered mobile portal designed to assist farmers by diagnosing crop and livestock diseases, providing treatment recommendations, offering real-time weather forecasts, and facilitating market access. This project aims to empower farmers with actionable insights through advanced AI models, real-time data synchronization, and expert support. Additionally, Krishi Vaidhya leverages weather and soil data to predict disease and pest outbreaks, enabling proactive intervention and minimizing losses.

## Problem Statement
Agriculture in India sustains around 60% of the population, yet farmers face challenges such as:
- Lack of timely disease diagnosis for crops and livestock.
- Limited access to markets and government schemes.
- Inadequate community support for knowledge sharing.

Krishi Vaidhya addresses these issues by offering an AI-driven mobile application with multilingual and voice support, allowing farmers to submit images and descriptions for AI-based diagnosis and expert recommendations.

## Features
### AI-Powered Diagnosis
- Farmers can upload images or descriptions of crop and livestock issues.
- AI scans the image to identify diseases or suggest probable diagnoses.
- Supports regional languages and text-to-speech for accessibility.

### Medicine & Treatment Locator
- Suggests the nearest stores providing required medicines and fertilizers.
- Provides guidance on disease prevention and recovery.

### Expert Assistance & Alerts
- Notifies research institutes and experts about emerging disease outbreaks.
- Enables real-time expert consultation through tele-vet services.

### Direct Benefit Transfer & Marketplace
- Connects farmers with government schemes for financial and technical support.
- Online marketplace for farmers to buy/sell yields and livestock without intermediaries.

### Crop Management Features
- **Weather Forecasting:** Real-time weather updates for optimal farming decisions.
- **Fertilizer Calculator:** Accurate pesticide and fertilizer preparation based on field size.
- **Agriculture Calendar:** Tracks farming activities and disease management in sync with agricultural seasons.

### Livestock Management (Future Enhancements)
- **PashuID System:** Tracks livestock health, disease history, and vaccination schedules.
- **Tele-Vet Pool:** Connects farmers with veterinarians for breeding programs and disease monitoring.
- **Feed Calculator:** Suggests optimized feed plans for livestock.

## Technology Stack
- **Programming Languages:** Python (AI/ML, Backend), JavaScript (Backend APIs)
- **Frontend:** Flutter (Mobile App)
- **Backend:** Node.js (Real-time API management)
- **Database:** Firebase (Real-time sync & authentication), PostgreSQL (Structured data storage)
- **AI/ML:** TensorFlow (Disease diagnosis), OpenCV (Image preprocessing), TFLite (Optimized AI for mobile)
- **Chatbot:** Rasa (Conversational AI), Vosk API (Voice-based support)
- **APIs:** SMAP (Soil data), OpenWeatherMap (Weather forecasts), e-NAM (Market prices), Jitsi (Tele-consultation)
- **Cloud & Hosting:** Firebase Hosting (Mobile & Web backend)

## Installation & Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/Krishi-Vaidhya.git
   ```
2. Install dependencies:
   ```bash
   cd Krishi-Vaidhya
   npm install
   ```
3. Configure API keys for OpenWeatherMap, e-NAM, and other third-party integrations.
4. Start the backend server:
   ```bash
   node server.js
   ```
5. Run the mobile application using Flutter:
   ```bash
   flutter run
   ```

## Challenges & Solutions
### Challenges
- Farmers' hesitation in adopting technology.
- Poor image quality affecting AI diagnosis.
- Difficulty in capturing non-physical diseases (e.g., nutrient deficiencies).
- Risk of misinformation in the online community.

### Solutions
- Intuitive, multilingual, voice-based UI for easy adoption.
- Image upscaling techniques to improve analysis accuracy.
- Text/voice-based inputs to describe symptoms for better AI processing.
- Verified user profiles and active moderation to ensure information reliability.

## Impact & Benefits
- **Early disease detection** for higher yield and healthier livestock.
- **Geo-tracking integration** for real-time weather and soil condition insights.
- **Skill enhancement** through community knowledge sharing.
- **Sustainable farming practices** by optimizing resource usage.
- **Livestock health management** using AI-driven tracking and diagnostics.

## Contributors
Krishi Vaidhya Team - AGRIAI Hackathon 2025
