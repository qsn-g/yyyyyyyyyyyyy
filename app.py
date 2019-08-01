from flask import Flask, request, render_template, jsonify
import random as r
import math as m
import json
from fb_data import *
import graph_tool.all as gt
import matplotlib.pylab as matplotlib
import csv
app = Flask(__name__, static_url_path='/static')
g =my_form_post()
hir=pre_dic()

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

@app.route('/init', methods=["GET"])
def fildata():
    fil={}
    fil['v']=output_filter_v()
    fil['e']=output_filter_e()
    return fil

@app.route('/detail', methods=['POST'])
def select_data():
    data=request.get_data()
    temp = json.loads(data)
    u = need_data(temp,g,hir)
    return (output_json(u))

# @app.route('/Select_Local', methods=['GET'])
# def Local():
#     return

if __name__ == '__main__':
    app.run()
