from flask import Flask
from flask_cors import CORS
import os 
from dotenv import load_dotenv

load_dotenv() 

def create_app():
    app = Flask(__name__)
    CORS(app)
    
    app.config['SECRET_KEY'] = os.getenv("SECRET_KEY")

    with app.app_context():
        from apps.recommendations import recommendations_bp
        app.register_blueprint(recommendations_bp, url_prefix='/recommendations')
        return app