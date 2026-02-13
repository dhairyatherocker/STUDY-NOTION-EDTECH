import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
import os 
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

COURSE_PATH = os.path.join(BASE_DIR, "data.csv")
USER_PATH = os.path.join(BASE_DIR, "user-activity.csv")
courses=pd.read_csv(COURSE_PATH)
user=pd.read_csv(USER_PATH)

# print("courses columns\n",courses.columns)
# print("\nuser columns\n",user.columns)

user['userId']=user['id']
user.drop(columns=['id'],inplace=True)

user['Rating']=user['rating']
user.drop(columns=['rating'],inplace=True)

# print(user.columns)
user['Rating'].fillna(1,inplace=True)
matrix=user.pivot_table(index='courseId',columns='userId',values='Rating')
matrix.fillna(0,inplace=True)
# print(matrix)

mt=cosine_similarity(matrix)

# print(mt)

# print(matrix[1].index)
# def recommendcolla(Id):
#     index=np.where(matrix.index==Id)[0][0]
#     print("index",index)
#     l=[]
#     l1=sorted(list(enumerate(mt[index])),key=lambda x:x[1],reverse=True)[1:5]
#     # print(l1)
#     for i in l1:
#         l.append(matrix.index[i[0]])
#     return l
def recommendcolla(Id):
    Id = str(Id)

    if Id not in matrix.index:
        # cold start → no collaborative data
        return []

    index = matrix.index.get_loc(Id)

    l = []
    l1 = sorted(
        list(enumerate(mt[index])),
        key=lambda x: x[1],
        reverse=True
    )[1:5]

    for i in l1:
        l.append(matrix.index[i[0]])

    return l


# l=recommendcolla('68127872e570460df4eca4fe')
# print(l)
    




# import pandas as pd
# import numpy as np
# from sklearn.metrics.pairwise import cosine_similarity
# import os

# BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# COURSE_PATH = os.path.join(BASE_DIR, "data.csv")
# USER_PATH = os.path.join(BASE_DIR, "user-activity.csv")

# # load data
# courses = pd.read_csv(COURSE_PATH)
# user = pd.read_csv(USER_PATH)

# # preprocess user data
# user['userId'] = user['id']
# user.drop(columns=['id'], inplace=True)

# user['Rating'] = user['rating']
# user.drop(columns=['rating'], inplace=True)

# # FIX pandas chained assignment
# user['Rating'] = user['Rating'].fillna(1)

# # pivot table
# matrix = user.pivot_table(
#     index='courseId',
#     columns='userId',
#     values='Rating'
# )

# matrix = matrix.fillna(0)

# # 🚨 DO NOT compute cosine similarity globally
# # mt will be computed lazily inside function
# mt = None


# def recommendcolla(Id):
#     global mt
#     Id = str(Id)

#     # safety: empty matrix
#     if matrix.shape[0] == 0 or matrix.shape[1] == 0:
#         return []

#     # cold start
#     if Id not in matrix.index:
#         return []

#     # compute similarity only once
#     if mt is None:
#         mt = cosine_similarity(matrix)

#     index = matrix.index.get_loc(Id)

#     similar_items = sorted(
#         list(enumerate(mt[index])),
#         key=lambda x: x[1],
#         reverse=True
#     )[1:5]

#     recommendations = []
#     for i in similar_items:
#         recommendations.append(matrix.index[i[0]])

#     return recommendations
