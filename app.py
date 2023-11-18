from flask import Flask, render_template, redirect, request

app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/test")
def test():
    return render_template("construction.html")

@app.route("/what")
def what():
    return render_template("what.html")

@app.route("/who")
def who():
    return render_template("who.html")

@app.route("/why")
def why():
    return render_template("why.html")

@app.route('/contact', methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        # Aquí podrías manejar los datos del formulario si es necesario
        return redirect('/construction')
    return render_template('contact.html')

@app.route('/construction')
def construction():
    return render_template('construction.html')

if __name__ == "__main__":
    app.run(debug=True)
