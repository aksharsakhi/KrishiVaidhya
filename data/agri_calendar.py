import tkinter as tk
from tkinter import messagebox
from datetime import datetime, timedelta
from plyer import notification  
import requests
from googleapiclient.discovery import build
from google.oauth2 import service_account

# OpenWeather API settings
API_KEY = "62b0e326b8d045d48be103659252002"  
LOCATION = "Jind,Haryana,India"
DAYS = 7  # Number of forecast days

# Google Calendar API setup
SERVICE_ACCOUNT_FILE = "/Users/nishanthsgowda/Desktop/KV/agri-calendar-8856d677f47b.json"

CALENDAR_ID = "nishanthsg38@gmail.com"

SCOPES = ["https://www.googleapis.com/auth/calendar"]
credentials = service_account.Credentials.from_service_account_file(SERVICE_ACCOUNT_FILE, scopes=SCOPES)
service = build("calendar", "v3", credentials=credentials)

# Crop weather-based schedule conditions
CROP_SCHEDULES = {
    "potato": {
        "ploughing": 0, 
        "sowing": {"days_after": 4, "required": ["Sunny", "Clear"]},  
        "watering": {"days_after": 10, "required": ["Cloudy", "Rain"]}, 
        "fertilizing": {"days_after": 20, "required": ["Clear"]},  
        "harvesting": {"days_after": 100, "required": ["Any"]}  
    },
    "corn": {
        "ploughing": 0,
        "sowing": {"days_after": 3, "required": ["Sunny"]},
        "watering": {"days_after": 10, "required": ["Any"]},
        "fertilizing": {"days_after": 20, "required": ["Clear"]},
        "harvesting": {"days_after": 90, "required": ["Any"]}
    }
}

def get_weather_forecast():
    """Fetch 7-day weather forecast from API."""
    URL = f"https://api.weatherapi.com/v1/forecast.json?key={API_KEY}&q={LOCATION}&days={DAYS}"
    response = requests.get(URL)

    if response.status_code == 200:
        data = response.json()
        return {day['date']: day['day']['condition']['text'] for day in data['forecast']['forecastday']}
    else:
        return None  

def find_next_suitable_day(start_date, required_conditions, weather_data):
    """Find the next available date with suitable weather."""
    for i in range(7):  
        check_date = (start_date + timedelta(days=i)).strftime('%Y-%m-%d')
        weather_condition = weather_data.get(check_date, "No data")
        
        if "Any" in required_conditions or weather_condition in required_conditions:
            return datetime.strptime(check_date, "%Y-%m-%d")
    
    return start_date  

def get_adjusted_crop_schedule(crop_name, ploughing_date):
    crop_name = crop_name.lower()
    if crop_name not in CROP_SCHEDULES:
        return "Crop schedule not available!", {}

    schedule = CROP_SCHEDULES[crop_name]
    weather_data = get_weather_forecast()

    if not weather_data:
        return "Weather data unavailable. Default schedule applied.", {}

    base_date = datetime.strptime(ploughing_date, "%Y-%m-%d")
    adjusted_dates = {"ploughing": base_date}

    # Adjust other dates based on weather
    for task, details in schedule.items():
        if task == "ploughing":
            continue

        task_start_date = adjusted_dates["ploughing"] + timedelta(days=details["days_after"])
        adjusted_dates[task] = find_next_suitable_day(task_start_date, details["required"], weather_data)

    schedule_text = f"📅 **Adjusted Schedule for {crop_name.capitalize()}**:\n"
    for task, date in adjusted_dates.items():
        schedule_text += f"✅ {task.capitalize()}: {date.strftime('%Y-%m-%d')}\n"

    return schedule_text, adjusted_dates

def create_google_calendar_event(task, date):
    """Add an event to Google Calendar."""
    event = {
        "summary": f"🌱 {task.capitalize()} for Crop",
        "description": f"Reminder for {task} on {date.strftime('%Y-%m-%d')}",
        "start": {"date": date.strftime('%Y-%m-%d')},
        "end": {"date": (date + timedelta(days=1)).strftime('%Y-%m-%d')},
    }
    try:
        event_result = service.events().insert(calendarId=CALENDAR_ID, body=event).execute()
        print(f"Event created: {event_result.get('htmlLink')}")
    except Exception as e:
        print(f"Error adding event: {str(e)}")

def display_schedule():
    crop_name = crop_entry.get().strip()
    ploughing_date = date_entry.get().strip()

    try:
        schedule_text, schedule_dates = get_adjusted_crop_schedule(crop_name, ploughing_date)
        messagebox.showinfo("Adjusted Crop Schedule", schedule_text)

        for task, date in schedule_dates.items():
            send_notification(task, date)
            create_google_calendar_event(task, date)  # Add event to Google Calendar
    
    except ValueError:
        messagebox.showerror("Error", "Please enter a valid date in YYYY-MM-DD format.")

def send_notification(task, date):
    """Send notifications for farming tasks."""
    notification.notify(
        title="🌿 Agriculture Reminder",
        message=f"Time for {task} on {date.strftime('%Y-%m-%d')}",
        timeout=5
    )

# UI Setup
root = tk.Tk()
root.title("Krishi Vaidhya - Smart Crop Calendar")
root.configure(bg="#e5f5e0")  

tk.Label(root, text="Enter Crop Name:", bg="#3a7d44", fg="white", font=("Arial", 12)).grid(row=0, column=0, padx=10, pady=5)
crop_entry = tk.Entry(root, bg="#fff5e1", font=("Arial", 12))
crop_entry.grid(row=0, column=1, padx=10, pady=5)

tk.Label(root, text="Enter Ploughing Date (YYYY-MM-DD):", bg="#8f4f1a", fg="white", font=("Arial", 12)).grid(row=1, column=0, padx=10, pady=5)
date_entry = tk.Entry(root, bg="#fff5e1", font=("Arial", 12))
date_entry.grid(row=1, column=1, padx=10, pady=5)

submit_btn = tk.Button(root, text="Get Adjusted Schedule", command=display_schedule, bg="#ffa500", fg="white", font=("Arial", 12, "bold"))
submit_btn.grid(row=2, column=0, columnspan=2, pady=10)

root.mainloop()
