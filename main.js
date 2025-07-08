import React from "https://esm.sh/react";
import ReactDOM from "https://esm.sh/react-dom";

function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <section className="bg-gray-100 p-10 text-center">
        <h1 className="text-4xl font-bold mb-4">Găsește rapid un meșter de încredere</h1>
        <p className="text-lg mb-6">De la zugrăvie la instalații electrice – muncitorii.ro te conectează cu profesioniști locali verificați.</p>
        <input type="text" placeholder="Ce lucrare cauți?" className="p-3 rounded-lg w-full max-w-md" />
        <button className="ml-2 bg-blue-600 text-white px-6 py-3 rounded-xl mt-4 hover:bg-blue-700">Caută acum</button>
      </section>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));