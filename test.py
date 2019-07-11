import json
with open("static/src/data/FB_overview.json",'r') as load_f:
	jsondata = json.load(load_f)
print(jsondata)