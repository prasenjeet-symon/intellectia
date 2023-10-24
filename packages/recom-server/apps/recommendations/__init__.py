from flask import Blueprint

recommendations_bp = Blueprint('recommendations', __name__)

from apps.recommendations import views

# Register the routes
recommendations_bp.add_url_rule('/get-recommendation', methods=['GET'], view_func=views.get_recommendation)