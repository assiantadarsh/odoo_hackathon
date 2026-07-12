from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_cors import CORS

from config import Config

db = SQLAlchemy()

jwt = JWTManager()


def create_app():

    app = Flask(__name__)

    app.config.from_object(Config)

    CORS(app)

    db.init_app(app)

    jwt.init_app(app)

    @app.route("/")

    def home():

        return {
            "message": "AssetFlow Backend Running Successfully"
        }

    with app.app_context():

        db.create_all()

    return app


app = create_app()

if __name__ == "__main__":

    app.run(debug=True)
