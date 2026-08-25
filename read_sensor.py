import serial
import time
import csv
from datetime import datetime

PORT = "/dev/cu.usbserial-110"
BAUD_RATE = 115200

esp32 = serial.Serial(PORT, BAUD_RATE, timeout=1)

time.sleep(2)

print("Connected to ESP32!")
print("Collecting sensor data...\n")

temperature = None
humidity = None

# Open CSV file
with open("sensor_data.csv", "a", newline="") as file:

    writer = csv.writer(file)

    # Add header if the file is empty
    if file.tell() == 0:
        writer.writerow([
            "timestamp",
            "temperature",
            "humidity"
        ])

    while True:

        line = esp32.readline().decode(
            "utf-8",
            errors="ignore"
        ).strip()

        if line.startswith("Temperature:"):

            temperature = float(
                line.split(":")[1]
                .replace("°C", "")
                .strip()
            )

        elif line.startswith("Humidity:"):

            humidity = float(
                line.split(":")[1]
                .replace("%", "")
                .strip()
            )

        # We have a complete measurement
        if temperature is not None and humidity is not None:

            timestamp = datetime.now()

            writer.writerow([
                timestamp,
                temperature,
                humidity
            ])

            # Make sure it is actually written to disk
            file.flush()

            print(
                timestamp.strftime("%Y-%m-%d %H:%M:%S"),
                "|",
                temperature,
                "°C |",
                humidity,
                "%"
            )

            temperature = None
            humidity = None
