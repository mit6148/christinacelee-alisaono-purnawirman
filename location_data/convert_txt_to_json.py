import pandas as pd
import json 

# countries.txt
df = pd.read_csv('countries.txt', names=["countryID","countryShort","countryName","phoneCode"],
                dtype = {'countryID': int})
dt = df.to_dict(orient = 'records')
with open('countries.json', 'w') as f:
    json.dump(dt, f, indent = 1)

# states.txt
df = pd.read_csv('states.txt', names=["stateID","stateName","countryID"],
                dtype = {'stateID': int, 'countryID': int})
dt = df.to_dict(orient = 'records')
with open('states.json', 'w') as f:
    json.dump(dt, f, indent = 1)

# cities.txt
df = pd.read_csv('cities.txt', names=["cityID","cityName","stateID"],
                dtype = {'stateID': int, "cityID": int})
dt = df.to_dict(orient = 'records')
with open('cities.json', 'w') as f:
    json.dump(dt, f, indent = 1)