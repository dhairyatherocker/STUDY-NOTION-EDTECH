# import pandas as pd
# import numpy as np
# import ast
# from ast import literal_eval
# import nltk
# from nltk.stem.porter import PorterStemmer
# from sklearn.feature_extraction.text import CountVectorizer
# from sklearn.metrics.pairwise import cosine_similarity
# import os
# import pandas as pd
# BASE_DIR = os.path.dirname(os.path.abspath(__file__))
# DATA_PATH = os.path.join(BASE_DIR, "data.csv")
# USER_PATH = os.path.join(BASE_DIR, "user-activity.csv")
# course=pd.read_csv(DATA_PATH)
# print(course.head(5))

# # course['fullname']=course['firstname']

# user=pd.read_csv(USER_PATH)


# user['fullname']=user['firstname']+" "+user['lastname']

# user.drop(columns=['firstname','lastname','price'],inplace=True)
# # print(user.head())
# course['courseId']=course['id']
# course.drop(columns=['id'],inplace=True)

# df=course.merge(user,on='courseId')
# print(df.head(1))
# print(df.columns)
# print("user shape is",user.shape)
# print("course shape is",course.shape)
# print("df shape is ",df.shape)
# # df.to_csv(r"C:\hp\STUDY-NOTION-EDTECH\ml-service\combined.csv", index=False)

# # df=pd.read_csv(r'C:\hp\STUDY-NOTION-EDTECH\ml-service\combined.csv')
# # print(course.columns)



# # content based filtering preprocessing

# courses=pd.read_csv(DATA_PATH)

# # print(courses.head(1))
# # print("this is the tags",df.iloc[0]['tags'],end='\n\n')
# courses['courseId']=courses['id']
# courses.drop(columns=['id'],inplace=True)
# # print(courses.columns)
# courses['tags'] = courses['tags'].apply(literal_eval)

# # def process(obj):
# #     if isinstance(obj, list):
# #         # fix each element
# #         fixed = ["".join(word.split()) for word in obj]
# #         return " ".join(fixed)
# #     else:
# #         return "".join(obj.split())
# # print(courses['tags'])
# def process(obj):
#     l=[]
#     for i in obj:
#         l.append(i)
        
#     return l      
# # print("\n\nfrom here your process starts\n\n")
# courses['tags']=courses['tags'].apply(process)

# # courses['topic']=courses['topic'].apply(lambda x:[i.replace("/"," ")for i in x])



# def convert(s):
#     return s.split('/')  

# def convert2(s):
#     return s.split(' ')

# courses['topic']=courses['topic'].apply(convert)
# courses['teacher']=courses['teacher'].apply(convert)
# courses['category']=courses['category'].apply(convert)
# courses['language']=courses['language'].apply(convert2)
# courses['description']=courses['description'].apply(convert2)

# # print(course.iloc[0]['topic'])
# # courses[]

# # print(courses.iloc[5].description)

# def process2(obj):
#     l=[]
#     for i in obj:
#         print(i)
    
#     return l



# courses['full_info']=courses['tags']+courses['language']+courses['description']+courses['category']+courses['topic']+courses['teacher']

# # print(courses.iloc[0]['full_info'])

# courses['full_info']=courses['full_info'].apply(lambda x:[i.replace(" ","") for i in x])

# # print("course full info\n",courses.iloc[0].full_info)

# new_df=courses[['courseId','topic','full_info']]




# new_df['full_info']=new_df['full_info'].apply(lambda x:" ".join(x))


# new_df['full_info']=new_df['full_info'].apply(lambda x:x.lower())
# # print("this is new full info",new_df.iloc[0].full_info)
# ps=PorterStemmer()


# def stem(text):
#     l=[]
#     for i in text.split():
#         l.append(ps.stem(i))
#     return " ".join(l)

# new_df['full_info']=new_df['full_info'].apply(stem)

# cv=CountVectorizer(max_features=100,stop_words='english')

# vectors=cv.fit_transform(new_df['full_info']).toarray()

# # print(vectors)

# # print(cv.get_feature_names_out())

# similarity=cosine_similarity(vectors)



# # print(new_df[new_df['courseId']=='681101011eaf7f9e39eacd4d'].index[0])
# # print("similariyt for ptricular index",sorted(list(enumerate(similarity[new_df[new_df['courseId']=='681101011eaf7f9e39eacd4d'].index[0]])),reverse=True))
# def recommendcourse(Id):
#     course_index=new_df[new_df['courseId']==Id].index[0]
#     courses_matrix=sorted(list(enumerate(similarity[course_index])),reverse=True,key=lambda x:x[1])[1:4]
#     l=[]
#     for i in courses_matrix:
#         l.append(new_df.iloc[i[0]].courseId)
#     return l

# # x=recommendcourse('681101011eaf7f9e39eacd4d')
# # print(x)











import pandas as pd
import numpy as np
from ast import literal_eval
from nltk.stem.porter import PorterStemmer
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_PATH = os.path.join(BASE_DIR, "data.csv")

# load course data
courses = pd.read_csv(DATA_PATH)

courses['courseId'] = courses['id']
courses.drop(columns=['id'], inplace=True)

# tags preprocessing
courses['tags'] = courses['tags'].apply(literal_eval)

def process(obj):
    return [i.replace(" ", "") for i in obj]

courses['tags'] = courses['tags'].apply(process)

def split_slash(s):
    return s.split('/')

def split_space(s):
    return s.split(' ')

courses['topic'] = courses['topic'].apply(split_slash)
courses['teacher'] = courses['teacher'].apply(split_slash)
courses['category'] = courses['category'].apply(split_slash)
courses['language'] = courses['language'].apply(split_space)
courses['description'] = courses['description'].apply(split_space)

courses['full_info'] = (
    courses['tags']
    + courses['language']
    + courses['description']
    + courses['category']
    + courses['topic']
    + courses['teacher']
)

courses['full_info'] = courses['full_info'].apply(
    lambda x: " ".join(x).lower()
)

ps = PorterStemmer()

def stem(text):
    return " ".join([ps.stem(i) for i in text.split()])

courses['full_info'] = courses['full_info'].apply(stem)

new_df = courses[['courseId', 'full_info']]

# 🚨 global cache (IMPORTANT)
cv = None
vectors = None
similarity = None


def recommendcourse(Id):
    global cv, vectors, similarity

    # safety check
    if new_df.shape[0] == 0:
        return []

    if cv is None:
        cv = CountVectorizer(max_features=100, stop_words='english')
        vectors = cv.fit_transform(new_df['full_info']).toarray()
        similarity = cosine_similarity(vectors)

    if Id not in new_df['courseId'].values:
        return []

    course_index = new_df[new_df['courseId'] == Id].index[0]

    courses_matrix = sorted(
        list(enumerate(similarity[course_index])),
        key=lambda x: x[1],
        reverse=True
    )[1:4]

    return [new_df.iloc[i[0]].courseId for i in courses_matrix]






