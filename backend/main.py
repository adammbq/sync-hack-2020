import flask
from flask_cors import CORS, cross_origin
from json import dumps
from data import *

app = flask.Flask("__main__")
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route("/")
def index():
    pass
    # return flask.render_template("index.html", token="Hello flask+react")

@app.route("/login", methods=["POST", "GET"])
def login():
    pass

@app.route("/home", methods=["GET"])
def home():
    # dump user company list 
    companies_list = []
    for user in DATA['users']:
        companies_list = user["accounts"]
    # print(companies_list)
    # dump past 7 day data for piechart
    seven_data = get_frequency_week('adamma')
    # print(seven_data)
    package = {'list' : companies_list, 'piechart': seven_data}
    # (optional) live update of 
    # print("hihihihihihihihihi")
    return flask.jsonify(package)


@app.route("/feed")
def feed():
    for user in DATA['users']:
        companies_list = user["accounts"]
    package = {'list': companies_list, 'piechart': seven_data}
    return flask.jsonify(package)


@app.route("/accounts", methods=["GET"])
def accounts():
    # dump whole list of companies 
    my_companies = []
    for user in DATA['users']:
        my_companies = user["accounts"]

    whole_list = []
    for key in companies:
        whole_list.append(key)

    package = {'list' : whole_list, 'my_companies': my_companies}
    #print(dumps(package))
    return flask.jsonify(package)

@app.route("/accounts/<company>", methods=["GET"])
def scompany(company):
    # dump company data usage types
    package = {}
    for c in companies:
        if c == company:
            package[c] = companies[c]
    package['data'] = get_frequency_7day("adamma", company)
    print (package)
    print("success")
    return flask.jsonify(package)


if __name__ == "__main__":
    app.run(port=5000, debug=True)

 
