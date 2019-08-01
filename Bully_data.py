# ================graph=============
import graph_tool.all as gt
import matplotlib.pylab as matplotlib
import csv
def my_Bully_post():
	with open("./static/src/data/edge_sample.csv", "r") as csv_connect:
		next(csv_connect)
		edgesdata = list(csv.reader(csv_connect))
	with open("./static/src/data/bully_f.csv",'r') as csv_explain:
    	next(csv_explain)
    	nodesdata = list(csv.reader(csv_explain))

	global g,v_userid,v_race,v_cohort,v_gender,v_c1net,v_c2net,v_c3net,v_c4net,v_c5net,v_c6net,v_c7net,e_target,e_source,e_year,e_type
	g = gt.Graph (directed = True)

    v_userid = g.new_vertex_property("object")
    v_race = g.new_vertex_property("object")
    v_cohort = g.new_vertex_property("object")
    v_gender = g.new_vertex_property("object")
    v_c1net = g.new_vertex_property("object")
    v_c2net = g.new_vertex_property("object")
    v_c3net = g.new_vertex_property('object')
    v_c4net = g.new_vertex_property("object")
    v_c5net = g.new_vertex_property("object")
    v_c6net = g.new_vertex_property('object')
    v_c7net = g.new_vertex_property("object")

    e_year = g.new_edge_property("object")
    e_type = g.new_edge_property('object')
	e_source = g.new_edge_property("int")
	e_target = g.new_edge_property("int")
	#set up the dictonary of vertexs
	vet = {}
	for v in nodesdata:
		vet[v[0]] = g.add_vertex()

	for v in vet:
        v_userid[vet[v]] = {"userid" : nodesdata[int(vet[v])][0]}
        v_race[vet[v]] = {'race': nodesdata[int(vet[v])][9]}
        v_cohort[vet[v]] = {'race': nodesdata[int(vet[v])][8]}
        v_gender[vet[v]] = {'gender':nodesdata[int(vet[v])][10]}
        v_c1net[vet[v]] = {'c1net':nodesdata[int(vet[v])][2]}
        v_c2net[vet[v]] = {'c2net':nodesdata[int(vet[v])][1]}
        v_c3net[vet[v]] = {'c3net':nodesdata[int(vet[v])][3]}
        v_c4net[vet[v]] = {'c4net':nodesdata[int(vet[v])][4]}
        v_c5net[vet[v]] = {'c5net':nodesdata[int(vet[v])][5]}
        v_c6net[vet[v]] = {'c6net':nodesdata[int(vet[v])][6]}
        v_c7net[vet[v]] = {'c7net':nodesdata[int(vet[v])][7]}

    g.vertex_properties['userid'] = v_userid
    g.vertex_properties['race'] = v_race
    g.vertex_properties['cohort'] = v_cohort
    g.vertex_properties['gender'] = v_gender
    g.vertex_properties['c1net'] = v_c1net
    g.vertex_properties['c2net'] = v_c2net
    g.vertex_properties['c3net'] = v_c3net
    g.vertex_properties['c4net'] = v_c4net
    g.vertex_properties['c5net'] = v_c5net
    g.vertex_properties['c6net'] = v_c6net
    g.vertex_properties['c7net'] = v_c7net

	# for e in range(len(edgesdata)):
	# 	edgesdata[e][2]=edgesdata[e][2].split('-')[0]

	edges = {}
	for e in range(len(edgesdata)):
    	edges[e] = g.add_edge(vet[edgesdata[e][0]],vet[edgesdata[e][1]])
    	e_type[edges[e]] = {'type': edgesdata[e][2]}
    	e_year[edges[e]] = {'year': edgesdata[e][3]}
    	e_source[edges[e]] = edgesdata[e][0]
    	e_target[edges[e]] = edgesdata[e][1]
    g.edge_properties['type'] = e_type
    g.edge_properties['year'] = e_year
    g.edge_properties['source'] = e_source
    g.edge_properties['target'] = e_target
	return g
#============precalculate-diction================
def pre_dic():
	global new_hir
	new_hir={'region3':set(), 'region3school16': set(), 'region3school16major62': set(), 'region1': set(), 'region1school23': set(), 'region1school23major34': set(), 'region1school41': set(), 'region1school41major52': set(), 'region3school10': set(), 'region3school10major81': set(), 'region1school42': set(), 'region1school42major34': set(), 'region1school43': set(), 'region1school43major81': set(), 'region1school6': set(), 'region1school6major52': set(), 'region1school49': set(), 'region1school49major34': set(), 'region1school39': set(), 'region1school39major52': set(), 'region3school14': set(), 'region3school14major42': set(), 'region3school15': set(), 'region3school15major14': set(), 'region4': set(), 'region4school19': set(), 'region4school19major21': set(), 'region2': set(), 'region2school21': set(), 'region2school21major31': set(), 'region1school1': set(), 'region1school1major52': set(), 'region3school9': set(), 'region3school9major34': set(), 'region2school4': set(), 'region2school4major34': set(), 'region1school52': set(), 'region1school52major31': set(), 'region3school11': set(), 'region3school11major48': set()}

	pro={'region':[v_schregion,"schregion"],'school':[v_school,'school'],'major':[v_major,'major']}
	for v in g.vertices():
		items=""
		for i in pro:
			items=items+i+pro[i][0][v][pro[i][1]]
			new_hir[items].add(v_userid[v]['userid'])
			for w in v.out_neighbors() or w in v.in_neighbors():
				new_hir[items].add(v_userid[w]['userid'])

	hir = new_hir
	return hir
