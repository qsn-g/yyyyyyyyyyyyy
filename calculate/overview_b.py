# @app.route('/request',methods=['POST',"GET"])
# def createoverview(level0,level1,level2,level3):
from csv import reader
import numpy as np
import pandas as pd
import json
file=pd.read_csv('bully_f.csv')
view = {}
nodes = []
links = []
net=[3, 5, 11, 12, 13, 914, 915, 916, 917, 918, 919, 801, 802, 804, 806, 807, 808, 809, 810, 701, 702, 704, 706, 707, 708, 709, 710, 601, 602, 604, 606, 607, 608, 609, 610]
ini={}
ini['name']='Bully'
ini['ind'] = 0
ini['value'] = 0
ini['level'] = 0
nodes.append(ini)
dic = {}
dex=0
for i in range(7):
	i+=1
	for j in range(len(file)):
		if str(file['c'+str(i)+'_net'][j]) !='nan':
			dex+=1
			dic['schoolnet_'+str(file['c'+str(i)+'_net'][j])]=[dex,1,'schoolnet_'+str(file['c'+str(i)+'_net'][j]),'schoolnet_'+str(file['c'+str(i)+'_net'][j])]
			dex+=1
			dic['schoolnet_'+str(file['c'+str(i)+'_net'][j])+'year_c'+str(i)]=[dex,2,'schoolnet_'+str(file['c'+str(i)+'_net'][j]),'year_c'+str(i)]
for i in dic:
	count = 0
	for k in range(1,8):
		for t in range(len(file)):
			if 'schoolnet_'+str(file['c'+str(k)+'_net'][t]) ==i:
				link={}
				link['source'] = 0
				link['target'] = dic[i][0]
				links.append(link)
				count+=1
			if 'schoolnet_'+str(file['c'+str(k)+'_net'][t])+'year_c'+str(k) ==i:
				link = {}
				link['source'] = dic['schoolnet_'+str(file['c'+str(k)+'_net'][t])][0]
				link['target'] = dic[i][0]
				links.append(link)
				count+=1
	line = {}
	line['name'] = i
	line['show_name'] = dic[i][3]
	line['ind'] = dic[i][0]
	line['level'] = dic[i][1]
	line['value'] = count
	nodes.append(line)
seen = set()
new_link =[]
for d in links:
	t=tuple(d.items())
	if t not in seen:
		seen.add(t)
		new_link.append(d)

view['nodes']=nodes
view['links']=new_link
with open("overview_bully.json","w") as f:
	json.dump(view,f,indent=4)

info={}
for i in range(len(nodes)):
	info[nodes[i]['name']]=nodes[i]
with open("infor_bully.json","w") as k:
	json.dump(info,k,indent=4)
