import json

import requests
from flask import Flask, jsonify, request, make_response
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)
osa_cmd_url = str("http://flaskosa.herokuapp.com/cmd/")
trace_url = "TRACE"


# Base URL endpoint
@app.route('/', methods=['GET'])
@cross_origin()
def index():
	return "Hello from Cloud OSA REST API service"


# REST endpoint for fetching the TRACE from the instrument within specified scan limits
@app.route('/api/trace', methods=['GET'])
@cross_origin()
def search_text():
	try:
		trace_response = requests.get(str(osa_cmd_url + trace_url))
		response_data = json.loads(trace_response.content);
		return jsonify({'code': '200', 'data': response_data}), 200
	except Exception as e:
		print("Exception occurred while tracing", str(e))
		return jsonify({'code': '200', 'data': "Invalid Data"}), 200


# REST endpoint for fetching the data for text entered by the user
@app.route('/api/user-query', methods=['POST'])
@cross_origin()
def get_data_for_query():
	request_data = request.json;
	query_string = request_data['query']
	if request.method == 'POST':
		if "echo" not in query_string:
			query_string = query_string.upper()
		else:
			echo_split = query_string.split("/")
			if len(echo_split) > 1:
				query_string = "ECHO/"+query_string.split("/")[1];
		query_response = requests.get(osa_cmd_url + query_string)
		return jsonify({'code': '200', 'data': query_response.text}), 200
	else:
		return jsonify({'code': '200', 'data': "GET Request not supported"}), 200


@app.errorhandler(404)
def not_found(error):
	return make_response(jsonify({'error': 'Not found'}), 404)


if __name__ == '__main__':
	app.run(host='0.0.0.0', port=5000, debug=True)
