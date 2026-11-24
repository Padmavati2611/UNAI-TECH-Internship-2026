
from flask import Flask, jsonify, request
from flask_cors import CORS

# Initialize Flask application
app = Flask(__name__)

# Allow frontend to communicate with backend
CORS(app)

# Sample catalog data
items = [
    {
        "id": 1,
        "name": "Python Programming",
        "category": "Course",
        "description": "Learn Python programming from basics."
    },
    {
        "id": 2,
        "name": "Machine Learning",
        "category": "Course",
        "description": "Explore machine learning concepts."
    },
    {
        "id": 3,
        "name": "Artificial Intelligence",
        "category": "Article",
        "description": "Discover the world of AI."
    },
    {
        "id": 4,
        "name": "Data Science",
        "category": "Course",
        "description": "Learn data analysis and visualization."
    }
]

# Store user interactions
interactions = []


# Home route
@app.route("/")
def home():
    return jsonify({
        "message": "Welcome to AI Recommendation Engine!",
        "status": "Backend is running"
    })


# Item catalog API
@app.route("/api/items", methods=["GET"])
def get_items():
    return jsonify({
        "success": True,
        "total": len(items),
        "items": items
    })


# Record user interaction API
@app.route("/api/interactions", methods=["POST"])
def record_interaction():

    data = request.get_json(silent=True) or {}

    item_id = data.get("item_id")
    action = data.get("action")

    if item_id is None or not action:
        return jsonify({
            "success": False,
            "message": "Item ID and action are required."
        }), 400

    # Check whether item exists
    selected_item = next(
        (item for item in items if item["id"] == item_id),
        None
    )

    if selected_item is None:
        return jsonify({
            "success": False,
            "message": "Item not found."
        }), 404

    # Save interaction
    interaction = {
        "item_id": item_id,
        "item_name": selected_item["name"],
        "action": action
    }

    interactions.append(interaction)

    return jsonify({
        "success": True,
        "message": "Interaction recorded successfully!",
        "interaction": interaction,
        "total_interactions": len(interactions)
    }), 201


# View all recorded interactions
@app.route("/api/interactions", methods=["GET"])
def get_interactions():
    return jsonify({
        "success": True,
        "total": len(interactions),
        "interactions": interactions
    })


# Run Flask server
if __name__ == "__main__":
    app.run(
        host="127.0.0.1",
        port=5000,
        debug=True
    )
