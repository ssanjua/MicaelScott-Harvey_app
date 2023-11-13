from flask import Flask, render_template

app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/contact")
def contact():
    pass


@app.route("/about")
def about():
    pass


if __name__ == "__main__":
    app.run(debug=True)
