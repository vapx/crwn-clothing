import Home from "./routes/Home/Home.component";
import { Outlet, Route, Routes } from "react-router-dom";
import Navigation from "./routes/Navigation/Navigation.component";




const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
      </Route>
    </Routes>
  )
}


function Shop() {
  return <h1>Hello World</h1>
}
export default App;

