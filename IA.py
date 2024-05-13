import pandas as pd
import chardet as chardet
import json
from flask import request
from flask import Flask, render_template


from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.pipeline import make_pipeline
from sklearn.metrics import mean_squared_error
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
import numpy as np
from sklearn.preprocessing import LabelEncoder
from sklearn.preprocessing import StandardScaler
import nltk
from sklearn.neural_network import MLPClassifier
from sklearn.metrics import confusion_matrix

app = Flask(__name__)


@app.route('/')
def index():
    return 'Hello'

@app.route('/mon-compte', methods=['POST'])
def compte():
    try:
        output = request.get_json()
        print(output)
        return {'message': 'Data received successfully'}, 200
    except Exception as e:
        return {'error': str(e)}, 400

if __name__ == '__main__':
    app.run(debug=True)


'''

# Code trouvé sur : https://analyticsindiamag.com/a-beginners-guide-to-scikit-learns-mlpclassifier/
with open("./donnees_etudiants.csv", "rb") as f:
    encoding = chardet.detect(f.read())["encoding"]

data = pd.read_csv("./donnees_etudiants.csv", encoding=encoding)



# Séparer les features (X) et la cible (Y)
le = LabelEncoder()
data['Genre'] = le.fit_transform(data['Genre'])
data['Age'] = le.fit_transform(data['Age'])
data['Programme_detude'] = le.fit_transform(data['Programme_detude'])
data['Suggestion_tache'] = le.fit_transform(data['Suggestion_tache'])
data['Performance'] = le.fit_transform(data['Performance'])
data['Duree'] = le.fit_transform(data['Duree'])
data['Matiere_etudiee'] = le.fit_transform(data['Matiere_etudiee'])

sc = StandardScaler()
data[['Genre', 'Age', 'Programme_detude', 'Suggestion_tache', 'Performance', 'Duree', 'Matiere_etudiee']] = sc.fit_transform(data[['Genre', 'Age', 'Programme_detude', 'Suggestion_tache', 'Performance', 'Duree', 'Matiere_etudiee']])


column_names = list(data.columns)
print(column_names)

print("Les noms des colonnes dans le DataFrame sont :", data.columns)

# Séparer les x et le y
# Définir X en incluant toutes les colonnes sauf 'temps_dans_journee'
X = data[['Genre','Age','Programme_detude','Suggestion_tache','Performance','Duree','Matiere_etudiee']]
print()
print(X)

# Sélectionner la cible (y)
print()
Y = data['Moment_detude']
print(Y)

data.dropna(inplace=True)


training_set, validation_set = train_test_split(data, test_size = 0.2, random_state = 42)

X_train = training_set.iloc[:,0:-1].values
Y_train = training_set.iloc[:,-1].values
X_val = validation_set.iloc[:,0:-1].values
y_val = validation_set.iloc[:,-1].values


classifier = MLPClassifier(hidden_layer_sizes=(1500,1000), max_iter=1000,activation = 'relu',solver='adam',random_state=42)


classifier.fit(X_train, Y_train)



#Predicting y for X_val
y_pred = classifier.predict(X_val)
print(y_pred)

cm = confusion_matrix(y_pred, y_val)

def accuracy(confusion_matrix):
   diagonal_sum = confusion_matrix.trace()
   sum_of_all_elements = confusion_matrix.sum()
   return diagonal_sum / sum_of_all_elements

print(accuracy(cm))

'''