from flask import Flask, render_template, request, send_from_directory, flash, session, url_for, redirect
import os, sqlite3
from werkzeug.utils import secure_filename

UPLOAD_FOLDER = './uploads'

app = Flask(__name__)
app.secret_key = b'\xd3N@\xfbK\x99\xb0\xd0\r\x1f\xb9\xe2e\xdc\xd5\xc9'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def checkNotEmpty(s):
    pure = s.strip()   #prevent any whitespace inputs
    if pure == "":
        return False

    return True

def checkAge(a):
    if not (a.isnumeric()):
        return False

    a_int = int(a)
    if a_int <= 12 or a_int >= 100:
        return False

    return True

@app.route('/')
def root(): 
    return render_template('index.html')

@app.route('/show',methods=["POST"]) 
def show():
    username = request.form['username']
    if not checkNotEmpty(username):
        flash("Username cannot be empty!")
        return redirect(url_for('root'))
    email = request.form['email']
    if not checkNotEmpty(email):
        flash("Email cannot be empty!")
        return redirect(url_for('root'))
    name = request.form['name']
    if not checkNotEmpty(name):
        flash("Name cannot be empty!")
        return redirect(url_for('root'))
    age = request.form['age']
    if not checkAge(age):
        flash("Please enter an appropriate age")
        return redirect(url_for('root'))
    #radio button: need to check if anything is selected first before trying to get data
    #if (request.form.get('gender') != "M" and request.form.get('gender') != "F"):
##        flash("Gender cannot be empty!")
##        return redirect(url_for('root'))
    gender = request.form['gender']
    school = request.form['school']
    studyInterests_list = request.form.getlist('SI')
    studyInterests = ', '.join(studyInterests_list)
    educationLevel = request.form['educationLevel']
    if not checkNotEmpty(educationLevel):
        flash("Education Level cannot be empty!")
        return redirect(url_for('root'))
    learningStyle_list = request.form.getlist('LS')
    learningStyle = ', '.join(learningStyle_list)
    aboutMe = request.form['aboutMe']

    #handling profile picture upload
    photo = request.files['profilePic']
    filename = secure_filename(photo.filename)
    if photo.filename != '':   #pic uploaded
        photo_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        photo.save(photo_path)   

    conn = sqlite3.connect("USERS.db")
    cur = conn.cursor()
    
    #cur.execute("create table if not exists Users (name varchar(255), form_class char(4), gender char(1))")

    cur.execute("""SELECT email, username FROM USERS WHERE email=? OR username=?""",(email, username))
    result = cur.fetchone()
    if result:
        flash("Username or email already exists. Please enter a different username or email")
        return redirect(url_for('root'))

    
    cur.execute("insert into USERS values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                (username, email, name, age, gender, school, studyInterests, educationLevel, learningStyle, aboutMe, filename))
    conn.commit()
    
    return render_template('show.html', username=username, email=email, name=name, age=age, gender=gender,
                           school=school, studyInterests=studyInterests, educationLevel=educationLevel,
                           learningStyle=learningStyle, aboutMe=aboutMe, photo=filename)

@app.route('/uploads/<filename>') #necessary to serve up files. 
def get_file(filename):
    return send_from_directory('uploads', filename)

app.run()
