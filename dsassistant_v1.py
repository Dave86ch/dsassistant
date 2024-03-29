import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from llama_index import GPTTreeIndex
from dotenv import load_dotenv
from langchain import OpenAI
#-----------------
from llama_index import (
    GPTKeywordTableIndex,
    SimpleDirectoryReader,
    LLMPredictor,
    ServiceContext
)
#------------------

load_dotenv()
api_key = os.environ.get("OPENAI_API_KEY")

from llama_index.langchain_helpers.text_splitter import TokenTextSplitter
from llama_index import SimpleDirectoryReader, Document
from llama_index import GPTTreeIndex, SimpleDirectoryReader
from IPython.display import Markdown, display
#--------------------------
llm_predictor = LLMPredictor(llm=OpenAI(temperature=0, model_name="text-davinci-003"))
service_context = ServiceContext.from_defaults(llm_predictor=llm_predictor)
#-------------------------
app = Flask(__name__)
CORS(app)

@app.route('/ask', methods=['POST'])
def query():
    question = request.json.get('question', '')
    model_path = request.json.get('model_path', '')
    
    print(f"Received model_path: {model_path}")  # Add this line to check the received model_path
    #service context delete
    if question and model_path:
        tree_index = GPTTreeIndex.load_from_disk(model_path)
        response_tree = tree_index.query(question + "answer as a teacher paraphrasing the context, if not presente in the context information answer only 'Sorry not in mine domain of competence'", service_context = service_context, child_branch_factor=1)
        return jsonify({'response_tree': str(response_tree)})
    else:
        return jsonify({'error': 'Question or model path is empty'}), 400

@app.route('/data_model')
def list_models():
    data_model_path = "/home/davesoma/dsassistant_v1/data_model"
    models = [f for f in os.listdir(data_model_path) if f.endswith(".json")]
    models.sort()
    return jsonify({'models': models})

if __name__ == '__main__':
    app.run(debug=True)
