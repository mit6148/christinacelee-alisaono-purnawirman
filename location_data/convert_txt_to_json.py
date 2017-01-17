import pandas as pd
import json 

# countries.txt
df = pd.read_csv('./location_data/countries.txt', names=["countryID","countryShort","countryName","phoneCode"],
                dtype = {'countryID': int})
dt = df.to_dict(orient = 'records')
with open('./location_data/countries.json', 'w') as f:
    json.dump(dt, f)

# states.txt
df = pd.read_csv('./location_data/states.txt', names=["stateID","stateName","countryID"],
                dtype = {'stateID': int, 'countryID': int})
dt = df.to_dict(orient = 'records')
with open('./location_data/states.json', 'w') as f:
    json.dump(dt, f)

# cities.txt
df = pd.read_csv('./location_data/cities.txt', names=["cityID","cityName","stateID"],
                dtype = {'stateID': int, "cityID": int})
dt = df.to_dict(orient = 'records')
with open('./location_data/cities.json', 'w') as f:
    json.dump(dt, f)