from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_restless import APIManager   # Simple API endpoints
from flask_restful import Resource, Api # Resources - request transformed data

app = Flask(__name__)   # Starting the Flask app.

app.config['SQLALCHEMY_DATABASE_URI'] =\
        'sqlite:///../app.db'
                        # Config databse using SQLAlchemy.
db = SQLAlchemy(app)    # Passing the database.

################# Models #####################
class Floor(db.Model):
    ''' A floor is one of six floors of a map instance. '''
    id = db.Column(db.Integer, primary_key=True)
    fl_num = db.Column(db.Integer)
    mob = db.Column(db.String(80))
    visitor = db.Column(db.Boolean)
    door = db.Column(db.String(8))
    map_id = db.Column(db.Integer, db.ForeignKey('map.id'))

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

# Get Aggregate Floor Data
class GetAggFl(Resource):
    def get(self, fl_num):
        if fl_num < 1 or fl_num > 6:
            return None, 400
        else:
            query = Floor.query.filter_by(fl_num=floor)      # DB Query
            left = query.filter(Floor.door=='leftDoor').count()   # Left doors
            right = query.filter(Floor.door=='rightDoor').count() # Right doors

            data = {
                'left': {
                },
                'right': {
                }
            }

            return data, 201

# Get Conditional Floor Aggregate Data
class GetCondFlAgg(Resource):
    def get(self, fl_num, mob, vis):
        if fl_num < 1 or fl_num > 6 or mob is None:
            return None, 400
        else:
            query = Floor.query.filter_by(fl_num=fl_num, mob=mob, visitor=vis)
            left = query.filter(Floor.door=='leftDoor').count()
            right = query.filter(Floor.door=='rightDoor').count()
            return { 'total': left+right, 'left': left, 'right': right }, 201

# Provide entire statistical data TODO
class GetAggData(Resource):
    def get(self):
        return None 

resource_manager.add_resource(GetCondFlAgg, '/cnd_agg/<int:fl_num>/<string:mob>/<int:vis>')
resource_manager.add_resource(GetAggFl, '/fl_agg/<int:fl_num>')

if __name__ == '__main__':
    app.run(debug=True)

