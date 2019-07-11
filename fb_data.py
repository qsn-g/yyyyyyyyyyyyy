def my_form_post():
	import graph_tool.all as gt
	import matplotlib.pylab as matplotlib
	import csv
	# def my_form_post():
	    
	with open("./static/src/data/sampledata.csv", "r") as csv_connect:
		next(csv_connect)	
		edgesdata = list(csv.reader(csv_connect))
	with open("./static/src/data/1_graduate_22_classes.csv",'r') as csv_explain:
		next(csv_explain)
		nodesdata = list(csv.reader(csv_explain))
	g = gt.Graph (directed = True)

	v_userid = g.new_vertex_property("object")
	v_fbid = g.new_vertex_property("object")
	v_school = g.new_vertex_property("object")
	v_schregion = g.new_vertex_property("object")
	v_gender = g.new_vertex_property("object")
	v_birthyear = g.new_vertex_property("object")
	v_major = g.new_vertex_property("object")
	v_marriage = g.new_vertex_property("object")
	v_grade = g.new_vertex_property("object")
	v_scorelevel = g.new_vertex_property("object")
	v_liveplace = g.new_vertex_property("object")
	v_height = g.new_vertex_property("object")
	v_weight = g.new_vertex_property("object")

	e_date = g.new_edge_property("object")
	e_dailycount = g.new_edge_property("int") 
	e_source = g.new_edge_property("int")
	e_target = g.new_edge_property("int") 
	#set up the dictonary of vertexs
	vet = {}
	for v in nodesdata:
		vet[v[0]] = True

	for v in vet:
		vet[v] = g.add_vertex()	
		v_userid[vet[v]] = {"userid" : nodesdata[int(vet[v])][0]}
		v_fbid[vet[v]] = {"fbid":nodesdata[int(vet[v])][1]}
		v_school[vet[v]] = {"school":nodesdata[int(vet[v])][2]}
		v_schregion[vet[v]] = {"schregion":nodesdata[int(vet[v])][5]}
		v_gender[vet[v]] = {"gender":nodesdata[int(vet[v])][10]}
		v_birthyear[vet[v]] = {"birthyear":nodesdata[int(vet[v])][11]}
		v_major[vet[v]] = {"major":nodesdata[int(vet[v])][14]}
		v_marriage[vet[v]] = {"marriage":nodesdata[int(vet[v])][12]}
		v_grade[vet[v]] = {"grade":nodesdata[int(vet[v])][15]}
		v_scorelevel[vet[v]] = {"scorelevel":nodesdata[int(vet[v])][16]}
		v_liveplace[vet[v]] = {"liveplace":nodesdata[int(vet[v])][18]}
		v_height[vet[v]] = {"height":nodesdata[int(vet[v])][19]}
		v_weight[vet[v]] = {"weight":nodesdata[int(vet[v])][20]}

	g.vertex_properties['userid'] = v_userid
	g.vertex_properties['fbid'] = v_fbid
	g.vertex_properties['school']= v_school
	g.vertex_properties['schregion']= v_schregion
	g.vertex_properties['gender']= v_gender
	g.vertex_properties['birthyear'] = v_birthyear
	g.vertex_properties['major'] = v_major
	g.vertex_properties['marriage'] = v_marriage
	g.vertex_properties['grade'] = v_grade
	g.vertex_properties['scorelevel'] = v_scorelevel
	g.vertex_properties['liveplace'] = v_liveplace
	g.vertex_properties['height'] = v_height
	g.vertex_properties['weight'] = v_weight

	edges = {}
	for e in range(len(edgesdata)):
		edges[e] = g.add_edge(vet[edgesdata[e][0]],vet[edgesdata[e][1]])
		e_date[edges[e]] = {'date': edgesdata[e][2]}
		e_dailycount[edges[e]] = edgesdata[e][3]
		e_source[edges[e]] = edgesdata[e][0]
		e_target[edges[e]] = edgesdata[e][1]
	g.edge_properties["date"] = e_date
	g.edge_properties["dailycount"] = e_dailycount
	g.edge_properties["source"] = e_source
	g.edge_properties["target"] = e_target

	pos = gt.sfdp_layout(g, p=2.6)
	# for k in g.vertices():
	# 	print(k)

	nodes=[]
	convert =[]
	for v in g.vertices():
		s_node={}
		s_node["name"]=v_userid[v]["userid"]
		s_node["cx"] = (pos[v][0]+400)/1.5
		s_node["cy"] = (pos[v][1]+300)/1.5
		convert.append(v_userid[v]["userid"])
		# o_node={}
		# o_node[v_userid[v]["userid"]]=s_node
		nodes.append(s_node)
	all_data={}
	all_data['nodes']=nodes
	
		
	links=[]
	for e in g.edges():
		s_edge={}
		s_edge['source'] = convert.index(str(e_source[e]))
		s_edge['target'] = convert.index(str(e_target[e]))
		# s_edge['source_x'] = (pos[e.source()][0]+400)/1.5
		# s_edge['source_y'] = (pos[e.source()][1]+300)/1.5
		# s_edge['target_x'] = (pos[e.target()][0]+400)/1.5
		# s_edge['target_y'] = (pos[e.target()][1]+300)/1.5
		links.append(s_edge)
	all_data['links']=links

	return all_data



# for v in g.vertices():
# 	for e in v.out_edges():
# 		print(e)
   # for w in v.out_neighbors():
   #     print(w)
# gt.graph_draw.interactive_window(g, pos=None, vprops=None, eprops=None, vorder=None, eorder=None, nodesfirst=False, geometry=(500, 400), update_layout=True, sync=True, main=True, **kwargs)
# gt.graph_draw(g, pos, vertex_text = g.vertex_index,vertex_font_size=8,output_size=(3000,3000),output ="data convert3.png")


# gt.graph_draw(g, pos, vertex_text = g.vertex_index, vertex_font_size=8)


# #g.list_properties()
# #deep copy
# # g2 = Graph(g)

# lable = gt.label_parallel_edges(g,mark_only=False,eprop= None)
# remove= gt.remove_parallel_edges(g)
# #adjust the layput
# pos = gt.sfdp_layout(g, p=2.6)
# # graph_draw(g2, pos, vertex_text = g2.vertex_index,vertex_font_size=8,output_size=(3000,3000), output ="data convert.png")
# pr = gt.pagerank(g)
# gt.graph_draw(g, pos, vertex_fill_color=pr,vertex_size=gt.prop_to_size(pr, mi=5, ma=15),vorder=pr, vcmap=matplotlib.cm.gist_heat,output="datacen.pdf")
# # g.save("fb_network.gml")
