import matplotlib.pyplot as plt
import numpy as np

# Data for visualization
days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
emails_processed = [15, 15, 15, 15, 15]  # Mails count is constant (15 per day)
time_saved_per_email = 10  # Time saved per email in minutes

# Total time saved per day
time_saved = [count * time_saved_per_email for count in emails_processed]

# Automation Rate (100%)
automation_rate = 100

# Create the figure
fig, axs = plt.subplots(2, 2, figsize=(12, 10))
fig.suptitle("Sample Workflow Efficiency Analytics", fontsize=16)

# Chart 1: Time Savings Over Time (Line Chart)
axs[0, 0].plot(days, time_saved, marker='o', color='green', label="Time Saved (Minutes)")
axs[0, 0].set_title("Time Savings Over Time")
axs[0, 0].set_xlabel("Days")
axs[0, 0].set_ylabel("Minutes Saved")
axs[0, 0].legend()
axs[0, 0].grid(True)

# Chart 2: Automation Rate (Pie Chart)
axs[0, 1].pie([automation_rate, 100 - automation_rate], labels=["Automated", "Manual"], 
              autopct='%1.1f%%', colors=['#4CAF50', '#FFC107'], startangle=90)
axs[0, 1].set_title("Automation Rate")

# Chart 3: Error Reduction (Bar Chart)
error_rate_manual = 7  # Manual error rate (%)
error_rate_automated = 1  # Automated error rate (%)
axs[1, 0].bar(["Manual Process", "Automated Process"], [error_rate_manual, error_rate_automated], 
              color=['#F44336', '#2196F3'], width=0.5)
axs[1, 0].set_title("Error Reduction")
axs[1, 0].set_ylabel("Error Rate (%)")

# Chart 4: Notifications Sent to Teams (Heatmap Simulation)
notifications_heatmap = np.array([[2, 3, 4, 1, 2],
                                  [3, 5, 2, 3, 4],
                                  [1, 2, 3, 4, 3],
                                  [2, 4, 3, 3, 1],
                                  [4, 3, 5, 2, 3]])
heatmap_days = ["Mon", "Tue", "Wed", "Thu", "Fri"]
hours = ["8 AM", "10 AM", "12 PM", "2 PM", "4 PM"]
c = axs[1, 1].imshow(notifications_heatmap, cmap='coolwarm', aspect='auto')
axs[1, 1].set_title("Notifications Sent to Teams (Heatmap)")
axs[1, 1].set_xticks(range(len(hours)), labels=hours)
axs[1, 1].set_yticks(range(len(heatmap_days)), labels=heatmap_days)
plt.colorbar(c, ax=axs[1, 1], orientation='vertical', label="Notification Count")

# Layout adjustment
plt.tight_layout(rect=[0, 0, 1, 0.95])
plt.show()
