/**
 * Copyright (c) 2024-present mrofisr
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Gifts from './pages/Gifts'; // halaman baru
import ExampleGifts from './pages/ExampleGifts'; // halaman baru
import GiftManager from './pages/GiftManager'; // halaman baru

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gifts" element={<Gifts />} /> {/* halaman baru */}
        <Route path="/example-gifts" element={<ExampleGifts />} /> {/* halaman baru */}
        <Route path="/manage-gifts" element={<GiftManager />} /> {/* halaman baru */}
      </Routes>
    </Router>
  );
}

export default App;