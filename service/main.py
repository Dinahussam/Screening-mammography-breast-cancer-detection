from flask import Flask
from flask import request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route("/", methods=["POST"])
def index():
    if "file" not in request.files:
        return jsonify({"error": "No file found"}), 400

    file = request.files["file"]

    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    filepath = "service/uploads/record.dcm"
    file.save(filepath)
    return (
        jsonify({"message": "File successfully uploaded", "filename": "record.dcm"}),
        200,
    )


if __name__ == "__main__":
    app.run(debug=True)
