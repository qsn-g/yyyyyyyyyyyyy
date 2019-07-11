# from flask import Flask
# app = Flask(__name__)

# @app.route('/')
# def hello_world():
#     return 'Hello, World!'


# if __name__ == '__main__':
#     app.run(debug = True)
from flask import Flask, request, render_template, jsonify
import random as r
import math as m
import json
from fb_data import my_form_post
app = Flask(__name__, static_url_path='/static')
def Montecarlo(iterate):
    # Number of darts that land inside.
    inside = 0
    # Total number of darts to throw.
    total = iterate

    # Iterate for the number of darts.
    for i in range(0, total):
    # Generate random x, y in [0, 1].
        x2 = r.random()**2
        y2 = r.random()**2
    # Increment if inside unit circle.
        if m.sqrt(x2 + y2) < 1.0:
            inside += 1

     # inside / total = pi / 4
    pi = (float(inside) / total) * 4

    # It works!
    return str(pi)

@app.route('/')
def my_form():
    # jsondata = json.loads("static/src/data/FB_overview.json")
    return render_template('index.html')

@app.route('/overview',methods=["GET"])
def my_view():
	with open("static/src/data/overview.json",'r') as load_f:
		jsondata = json.load(load_f)
	print(jsondata)
	return jsondata

@app.route('/request1', methods=['POST',"GET"])
def alldata():
	return(my_form_post())


if __name__ == '__main__':
    app.run()