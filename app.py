from flask import Flask, render_template

app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html")

@app.route("/contact")
def contact():
    return render_template("contact.html")

@app.route("/test")
def test():
    return render_template("test.html")

@app.route("/what")
def what():
    return render_template("what.html")

@app.route("/who")
def who():
    return render_template("who.html")

@app.route("/why")
def why():
    return render_template("why.html")

if __name__ == "__main__":
    app.run(debug=True)
