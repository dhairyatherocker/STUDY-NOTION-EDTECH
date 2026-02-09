import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

courses=pd.read_csv(r'C:\hp\STUDY-NOTION-EDTECH\ml-service\data.csv')
user=pd.read_csv(r'C:\hp\STUDY-NOTION-EDTECH\ml-service\user-activity.csv')

print("courses columns\n",courses.columns)
print("\nuser columns\n",user.columns)

user['userId']=user['id']
user.drop(columns=['id'],inplace=True)

user['Rating']=user['rating']
user.drop(columns=['rating'],inplace=True)

print(user.columns)
user['Rating'].fillna(1,inplace=True)
matrix=user.pivot_table(index='courseId',columns='userId',values='Rating')
matrix.fillna(0,inplace=True)
print(matrix)

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
    


