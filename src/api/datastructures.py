
"""
update this file to implement the following already declared methods:
- add_member: Should add a member to the self._members list
- delete_member: Should delete a member from the self._members list
- update_member: Should update a member from the self._members list
- get_member: Should return a member from the self._members list
"""
from random import randint
from flask import jsonify
from models import db, Family

class FamilyStructure:
    def __init__(self, last_name):
        self.last_name = last_name

       
    # read-only: Use this method to generate random members ID's when adding members into the list
    def _generateId(self):
        return randint(0, 99999999)

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
        #print(the_member)
        return the_member

    # this method is done, it returns a list with all the family members
    def get_all_members(self):
        members = Family.get_all()
        if members:
            all_members = [family.serialize() for family in members]
            return all_members
        return {"message":"Error al recuperar Family"}
