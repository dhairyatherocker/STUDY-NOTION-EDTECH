# importing fastApi --> pip install 'fastapi[standard]'
from fastapi import FastAPI
from preprocess import recommendcourse
from collabrative_recommend import recommendcolla

app=FastAPI()
@app.get("/")
def root():
    return {"status": "ML service running"}

@app.get("/recommend/collaborative/{course_id}")
def get_recommendations(course_id: str):
    print("ml_courseId",course_id)
    
    recs = recommendcolla(course_id)+recommendcourse(course_id)
    s=set()
    s.update(recs)
    return {
        "courseId": course_id,
        "recommendations": list(s)
    }

