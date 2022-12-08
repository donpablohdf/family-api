from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()


class Family(db.Model):
          
    __tablename__ = 'family'
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(100), unique=False, nullable=False)
    last_name = db.Column(db.String(255), unique=False, nullable=False)
    age = db.Column(db.Integer, unique=False, nullable=False)
    lucky_numbers = db.Column(db.Text, unique=False, nullable=True)

    def serialize(self):
        return {
            "id": self.id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "age": self.age,
            "lucky_numbers": self.lucky_numbers,
           
        }

    @classmethod
    def get_all(self):
        return self.query.all()

    @classmethod
    def get_by_id(self, pid):
        return self.query.filter_by(id=pid).first()

    @classmethod
    def delete_by_id(self, pid):
        user = self.query.get(pid)
        if user:
            db.session.delete(user)
            db.session.commit()
            return True
        return False
    @classmethod
    def new_member(self, member):
        print(member)
        new_user = Family(first_name=member['first_name'], last_name= member['last_name'], age= member['age'], lucky_numbers= member['lucky_numbers'])
        db.session.add(new_user)
        db.session.commit()
        return True

