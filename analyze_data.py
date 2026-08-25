import pandas as pd
import matplotlib.pyplot as plt

# Load our sensor data
data = pd.read_csv("sensor_data.csv")

print("\n--- Our data ---")
print(data)

print("\n--- Basic statistics ---")
print(data[["temperature", "humidity"]].describe())

print("\n--- Average ---")
print("Average temperature:", data["temperature"].mean())
print("Average humidity:", data["humidity"].mean())

print("\n--- Minimum ---")
print("Minimum temperature:", data["temperature"].min())
print("Minimum humidity:", data["humidity"].min())

print("\n--- Maximum ---")
print("Maximum temperature:", data["temperature"].max())
print("Maximum humidity:", data["humidity"].max())

# Convert timestamp into a real datetime
data["timestamp"] = pd.to_datetime(data["timestamp"])

# Temperature graph
plt.plot(data["timestamp"], data["temperature"])
plt.xlabel("Time")
plt.ylabel("Temperature (°C)")
plt.title("Temperature Over Time")
plt.xticks(rotation=45)
plt.tight_layout()
plt.show()
