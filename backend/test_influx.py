import os
from dotenv import load_dotenv
from influxdb_client_3 import InfluxDBClient3, Point

load_dotenv()

client = InfluxDBClient3(
    host=os.getenv("INFLUXDB_HOST"),
    token=os.getenv("INFLUXDB_TOKEN"),
    database=os.getenv("INFLUXDB_DATABASE")
)

point = (
    Point("home_environment")
    .tag("room", "living_room")
    .tag("device", "esp32_01")
    .field("temperature", 27.1)
    .field("humidity", 47.0)
)

client.write(record=point)

print("✅ Sensor data written to InfluxDB!")

client.close()
