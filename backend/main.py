from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Home Intelligence API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {
        "message": "Home Intelligence API is running!"
    }


@app.get("/api/sensors")
def get_sensors():
    return {
        "temperature": 27.1,
        "humidity": 47,
        "soil_moisture": None
    }