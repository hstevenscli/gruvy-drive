from flask import Flask
import os

app = Flask(__name__)

@app.route("/", methods=['GET'])
def hello_world():
    print("something print")
    return "<p>Hello, World!</p>"

@app.route("/media")
def get_files():
    files = os.listdir("/home/ace/side_projects/gruvy_drive/backend/uploads/")
    return files

@app.route("/download", methods=['POST'])
def download_video():
    return "downlaod"
