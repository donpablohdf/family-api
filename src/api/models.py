from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Family(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(100), unique=False, nullable=False)
    last_name = db.Column(db.String(255), unique=False, nullable=False)
    age = db.Column(db.Integer, unique=False, nullable=False)
    lucky_numbers = db.Column(db.Text, unique=False, nullable=True)

    #def __repr__(self):
     #   return f'<Family {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "age": self.age,
            "lucky_numbers": self.lucky_numbers,
           
        }

    @classmethod
    def get_all(cls):
        return cls.query.all()

    @classmethod
    def get_by_id(cls, id):
        return cls.query.get(id)