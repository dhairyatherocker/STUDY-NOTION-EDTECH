import requests
import pandas as pd

BASE_URL = "http://localhost:4000/api/v1/recommender"

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
    df_courses.to_csv(r"C:\hp\STUDY-NOTION-EDTECH\ml-service\data.csv", index=False)
    print("courses.csv saved!")

    # 2. Fetch user activity
    print("Fetching user activity...")
    res2 = requests.get(f"{BASE_URL}/getrecommendedusers")
    activity = res2.json()
    print("User Activity Response:", activity)
    if isinstance(activity, dict) and "data" in activity:
        activity = activity["data"]

    df_activity = pd.DataFrame(activity)
    df_activity.to_csv(r"C:\hp\STUDY-NOTION-EDTECH\ml-service\user-activity.csv", index=False)
    print("user_activity.csv saved!")

    print("\n DATA FETCH SUCCESSFULLY DONE!")

if __name__ == "__main__":
    fetch_and_save()

