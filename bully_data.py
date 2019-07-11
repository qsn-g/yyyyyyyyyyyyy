import graph_tool.all as gt
import matplotlib.pylab as matplotlib
import csv
with open("./static/src/data/edge.csv", "r") as csv_connect:
	next(csv_connect)	
	edgesdata = list(csv.reader(csv_connect))
with open("./static/src/data/bully_change2.csv",'r') as csv_explain:
	nodesdata = list(csv.reader(csv_explain))
	header = nodesdata[0]
	nodesdata.remove(nodesdata[0])


g = gt.Graph(directed = True)

v_userid = g.new_vertex_property("object")
v_race = g.new_vertex_property("object")
v_gender = g.new_vertex_property("object")
v_c1net = g.new_vertex_property("object")
v_c2net = g.new_vertex_property("object")
v_c3net = g.new_vertex_property('object')
v_c4net = g.new_vertex_property("object")
v_c5net = g.new_vertex_property("object")
v_c6net = g.new_vertex_property('object')
v_c7net = g.new_vertex_property("object")


e_conpro = g.new_edge_property("object")


vet = {}
for v in nodesdata:
	vet[v[1]] =True

for v in vet:
	vet[v] = g.add_vertex()
	v_userid[vet[v]] = {"userid" : nodesdata[int(vet[v])][header.index("id")]}
	v_race[vet[v]] = {'race': nodesdata[int(vet[v])][header.index("Race")]}
	v_gender[vet[v]] = {'gender':nodesdata[int(vet[v])][header.index("Sex")]}
	v_c1net[vet[v]] = {'c1net':nodesdata[int(vet[v])][header.index('c1_net')]}
	v_c2net[vet[v]] = {'c2net':nodesdata[int(vet[v])][header.index('c2_net')]}
	v_c3net[vet[v]] = {'c3net':nodesdata[int(vet[v])][header.index('c3_net')]}
	v_c4net[vet[v]] = {'c4net':nodesdata[int(vet[v])][header.index('c4_net')]}
	v_c5net[vet[v]] = {'c5net':nodesdata[int(vet[v])][header.index('c5_net')]}
	v_c6net[vet[v]] = {'c6net':nodesdata[int(vet[v])][header.index('c6_net')]}
	v_c7net[vet[v]] = {'c7net':nodesdata[int(vet[v])][header.index('c7_net')]}
g.vertex_properties['userid'] = v_userid
g.vertex_properties['race'] = v_race
g.vertex_properties['gender'] = v_gender
g.vertex_properties['c1net'] = v_c1net
g.vertex_properties['c2net'] = v_c2net
g.vertex_properties['c3net'] = v_c3net
g.vertex_properties['c4net'] = v_c4net
g.vertex_properties['c5net'] = v_c5net
g.vertex_properties['c6net'] = v_c6net
g.vertex_properties['c7net'] = v_c7net

edges = {}

for e in range(len(edgesdata)):
	edges[e] = g.add_edge(vet[edgesdata[e][0]],vet[edgesdata[e][1]])
	e_conpro[edges[e]] = {'connection': edgesdata[e][2]}
g.edge_properties['connection'] = e_conpro

pos = gt.sfdp_layout(g,p=2.6)

nodes =[]
convert =[]
for v in g.vertices():
	s_node = {}
	s_node['name'] = v_userid[v]['userid']
	s_node['cx'] = (pos[v][0]+400)/1.5 
	s_node['cy'] = (pos[v][1]+400)/1.5 
	convert.append(v_userid[v]["userid"])
	nodes.append(s_node)
all_data = {}
all_data['nodes']=nodes

links = []
for e in g.edges():
	s_edge = {}
	s_edge['source'] = convert.index(str(e_source[e]))
	s_edge['target'] = convert.index(str(e_target[e]))
	links.append(s_edge)
all_data['links'] = links
# gt.graph_draw(g, pos, vertex_text = g.vertex_index,vertex_font_size=8,output_size=(3000,3000),output ="data convert3.png")


