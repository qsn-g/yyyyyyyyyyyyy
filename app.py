from flask import Flask, request, render_template, jsonify
import random as r
import math as m
import json
from Bully_data import *
from fb_data import *
import graph_tool.all as gt
import matplotlib.pylab as matplotlib
import csv
app = Flask(__name__, static_url_path='/static')
g_b =my_Bully_post()
g_f =my_form_post()
hir_f=pre_dic()
hir_b=pre_dic_b()

@app.route('/')
def my_form():
    # jsondata = json.loads("static/src/data/FB_overview.json")
    return render_template('index.html')

@app.route('/overview_bully',methods=["GET"])
def my_view_bu():
	with open("static/src/data/overview_bully.json",'r') as load_f:
		jsondata = json.load(load_f)
	return jsondata

@app.route('/infor_fb',methods=['GET'])
def infor_fb():
	with open("static/src/data/infor.json",'r') as load_f:
		jsondata = json.load(load_f)
	return jsondata

@app.route('/infor_bully',methods=['GET'])
def infor_b():
	with open("static/src/data/infor_bully.json",'r') as load_f:
		jsondata = json.load(load_f)
	return jsondata

@app.route('/overview_fb',methods=["GET"])
def my_view():
	with open("static/src/data/overview.json",'r') as load_f:
		jsondata = json.load(load_f)
	return jsondata

@app.route('/init_fb', methods=["GET"])
def fildata():
    fil={}
    fil['v']=output_filter_v()
    fil['e']=output_filter_e()
    return fil
@app.route('/init_bully', methods=["GET"])
def fildata_b():
    fil={}
    fil['v']=output_filter_b_v()
    fil['e']=output_filter_b_e()
    return fil

@app.route('/detail_fb', methods=['POST'])
def select_data():
    data=request.get_data()
    temp = json.loads(data)
    u = need_data(temp,g_f,hir_f)
    return (output_json(u))

@app.route('/detail_bully', methods=['POST'])
def select_data_bu():
    data=request.get_data()
    temp = json.loads(data)
    u = need_data_b(temp,g_b,hir_b)
    return (output_json_b(u))

if __name__ == '__main__':
    app.run()
