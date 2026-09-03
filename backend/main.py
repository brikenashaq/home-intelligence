import os
from datetime import timezone
from zoneinfo import ZoneInfo

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from influxdb_client_3 import InfluxDBClient3, Point

load_dotenv()


# --------------------------------------------------
# Convert InfluxDB UTC time to local time
# --------------------------------------------------

def format_local_time(timestamp):
    if timestamp is None:
        return None

    if timestamp.tzinfo is None:
        timestamp = timestamp.replace(tzinfo=timezone.utc)

    local_time = timestamp.astimezone(ZoneInfo("Europe/Skopje"))

    return local_time.isoformat()


app = FastAPI(title="Home Intelligence API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --------------------------------------------------
# InfluxDB connection
# --------------------------------------------------

influx_client = InfluxDBClient3(
    host=os.getenv("INFLUXDB_HOST"),
    token=os.getenv("INFLUXDB_TOKEN"),
    database=os.getenv("INFLUXDB_DATABASE"),
)


# --------------------------------------------------
# Root
# --------------------------------------------------

@app.get("/")
def root():
    return {
        "message": "Home Intelligence API is running!"
    }


# --------------------------------------------------
# GET latest sensor reading
# --------------------------------------------------

@app.get("/api/sensors")
def get_sensors():

    query = """
        SELECT temperature, humidity, water_detected, time
        FROM home_environment
        ORDER BY time DESC
        LIMIT 1
    """

    table = influx_client.query(
        query=query,
        language="sql"
    )

    if table.num_rows == 0:
        return {
            "temperature": None,
            "humidity": None,
            "water_detected": None,
            "timestamp": None
        }

    row = table.to_pylist()[0]

    return {
        "temperature": row["temperature"],
        "humidity": row["humidity"],
        "water_detected": row["water_detected"],
        "timestamp": format_local_time(row["time"])
    }


# --------------------------------------------------
# GET sensor history
# --------------------------------------------------

@app.get("/api/sensors/history")
def get_sensor_history():

    query = """
        SELECT temperature, humidity, water_detected, time
        FROM home_environment
        WHERE time >= date_trunc('day', now())
        ORDER BY time ASC
    """

    table = influx_client.query(
        query=query,
        language="sql"
    )

    if table.num_rows == 0:
        return []

    rows = table.to_pylist()

    return [
        {
            "temperature": row["temperature"],
            "humidity": row["humidity"],
            "water_detected": row["water_detected"],
            "timestamp": format_local_time(row["time"])
        }
        for row in rows
    ]


# --------------------------------------------------
# Sensor data model
# --------------------------------------------------

class SensorData(BaseModel):
    temperature: float
    humidity: float
    water_detected: bool


# --------------------------------------------------
# POST sensor data
# --------------------------------------------------

@app.post("/api/sensors")
def receive_sensor_data(data: SensorData):

    point = (
        Point("home_environment")
        .tag("room", "living_room")
        .tag("device", "esp32_01")
        .field("temperature", data.temperature)
        .field("humidity", data.humidity)
        .field("water_detected", data.water_detected)
    )

    influx_client.write(record=point)

    return {
        "message": "Sensor data saved!",
        "temperature": data.temperature,
        "humidity": data.humidity,
        "water_detected": data.water_detected
    }