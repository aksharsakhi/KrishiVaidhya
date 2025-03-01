from fastapi import FastAPI
from pydantic import BaseModel
import numpy as np

app = FastAPI()

# Fertilizer Data
fertilizers = {
    "urea": {"N": 46},
    "dap": {"N": 18, "P": 46},
    "mop": {"K": 60},
    "npk 15-15-15": {"N": 15, "P": 15, "K": 15},
    "npk 20-20-20": {"N": 20, "P": 20, "K": 20},
    "npk 10-26-26": {"N": 10, "P": 26, "K": 26},
}

# Conversion for Land Units
conversion_factors = {"hectare": 2.47105, "acre": 1, "gonta": 0.025}

# Request Schema
class FertilizerRequest(BaseModel):
    fertilizer_type: str
    soil_nutrients: dict  # {N: value, P: value, K: value}
    crop_requirements: dict  # {N: value, P: value, K: value}
    land_area: float
    land_unit: str

def convert_to_acres(area, unit):
    """Convert area to acres."""
    return area * conversion_factors.get(unit.lower(), 1)

def calculate_fertilizer_quantity(fertilizer_content, soil_nutrients, crop_needs, land_area, unit):
    """Calculate required fertilizer quantity."""
    land_area_acres = convert_to_acres(land_area, unit)
    total_quantity = 0

    for nutrient, content in fertilizer_content.items():
        if nutrient in crop_needs and nutrient in soil_nutrients:
            required_amount = max(crop_needs[nutrient] - soil_nutrients[nutrient], 0)
            if required_amount > 0:
                total_quantity += (required_amount / (content / 100)) * land_area_acres

    return round(total_quantity, 2)

@app.post("/fertilizer-calculator/")
async def get_fertilizer_recommendation(request: FertilizerRequest):
    """Process user input and return fertilizer recommendation."""
    fert_type = request.fertilizer_type.lower()
    
    if fert_type not in fertilizers:
        return {"error": "Invalid fertilizer type. Choose from: " + ", ".join(fertilizers.keys())}

    quantity = calculate_fertilizer_quantity(
        fertilizers[fert_type], request.soil_nutrients, request.crop_requirements, request.land_area, request.land_unit
    )

    return {
        "fertilizer": fert_type.title(),
        "recommended_quantity": f"{quantity} kg",
        "application_instructions": "Apply evenly over the field and water adequately."
    }
