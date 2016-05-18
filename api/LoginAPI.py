from initialize import *
from Persistence.LoginPersistence import *
#---------------------------------------------------------------------------------------------------------------
@app.route('/api/Login', methods=['POST'])
@auth.verify_password
def Login():
    user_name = request.json.get('Username')
    password = request.json.get('Password')    
    persistence = LoginPersistence()
    return persistence.Login(user_name,password)
#---------------------------------------------------------------------------------------------------------------
@app.route('/api/token')
@auth.login_required
def Token():    
    persistence = LoginPersistence()
    return persistence.Token() 
#---------------------------------------------------------------------------------------------------------------
#---------------------------------------------------------------------------------------------------------------
#---------------------------------------------------------------------------------------------------------------
#---------------------------------------------------------------------------------------------------------------
    