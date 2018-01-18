from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_restless import APIManager   # Simple API endpoints
from flask_restful import Resource, Api # Resources - request transformed data

app = Flask(__name__)   # Starting the Flask app.

app.config['SQLALCHEMY_DATABASE_URI'] =\
        'sqlite:///../hydaelyn.db'
                        # Config databse using SQLAlchemy.
db = SQLAlchemy(app)    # Passing the database.

################# Models #####################
class Floor(db.Model):
    ''' A floor is one of six floors of a map instance. '''
    id = db.Column(db.Integer, primary_key=True)
    fl_num = db.Column(db.Integer, unique=True)
    mob = db.Column(db.String(80))
    door = db.Column(db.String(8))
    map_id = db.Column(db.Integer, db.ForeignKey('map.id'), nullable=False)

class Map(db.Model):
    ''' A single map instance. '''
    id = db.Column(db.Integer, primary_key=True)
    area_name = db.Column(db.String(20))
    x = db.Column(db.Integer)
    y = db.Column(db.Integer)
    floors = db.relationship('Floor', backref='map', lazy=True)

db.create_all()     # Create database tables.

endpoint_manager = APIManager(app, flask_sqlalchemy_db=db)   # Flask-Restless API manager
resource_manager = Api(app)

################ Endpoints #####################

endpoint_manager.create_api(Floor, methods=['GET', 'POST'])  # API Endpoints
endpoint_manager.create_api(Map, methods=['GET', 'POST', 'PUT']) # ex. -- /api/table

############### Resources ######################

# TODO: Make resource urls to return statistical information

class GetAggregateFloorData(Resource):
    def get(self, fl_num):
        #TODO: Return aggregate data of floor number
        # - Total, left/right
        # - 
        return 200


resource_manager.add_resource(GetAggregateFloorData, '/floor_aggr/<int:fl_num>')

if __name__ == '__main__':
    app.run(debug=True)

