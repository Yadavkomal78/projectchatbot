from flask import Flask, send_from_directory, request, jsonify
import requests
import json

app = Flask(__name__)

# Predefined chatbot responses
responses = {
    "hello": "Hello! How can I assist you?",
    "hi": "Hi there! How can I help?",
    "how are you": "I'm just a bot, but I'm doing great! How about you?",
    "bye": "Goodbye! Have a great day!",
    "what is python": "Python is a high-level programming language known for its simplicity and versatility.",
    "default": "I'm sorry, I don't understand that.",
}

# AI21 Studio API details
API_KEY = "xeqdVnl9saU62xnBdT37Iy1IOeSTy5wx"
API_URL = "https://api.ai21.com/studio/v1/chat/completions"

@app.route('/')
def home():
    return send_from_directory('static', 'index.html')

@app.route('/<path:path>')
def static_files(path):
    return send_from_directory('static', path)

@app.route('/chat', methods=['POST'])
def chat():
    """
    Handle chatbot messages. Integrates predefined responses and external API call.
    """
    if not request.is_json:
        return jsonify({"error": "Request must be in JSON format"}), 400

    data = request.get_json()
    user_message = data.get("message", "").lower()

    # Check if the user message matches predefined responses
    reply = responses.get(user_message)

    # If no predefined response, dynamically update the content and call AI21 API
    if reply is None:
        try:
            # Read the JSON body from the file
            with open("data.json", "r") as file:
                body = json.load(file)

            # Update the "content" field with the user's message
            body["messages"][0]["content"] = user_message

            # Send the request to AI21 Studio
            response = requests.post(API_URL, headers={"Authorization": f"Bearer {API_KEY}"}, json=body)

            if response.status_code == 200:
                # Extract the reply from the API response
                data = response.json()
                reply = data.get("choices", [{}])[0].get("message", {}).get("content", "I'm sorry, I don't understand.")
            else:
                reply = f"Error from AI21 API: {response.status_code}"
        except FileNotFoundError:
            reply = "Error: 'data.json' file not found."
        except json.JSONDecodeError:
            reply = "Error: Invalid JSON in 'data.json'."
        except Exception as e:
            reply = f"An unexpected error occurred: {e}"

    # Clean up response by removing any unwanted formatting
    reply = reply.replace("**", "")  # Remove bold tags if any

    return jsonify({"reply": reply})

if __name__ == '__main__':
    app.run(debug=True)
