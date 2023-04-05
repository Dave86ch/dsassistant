import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from gpt_index import GPTTreeIndex
from dotenv import load_dotenv

load_dotenv()
api_key = os.environ.get("OPENAI_API_KEY")

from gpt_index.langchain_helpers.text_splitter import TokenTextSplitter
from gpt_index import SimpleDirectoryReader, Document
from gpt_index import GPTTreeIndex, SimpleDirectoryReader
from IPython.display import Markdown, display

app = Flask(__name__)
CORS(app)

tree_index = GPTTreeIndex.load_from_disk('/home/davesoma/dsassistant_v1/index_tree_marcus_aurelius.json')

@app.route('/ask', methods=['POST'])
def query():
    question = request.json.get('question', '')

    if question:
        response_tree = tree_index.query(question + "answer as if you are Marcus Aurelius and behave as a teacher")
        return jsonify({'response_tree': str(response_tree)})
    else:
        return jsonify({'error': 'Question is empty'}), 400

if __name__ == '__main__':
    app.run(debug=True)
