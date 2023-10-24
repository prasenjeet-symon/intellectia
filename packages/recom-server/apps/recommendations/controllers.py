from flask import jsonify, current_app as app
import os

def get_recommendation():
    return jsonify({'message': 'Articles recommendation'}), 200

