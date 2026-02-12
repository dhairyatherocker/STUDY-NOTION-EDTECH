import requests
import pandas as pd
import os
BASE_URL = "https://study-notion-edtech-backend-z172.onrender.com/api/v1/recommender"
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_PATH = os.path.join(BASE_DIR, "data.csv")
USER_PATH = os.path.join(BASE_DIR, "user-activity.csv")
def fetch_and_save():
    # 1. Fetch courses
    print("Fetching courses...")
    res1 = requests.get(f"{BASE_URL}/getrecommendedcourses")
    courses = res1.json()
    print(courses)
    # If your API returns: { success: true, data: [...] }
    if isinstance(courses, dict) and "data" in courses:
        courses = courses["data"]

    df_courses = pd.DataFrame(courses)
    df_courses.to_csv(DATA_PATH, index=False)
    print("courses.csv saved!")

    # 2. Fetch user activity
    print("Fetching user activity...")
    res2 = requests.get(f"{BASE_URL}/getrecommendedusers")
    activity = res2.json()
    print("User Activity Response:", activity)
    if isinstance(activity, dict) and "data" in activity:
        activity = activity["data"]

    df_activity = pd.DataFrame(activity)
    df_activity.to_csv(USER_PATH, index=False)
    print("user_activity.csv saved!")

    print("\n DATA FETCH SUCCESSFULLY DONE!")

if __name__ == "__main__":
    fetch_and_save()

