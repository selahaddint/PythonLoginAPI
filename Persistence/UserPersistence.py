from flask import jsonify
import json
from Models.UserModel import *
from initialize import *
#---------------------------------------------------------------------------------------------------------------
class UserPersistence():
    def Post(self,User_name,Name,Phone,Country,Password):
        if User_name is None or Password is None:
            abort(400)    
        if User.query.filter_by(Username=User_name).first() is not None:
            abort(400)    
        
        user = User(Username=User_name)
        user.hash_password(Password)
        user.Name = Name
        user.Phone = Phone
        user.Country = Country        
        
        db.session.add(user)
        db.session.commit()   
        
        return jsonify({'Username': user.Username})  
#---------------------------------------------------------------------------------------------------------------
    def GetUserById(self,id):
        user = User.query.get(id)
        if not user:
            abort(400)
        return jsonify({'username': user.username})        
#---------------------------------------------------------------------------------------------------------------
#---------------------------------------------------------------------------------------------------------------
#---------------------------------------------------------------------------------------------------------------
#---------------------------------------------------------------------------------------------------------------