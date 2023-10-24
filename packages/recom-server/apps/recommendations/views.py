from flask import request
from apps.recommendations import controllers as controllers

def get_recommendation():
    # Get the request body data
    # user_name = request.json['user_name']
    # Get User details for recommendation
    # TODO

    response, code = controllers.get_recommendation()
    return response, code