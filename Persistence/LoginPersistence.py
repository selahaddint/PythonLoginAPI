from initialize import *
from Models.UserModel import *
import json
#---------------------------------------------------------------------------------------------------------------
class LoginPersistence():    
    def Login(self,user_name, password):
        user = User.verify_auth_token(user_name)
        if not user:        
            user = User.query.filter_by(Username=user_name).first()
            if not user or not user.verify_password(password):
                return json.dumps({'status':'NO'})
            g.user = user
            token = g.user.generate_auth_token(600)                
            return jsonify({'status':'OK', 'token': token.decode('ascii'), 'duration': 600})         

    def Token():
        token = g.user.generate_auth_token(600)
        return jsonify({'token': token.decode('ascii'), 'duration': 600})    
#---------------------------------------------------------------------------------------------------------------
#---------------------------------------------------------------------------------------------------------------
#---------------------------------------------------------------------------------------------------------------
#---------------------------------------------------------------------------------------------------------------