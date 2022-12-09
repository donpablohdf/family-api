
from random import randint
from flask import jsonify
from models import db, Family

class FamilyStructure:
    def __init__(self, last_name):
        self.last_name = last_name

    def add_member(self, member):
        new_user = Family.new_member(member)
        if new_user:
            return True
        return False

    def delete_member(self, id):
        delete = Family.delete_by_id(id)
        if delete:
            return True
        return False

    def get_member(self, id):
        member = Family.get_by_id(id)
        the_member = Family.serialize(member) 
        return the_member

    def get_all_members(self):
        members = Family.get_all()
        if members:
            all_members = [family.serialize() for family in members]
            return all_members
        return {"message":"Error al recuperar Family"}
