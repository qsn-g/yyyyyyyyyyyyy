# import json
# with open("static/src/data/FB_overview.json",'r') as load_f:
# 	jsondata = json.load(load_f)
# print(jsondata)
output=set()
msg=[["school1","region2",'major2'],['school1'],['school4','region2']]
for i in msg:
	for j in i:
		output.add(j)
output=list(output)
print(output)
